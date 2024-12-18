import React from "react";
import { SessionProvider } from "next-auth/react";
import BookingInfo from "../_components/BookingInfo";

const page = () => {
  const resourceList = ["SAC", "OAT"];
  const label = "SAC";
  return (
    <SessionProvider>
      <BookingInfo label={label} resourceList={resourceList} />
    </SessionProvider>
  );
};

export default page;
