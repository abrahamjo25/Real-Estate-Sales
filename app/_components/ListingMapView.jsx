"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "../../utils/supabase/client";
import { toast } from "sonner";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

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
      <div className="">
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
      <div className="">
        <MapContainer
          center={[selectedPlaceCoordinates[1], selectedPlaceCoordinates[0]]}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={[
              selectedPlace?.geometry.coordinates[1],
              selectedPlace?.geometry.coordinates[0],
            ]}
          >
            <Popup>{selectedPlace.properties.formatted}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default ListingMapView;
