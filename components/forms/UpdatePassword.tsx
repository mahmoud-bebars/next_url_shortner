"use client";

import { HTMLAttributes, useState, SyntheticEvent } from "react";

import { toast } from "sonner";

import { UserProfile } from "@/common.types";
import { cn } from "@/lib/utils";

import { redirect } from "next/navigation";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LoaderCircle } from "lucide-react";

interface CreatePlaceFormProps extends HTMLAttributes<HTMLDivElement> {
  user: UserProfile;
}

export function UpdatePassword({ className, ...props }: CreatePlaceFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [values, setValues] = useState<{
    id: string;
    currentPassword: string;
    newPassword: string;
  }>({
    id: props.user.id,
    currentPassword: "",
    newPassword: "",
  });

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await fetch("/api/profile/password", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });

      if (!res.ok) {
        toast.error("Faild to Update Password");
        console.log(res);
      }

      if (res.ok) {
        toast.success("Password Updated Successfully");
        setValues({
          id: props.user.id,
          currentPassword: "",
          newPassword: "",
        });
        signOut();
        redirect("/auth/login");
      }
    } catch (error) {
      console.log(error);
      toast.error("Faild to Update Password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className={cn("w-full max-w-xl grid gap-6 pb-10", className)}
      {...props}
    >
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-4">
            <Label className="" htmlFor="currentPassword">
              Current Password
            </Label>

            <Input
              id="currentPassword"
              placeholder="Current Password"
              type="password"
              autoCorrect="off"
              disabled={isLoading}
              value={values.currentPassword}
              required
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
            />

            <Label className="" htmlFor="newPassword">
              New Password
            </Label>

            <Input
              id="newPassword"
              placeholder="New Password"
              type="password"
              autoCorrect="off"
              disabled={isLoading}
              value={values.newPassword}
              required
              onChange={(e) =>
                setValues((prev) => ({ ...prev, newPassword: e.target.value }))
              }
            />

            <Button disabled={isLoading}>
              {isLoading && (
                <LoaderCircle className="mr-2 size-4 animate-spin" />
              )}
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
