import React, { FC } from "react";
import SectionGridFilterCard from "../SectionGridFilterCard";

export interface ListingStayPageProps {}

const ListingStayPage: FC<ListingStayPageProps> = () => {
  return (
    <>
      <SectionGridFilterCard className="container py-10 lg:py-12" />
      <SectionGridFilterCard className="container py-10 lg:py-12" />
    </>
  );
};

export default ListingStayPage;
