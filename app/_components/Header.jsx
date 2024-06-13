"use client";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { toast } from "sonner";

const Header = () => {
  const path = usePathname();
  const { user, isSignedIn } = useUser();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      toast("Error signing out:", error);
    }
  };
  return (
    <div className="flex p-6 items-center  justify-between shadow-sm fixed top-0 w-full z-10 bg-white ml-10 mr-10">
      <div className="flex gap-12 items-center ">
        <div className="flex gap-2 items-center">
          <Image src={"/logo.svg"} width={50} height={40} alt="LOGO" />
          <h2
            className="font-bold hidden md:flex "
            style={{ color: "#007AFF" }}
          >
            JUMBORO
          </h2>
        </div>
        <ul className="hidden md:flex gap-4">
          <Link href="/">
            <li
              className={`hover:text-primary cursor-pointer font-medium text-sm ${
                path === "/" && "text-primary"
              }`}
            >
              For Sell
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

      <div className="flex gap-2 mr-3">
        {isSignedIn ? (
          <div className="">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={user?.imageUrl}
                  width={35}
                  height={35}
                  alt="User Profile"
                  className="rounded-full w-full"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/user">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button variant="outline">Login</Button>
          </Link>
        )}
        <Link href="/add-new-listing">
          <Button className="flex gap-2">
            <Plus /> Post your Ad
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
