import FileUpload from "@/components/FileUpload";
import { Button } from "@/components/ui/button";

import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const { userId } = auth();
  const isAuthenticated = !!userId;
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center">
          <h1 className="mr-3 text-5xl font-semibold">Chat PDF</h1>
          <UserButton afterSignOutUrl="/" />
        </div>

        <div className="flex mt-2">
          {isAuthenticated && (
            <Link href="/chat">
              <Button>Go to Chats</Button>
            </Link>
          )}
        </div>

        <p className="max-w-xl mt-1 text-lg text-slate-600">
          Joins students, reaserchers and professionals to instantly answer
          questions and understand PDFs with AI
        </p>
        <div className="w-full mt-4">
          {isAuthenticated ? (
            <FileUpload />
          ) : (
            <Link href="/sign-in">
              <Button>
                Login to get Started
                <LogIn className="w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
