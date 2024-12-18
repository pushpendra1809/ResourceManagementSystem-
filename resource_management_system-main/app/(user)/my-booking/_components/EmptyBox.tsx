import { CardContent } from "@/components/ui/card";
import React from "react";
import { FaInbox } from "react-icons/fa6";

const EmptyBox = ({text}: {text: string}) => {
  return (
    <CardContent className="h-[500px] w-full flex flex-col items-center justify-center gap-3 text-center text-muted-foreground">
      <span className="flex justify-center">
        <FaInbox className="w-16 h-16 " />
      </span>
      <span>{text}</span>
    </CardContent>
  );
};

export default EmptyBox;
