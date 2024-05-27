import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Pdf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <Providers>
        <html lang="en">
          <body>
            <div className="w-screen min-h-screen bg-gradient-to-r from-neutral-300 to-stone-400">
              {children}
            </div>
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
