"use client";

import { Loader } from "lucide-react";
import {  useState } from "react";
import { Button } from "../../../components/ui/button";

import { toast } from "sonner";
import { supabase } from "../../../utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import PlaceSearch from "../../_components/PlaceSearch";

const ComboboxDemo = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedPlaceCoordinates, setSelectedPlaceCoordinates] =
    useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const handleSubmit = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Listing")
      .insert([
        {
          address: selectedPlace.properties.formatted,
          coordinates: selectedPlaceCoordinates,
          createdBy: user.primaryEmailAddress.emailAddress,
        },
      ])
      .select();
    if (data) {
      toast("Data saved successfully");
      router.replace("/edit-listing/" + data[0]?.id);
    } else if (error) {
      toast("Server error");
    }
    setLoading(false);
  };
  return (
    <div className="p-10 flex flex-col justify-center items-center gap-4 mt-10 md:mx-56 lg:mx-80">
      <h2 className="font-bold text-2xl">Add New Listing</h2>
      <div className="flex flex-col justify-center items-center gap-4 p-5 border shadow-md">
        <h2 className="text-gray-500">
          Enter Address which you want to add to list
        </h2>
        <PlaceSearch
          setSelectedPlace={setSelectedPlace}
          setSelectedPlaceCoordinates={setSelectedPlaceCoordinates}
        />
        {selectedPlace && (
          <div>
            <p>Selected Place:</p>
            <p>{selectedPlace.properties.formatted}</p>
            <p>Coordinates:</p>
            <p>Latitude: {selectedPlaceCoordinates[1]}</p>
            <p>Longitude: {selectedPlaceCoordinates[0]}</p>
            {/* You can render a map with these coordinates */}
          </div>
        )}
        <Button
          className="w-full"
          onClick={handleSubmit}
          disabled={!selectedPlace || loading}
        >
          {loading ? <Loader className="animate-spin" /> : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default ComboboxDemo;
