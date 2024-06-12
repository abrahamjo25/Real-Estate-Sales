"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "../../utils/supabase/client";
import { toast } from "sonner";
const ListingMapView = ({ type }) => {
  const [listing, setListing] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  useEffect(() => {
    getLatestListing();
  }, []);
  const getLatestListing = async () => {
    const { data, error } = await supabase
      .from("Listing")
      .select("*,ListingImages(listing_id,url)")
      .eq("type", type)
      .order("id", { ascending: false });
    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Server error");
    }
  };
  const handleSearch = async () => {
    const searchText = selectedPlace?.properties.formatted;
    const { data, error } = await supabase
      .from("Listing")
      .select("*,ListingImages(listing_id,url)")
      .eq("type", type)
      .order("id", { ascending: false })
      .like("address", "%" + searchText + "%");

    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Server error");
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="">
        <Listing
          listing={listing}
          handleSearch={handleSearch}
          setSelectedPlace={setSelectedPlace}
        />
      </div>
      <div className="">Map</div>
    </div>
  );
};

export default ListingMapView;
