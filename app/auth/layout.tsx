import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: `${process.env.TITLE} | Auth`,
  description: "Generated Your Own Menu Easliy",
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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <Toaster closeButton expand={true} />
        </ThemeProvider>
      </body>
    </html>
  );
}
