"use client"
import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";
import { TravelPackageCardType } from "@/data/types";
import StartRating from "@/components/StartRating";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import Badge from "@/shared/Badge";
import { useRouter } from "next/navigation";
import SaleOffBadge from "./SaleOffBadge";

export interface StayCard2Props {
  className?: string;
  data: TravelPackageCardType;
  size?: "default" | "small";
}

const StayCard2: FC<StayCard2Props> = ({
  size = "default",
  className = "",
  data,
}) => {
  const { images, packageName, duration, price, locations, id, saleOff } = data;
  const router = useRouter();

  const handleNavigation = () => {
    router.push(`/travel-package-detail/${id}`); // Navigate to a dynamic route
  };

  const renderSliderGallery = () => {
    return (
      <div className="relative w-full">
        <GallerySlider
          uniqueID={`StayCard2_${id}`}
          ratioClass="aspect-w-12 aspect-h-11"
          galleryImgs={images?.map((image) => image?.asset?.url) || []} // Fallback to empty array
          imageClass="rounded-lg"
          href={`/travel-package-detail/${id}`}
        />
        <BtnLikeIcon isLiked={false} className="absolute right-3 top-3 z-[1]" />
        {saleOff && saleOff.trim() !== "" && (
  <SaleOffBadge className="absolute left-3 top-3" desc={saleOff} />
)}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className={size === "default" ? "mt-3 space-y-3" : "mt-2 space-y-2"}>
        <div className="space-y-2">
          <span className="text-sm text-neutral-500 dark:text-neutral-400">
            Duration: {duration} days
          </span>
          <div className="flex items-center space-x-2">
            <h2
              className={`font-semibold capitalize text-neutral-900 dark:text-white ${
                size === "default" ? "text-base" : "text-base"
              }`}
            >
              <span className="line-clamp-1">{packageName}</span>
            </h2>
          </div>
          <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>
              {locations
                ?.filter((location) => location?.locationName) // Filter out null or undefined locations
                .map((location) => location.locationName)
                .join(", ") || "No locations"}
            </span>
          </div>
        </div>
        <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
        <div className="flex justify-between items-center">
          <span className="text-base font-semibold">
            ${price}
            {size === "default" && (
              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /package
              </span>
            )}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-StayCard2 group relative ${className}`}>
      {renderSliderGallery()}
      {renderContent()}
    </div>
  );
};

export default StayCard2;
