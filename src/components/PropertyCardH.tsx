import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import SaleOffBadge from "@/components/SaleOffBadge";
import Badge from "@/shared/Badge";
import { StayDataType } from "@/data/types";
import Link from "next/link";

export interface PropertyCardHProps {
  className?: string;
  data?: StayDataType;
}

const DEMO_DATA = DEMO_STAY_LISTINGS[0];

const PropertyCardH: FC<PropertyCardHProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  const renderTienIch = () => {
    return (
      <div className="block space-y-4">
        <div className="flex items-center space-x-2">
          <span className="inline-block">
            <i className="las la-bed text-lg"></i>
          </span>
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Contract type:
          </span>
        </div>

        {/* ---- */}
        <div className="flex items-center space-x-2">
          <span className="inline-block">
            <i className="las la-bath text-lg"></i>
          </span>
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Requirements:
          </span>
        </div>

        {/* ---- */}
        <div className="flex items-center space-x-2">
          <span className="inline-block">
            <i className="las la-expand-arrows-alt text-lg"></i>
          </span>
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Description:
          </span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow p-3 sm:pr-6 flex flex-col items-start">
        <div className="space-y-4 w-full">
          <div className="inline-flex space-x-3">
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-briefcase"></i>
                  <span className="ml-1">Company</span>
                </div>
              }
            />
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-map-marker"></i>
                  <span className="ml-1">Location</span>
                </div>
              }
              color="yellow"
            />
          </div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-2">
                Position
              </span>
            </h2>
          </div>
          {renderTienIch()}
          <div className="w-14 border-b border-neutral-200/80 dark:border-neutral-700 "></div>
          <div className="flex w-full justify-end items-end">
            <button className="flex items-center justify-center px-4 py-2 border-2 border-secondary-500 rounded-lg leading-none font-medium text-secondary-500 hover:bg-secondary-500 hover:text-white transition-colors duration-200">
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-3xl overflow-hidden ${className}`}
    >
      <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
        {renderContent()}
      </div>
      <BtnLikeIcon
        colorClass={` bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 hover:bg-opacity-70 text-neutral-600 dark:text-neutral-400`}
        className="absolute right-5 top-5 sm:right-3 sm:top-3 "
      />
    </div>
  );
};

export default PropertyCardH;
