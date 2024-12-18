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

const ResourcePicker = ({
  resource,
  setResource,
  resourceList
}: {
  resource: string;
  setResource: Dispatch<SetStateAction<string>>;
  resourceList: string[];
}) => {
  return (
    <div className="flex gap-2">
      <Select value={resource} onValueChange={setResource}>
        <SelectTrigger className="">
          <SelectValue placeholder="Select Resource" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="max-h-[150px] overflow-auto">
            {resourceList.map((item) => (
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

export default ResourcePicker;
