import { getServerSession } from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { SessionInterface } from "@/common.types";
import {
  getUserEmailCreditials,
  getUserSession,
  updateUserImage,
} from "./actions/users";
import { comparePassword } from "./utils";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "user Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
      ) {
        if (!credentials) {
          return null;
        }

        const user = await getUserEmailCreditials(credentials.email);
        if (user) {
          const authenticate = comparePassword(
            credentials.password,
            user.password,
          );
          if (!authenticate) {
            return null; // Return null instead of false
          }
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  jwt: {
    encode: ({ secret, token }) => {
      const encodedToken = jsonwebtoken.sign(
        {
          ...token,
          iss: "jwt",
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
        },
        secret,
      );
      return encodedToken;
    },
    decode: async ({ secret, token }) => {
      const decodedToken = jsonwebtoken.verify(token!, secret) as JWT;
      return decodedToken;
    },
  },
  callbacks: {
    async session({ session }) {
      const email = session?.user?.email as string;

      try {
        const data = (await getUserSession(email)) || null;
        if (data) {
          if (session.user) {
            await updateUserImage(data.id, session?.user?.image);
          }

          const newSession = {
            ...session,
            user: {
              ...session.user,
              ...data,
            },
          };
          return newSession;
        }
        return session;
      } catch (error) {
        console.log(error);
        return session;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export async function getCurretUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  if (!session) {
    return null;
  }

  return session;
}
