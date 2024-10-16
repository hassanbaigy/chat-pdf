import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import { neobrutalism } from "@clerk/themes";

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
    <ClerkProvider
      appearance={{
        baseTheme: [neobrutalism],
        variables: { colorPrimary: "black" },
        elements: {
          userButtonAvatarBox: "w-14 h-14", // Custom width and height
          userButtonPopoverCard: "bg-blue-100", // Custom background for the popover card
          userButtonPopoverActionButton: "text-teal-500", // Custom text color for action buttons
        },
        signIn: {
          baseTheme: [neobrutalism],
          variables: { colorPrimary: "blue" },
        },
      }}
    >
      <Providers>
        <html lang="en">
          <body>
            <div className="lines">
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <div className="w-screen min-h-screen ">{children}</div>
            <Toaster />
          </body>
        </html>
      </Providers>
    </ClerkProvider>
  );
}
