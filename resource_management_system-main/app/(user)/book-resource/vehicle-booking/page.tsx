import React from "react";
import { SessionProvider } from "next-auth/react";
import BookingInfo from "../_components/BookingInfo";

const page = () => {
  const resourceList = ["ambulance 1", "car"];
  const label = "Vehicle";
  return (
    <SessionProvider>
      <BookingInfo label={label} resourceList={resourceList} />
    </SessionProvider>
  );
};

export default page;
