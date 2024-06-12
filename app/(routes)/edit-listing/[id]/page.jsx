"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../../../../components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "../../../../components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import { Formik } from "formik";
import { Button } from "../../../../components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { supabase } from "../../../../utils/supabase/client";
import { Loader } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import FileUpload from "../_component/FileUpload";
const Page = () => {
  const { id } = useParams();
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [images, setImages] = useState(null);
  const onSubmitHandler = async (formValues) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Listing")
      .update(formValues)
      .eq("id", id)
      .select();

    if (data) {
      for (let image of images) {
        const file = image;
        const fileName = new Date().toString();
        const ext = fileName?.split(".").pop();

        const { error } = await supabase.storage
          .from("ListingImages")
          .upload(`${fileName}`, file, {
            contentType: `image/${ext}`,
            upsert: false,
          });
        if (error) {
          toast("Error while uploading image.");
        } else {
          const imageUrl = process.env.NEXT_PUBLIC_IMAGE_URL + fileName;
          const { data, error } = await supabase
            .from("ListingImages")
            .insert([{ url: imageUrl, listing_id: id }])
            .select();

          if (error) {
            toast("Error", error);
          }
          if (data) {
            toast("Data Saved Successfully");
          }
        }
      }
    } else {
      toast("Server error", error);
    }
    setLoading(false);
  };
  useEffect(() => {
    user && verifyUserRecord();
  }, [user]);
  const verifyUserRecord = async () => {
    const { data, error } = await supabase
      .from("Listing")
      .select("*,ListingImages(listing_id,url)")
      .eq("createdBy", user?.primaryEmailAddress?.emailAddress)
      .eq("id", id);

    if (data?.length <= 0) {
      router.replace("/");
    }
    if (data) {
      setListing(data[0]);
    }
  };
  return (
    <div className="px-10 md:px-36 my-10">
      <p className="text-2xl font-bold text-slate-600">
        Enter some more details about your Ads
      </p>
      <Formik
        initialValues={{
          type: listing?.type || "Sell",
          propertyType: listing?.propertyType || "Single familiy",
          profileImage: user?.imageUrl,
          username: user?.fullName,
        }}
        onSubmit={(values) => onSubmitHandler(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg  text-slate-500">Rent or Sell?</h2>
                  <RadioGroup
                    defaultValue={listing?.type || "Sell"}
                    name="type"
                    onValueChange={(e) => (values.type = e)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sell" id="Sell" />
                      <Label htmlFor="Sell">Sell</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Rent" id="Rent" />
                      <Label htmlFor="Rent">Rent</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg  text-slate-500">Property Type</h2>
                  <Select
                    name="propertyType"
                    onValueChange={(e) => (values.propertyType = e)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue
                        placeholder={
                          listing?.propertyType || "Select Property Type"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single familiy">
                        Single familiy
                      </SelectItem>
                      <SelectItem value="Town House">Town House</SelectItem>
                      <SelectItem value="Condominum">Condominum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="bedroom" className="text-slate-500">
                    Bedroom
                  </Label>
                  <Input
                    type="number"
                    id="bedroom"
                    defaultValue={listing?.bedroom}
                    placeholder="Ex. 2"
                    name="bedroom"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="bathroom" className="text-slate-500">
                    Bathroom
                  </Label>
                  <Input
                    type="number"
                    id="bathroom"
                    defaultValue={listing?.bathroom}
                    placeholder="Ex. 2"
                    name="bathroom"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="builtIn" className="text-slate-500">
                    Built In
                  </Label>
                  <Input
                    type="number"
                    id="builtIn"
                    defaultValue={listing?.builtIn}
                    placeholder="Ex. 2015"
                    name="builtIn"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="parking" className="text-slate-500">
                    Parking
                  </Label>
                  <Input
                    type="number"
                    id="parking"
                    defaultValue={listing?.parking}
                    placeholder="Ex. 2"
                    name="parking"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="lotSize" className="text-slate-500">
                    Lot Size(sq.Ft)
                  </Label>
                  <Input
                    type="number"
                    id="lotSize"
                    defaultValue={listing?.lotSize}
                    placeholder=""
                    name="lotSize"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="area" className="text-slate-500">
                    Area (sq.Ft)
                  </Label>
                  <Input
                    type="number"
                    id="area"
                    defaultValue={listing?.area}
                    placeholder="Ex. 1850 sq.ft"
                    name="area"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="price" className="text-slate-500">
                    Selling Price($)
                  </Label>
                  <Input
                    type="number"
                    id="price"
                    defaultValue={listing?.price}
                    placeholder="Ex. 400000"
                    name="price"
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="hoa" className="text-slate-500">
                    HOA (per Month)($)
                  </Label>
                  <Input
                    type="number"
                    id="hoa"
                    defaultValue={listing?.hoa}
                    placeholder="Ex. 100"
                    name="hoa"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-8">
                <Label htmlFor="description" className="text-slate-500">
                  Description
                </Label>
                <Textarea
                  id="description"
                  defaultValue={listing?.description}
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="mt-8">
                <h2 className="text-lg  text-slate-500">
                  Upload property Images
                </h2>

                <FileUpload
                  setImages={(value) => setImages(value)}
                  imageList={listing?.ListingImages}
                />
              </div>
              <div className="flex gap-7 mt-8 justify-end">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <Loader className="animate-spin" />
                  ) : (
                    "Save & Publish"
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Page;
