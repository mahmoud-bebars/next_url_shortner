import { updateUserProfile } from "@/lib/actions/users";
import { NextRequest, NextResponse } from "next/server";

// POST (Register Route)
export const PUT = async (request: NextRequest, response: NextResponse) => {
  const { id, name, phone, email, username, image } = await request.json();

  try {
    // update Profile
    const updatedProfile = await updateUserProfile(id, {
      name: name,
      phone: phone,
      email: email,
      username: username,
      image: image,
    });

    console.log(image);

    return new Response(JSON.stringify(updatedProfile), {
      status: 200,
      statusText: "Your Account Is Created",
    });
  } catch (error) {
    console.log(error);
    return new Response("Faild to Update Profile", {
      status: 400,
      statusText: "Faild To Update Profile... Try Again",
    });
  }
};
