import React, { FC } from "react";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import Badge from "@/shared/Badge";

export interface PropertyCardHProps {
  className?: string;
  data?: any;
}

const PropertyCardH: FC<PropertyCardHProps> = ({
  className = "",
  data = {},
}) => {
  const renderTienIch = () => {
    return (
      <div className="block space-y-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="inline-block">
              <i className="las la-file-contract text-lg"></i>
            </span>
            <span className="text-xs font-semibold">Contract type:</span>
          </div>
          <span className="text-sm text-neutral-600 dark:text-neutral-500">
            {data.contractType}
          </span>
        </div>

        {/* ---- */}
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="inline-block">
              <i className="las la-file-invoice text-lg"></i>
            </span>
            <span className="text-xs font-semibold">Requirements:</span>
          </div>
          <span className="text-sm text-neutral-600 dark:text-neutral-500">
            {data.requirements}
          </span>
        </div>

        {/* ---- */}
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="inline-block">
              <i className="las la-tag text-lg"></i>
            </span>
            <span className="text-xs font-semibold">Description:</span>
          </div>
          <span className="text-sm text-neutral-600 dark:text-neutral-500">
            {data.description &&
              data.description.replace("Show full description", "")}
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
                  <span className="ml-1">{data.company}</span>
                </div>
              }
            />
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-map-marker"></i>
                  <span className="ml-1">{data.location}</span>
                </div>
              }
              color="yellow"
            />
          </div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-2">{data.position}</span>
            </h2>
          </div>
          {renderTienIch()}
          <div className="flex w-full justify-end items-end">
            <a
              href={data.links}
              target="_blank"
              className="flex items-center justify-center px-6 py-2 border-2 border-primary-500 rounded-lg leading-none font-medium text-primary-500 hover:bg-primary-500 hover:text-white transition-colors duration-200"
            >
              Apply
            </a>
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
