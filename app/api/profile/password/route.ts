import { getUser, updateUserPassword } from "@/lib/actions/users";
import { comparePassword } from "@/lib/utils";
import { NextRequest } from "next/server";

// POST (Register Route)
export const PUT = async (request: NextRequest) => {
  const { id, currentPassword, newPassword } = await request.json();

  try {
    const user = await getUser(id);

    if (!user) {
      return new Response("User Not Found", {
        status: 400,
        statusText: "User Not Found",
      });
    }

    const authenticate = comparePassword(currentPassword, user.password);
    if (!authenticate) {
      return new Response("Wrong Password", {
        status: 400,
        statusText: "Wrong Password",
      });
    }
    // update Profile
    const updatedPassword = await updateUserPassword(id, newPassword);

    return new Response(JSON.stringify(updatedPassword), {
      status: 200,
      statusText: "Your Password Is Updated",
    });
  } catch (error) {
    console.log(error);
    return new Response("Faild to Update Password", {
      status: 400,
      statusText: "Faild To Update Password... Try Again",
    });
  }
};
