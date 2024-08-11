import React, { FC } from "react";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import Image from "next/image";

export interface CarCardProps {
  className?: string;
  data?: any;
  size?: "default" | "small";
}

const CarCard: FC<CarCardProps> = ({
  size = "default",
  className = "",
  data = [],
}) => {
  const renderSliderGallery = () => {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden">
        <div className="aspect-w-16 aspect-h-9">
          <Image
            fill
            src={
              data.pagemap
                ? data.pagemap
                : "https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/02/how-to-create-online-course.webp"
            }
            alt="course"
            sizes="(max-width: 640px) 100vw, 350px"
          />
        </div>
        <BtnLikeIcon className="absolute right-3 top-3 z-[1]" />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "p-5  space-y-4" : "p-3  space-y-2"}>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <h2
              className={`  capitalize ${
                size === "default"
                  ? "text-xl font-semibold"
                  : "text-base font-medium"
              }`}
            >
              <span className="line-clamp-1">{data.title}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            {data.snippet}
          </div>
        </div>
        <div className="flex w-full justify-end items-end">
          <a
            href={data.link}
            target="_blank"
            className="flex items-center justify-center px-6 py-2 border-2 border-primary-500 rounded-lg leading-none font-medium text-primary-500 hover:bg-primary-500 hover:text-white transition-colors duration-200"
          >
            Visit
          </a>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
      data-nc-id="CarCard"
    >
      {renderSliderGallery()}
      {renderContent()}
    </div>
  );
};

export default CarCard;
