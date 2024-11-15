"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { constants } from "../utils/constants";
import { UserButton } from "@clerk/nextjs";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  return (
    <div className="w-full h-screen overflow-scroll p-4 text-gray-200 bg-gray-900">
      <Link href="/">
        <Button
          className="w-full bg-teal-600 hover:bg-teal-400 font-ubuntu text-lg"
          variant={"outline"}
          disabled={chats?.length >= constants?.maxFreeChats}
        >
          <PlusCircle className="mr-2 w-6 h-6" />
          {"NEW CHAT"}
        </Button>
      </Link>
      <div className="flex  overflow-scroll pb-20 flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-teal-800 text-white": chat.id === chatId,
                "hover:text-white": chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="flex flex-col  text-sm gap-2 text-slate-500 ">
          <div>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="flex items-center justify-center gap-6">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <Link className="hover:text-white" href={constants?.githubLink}>
              Source
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
