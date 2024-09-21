"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { EyeIcon, Link2, Trash } from "lucide-react";
import { Url } from "@prisma/client";
import { SyntheticEvent, useState } from "react";
import ShortnenSheet from "./shorten-sheet";
import { toast } from "sonner";
import QrDialog from "./qr-dialog";
import { Switch } from "./ui/switch";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "./ui/card";
export default function UrlList({
  limit,
  data,
}: {
  limit: number;
  data: Url[];
}) {
  const [urls, setUrls] = useState<Url[]>(data);

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <div className="w-full flex items-center gap-3 justify-between">
          <h2 className="text-2xl font-bold mb-2">My URLs</h2>{" "}
          {limit === urls.length ? (
            <Badge variant="destructive">{limit} Limit Reached</Badge>
          ) : (
            <div className="flex items-center gap-2">
              <Badge>
                {urls.length} / {limit} urls
              </Badge>
              <ShortnenSheet url={null} urls={urls} setUrls={setUrls} />
            </div>
          )}
        </div>
      </CardHeader>
      <Separator className="mb-2" />
      <CardContent>
        <ul className="w-full space-y-2">
          {urls.map((url) => (
            <UrlRow key={url.id} url={url} urls={urls} setUrls={setUrls} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

const UrlRow = ({
  url,
  urls,
  setUrls,
}: {
  url: Url;
  urls: Url[];
  setUrls: (urls: Url[]) => void;
}) => {
  const toggleActiveURL = async () => {
    try {
      const res = await fetch(`/api/urls/${url.id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          isActive: !url.isActive,
        }),
      });

      if (!res.ok) {
        toast.error("Faild to Activate URL");
      }
      if (res.ok) {
        const newUrls = urls.map((row) =>
          row.id === url.id
            ? {
                ...row,
                isActive: !url.isActive,
              }
            : row,
        );

        setUrls(newUrls);
        toast.success("Url Activated Successfully");
        return !url.isActive;
      }
    } catch (error) {
      console.log(error);
      toast.error("Faild to Update Url");
      // send sonnner with error alert
    }
  };

  const deleteUrl = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/urls/${url.id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });

      if (!res.ok) {
        toast.error("Faild to Delete Url");
      }
      if (res.ok) {
        const newUrls = urls.filter((row) => row.id !== url.id);
        setUrls(newUrls);
        toast.success("Branch Deleted Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Faild to Delete URL");
      // send sonnner with error alert
    }
  };

  return (
    <li
      key={url.id}
      className="w-full flex items-center gap-2 justify-between border rounded-lg px-2 py-2"
    >
      {" "}
      <Switch
        id="activation"
        checked={url.isActive}
        onCheckedChange={() => toggleActiveURL()}
      />
      <div className="flex flex-col items-center justify-center gap-1">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/${url.uuid}`}
                target="_blank"
                className="hover:underline capitalize text-blue-500 flex items-center gap-2"
              >
                <Link2 className="size-4" /> {url.title}
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>{url.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className="text-xs font-mono font-thin">{url.originalUrl}</p>
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 text-center ">
        <div className="flex items-center gap-2">
          <QrDialog uuid={url.uuid} />
          <ShortnenSheet url={url} urls={urls} setUrls={setUrls} />
          <Button variant="destructive" size="icon" onClick={deleteUrl}>
            <Trash className="size-4" />
            <span className="sr-only">Delete URL</span>
          </Button>
        </div>
        <span className="text-xs flex items-center gap-2">
          <EyeIcon className="size-4" />
          {url.views} view{url.views > 1 ? "s" : ""}
        </span>
      </div>
    </li>
  );
};
