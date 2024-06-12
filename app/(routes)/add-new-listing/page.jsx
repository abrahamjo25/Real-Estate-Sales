"use client";

import { Check, ChevronsUpDown, Loader, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { toast } from "sonner";
import { supabase } from "../../../utils/supabase/client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const ComboboxDemo = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedPlaceCoordinates, setSelectedPlaceCoordinates] =
    useState(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onInputChange = (value) => {
    const apiKey = "1ca2930e08584a7fa5359a43e7079041";
    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      value
    )}&apiKey=${apiKey}`;

    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (result.features) {
          setSuggestions(result.features);
        }
      })
      .catch((error) => console.log("error", error));
  };
  const handleSelectPlace = (place) => {
    setValue(place.properties.formatted);
    setSelectedPlace(place);
    setSelectedPlaceCoordinates(place.geometry.coordinates);
    setOpen(false);
  };
  const { user } = useUser();
  useEffect(() => {
    if (value.length > 2) {
      onInputChange(value);
    } else {
      setSuggestions([]);
    }
  }, [value]);
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
        <div className="flex justify-center items-center w-full">
          <MapPin className="h-10 w-10 p-2 rounded-full text-primary bg-purple-200" />
          <Popover open={open} onOpenChange={setOpen} className="w-full">
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {value ? value : "Select place..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput
                  placeholder="Search place..."
                  onValueChange={setValue}
                />
                <CommandList>
                  {suggestions.length === 0 && (
                    <CommandEmpty>No place found.</CommandEmpty>
                  )}
                  <CommandGroup>
                    {suggestions.map((suggestion, index) => (
                      <CommandItem
                        key={index} // Use a unique key, such as an index
                        value={suggestion.properties.formatted}
                        onSelect={() => handleSelectPlace(suggestion)}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === suggestion.properties.formatted
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {suggestion.properties.formatted}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
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
