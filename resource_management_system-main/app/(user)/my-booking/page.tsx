import { SessionProvider } from "next-auth/react";
import MyBooking from "./_components/MyBooking";

const page = () => {
  return (
    <>
      <SessionProvider>
        <MyBooking />
      </SessionProvider>
    </>
  );
};

export default page;
