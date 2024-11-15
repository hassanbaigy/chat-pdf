import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { constants } from "@/utils/constants";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { MessageSquareMore, LogIn } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {
  const { userId } = auth();
  const isAuthenticated = !!userId;
  let firstChat, isLimitReached;

  if (!!userId) {
    firstChat = await db?.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      isLimitReached = firstChat?.length >= constants.maxFreeChats;
      firstChat = firstChat[0];
    }
  }
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center text-center justify-center">
        <div className="flex justify-center items-center mb-4">
          <h1 className="mr-3 text-6xl font-sanista font-extrabold italic text-teal-300">
            Chat PDF
          </h1>
          <div className="pt-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
        <div className="w-full mt-4">
          {isAuthenticated ? (
            <FileUpload isLimitReached={!!isLimitReached} />
          ) : (
            <Link href="/sign-in">
              <Button className="font-ubuntu bg-teal-600 hover:bg-teal-500">
                Login to get Started
                <LogIn className="w-4" />
              </Button>
            </Link>
          )}
        </div>
        <p className="max-w-xl font-ubuntu text-lg text-slate-300 mt-2">
          Joins students, reaserchers and professionals to instantly answer
          questions and understand PDFs with AI
        </p>
        <div className="flex mt-2">
          {isAuthenticated && (
            <Link href={`/chat/${firstChat?.id}`}>
              <Button className="font-extrabold font-ubuntu text-xl flex justify-center bg-teal-600 hover:bg-teal400 text-white items-center py-8 ">
                MY CHATS <MessageSquareMore size="20" className="ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
