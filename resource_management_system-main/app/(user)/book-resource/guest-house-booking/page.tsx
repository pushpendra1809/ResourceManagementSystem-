import React from "react";
import BookingForm from "../_components/BookingForm";
import { SessionProvider } from "next-auth/react";
import BookingInfo from "../_components/BookingInfo";

const page = () => {
  const resourceList = [
    "Guest house room 1",
    "Guest house room 2",
    "Guest house room 3",
    "Dining hall"
  ];
  const label = "Guest House";
  return (
    <SessionProvider>
      <BookingInfo label={label} resourceList={resourceList} />
    </SessionProvider>
  );
};

export default page;
