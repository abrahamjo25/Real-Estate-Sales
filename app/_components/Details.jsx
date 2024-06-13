import {
  AreaChart,
  Bath,
  BedDouble,
  Building,
  Car,
  Home,
  MapPin,
  Ruler,
} from "lucide-react";
import React from "react";
import MapView from "./MapView";
import { Button } from "../../components/ui/button";

const Details = ({ listing }) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 mt-5">
        <p className=" text-slate-500">{"$" + listing?.price}</p>
        <p className="flex gap-2 items-center text-slate-500">
          <MapPin className="h-4 w-4" /> {listing?.address}
        </p>
      </div>
      <hr className="text-slate-500" />
      <div className="">{listing?.description}</div>
      <h2 className="font-bold">Key Features</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 items-center">
        <div className="bg-purple-100 border rounded-lg p-2">
          <p className="flex gap-2 text-purple-600 items-center justify-center">
            <Home className="h-4 w-4" />
            {listing?.propertyType}
          </p>
        </div>
        <div className="bg-purple-100 border rounded-lg p-2">
          <p className="flex gap-2 text-purple-600 items-center justify-center">
            <Building className="h-4 w-4" />
            Built In {listing?.builtIn}
          </p>
        </div>
        <div className="bg-purple-100 border rounded-lg p-2">
          <p className="flex gap-2  text-purple-600 items-center justify-center">
            <Ruler className="h-4 w-4" />
            {listing?.area} sq.ft
          </p>
        </div>
        <div className="bg-purple-100 border rounded-lg p-2">
          <p className="flex gap-2  text-purple-600 items-center justify-center">
            <BedDouble className="h-4 w-4" />
            {listing?.bedroom} Bed
          </p>
        </div>
        <div className="bg-purple-100 border rounded-lg p-2">
          <p className="flex gap-2  text-purple-600 items-center justify-center">
            <Bath className="h-4 w-4" />
            {listing?.bathroom} Bath
          </p>
        </div>
        <div className="bg-purple-100 border rounded-lg p-2">
          <p className="flex gap-2  text-purple-600 items-center justify-center">
            <Car className="h-4 w-4" />
            {listing?.parking} Parking
          </p>
        </div>
      </div>
      <h2 className="font-bold">Find on Map</h2>
      <div className="border rounded-md">
        <MapView
          selectedPlace={listing?.address}
          coordinates={listing?.coordinates}
        />
      </div>
      <h2 className="font-bold">Contact Agent</h2>
      <div className="flex justify-betwwen gap-10">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-green-700 items-center justify-center">
            <p className="text-center text-white text-4xl mt-3">@</p>
          </div>
          <div className="font-medium dark:text-white">
            <div>{listing?.username}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {listing?.createdBy}
            </div>
          </div>
        </div>

        <Button className="justify-end">Send Message</Button>
      </div>
    </div>
  );
};

export default Details;
