import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const UnauthorizePage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col text-center gap-5">
        <span className="text-red-500 font-bold text-3xl">
          You are not authorized to access this page!!
        </span>
        <Link href="/" className="">
          <Button>Go Back</Button>
        </Link>
      </div>
    </div>
  );
};

export default UnauthorizePage;
