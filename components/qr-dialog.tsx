"use client";
import { useQRCode } from "next-qrcode";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useEffect, useRef, useState } from "react";
import { Check, LoaderCircle, QrCode } from "lucide-react";
const options = {
  allowTaint: true,
  useCORS: true,
  backgroundColor: "rgba(0,0,0,0)",
  removeContainer: true,
};
export default function QrDialog({ uuid }: { uuid: string }) {
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
  const link = `${origin}/${uuid}`;
  const { Canvas } = useQRCode();
  const downloadRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const prepareURL = async () => {
    const cardElement = downloadRef.current;
    setIsLoading(true);
    if (!cardElement) return;

    try {
      // lazy load this package
      const html2canvas = await import(
        /* webpackPrefetch: true */ "html2canvas"
      );

      const result = await html2canvas.default(cardElement, options);

      const asURL = result.toDataURL("image/jpeg");
      // as far as I know this is a quick and dirty solution
      const anchor = document.createElement("a");
      anchor.href = asURL;
      anchor.download = "your-card.jpeg";
      anchor.click();
      anchor.remove();
      setIsLoading(false);
    } catch (reason) {
      console.log(reason);
    }
  };

  const copyLink = () => {
    setCopied(true);
    navigator.clipboard.writeText(link);
  };
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <QrCode className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription>
            Download Your QR Code & Use it To Redirect People to the Url
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center space-x-2">
          <div ref={downloadRef}>
            <Canvas
              text={link}
              options={{
                errorCorrectionLevel: "M",
                margin: 2,
                scale: 5,
                width: 400,
              }}
            />
          </div>
        </div>
        <DialogFooter className="w-full justify-center gap-2">
          <Button
            onClick={prepareURL}
            type="button"
            className="w-full"
            variant="outline"
            disabled={isLoading}
          >
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Download"
            )}
          </Button>
          <Button
            onClick={copyLink}
            type="button"
            className="w-full"
            variant="secondary"
            disabled={copied}
          >
            {copied ? (
              <div className="flex items-center gap-2">
                <Check className="size-4" />
                Copied
              </div>
            ) : (
              "Copy Link"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
