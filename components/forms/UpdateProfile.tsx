"use client";

import { HTMLAttributes, useState, SyntheticEvent, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";

import { UserProfile } from "@/common.types";
import { cn } from "@/lib/utils";

import Compress from "react-image-file-resizer";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";

interface CreatePlaceFormProps extends HTMLAttributes<HTMLDivElement> {
  user: UserProfile;
}

export function UpdateProfile({ className, ...props }: CreatePlaceFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [values, setValues] = useState<UserProfile>({
    id: "",
    image: "",
    name: "",
    phone: "",
    email: "",
    username: "",
    createdAt: "",
    updatedAt: "",
  });

  useEffect(() => {
    setValues({
      id: props.user.id,
      image: props.user.image,
      name: props.user.name,
      phone: props.user.phone,
      email: props.user.email,
      username: props.user.username,
      createdAt: props.user.createdAt,
      updatedAt: props.user.updatedAt,
    });
  }, [props.user]);

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    try {
      setIsLoading(true);
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ ...values }),
      });

      if (!res.ok) {
        toast.error("Faild to Update Profile");
      }

      if (res.ok) {
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Faild to Update Profile");
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
          <Label className="" htmlFor="name">
            Avatar
          </Label>
          <MediaForm values={values} setValues={setValues} />
          <div className="grid gap-4">
            <Label className="" htmlFor="name">
              Name
            </Label>

            <Input
              placeholder="Name"
              type="text"
              autoCorrect="off"
              disabled={isLoading}
              value={values.name}
              required
              onChange={(e) =>
                setValues((prev) => ({ ...prev, name: e.target.value }))
              }
            />

            <Label className="" htmlFor="phone">
              Phone
            </Label>

            <Input
              id="phone"
              placeholder="Phone"
              type="tel"
              autoCorrect="off"
              disabled={isLoading}
              value={values.phone}
              required
              onChange={(e) =>
                setValues((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
            <Label className="" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCorrect="off"
              disabled={isLoading}
              value={values.email}
              required
              onChange={(e) =>
                setValues((prev) => ({ ...prev, email: e.target.value }))
              }
            />

            <Label className="" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              type="text"
              autoCorrect="off"
              disabled={isLoading}
              value={values.username}
              required
              onChange={(e) => {
                const value = e.target.value;
                setValues({ ...values, username: value.replace(/\s/g, "-") });
              }}
            />

            <Button disabled={isLoading}>
              {isLoading && (
                <LoaderCircle className="mr-2 size-4 animate-spin" />
              )}
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

const MediaForm = ({
  values,
  setValues,
}: {
  values: UserProfile;
  setValues: (value: UserProfile) => void;
}) => {
  const handleFileChange = (files: FileList | null, type: string) => {
    if (!files) {
      return null;
    } else {
      Compress.imageFileResizer(
        files[0],
        200,
        200,
        "WEBP",
        80,
        0,
        (uri) => {
          setValues({ ...values, [type]: uri });
        },
        "base64", // blob or base64 default base64
      );
    }
  };
  return (
    <div className="border-b border-gray-900/10 py-5 z-0">
      <div className="w-full flex items-center justify-center gap-2 py-10">
        <div>
          <div className="flex items-center gap-2  justify-center relative">
            <label
              htmlFor="image"
              className="flex items-center bg-white rounded-full justify-center z-10 text-center w-24 h-24 p-10 text-gray-900 border-2 border-gray-300 border-dashed"
            >
              {!values.image && "choose Image"}
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="absolute z-30 w-full opacity-0 h-full cursor-pointer"
              onChange={(e) => handleFileChange(e.target.files, "image")}
            />
            {values.image && (
              <Image
                src={values.image}
                className="relative w-32 h-32   border-4 object-contain z-20 rounded-full"
                fill
                alt="place-logo"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
