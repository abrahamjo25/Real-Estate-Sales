"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "../../utils/supabase/client";
import { toast } from "sonner";
import MapView from "./MapView";
import "leaflet/dist/leaflet.css";


import { MapPin } from "lucide-react";


const ListingMapView = ({ type }) => {
  const [listing, setListing] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [homeType, sethomeType] = useState(null);

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
    let query = supabase
      .from("Listing")
      .select("*,ListingImages(listing_id,url)")
      .eq("type", type)
      .gte("bedroom", bedCount)
      .gte("bathroom", bathCount)
      .gte("parking", parkingCount)
      .order("id", { ascending: false })
      .like("address", "%" + searchText + "%");
    if (homeType) {
      query = query.eq("propertyType", homeType);
    }
    const { data, error } = await query;
    if (data) {
      setListing(data);
    }
    if (error) {
      toast("Server error");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="overflow-auto p-4">
        <Listing
          listing={listing}
          handleSearch={handleSearch}
          setSelectedPlace={setSelectedPlace}
          setBedCount={setBedCount}
          setBathCount={setBathCount}
          setParkingCount={setParkingCount}
          sethomeType={sethomeType}
        />
      </div>
      <div className="p-4 border rounded-lg flex flex-col gap-3">
        <p className="text-slate-500  flex gap-2 items-center mt-2 mb-2">
          <MapPin className="w-4 h-4" /> Selected places shown on map
        </p>
        <MapView
          selectedPlace={selectedPlace?.properties.formatted}
          coordinates={selectedPlace?.geometry.coordinates}
        />
      </div>
    </div>
  );
};

export default ListingMapView;
