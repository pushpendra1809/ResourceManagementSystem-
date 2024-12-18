import React from "react";
import { SessionProvider } from "next-auth/react";
import BookingInfo from "../_components/BookingInfo";

const page = () => {
  const resourceList = ["CP-1", "CP-2", "CP-3", "CMLBDA"];
  const label= "Lab"
  return (
    <SessionProvider>
      <BookingInfo label={label} resourceList={resourceList} />
    </SessionProvider>
  );
};

export default page;