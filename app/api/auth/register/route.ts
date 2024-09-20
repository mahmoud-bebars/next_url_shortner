import {
  createUser,
  userExistEmail,
  userExistPhone,
} from "@/lib/actions/users";
import { NextRequest, NextResponse } from "next/server";

// POST (Register Route)
export const POST = async (request: NextRequest, response: NextResponse) => {
  const { name, phone, email, username, password } = await request.json();

  try {
    // check if user phone || email exist on database
    const existPhone = await userExistPhone(phone);

    if (existPhone) {
      return new Response("User Phone Already Exist", {
        status: 400,
        statusText: "User Phone Already Exist",
      });
    }
    const existEmail = await userExistEmail(email);

    if (existEmail) {
      return new Response("User Email Already Exist", {
        status: 400,
        statusText: "User Email Already Exist",
      });
    }

    // create the user
    await createUser({
      username: username,
      name: name,
      phone: phone,
      email: email,
      password: password,
    });

    return new Response("Account Successffully Created", {
      status: 201,
      statusText: "Your Account Is Created",
    });
  } catch (error) {
    return new Response("Faild to create a New Account", {
      status: 500,
      statusText: "Faild To Create Your Account... Try Again",
    });
  }
};
