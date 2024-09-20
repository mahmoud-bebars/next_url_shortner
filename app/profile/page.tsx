import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/session";

import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "@/common.types";
import { fetchUserProfile } from "@/lib/actions/users";
import { UpdateProfile } from "@/components/forms/UpdateProfile";
import { UpdatePassword } from "@/components/forms/UpdatePassword";

export const metadata: Metadata = {
  title: `${process.env.TITLE} | Profile`,
};

export default async function Profile() {
  const session = await getServerSession(authOptions);
  let userProfile: UserProfile | null = null;

  if (!session) {
    redirect("/auth/login");
  }

  if (session && session.user) {
    userProfile = (await fetchUserProfile(
      session.user.id,
    )) as UserProfile | null;
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
            <h2 className="mb-3 text-2xl font-semibold">Manage your Profile</h2>
            <p className="m-0  text-sm opacity-50">
              update your profile & make sure to not miss any needed information
            </p>
          </div>
        </div>
        {userProfile && (
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when
                    you&apos;re done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <UpdateProfile user={userProfile} />
                </CardContent>
                <CardFooter>
                  <div className="w-full">
                    <p className="text-xs text-center font-mono font-normal tracking-tight opacity-50">
                      Last Update from {moment(userProfile.updatedAt).fromNow()}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Change your password here. After saving, you&apos;ll be
                    logged out.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <UpdatePassword user={userProfile} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </main>
  );
}
