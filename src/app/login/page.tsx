"use client";

import React, { FC } from "react";
import { Metadata } from "next";
import { APP_NAME } from "@/constants/app";
import { LoginForm } from "./(componentes)/LoginForm";

export interface PageLoginProps {}

export const metadata: Metadata = {
  title: `Login - ${APP_NAME}`,
  description: "Login page",
};

const PageLogin: FC<PageLoginProps> = ({}) => {
  return (
    <LoginForm />
  );
};

export default PageLogin;
