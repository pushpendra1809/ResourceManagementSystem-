import React from "react";
import BookingForm from "../_components/BookingForm";
import { SessionProvider } from "next-auth/react";
import BookingInfo from "../_components/BookingInfo";

const page = () => {
  const resourceList = [
    "LT 1",
    "LT 2",
    "LT 3",
    "LT 4",
    "LT 5",
    "LT 6",
    "LT 7",
    "LT 8",
    "LT 9",
    "LT 10",
  ];
  const label = "LT";
  return (
    <SessionProvider>
      <BookingInfo label={label} resourceList={resourceList} />
    </SessionProvider>
  );
};

export default page;
