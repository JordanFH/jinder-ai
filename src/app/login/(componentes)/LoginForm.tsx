"use client";

import React from "react";
import googleSvg from "@/images/Google.svg";
import Image from "next/image";
import { signIn } from "next-auth/react";

const loginSocials = [
  // {
  //   name: "Continue with Facebook",
  //   href: "#",
  //   icon: facebookSvg,
  // },
  // {
  //   name: "Continue with Twitter",
  //   href: "#",
  //   icon: twitterSvg,
  // },
  {
    name: "Continue with Google",
    click: () =>
      signIn("google", {
        callbackUrl: "/explore",
      }),
    icon: googleSvg,
  },
];

export const LoginForm = () => {
  return (
    <div className={`nc-PageLogin`}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Login
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          {/* SOCIALS */}
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <button
                key={index}
                onClick={item.click}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
