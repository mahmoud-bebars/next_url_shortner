import { deleteUrl, updateUrl } from "@/lib/actions/urls";
import { NextRequest } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();

    const updatedUrl = await updateUrl(params.id, body);

    return new Response(JSON.stringify(updatedUrl), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const deletedUrl = await deleteUrl(params.id);

    return new Response(JSON.stringify(deletedUrl), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
