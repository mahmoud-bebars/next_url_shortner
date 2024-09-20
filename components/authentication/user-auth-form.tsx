"use client";

import { signIn } from "next-auth/react";
import * as React from "react";
import { Credentials } from "@/common.types";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useRouter } from "next/navigation";

import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<boolean>(false);

  const router = useRouter();
  const [values, setValues] = React.useState<Credentials>({
    email: "",
    password: "",
  });

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    if (values.email === "" || values.password === "") {
      setError(true);
    }
    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid Creditials");
      }
      if (res?.ok) {
        setIsLoading(false);
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
      setError(true);
      setIsLoading(false);
      setValues({
        email: "",
        password: "",
      });
    } finally {
      setValues({
        email: "",
        password: "",
      });
      setIsLoading(false);
    }

    /*    setTimeout(() => {
      setError(false);
    }, 3000); */
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-4">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={values.email}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, email: e.target.value }))
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
              onChange={(e) =>
                setValues((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            <Button disabled={isLoading}>
              {isLoading && (
                <LoaderCircle className="mr-2 size-4 animate-spin" />
              )}
              Sign In with Email
            </Button>
          </div>
        </div>
        <div className="mt-3">
          {error && (
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>Wrong Ceredtials</AlertDescription>
            </Alert>
          )}
        </div>
      </form>
    </div>
  );
}
