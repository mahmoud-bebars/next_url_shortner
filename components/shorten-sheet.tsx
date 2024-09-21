"use client";
import { SyntheticEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Url } from "@prisma/client";
import { LoaderCircleIcon, Pencil, Plus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
export default function ShortnenSheet({
  url,
  urls,
  setUrls,
}: {
  url: Url | null;
  urls: Url[];
  setUrls: (urls: Url[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [values, setValues] = useState<Url>({
    id: url?.id || "",
    title: url?.title || "",
    isActive: url?.isActive || true,
    views: url?.views || 0,
    description: url?.description || "",
    uuid: url?.uuid || "",
    originalUrl: url?.originalUrl || "",
    userId: url?.userId || "",
    createdAt: url?.createdAt || new Date(),
    updatedAt: url?.updatedAt || new Date(),
  });

  const handleAction = async (e: SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const urlValidated = urlValidator(values.originalUrl);

    if (!urlValidated) {
      toast.error("Invalid URL Format");
      setIsLoading(false);
    } else if (url) {
      try {
        const res = await fetch(`/api/urls/${url.id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            originalUrl: values.originalUrl,
          }),
        });

        if (!res.ok) {
          toast.error("Faild to Update URL");
        }
        if (res.ok) {
          const newUrls = urls.map((row) =>
            row.id === url?.id
              ? {
                  ...row,
                  ...values,
                }
              : row,
          );

          setUrls(newUrls);
          setIsLoading(false);
          setIsOpen(false);

          toast.success("URL Updated Successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Faild to Update URL");
        // send sonnner with error alert
      }
    } else {
      try {
        const res = await fetch(`/api/urls/new`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            originalUrl: values.originalUrl,
          }),
        });

        if (!res.ok) {
          toast.error("Faild to Create URL");
        }
        if (res.ok) {
          setIsLoading(false);
          const body = await res.json();

          setUrls([body, ...urls]);
          setIsOpen(false);

          toast.success("URL Created Successfully");
        }
      } catch (error) {
        console.log(error);
        toast.error("Faild to Create URL");
        setIsLoading(false);
        // send sonnner with error alert
      }
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button onClick={() => setIsOpen(!open)} variant="outline" size="icon">
          {url ? <Pencil className="size-5" /> : <Plus className="size-5" />}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{url ? "Edit URL" : "Add New URL"}</SheetTitle>
          <SheetDescription>
            {url
              ? " Make changes to the URL here. Click save when you are done."
              : "Add a new URL to your account."}
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              type="text"
              value={values.title}
              placeholder="URL title"
              className="col-span-3"
              required
              onChange={(e) => setValues({ ...values, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              URL
            </Label>
            <Input
              id="url"
              type="url"
              value={values.originalUrl}
              placeholder="url to be shortened"
              className="col-span-3"
              required
              onChange={(e) =>
                setValues({ ...values, originalUrl: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={values.description}
              placeholder="what is this url for"
              className="col-span-3"
              required
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={handleAction}
              disabled={isLoading}
              type="button"
              className="flex gap-2"
            >
              {isLoading && (
                <LoaderCircleIcon className="size-5 animate-spin" />
              )}

              {url ? "Save Chnages" : "Add URL"}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

const urlValidator = (url: string) => {
  const urlRegex = /^(ftp|https?):\/\/[^ "]+$/;
  const isUrlValid = urlRegex.test(url);

  if (!isUrlValid) {
    return false;
  }
  return true;
};
