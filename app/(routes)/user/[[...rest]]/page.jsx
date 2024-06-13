"use client";
import { UserButton, UserProfile } from "@clerk/nextjs";
import { Building2 } from "lucide-react";
import React from "react";
import UserListing from "../../../_components/UserListing";
const Page = () => {
  return (
    <div className="my-6 md:px-16 lg:px-52">
      <UserProfile>
        <UserButton.UserProfilePage
          label="My Listing"
          labelIcon={<Building2 className="w-4 h-4" />}
          url="my-listing"
        >
          <UserListing />
        </UserButton.UserProfilePage>
      </UserProfile>
    </div>
  );
};

export default Page;
