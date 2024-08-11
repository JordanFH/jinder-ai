"use client";

import React, { FC, use, useEffect, useState } from "react";
import Heading2 from "@/shared/Heading2";
import CarCard from "@/components/CarCard";
import { getUserByEmail, useUser } from "@/providers/UserProvider";
import Link from "next/link";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { v4 as uuidv4 } from "uuid";
import { updateUserByEmail } from "../(account-pages)/account/page";

export interface SectionCoursesProps {
  className?: string;
}

const SectionGridFilterCard: FC<SectionCoursesProps> = ({ className = "" }) => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const user = useUser();
  const [data, setData] = useState<any[]>([]);

  const [userData, setUserData] = useState<any>(null);

  const searchCourses = async (query: any) => {
    setLoading(true);
    setDisabled(true);

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      let { success, result } = await response.json();

      if (!success) {
        throw new Error("Failed to fetch courses");
      }

      // add id to each course
      result.forEach((course: any) => {
        course.id = uuidv4();
      });

      setData(result);
      handleUpdateInfo(result);

      setLoading(false);
      setDisabled(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateInfo = (data: any) => {
    const updatedUser = {
      ...userData,
      preferences: {
        ...userData.preferences,
        explored: {
          ...userData.preferences.explored,
          courses: data,
        },
      },
    };

    updateUserByEmail(userData.email, updatedUser)
      .then(() => {
        setLoading(false);
        setDisabled(false);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        setLoading(false);
        setDisabled(false);
      });
  };

  useEffect(() => {
    if (!userData) {
      setLoading(true);
      setDisabled(true);

      getUserByEmail(user.email)
        .then((user) => {
          if (user) {
            setUserData(user);
          }
        })
        .finally(() => {
          setLoading(false);
          setDisabled(false);
        });
    }
  }, [user, userData]);

  useEffect(() => {
    if (userData) {
      searchCourses(
        `${userData.userData.professionalDetails.specialty} courses`
      );
    }
  }, [userData]);

  // useEffect(() => {
  //   if (userData && userData.preferences.explored.courses.length > 0) {
  //     setData(userData.preferences.explored.courses);
  //   }
  // }, [data, userData]);

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 heading="Courses" subHeading="Recommended courses for you" />

      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((course) => (
          <CarCard key={course.id} data={course} />
        ))}
      </div>
      {data.length === 0 && (
        <p className="w-100 text-center">
          No courses available.{" "}
          <Link className="hover:underline" href="/account">
            Try updating your preferences here.
          </Link>
        </p>
      )}
      <div className="mt-6 w-100 text-center">
        <ButtonPrimary
          onClick={() =>
            searchCourses(
              `${userData.userData.professionalDetails.specialty} courses`
            )
          }
          loading={loading}
          disabled={disabled}
        >
          Refresh
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
