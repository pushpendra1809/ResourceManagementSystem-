import React, { Dispatch, SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const Filter = ({
  label,
  setLabel,
  labelList,
}: {
  label: string;
  setLabel: Dispatch<SetStateAction<string>>;
  labelList: string[];
}) => {
  return (
    <div className="flex gap-2">
      <Select value={label} onValueChange={setLabel}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select Resource" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="max-h-[150px] overflow-auto">
            {labelList.map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filter;
