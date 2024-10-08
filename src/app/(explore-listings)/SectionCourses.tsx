"use client";

import React, { FC, useEffect, useState } from "react";
import Heading2 from "@/shared/Heading2";
import CarCard from "@/components/CarCard";
import { useUser } from "@/providers/UserProvider";
import Link from "next/link";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { v4 as uuidv4 } from "uuid";
import { getUserByEmail, updateUserByEmail } from "@/utils/userUtils";
import toast from "react-hot-toast";

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
    toast.loading("Generating new courses...");

    try {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      toast.dismiss();

      if (!response.ok) {
        setLoading(false);
        setDisabled(false);
        toast.error("Failed to fetch new courses");
        throw new Error("Failed to fetch new courses");
      }

      let { success, result } = await response.json();

      if (!success) {
        setLoading(false);
        setDisabled(false);
        toast.error("Failed to fetch new courses");
        throw new Error("Failed to fetch new courses");
      }

      // add id to each course
      result.forEach((course: any) => {
        course.id = uuidv4();
      });

      localStorage.setItem('courses', JSON.stringify(result));
      setData(result);
      handleUpdateInfo(result);

      setLoading(false);
      setDisabled(false);
      toast.success("Courses generated successfully!");
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
    const cachedCourses = localStorage.getItem("courses");
    if (cachedCourses) {
      setData(JSON.parse(cachedCourses));
    } else if (userData) {
      searchCourses(
        `${userData.userData.professionalDetails.specialty} courses`
      );
    }
  }, [userData]);

  const [saved, setSaved] = useState<any>(null);

  useEffect(() => {
    if (!saved) {
      getUserByEmail(user.email).then((user) => {
        if (user) {
          const { courses } = user.preferences.saved;
          setSaved(courses);
        }
      });
    }
  }, [user, saved]);

  const handleExist = (title: string) => {
    if (saved) {
      return saved.some((item: any) => item.title === title);
    }
    return false;
  };

  const handleSave = (data: any) => {
    if (saved) {
      getUserByEmail(user.email).then((user) => {
        if (user) {
          toast.loading("Saving...");
          const newSaved = [...saved, data];

          const updatedUser = {
            ...user,
            preferences: {
              ...user.preferences,
              saved: {
                ...user.preferences.saved,
                courses: newSaved,
              },
            },
          };

          updateUserByEmail(user.email, updatedUser)
            .then(() => {
              setSaved(newSaved);
              toast.dismiss();
              toast.success("Saved successfully!");
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
              toast.dismiss();
              toast.error("Failed to save");
            });
        }
      });
    }
  };

  const handleRemove = (data: any) => {
    if (saved) {
      getUserByEmail(user.email).then((user) => {
        if (user) {
          toast.loading("Removing...");
          const newSaved = saved.filter(
            (item: any) => item.title !== data.title
          );

          const updatedUser = {
            ...user,
            preferences: {
              ...user.preferences,
              saved: {
                ...user.preferences.saved,
                courses: newSaved,
              },
            },
          };

          updateUserByEmail(user.email, updatedUser)
            .then(() => {
              setSaved(newSaved);
              toast.dismiss();
              toast.success("Removed successfully!");
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
              toast.dismiss();
              toast.error("Failed to remove");
            });
        }
      });
    }
  };

  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 heading="Courses" subHeading="Recommended courses for you" />

      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((course) => (
          <CarCard
            key={course.id}
            data={course}
            isLiked={handleExist(course.title)}
            handleSave={handleSave}
            handleRemove={handleRemove}
          />
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
