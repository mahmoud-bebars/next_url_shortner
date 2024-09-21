"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Trash } from "lucide-react";
import { Url } from "@prisma/client";
import { SyntheticEvent } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteURLDialog({
  url,
  urls,
  setUrls,
}: {
  url: Url;
  urls: Url[];
  setUrls: (urls: Url[]) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const deleteUrl = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`/api/urls/${url.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!res.ok) {
        toast.error("Faild to Delete Url");
        setIsLoading(false);
      }
      if (res.ok) {
        const newUrls = urls.filter((row) => row.id !== url.id);
        setUrls(newUrls);
        toast.success("URL Deleted Successfully");
        setIsLoading(false);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Faild to Delete URL");
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Trash className="size-4" />
          <span className="sr-only">Delete URL</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Are you sure you want to permanently
            delete this url from our servers?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="w-full justify-center gap-2">
          <Button
            onClick={() => setIsOpen(false)}
            type="button"
            className="w-full"
            variant="secondary"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={deleteUrl}
            type="button"
            className="w-full"
            variant="outline"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
