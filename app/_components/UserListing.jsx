"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase/client";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Bath, BedDouble, Edit, Eye, MapPin, Ruler, Trash } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";

const UserListing = () => {
  const [listing, setListing] = useState(null);
  useEffect(() => {
    getMyListing();
  }, []);
  const { user } = useUser();
  const getMyListing = async () => {
    const { data, error } = await supabase
      .from("Listing")
      .select("*,ListingImages(listing_id,url)")
      .eq("createdBy", user?.primaryEmailAddress?.emailAddress)
      .order("id", { ascending: false });
    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Server error");
    }
  };
  const deletePost = async (id) => {
    await supabase
      .from("ListingImages")
      .delete()
      .eq("listing_id", id)
      .then(() => {
        supabase
          .from("Listing")
          .delete()
          .eq("id", id)
          .then(() => {
            toast("Deleted Successfully");
            getMyListing();
          })
          .catch((error) => {
            toast("Oops.. Unable to delete", error);
          });
      })
      .catch((error) => {
        toast("Oops.. Unable to delete", error);
      });
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4 mt-2">
      {listing?.length > 0
        ? listing?.map((list, index) => (
            <div>
              <div
                className="p-3 hover:border hover:border-primary cursor-pointer rounded-lg"
                key={index}
              >
                <Image
                  src={list?.ListingImages[0]?.url}
                  width={600}
                  height={200}
                  alt={index}
                  className="rounded-lg object-cover h-[170px]"
                />
                <div className="flex gap-2 mt-2 flex-col">
                  <h2 className="font-bold text-xl">${list?.price}</h2>
                  <h2 className="flex gap-2 text-slate-500 items-center mt-2">
                    <MapPin className="h-4 w-4" />
                    {list?.address}
                  </h2>

                  <div className="flex gap-2 mt-2 justify-between">
                    <div className="flex gap-2 w-full bg-slate-200 rounded-md text-gray-500 justify-center items-center">
                      <BedDouble className="h-4 w-4" />
                      {list?.bedroom}
                    </div>
                    <div className="flex gap-2 w-full bg-slate-200 rounded-md text-gray-500 justify-center items-center">
                      <Bath className="h-4 w-4" />
                      {list?.bathroom}
                    </div>
                    <div className="flex gap-2 w-full bg-slate-200 rounded-md text-gray-500 justify-center items-center">
                      <Ruler className="h-4 w-4" />
                      {list?.area} sq
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 items-center justify-center">
                <Link href={"/view-listing/" + list?.id}>
                  <Button variant="outline" className="flex gap-2 items-center">
                    <Eye />
                  </Button>
                </Link>
                <Link href={"/edit-listing/" + list?.id}>
                  <Button className="flex gap-2 items-center">
                    <Edit />
                  </Button>
                </Link>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="destructive"
                      className="flex gap-2 items-center"
                      //   onClick={() => deletePost(list?.id)}
                    >
                      <Trash />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deletePost(list?.id)}>
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))
        : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
            <div
              key={index}
              className="w-full h-[230px]  bg-slate-200 animate-pulse rounded-lg"
            ></div>
          ))}
    </div>
  );
};

export default UserListing;
