"use client";
import { Bath, BedDouble, MapPin, Ruler, Search } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import PlaceSearch from "./PlaceSearch";
import { Button } from "../../components/ui/button";
import FilterList from "./FilterList";
const Listing = ({
  listing,
  handleSearch,
  setSelectedPlace,
  setBedCount,
  setBathCount,
  setParkingCount,
  sethomeType,
}) => {
  return (
    <div className="">
      <div className="p-3 flex gap-4">
        <PlaceSearch setSelectedPlace={setSelectedPlace} />
        <Button className="flex gap-2" onClick={handleSearch}>
          <Search className="w-4 h-4" />
          Search
        </Button>
      </div>
      <div className="">
        <FilterList
          setBedCount={setBedCount}
          setBathCount={setBathCount}
          setParkingCount={setParkingCount}
          sethomeType={sethomeType}
        />
      </div>
      <div className="">
        <h2 className="font-bold text-md text-slate-500 text-center mt-2 mb-2">
          {listing?.length} results found
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
        {listing?.length > 0
          ? listing?.map((list, index) => (
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
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
              <div
                key={index}
                className="w-full h-[230px]  bg-slate-200 animate-pulse rounded-lg"
              ></div>
            ))}
      </div>
    </div>
  );
};

export default Listing;
