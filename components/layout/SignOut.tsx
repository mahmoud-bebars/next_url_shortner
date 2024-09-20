"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

const SginOutComponent = ({
  icon,
  text,
}: {
  icon?: boolean;
  text?: boolean;
}) => {
  const logOut = () => {
    signOut();
    redirect("/");
  };
  return (
    <Button
      variant={text ? "ghost" : "destructive"}
      size={icon ? "icon" : "default"}
      onClick={logOut}
      className={`${text ? "w-full" : ""}`}
    >
      {icon ? <LogOut className="size-4" /> : "Sgin Out"}
    </Button>
  );
};

export default SginOutComponent;
