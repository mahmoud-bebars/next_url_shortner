import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/layout/ModoToggle";
import { Button } from "@/components/ui/button";
import { getCurretUser } from "@/lib/session";
import { ProfileMenu } from "./ProfileMenu";

export const Header = async () => {
  const session = await getCurretUser();

  return (
    <header className="z-10 sticky top-0 backdrop-blur">
      <div className="py-5 px-5">
        <div className=" container">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="SaaS Logo"
                height={30}
                width={30}
                className="relative"
              />
              <h2 className="text-2xl font-semibold">{process.env.TITLE}</h2>
            </Link>

            <div className="flex items-center gap-3">
              {session && session.user ? (
                <>
                  <ProfileMenu
                    image={session.user.image}
                    name={session.user.name}
                  />
                </>
              ) : (
                <Link href="/auth/login">
                  <Button variant="outline">Login</Button>{" "}
                </Link>
              )}{" "}
              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
