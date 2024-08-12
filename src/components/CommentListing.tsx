import React, { FC } from "react";
import Avatar from "@/shared/Avatar";
import gemini_icon from "@/images/Google_Gemini_Icon.svg";

interface CommentListingDataType {
  name: string;
  avatar?: string;
  date: string;
  comment: string;
  starPoint: number;
}

export interface CommentListingProps {
  className?: string;
  data?: CommentListingDataType;
  isGemini?: boolean;
}

const DEMO_DATA: CommentListingDataType = {
  name: "Cody Fisher",
  date: "May 20, 2021",
  comment:
    "There’s no stopping the tech giant. Apple now opens its 100th store in China.There’s no stopping the tech giant.",
  starPoint: 5,
};

const CommentListing: FC<CommentListingProps> = ({
  className = "",
  data = DEMO_DATA,
  isGemini = true,
}) => {
  const directionClasses = !isGemini
    ? "justify-end text-right"
    : "justify-start text-left";

  return (
    <div
      className={`nc-CommentListing flex ${directionClasses} ${className}`}
      data-nc-id="CommentListing"
      style={{
        maxWidth: "80%",
        margin: !isGemini ? "0 0 10px auto" : "0 auto 10px 0",
        backgroundColor: !isGemini ? "#f0f0f0" : "#d1ecf1",
        borderRadius: "15px",
        padding: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {isGemini && (
        <div className="pt-0.5 pr-2">
          <Avatar
            sizeClass="h-10 w-10 text-lg"
            radius="rounded-full"
            userName="Gemini AI"
            imgUrl={gemini_icon}
          />
        </div>
      )}
      <div className="flex-grow">
        <div
          className={`flex ${
            isGemini ? "justify-start" : "justify-end"
          } space-x-3`}
        >
          <div className="flex flex-col">
            <div className="text-sm font-semibold">
              <span>{data.name}</span>
            </div>
          </div>
        </div>
        <span className="block mt-3 text-neutral-600 dark:text-neutral-300">
          {data.comment}
        </span>
      </div>
      {!isGemini && (
        <div className="pt-0.5 pl-2">
          <Avatar
            sizeClass="h-10 w-10 text-lg"
            radius="rounded-full"
            userName={data.name}
            imgUrl={data.avatar}
          />
        </div>
      )}
    </div>
  );
};

export default CommentListing;
