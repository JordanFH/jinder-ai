"use client";

import React, { FC } from "react";
import Heading2 from "@/shared/Heading2";
import CarCard from "@/components/CarCard";
import { useUser } from "@/providers/UserProvider";
import Link from "next/link";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface SectionCoursesProps {
  className?: string;
  data?: any[];
}

const SectionGridFilterCard: FC<SectionCoursesProps> = ({ className = "" }) => {
  const { preferences } = useUser();

  const { courses } = preferences.explored;

  console.log(courses);
  return (
    <div
      className={`nc-SectionGridFilterCard ${className}`}
      data-nc-id="SectionGridFilterCard"
    >
      <Heading2 heading="Courses" subHeading="Recommended courses for you" />

      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <CarCard key={course.id} data={course} />
        ))}
      </div>
      {courses.length === 0 && (
        <p className="w-100 text-center">
          No courses available.{" "}
          <Link className="hover:underline" href="/account">
            Try updating your preferences here.
          </Link>
        </p>
      )}
      <div className="mt-6 w-100 text-center">
        <ButtonPrimary>Refresh</ButtonPrimary>
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
