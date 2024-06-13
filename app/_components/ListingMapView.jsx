"use client";
import React, { useEffect, useState } from "react";
import Listing from "./Listing";
import { supabase } from "../../utils/supabase/client";
import { toast } from "sonner";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Default icon fix for React-Leaflet
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { MapPin } from "lucide-react";

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconAnchor: [12, 41], // Set the icon anchor
  popupAnchor: [0, -41], // Set the popup anchor
});

L.Marker.prototype.options.icon = DefaultIcon;

const ListingMapView = ({ type }) => {
  const [listing, setListing] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [parkingCount, setParkingCount] = useState(0);
  const [homeType, sethomeType] = useState(null);
  const defaultPosition = [9.018947, 38.746032];

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

  // Custom hook to update the map center dynamically
  const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      if (center) {
        map.setView(center, map.getZoom());
      }
    }, [center, map]);
    return null;
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
        <MapContainer
          center={
            selectedPlace
              ? [
                  selectedPlace?.geometry.coordinates[1],
                  selectedPlace?.geometry.coordinates[0],
                ]
              : defaultPosition
          }
          zoom={13}
          style={{ height: "80vh", width: "100%" }} // Set height to 80vh
          key={selectedPlace ? selectedPlace.properties.formatted : "default"}
        >
          <MapUpdater
            center={
              selectedPlace
                ? [
                    selectedPlace?.geometry.coordinates[1],
                    selectedPlace?.geometry.coordinates[0],
                  ]
                : defaultPosition
            }
          />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a> '
          />
          <Marker
            position={
              selectedPlace
                ? [
                    selectedPlace?.geometry.coordinates[1],
                    selectedPlace?.geometry.coordinates[0],
                  ]
                : defaultPosition
            }
          >
            <Popup>
              {selectedPlace
                ? selectedPlace?.properties.formatted
                : "Search a city or specific place"}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default ListingMapView;
