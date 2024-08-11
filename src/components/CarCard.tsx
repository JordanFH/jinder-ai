import React, { FC } from "react";
import { DEMO_CAR_LISTINGS } from "@/data/listings";
import { CarDataType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import Image from "next/image";
import Link from "next/link";

export interface CarCardProps {
  className?: string;
  data?: CarDataType;
  size?: "default" | "small";
}

const DEMO_DATA: CarDataType = DEMO_CAR_LISTINGS[0];

const CarCard: FC<CarCardProps> = ({
  size = "default",
  className = "",
  data = DEMO_DATA,
}) => {
  const renderSliderGallery = () => {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden">
        <div className="aspect-w-16 aspect-h-9 ">
          <Image
            fill
            src="https://s.udemycdn.com/meta/default-meta-image-v2.png"
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
              <span className="line-clamp-1">Title</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
            Snippets
          </div>
        </div>
        <div className="flex w-full justify-end items-end">
          <a
            href="/"
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
