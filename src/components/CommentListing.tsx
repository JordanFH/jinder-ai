import React, { FC } from "react";
import Avatar from "@/shared/Avatar";
import gemini_icon from "@/images/Google_Gemini_Icon.svg";
import { useUser } from "@/providers/UserProvider";

export interface CommentListingProps {
  className?: string;
  message?: string;
  isGemini?: boolean;
  hasListingTitle?: boolean;
}

const CommentListing: FC<CommentListingProps> = ({
  className = "",
  message = "",
  isGemini = true,
  hasListingTitle,
}) => {
  const user = useUser();

  const directionClasses = !isGemini
    ? "justify-end text-right"
    : "justify-start text-left";

  return (
    <div
      className={`nc-CommentListing flex ${directionClasses} ${className} ${
        isGemini
          ? "bg-primary-200 dark:bg-primary-900"
          : "bg-neutral-200 dark:bg-neutral-800"
      }`}
      data-nc-id="CommentListing"
      style={{
        maxWidth: "80%",
        margin: !isGemini ? "0 0 10px auto" : "0 auto 10px 0",
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
            <div className="text-sm font-semibold pt-3">
              <span>{isGemini ? "Gemini AI" : user.name}</span>
            </div>
          </div>
        </div>
        <span className="block mt-3 text-neutral-600 dark:text-neutral-300">
          {message}
        </span>
      </div>
      {!isGemini && (
        <div className="pt-0.5 pl-2">
          <Avatar
            sizeClass="h-10 w-10 text-lg"
            radius="rounded-full"
            userName={user.name}
            imgUrl={user.image}
          />
        </div>
      )}
    </div>
  );
};

export default CommentListing;
