"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../../components/ui/button";
const Header = () => {
  const path = usePathname();
  const { isSignedIn } = useUser();
  return (
    <div className="flex p-6 items-center  justify-between shadow-sm fixed top-0 w-full z-10 bg-white">
      <div className="flex gap-12 items-center ">
        <Image src={"/logo.svg"} width={50} height={40} alt="LOGO" />
        <ul className="hidden md:flex gap-4">
          <Link href="/">
            <li
              className={`hover:text-primary cursor-pointer font-medium text-sm ${
                path === "/" && "text-primary"
              }`}
            >
              For Sale
            </li>
          </Link>
          <Link href="/for-rent">
            <li
              className={`hover:text-primary cursor-pointer font-medium text-sm ${
                path === "/for-rent" && "text-primary"
              }`}
            >
              For Rent
            </li>
          </Link>
          <Link href="/agent-finder">
            <li
              className={`hover:text-primary cursor-pointer font-medium text-sm ${
                path === "/agent-finder" && "text-primary"
              }`}
            >
              Agent Finder
            </li>
          </Link>
        </ul>
      </div>

      <div className="flex gap-2">
        <Link href="/add-new-listing">
          <Button className="flex gap-2">
            <Plus /> Post your Ad
          </Button>
        </Link>
        {isSignedIn ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">
            <Button variant="outline">Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
