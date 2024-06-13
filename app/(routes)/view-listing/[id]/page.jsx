"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../utils/supabase/client";
import { toast } from "sonner";
import Slider from "../../../_components/Slider";
import Details from "../../../_components/Details";
const Page = ({ params }) => {
  const [listing, setListing] = useState(null);
  useEffect(() => {
    params?.id && getListingDetails();
  }, []);
  const getListingDetails = async () => {
    const { data, error } = await supabase
      .from("Listing")
      .select("*,ListingImages(listing_id,url)")
      .eq("id", params?.id);

    if (data) {
      setListing(data[0]);
    }
    if (error) {
      toast("Unable to fetch the data");
    }
  };
  return (
    <div className="px-4 md:px-56 lg:px-64  xl:px-80 my-3">
      <Slider imageList={listing?.ListingImages} />
      <Details />
    </div>
  );
};

export default Page;
