import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { Inter as FontSans } from "next/font/google";

import { ThemeProvider } from "@/components/layout/theme-provider";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: `${process.env.TITLE} | Auth`,
  description:
    "Shorten Your URLs Easily & store thme for later Use OR Share with your friends",
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
          <Header />
          {children}

          <Toaster closeButton expand={true} />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
