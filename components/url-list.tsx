import Link from "next/link";
import { Button } from "./ui/button";
import { CopyIcon, EyeIcon } from "lucide-react";

export default function UrlList() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Recent URLs</h2>

      <ul className="space-y-2">
        <li className="flex items-center gap-2 justify-between">
          <Link
            href="https://mahmoud-bebars.vercel.app"
            target="_blank"
            className="hover:underline text-blue-500 "
          >
            https://mahmoud-bebars.vercel.app
          </Link>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:bg-muted"
            >
              <CopyIcon className="size-4" />
              <span className="sr-only">Copy URL</span>
            </Button>
            <span className="flex items-center gap-2">
              <EyeIcon className="size-4" />
              100 views
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
}
