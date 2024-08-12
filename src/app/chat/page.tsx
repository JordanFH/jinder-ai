import React, { FC } from "react";
import { Metadata } from "next";
import { APP_NAME } from "@/constants/app";
import ChatForm from "./(components)/ChatForm";

export interface ChatPageProps {}

export const metadata: Metadata = {
  title: `Chat with Gemini AI - ${APP_NAME}`,
  description: "Chat with Gemini AI page",
};

const ChatPage: FC<ChatPageProps> = ({}) => {
  return <ChatForm />;
};

export default ChatPage;
