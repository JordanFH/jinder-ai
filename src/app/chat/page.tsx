"use client";

import CommentListing from "@/components/CommentListing";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import gemini_logo from "@/images/Google_Gemini.svg";
import Input from "@/shared/Input";
import ButtonCircle from "@/shared/ButtonCircle";
import { getUserByEmail } from "@/utils/userUtils";
import { useUser } from "@/providers/UserProvider";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";

export interface ChatPageProps {}

const ChatPage: FC<ChatPageProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState([]);

  const user = useUser();

  useEffect(() => {
    if (!userData) {
      setLoading(true);
      setDisabled(true);

      getUserByEmail(user.email)
        .then((user) => {
          if (user) {
            setUserData(user);
          }
        })
        .finally(() => {
          setLoading(false);
          setDisabled(false);
        });
    }
  }, [user, userData]);

  useEffect(() => {
    if (userData) {
      const unsubscribe = onSnapshot(
        doc(db, "users", userData.id),
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            if (data.preferences && data.preferences.chat_history) {
              setChatHistory(data.preferences.chat_history);
            }
          }
        },
        (error) => {
          console.error("Error fetching chat history:", error);
        }
      );

      return () => unsubscribe();
    }
  }, [userData]);

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
        <Image src={gemini_logo} alt="Gemini" height={50} />

        {/* ---- */}
        <p className="text-neutral-500 dark:text-neutral-400">
          The content is generated by Gemini AI. The content is generated based
          on the user's preferences and interests.
        </p>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Gemini AI Chat</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing message="Hola" isGemini={false} className="pb-8" />
          <CommentListing message="como estas" className="pb-8" />
          <form className="mt-10 relative">
            <Input
              placeholder="Send message"
              type="email"
              rounded="rounded-full"
              sizeClass="h-12 px-5 py-3"
            />
            <ButtonCircle
              type="submit"
              className="absolute transform top-1/2 -translate-y-1/2 right-1.5"
              size="w-10 h-10"
            >
              <i className="las la-arrow-right text-xl"></i>
            </ButtonCircle>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-ChatPage `}>
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="w-full space-y-8 lg:space-y-10 flex-shrink-0">
          {renderSection1()}
          {renderSection2()}
        </div>
      </main>
    </div>
  );
};

export default ChatPage;
