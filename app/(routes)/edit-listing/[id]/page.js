"use client";
import React from "react";
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
import { useParams, useRouter, useSearchParams } from "next/navigation";
const Page = () => {
  const { id } = useParams();
  const onSubmitHandler = (formValues)=>{
    
  }
  return (
    <div className="px-10 md:px-36 my-10">
      <p className="text-2xl font-bold text-slate-600">
        Enter some more details about your Ads
      </p>
      <Formik
        initialValues={{
          type: "Sell",
          propertyType: "Single familiy",
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg  text-slate-500">Rent or Sell?</h2>
                  <RadioGroup
                    defaultValue="Sell"
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
                      <SelectValue placeholder="Select Property Type" />
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
                    placeholder="Ex. 1850 sq.ft"
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
                    placeholder="400000"
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
                  name="description"
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2 mt-8">
                <Button type="submit">Save</Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Page;
