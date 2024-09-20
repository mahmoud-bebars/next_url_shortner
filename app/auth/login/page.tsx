import { Metadata } from "next";
import Link from "next/link";
import { UserAuthForm } from "@/components/authentication/user-auth-form";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/session";
import Image from "next/image";

export const metadata: Metadata = {
  title: `${process.env.TITLE} | Login`,
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="container relative  h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:block">
        <div className="absolute w-full h-full inset-0  bg-cover bg-[url('/assets/images/login.jpg')]" />
        <Link
          href="/"
          className="relative z-20 flex items-center text-lg  gap-3 font-bold"
        >
          <Image width={30} height={30} src="/logo.svg" alt="SaaS Logo" /> Login
        </Link>
      </div>
      <div className=" py-32 md:py-0 lg:p-8 px-5">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] ">
          <div className="flex flex-col space-y-2 text-center">
            <div className="relative z-20 flex items-center text-lg justify-center font-medium">
              <Image width={80} height={80} src="/logo.svg" alt="SaaS Logo" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email & password below to Log In
            </p>
          </div>
          <UserAuthForm />
          <Link
            href="/auth/register"
            className="px-8 text-center text-sm text-muted-foreground"
          >
            Not a User Yet{" "}
            <span className="underline underline-offset-4 hover:text-primary">
              Join Us
            </span>
          </Link>{" "}
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
