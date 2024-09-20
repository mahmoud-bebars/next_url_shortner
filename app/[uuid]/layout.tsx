import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `Redirecting...`,
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
