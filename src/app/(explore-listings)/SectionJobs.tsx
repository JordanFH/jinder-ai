"use client";

import React, { FC, useEffect, useState } from "react";
import Heading2 from "@/shared/Heading2";
import PropertyCardH from "@/components/PropertyCardH";
import { useUser } from "@/providers/UserProvider";
import Link from "next/link";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { v4 as uuidv4 } from "uuid";

export interface SectionJobsProps {
  className?: string;
}

const SectionGridFilterCard: FC<SectionJobsProps> = ({ className = "" }) => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const user = useUser();
  const [data, setData] = useState<any[]>([]);

  const searchJobs = async (query: any, location: any) => {
    setLoading(true);
    setDisabled(true);

    try {
      const response = await fetch("/api/searchJobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, location }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      let { status, result } = await response.json();

      if (!status) {
        throw new Error("Failed to fetch jobs");
      }

      // add id to each job
      result.forEach((job: any) => {
        job.id = uuidv4();
      });

      setData(result);

      setLoading(false);
      setDisabled(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user && user.userData.professionalDetails.specialty !== "" && user.country !== "") {      
      searchJobs(
        `${user.userData.professionalDetails.specialty} jobs`,
        `${user.country}`
      );
    }
  }, [user]);

  return (
    <div className={`nc-SectionGridFilterCard ${className}`}>
      <Heading2
        heading="Jobs"
        subHeading="Available jobs based on your preferences"
      />

      <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2 ">
        {data.map((job) => (
          <PropertyCardH key={job.id} data={job} />
        ))}
      </div>
      {data.length === 0 && (
        <p className="w-100 text-center">
          No jobs available.{" "}
          <Link className="hover:underline" href="/account">
            Try updating your preferences here.
          </Link>
        </p>
      )}
      <div className="mt-6 w-100 text-center">
        <ButtonPrimary
          onClick={() =>
            searchJobs(
              `${user.userData.professionalDetails.specialty} jobs`,
              `${user.country}`
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
