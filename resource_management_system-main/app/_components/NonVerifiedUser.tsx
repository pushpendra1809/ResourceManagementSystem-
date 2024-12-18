import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/server-action/user";
import React from "react";

const NonVerifiedUser = () => {
  return (
    <div className="w-full flex justify-center mt-48">
      <div className="flex flex-col items-center text-center gap-5">
        <span className="text-red-700 font-bold text-lg md:text-2xl">
          You are not a Verified User Contact Admin for Activation
        </span>
        <form action={logoutUser}>
          <Button className="w-32">logout</Button>
        </form>
      </div>
    </div>
  );
};

export default NonVerifiedUser;
