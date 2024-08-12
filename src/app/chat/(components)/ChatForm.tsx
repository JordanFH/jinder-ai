"use client";

import CommentListing from "@/components/CommentListing";
import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import gemini_logo from "@/images/Google_Gemini.svg";
import Input from "@/shared/Input";
import ButtonCircle from "@/shared/ButtonCircle";
import { getUserByEmail, updateUserByEmail } from "@/utils/userUtils";
import { useUser } from "@/providers/UserProvider";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/config";
import toast from "react-hot-toast";

export interface ChatPageProps {}

const ChatForm: FC<ChatPageProps> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [message, setMessage] = useState("");

  const user = useUser();

  const sendMessage = async (query: any) => {
    setLoading(true);
    setDisabled(true);
    toast.loading("Sending message...");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
      });

      toast.dismiss();

      if (!response.ok) {
        setLoading(false);
        setDisabled(false);
        toast.error("Failed to send message");
        throw new Error("Failed to send message");
      }

      let { success, result } = await response.json();

      if (!success) {
        setLoading(false);
        setDisabled(false);
        toast.error("Failed to send message");
        throw new Error("Failed to send message");
      }

      const filteredChatHistory = result.chatHistory.map((item: any) => {
        const searchText = "The user wants to tell you: ";
        const index = item.text.indexOf(searchText);

        // Si el texto existe en la cadena, extraer todo después de este
        const newText =
          index !== -1
            ? item.text.substring(index + searchText.length)
            : item.text;

        // Devolver el objeto modificado
        return {
          ...item,
          text: newText,
        };
      });

      localStorage.setItem("chatHistory", JSON.stringify(filteredChatHistory));
      handleUpdateInfo(filteredChatHistory);
      // setChatHistory(filteredChatHistory);
      setMessage("");
      setLoading(false);
      setDisabled(false);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateInfo = (data: any) => {
    const updatedUser = {
      ...userData,
      preferences: {
        ...userData.preferences,
        chat_history: data,
      },
    };

    updateUserByEmail(userData.email, updatedUser)
      .then(() => {
        setLoading(false);
        setDisabled(false);
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
        setLoading(false);
        setDisabled(false);
      });
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();

    const data = {
      userData: userData.userData,
      chat: {
        chatHistory: chatHistory.length > 0 ? chatHistory : null,
        message,
      },
    };

    if (message) {
      sendMessage({ data });
    }
  };

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
              localStorage.setItem(
                "chatHistory",
                JSON.stringify(data.preferences.chat_history)
              );
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

  useEffect(() => {
    const cachedChats = localStorage.getItem("chatHistory");
    if (cachedChats) {
      setChatHistory(JSON.parse(cachedChats));
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
          {chatHistory?.map((data: any, index: number) => (
            <CommentListing
              key={index}
              message={data.text}
              isGemini={data.role === "model" ? true : false}
              className="pb-8"
            />
          ))}
          <form
            className={`relative ${chatHistory?.length > 0 ? "mt-10" : ""}`}
          >
            <Input
              placeholder="Send message"
              type="email"
              rounded="rounded-full"
              sizeClass="h-12 px-5 py-3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <ButtonCircle
              type="submit"
              className="absolute transform top-1/2 -translate-y-1/2 right-1.5"
              size="w-10 h-10"
              onClick={handleSendMessage}
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

export default ChatForm;
