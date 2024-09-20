import Image from "next/image";
import Link from "next/link";

export const Footer = async () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className=" bottom-0 flex items-start justify-start flex-col w-full gap-10 ">
      <div className=" flex flex-col gap-4  w-full">
        <div className="flex items-start flex-col p-5 space-y-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="logo"
              width={30}
              height={30}
              className="object-contain"
            />
            <p className="uppercase">{process.env.TITLE}</p>
          </Link>
          <p className=" text-xs text-start leading-5  max-w-sm">
            Shorten Your URLs Easily & store thme for later Use OR Share with
            your friends
          </p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center  py-3 bg-black dark:bg-white text-white text-sm gap-3">
        <Link href="/">
          <p className="text-white/60 dark:text-black hover:underline ">
            &copy; {process.env.TITLE} {currentYear}. All rights reserved
          </p>
        </Link>
      </div>
    </footer>
  );
};
