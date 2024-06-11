"use client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
const Header = () => {
  const path = usePathname();
  return (
    <div className="flex p-6 items-center  justify-between shadow-sm fixed top-0 w-full z-10">
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
        <Button className="flex gap-2">
          <Plus /> Post your Ad
        </Button>
        <Button variant="outline">Login</Button>
      </div>
    </div>
  );
};

export default Header;
