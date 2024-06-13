"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Bath, BedDouble, CarFront, Home, HomeIcon } from "lucide-react";

const FilterList = ({
  setBedCount,
  setBathCount,
  setParkingCount,
  sethomeType,
}) => {
  return (
    <div className="px-3 py-2 grid grid-cols-2 md:flex gap-3">
      <Select onValueChange={setBedCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bed" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">
            <h2 className="flex gap-2">
              <BedDouble className="h-4 w-4" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2">
              <BedDouble className="h-4 w-4" /> 3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2">
              <BedDouble className="h-4 w-4" /> 4+
            </h2>
          </SelectItem>
          <SelectItem value="5">
            <h2 className="flex gap-2">
              <BedDouble className="h-4 w-4" /> 5+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setBathCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Bath" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="2">
            <h2 className="flex gap-2">
              <Bath className="h-4 w-4" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="3">
            <h2 className="flex gap-2">
              <Bath className="h-4 w-4" /> 3+
            </h2>
          </SelectItem>
          <SelectItem value="4">
            <h2 className="flex gap-2">
              <Bath className="h-4 w-4" /> 4+
            </h2>
          </SelectItem>
          <SelectItem value="5">
            <h2 className="flex gap-2">
              <Bath className="h-4 w-4" /> 5+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setParkingCount}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Parking" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">
            <h2 className="flex gap-2">
              <CarFront className="h-4 w-4" /> 2+
            </h2>
          </SelectItem>
          <SelectItem value="dark">
            <h2 className="flex gap-2">
              <CarFront className="h-4 w-4" /> 3+
            </h2>
          </SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={(val) => (val === "All" ? null : sethomeType)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Home Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">
            <h2 className="flex gap-2">All</h2>
          </SelectItem>
          <SelectItem value="Single family">
            <h2 className="flex gap-2">Single Family</h2>
          </SelectItem>
          <SelectItem value="Town House">
            <h2 className="flex gap-2">Town House</h2>
          </SelectItem>
          <SelectItem value="Condo">
            <h2 className="flex gap-2">Condo</h2>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
export default FilterList;
