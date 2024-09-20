import URLShortnerContainer from "@/components/url-shornter-conatiner";

export default function Home() {
  return (
    <main className="mx-auto max-w-xl py-12 md:py-24 space-y-6">
      <div className="space-y-2 text-cener">
        <h1 className="text-3xl md:text-4xl font-bold ">URL Shortner</h1>
        <p className="md:text-lg">Shorten your URLs & share Them Easily</p>
      </div>
      <URLShortnerContainer />
    </main>
  );
}
