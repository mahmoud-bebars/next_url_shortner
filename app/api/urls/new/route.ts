import { createUrl } from "@/lib/actions/urls";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    const createdUrl = await createUrl(userId, body);

    return new Response(JSON.stringify(createdUrl), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
