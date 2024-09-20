import { getUrl } from "@/lib/actions/urls";
import { notFound, redirect } from "next/navigation";

interface RedirectPageProps {
  params: {
    uuid: string;
  };
}

export default async function RedirectPage({ params }: RedirectPageProps) {
  const { uuid } = params;

  const url = await getUrl(uuid);

  if (!url) {
    return notFound();
  } else if (url) {
    return redirect(url);
  }
}
