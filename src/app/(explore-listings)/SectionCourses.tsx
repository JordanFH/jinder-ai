"use client";

import React, { FC, useEffect, useState } from "react";
import Heading2 from "@/shared/Heading2";
import CarCard from "@/components/CarCard";
import { useUser } from "@/providers/UserProvider";
import Link from "next/link";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { v4 as uuidv4 } from 'uuid';

export interface SectionCoursesProps {
  className?: string;
  data?: any[];
}

const SectionGridFilterCard: FC<SectionCoursesProps> = ({ className = "" }) => {
  const { preferences } = useUser();

  const { courses } = preferences.explored;

  const [data, setData] = useState<any[]>([]);

  const searchCourses = async (query: any) => {
    try {
      const response = await fetch("/api/searchCourses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const {success, result} = await response.json();

      if (!success) {
        throw new Error("Failed to fetch courses");
      }

      setData(result);
      
      // setData(data);
    } catch (error) {
      console.log(error);
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
        <ButtonPrimary onClick={() => searchCourses('javascript courses')}>Refresh</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
