import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }
  return (
    <main className="mx-auto max-w-xl py-12 md:py-24 space-y-6">
      <div className="space-y-2 text-cener">
        <h1 className="text-3xl md:text-4xl font-bold ">URL Shortner</h1>
        <p className="md:text-lg">Shorten your URLs & share Them Easily</p>
      </div>
    </main>
  );
}
