"use client";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getAllRequests } from "@/server-action/request";
import {
  RequestModelType,
  RequestType,
  UserModelType,
} from "@/types/model-type";
import { compareAsc, format, startOfDay } from "date-fns";
import React, { use, useEffect, useState } from "react";
import EventSection from "./_components/EventSection";
import EmptyEvent from "./_components/EmptyEvent";
import EmptyBox from "./_components/EmptyBox";
import Filter from "./_components/Filter";

const page = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [list, setList] = useState<RequestType[]>([]);
  const [showlist, setShowList] = useState<RequestType[]>([]);
  const [label, setLabel] = useState<string>("All Bookings");
  const labelList = ["All Bookings", "LT", "Lab", "SAC", "Guest House", "Vehicle"];
  useEffect(() => {
    const getData = async () => {
      const res = (await getAllRequests()) as RequestType[];
      const approvedRequests = res.filter(
        (request) => request.status === "accepted"
      );
      setList(approvedRequests);
    };
    getData();
  }, []);
  useEffect(() => {
    if (date == undefined) setShowList([]);
    else if (label == "All Bookings") {
      setShowList(
        list.filter(
          (item) =>
            format(item.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
        )
      );
    } else {
      setShowList(
        list.filter(
          (item) =>
            format(item.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd") &&
            item.label === label
        )
      );
    }
  }, [date, list, label]);

  return (
    <div className="w-full flex justify-center h-full pb-10 ">
      <Card className="w-full md:w-[90%] h-full pt-10">
        <CardContent className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          <div className="flex justify-center items-start lg:col-span-5 col-span-12 pt-10">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md"
              showOutsideDays={false}
              disabled={(date) =>
                compareAsc(startOfDay(date), startOfDay(new Date())) < 0
              }
              classNames={{
                cell: "md:mx-3 md:my-2 m-2 h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                head_cell:
                  "md:mx-3 md:my-2 m-2 text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
              }}
            />
          </div>
          <div className="hidden lg:flex justify-start items-center">
            <Separator orientation="vertical" />
          </div>
          <div className="flex lg:hidden justify-start items-center col-span-12">
            <Separator />
          </div>

          <div className="col-span-12 w-full lg:col-span-5 flex flex-col gap-5 ">
            {date && (
              <div className="flex flex-col items-center w-full gap-5">
                <span className="text-lg text-center font-semibold">
                  Schedule for {format(date, "MMM dd, yyyy")}
                </span>
                <div className=" w-full">
                  <Filter
                    label={label}
                    setLabel={setLabel}
                    labelList={labelList}
                  />
                </div>
              </div>
            )}

            <div className="px-1">
              {showlist.length === 0 ? (
                date ? (
                  <EmptyEvent />
                ) : (
                  <EmptyBox />
                )
              ) : (
                <EventSection showlist={showlist} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
