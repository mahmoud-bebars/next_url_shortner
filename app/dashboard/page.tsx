import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/session";

import { Url } from "@prisma/client";
import { listUserUrls } from "@/lib/actions/urls";
import UrlList from "@/components/url-list";

export const metadata: Metadata = {
  title: `${process.env.TITLE} | Dashboard`,
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  let urls = [] as Url[];

  if (!session) {
    redirect("/auth/login");
  }

  if (session && session.user) {
    urls = (await listUserUrls(session.user.id)) as Url[];
  }
  return (
    <main className="flex min-h-screen min-w-screen flex-col items-center justify-between">
      <div className="w-full flex flex-col justify-center items-center space-y-10">
        <div className="z-10 flex flex-col w-full max-w-5xl items-center gap-2 justify-between font-mono text-sm lg:flex-row text-center lg:text-start">
          <div>
            <p className="mb-1 text-sm font-thin">
              {" "}
              Welcome back {session.user?.name}
            </p>
            <h2 className="mb-3 text-2xl font-semibold">Manage your URLs</h2>
            <p className="m-0  text-sm opacity-50">
              shorten new url or edit your currents ones
            </p>
          </div>
        </div>
        <UrlList limit={session?.user?.urlsLimit || 0} data={urls} />{" "}
      </div>
    </main>
  );
}
