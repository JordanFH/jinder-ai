import React, { FC } from "react";
import SectionCourses from "../SectionCourses";
import SectionJobs from "../SectionJobs";
import { Metadata } from "next";
import { APP_NAME } from "@/constants/app";

export interface ListingStayPageProps {}

export const metadata: Metadata = {
  title: `Explore - ${APP_NAME}`,
  description: "Explore page",
};

const ListingStayPage: FC<ListingStayPageProps> = () => {
  return (
    <>
      <SectionJobs className="container py-10 lg:py-12" />
      <SectionCourses className="container py-10 lg:py-12" />
    </>
  );
};

export default ListingStayPage;
