import { Metadata } from "next";
import Link from "next/link";
import { UserRegsiterForm } from "@/components/authentication/user-register-form";

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/session";
import Image from "next/image";

export const metadata: Metadata = {
  title: `${process.env.TITLE} | Register`,
};

export default async function RegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="container relative  h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute w-full h-full inset-0  bg-cover bg-[url('/assets/images/register.jpg')]" />
        <Link
          href="/"
          className="relative z-20 flex items-center text-lg  gap-3 font-bold"
        >
          <Image width={30} height={30} src="/logo.svg" alt="SaaS Logo" /> Join
          Us
        </Link>
      </div>
      <div className=" py-32 md:py-0 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] px-5">
          <div className="flex flex-col space-y-2 text-center">
            <div className="relative z-20 flex items-center text-lg justify-center font-medium">
              <Image width={80} height={80} src="/logo.svg" alt="SaaS Logo" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Join Us Now
            </h1>
            <p className="text-sm text-muted-foreground">
              Kindly Fill Your Information
            </p>
          </div>
          <UserRegsiterForm />{" "}
          <Link
            href="/auth/login"
            className="px-8 text-center text-sm text-muted-foreground"
          >
            Already User{" "}
            <span className="underline underline-offset-4 hover:text-primary">
              Login
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
