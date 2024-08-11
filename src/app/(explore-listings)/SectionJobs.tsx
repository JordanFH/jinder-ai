"use client";

import React, { FC } from "react";
import Heading2 from "@/shared/Heading2";
import PropertyCardH from "@/components/PropertyCardH";
import { useUser } from "@/providers/UserProvider";
import Link from "next/link";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface SectionJobsProps {
  className?: string;
  data?: any[];
}

const SectionGridFilterCard: FC<SectionJobsProps> = ({ className = "" }) => {
  const { preferences } = useUser();

  const { jobs } = preferences.explored;

  // console.log(jobs);

  return (
    <div className={`nc-SectionGridFilterCard ${className}`}>
      <Heading2
        heading="Jobs"
        subHeading="Available jobs based on your preferences"
      />

      <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2 ">
        {jobs.map((job) => (
          <PropertyCardH key={job.id} data={job} />
        ))}
      </div>
      {jobs.length === 0 && (
        <p className="w-100 text-center">
          No jobs available.{" "}
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
