"use client";
import { Check, ChevronsUpDown, Loader, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { toast } from "sonner";
const PlaceSearch = ({ setSelectedPlace }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

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
    setOpen(false);
  };
  useEffect(() => {
    if (value.length > 2) {
      onInputChange(value);
    } else {
      setSuggestions([]);
    }
  }, [value]);
  return (
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
  );
};

export default PlaceSearch;
