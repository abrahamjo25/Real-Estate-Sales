import React from "react";

import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import Image from "next/image";

const Slider = ({ imageList }) => {
  return (
    <div className="mt-5">
      {imageList ? (
        <Carousel>
          <CarouselContent>
            {imageList.map((item, index) => (
              <CarouselItem>
                <Image
                  src={item?.url}
                  width={800}
                  height={300}
                  alt="Image"
                  className="rounded-xl object-cover h-[420px] w-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="w-full h-[200px] bg-slate-200 animate-pulse"></div>
      )}
    </div>
  );
};
export default Slider;
