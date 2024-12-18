"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const TimePicker = ({
  setTime,
}: {
  setTime: Dispatch<SetStateAction<string>>;
}) => {
  const [hour, setHour] = useState("12");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");

  const hours = Array.from({ length: 12 }, (_, i) =>
    (i + 1).toString().padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0")
  );
  useEffect(() => {
    setTime(`${hour}:${minute} ${period}`);
  }, [hours, minutes, period]);

  return (
    <div>
      <div className="flex gap-2">
        <Select value={hour} onValueChange={setHour}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="HH" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[200px]">
              {hours.map((h) => (
                <SelectItem key={h} value={h}>
                  {h}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
        <Select value={minute} onValueChange={setMinute}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="MM" />
          </SelectTrigger>
          <SelectContent>
            <ScrollArea className="h-[200px]">
              {minutes.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        Selected time: {hour}:{minute} {period}
      </div>
    </div>
  );
};

export default TimePicker;
