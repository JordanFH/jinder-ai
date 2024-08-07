import React, { FC } from "react";
import SectionGridFilterCard from "../SectionGridFilterCard";
import Image from "next/image";
import Link from "next/link";
import { Route } from "next";
import { PostDataType } from "@/data/types";
import Badge from "@/shared/Badge";
import { DEMO_POSTS } from "@/data/posts";

export interface ListingStayPageProps {}

const renderPostRelated = (post: PostDataType) => {
  return (
    <div
      key={post.id}
      className="relative aspect-w-3 aspect-h-4 rounded-3xl overflow-hidden group"
    >
      <Link href={post.href as Route} />
      <Image
        className="object-cover transform group-hover:scale-105 transition-transform duration-300"
        src={post.featuredImage}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        alt=""
      />
      <div>
        <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black"></div>
      </div>
      <div className="flex flex-col justify-end items-start text-xs text-neutral-300 space-y-2.5 p-4">
        <Badge name="Categories" />
        <h2 className="block text-lg font-semibold text-white ">
          <span className="line-clamp-2">{post.title}</span>
        </h2>

        <div className="flex">
          <span className="block text-neutral-200 hover:text-white font-medium truncate">
            {post.author.displayName}
          </span>
          <span className="mx-1.5 font-medium">·</span>
          <span className="font-normal truncate">{post.date}</span>
        </div>
      </div>
      <Link href={post.href as Route} />
    </div>
  );
};

const ListingStayPage: FC<ListingStayPageProps> = () => {
  return (
    <>
      <SectionGridFilterCard className="container py-10 lg:py-12" />
      <div className="py-10 lg:py-12">
        <div className="container ">
          <h2 className="text-3xl font-semibold">Related posts</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {DEMO_POSTS.filter((_, i) => i < 4).map(renderPostRelated)}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingStayPage;
