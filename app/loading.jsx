"use client";
import React from "react";
import { Commet } from "react-loading-indicators";

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Commet color="#7f57f1" size="large" text="" textColor="#5e2020" />
    </div>
  );
};

export default Loading;
