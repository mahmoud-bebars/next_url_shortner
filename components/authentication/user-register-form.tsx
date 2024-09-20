"use client";

import { signIn } from "next-auth/react";
import * as React from "react";
import { CreateUser } from "@/common.types";
import { cn } from "@/lib/utils";

import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useRouter } from "next/navigation";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

type UserRegsiterFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserRegsiterForm({
  className,
  ...props
}: UserRegsiterFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [phoneError, setPhoneError] = React.useState<string>("");
  const [emailError, setEmailError] = React.useState<string>("");
  const router = useRouter();
  const [values, setValues] = React.useState<CreateUser>({
    name: "",
    phone: "",
    email: "",
    username: "",
    password: "",
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    if (
      values.email === "" ||
      values.phone === "" ||
      values.password === "" ||
      values.name === "" ||
      values.username === ""
    ) {
      setError("All Feilds Are Required");
    }
    if (
      values.email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      setEmailError("Email is not valid");
    }
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        toast.error("Faild to Create Account");
        setError(res.statusText);
      }
      if (res.ok) {
        setIsLoading(false);
        const logging = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });
        if (logging?.ok) {
          setIsLoading(false);
          router.push("/dashboard");
        } else {
          router.push("/auth/login");
        }
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }

    setTimeout(() => {
      setError("");
    }, 5000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-4">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Mahmoud Bebars"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              value={values.name}
              required
              onChange={(e) =>
                setValues((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <div>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                value={values.email}
                required
                onChange={(e) => {
                  const reg = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
                  console.log(reg.test(e.target.value));
                  if (reg.test(e.target.value)) {
                    setValues((prev) => ({ ...prev, email: e.target.value }));
                    setEmailError("");
                  } else {
                    setEmailError("Email is not valid");
                    setValues((prev) => ({ ...prev, email: e.target.value }));
                  }
                }}
              />{" "}
              <p className="text-xs text-red-700 px-1 pt-0.5 ">{emailError}</p>
            </div>
            <Label className="sr-only" htmlFor="phone">
              Phone
            </Label>
            <div>
              <Input
                id="phone"
                placeholder="ex: 010*******"
                type="tel"
                autoCapitalize="none"
                autoComplete="phone"
                autoCorrect="off"
                disabled={isLoading}
                value={values.phone}
                required
                onChange={(e) => {
                  const reg = new RegExp("^[0-9]+$");
                  if (!reg.test(e.target.value)) {
                    setPhoneError("Phone Must Be Numbers Only");
                  } else {
                    setPhoneError("");
                    setValues((prev) => ({ ...prev, phone: e.target.value }));
                  }
                }}
              />
              <p className="text-xs text-red-700 px-1 pt-0.5 ">{phoneError}</p>
            </div>
            <Label className="sr-only" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="username"
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
              value={values.username}
              required
              onChange={(e) =>
                setValues((prev) => ({ ...prev, username: e.target.value }))
              }
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="*****************"
              type="password"
              autoCapitalize="none"
              autoComplete="passwords"
              autoCorrect="off"
              disabled={isLoading}
              value={values.password}
              required
              onChange={(e) =>
                setValues((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <Button disabled={isLoading}>
              {isLoading && (
                <LoaderCircle className="mr-2 size-4 animate-spin" />
              )}
              Sign Up
            </Button>
          </div>
        </div>
        <div className="mt-3">
          {error !== "" && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </form>
    </div>
  );
}
