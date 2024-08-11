import React, { FC } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import Heading2 from "@/shared/Heading2";
import PropertyCardH from "@/components/PropertyCardH";

export interface SectionJobsProps {
  className?: string;
  data?: StayDataType[];
}

const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

const SectionGridFilterCard: FC<SectionJobsProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  return (
    <div className={`nc-SectionGridFilterCard ${className}`}>
      <Heading2
        heading="Jobs"
        subHeading="Available jobs based on your preferences"
      />

      <div className="grid grid-cols-1 gap-6 md:gap-8 xl:grid-cols-2 ">
        {data.map((stay) => (
          <PropertyCardH key={stay.id} data={stay} />
        ))}
      </div>
    </div>
  );
};

export default SectionGridFilterCard;
