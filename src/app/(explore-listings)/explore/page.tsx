import React, { FC } from "react";
import {default as JobsListing} from "../SectionGridFilterCard";
import {default as CoursesListing} from "@/app/(real-estate-listings)/SectionGridFilterCard";
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
      <JobsListing className="container py-10 lg:py-12" />
      <CoursesListing className="container py-10 lg:py-12" />
    </>
  );
};

export default ListingStayPage;
