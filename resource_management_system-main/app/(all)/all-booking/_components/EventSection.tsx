import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { RequestType } from "@/types/model-type";
import { MdEventAvailable } from "react-icons/md";
import { ImLab } from "react-icons/im";
import { HiMiniBuildingLibrary } from "react-icons/hi2";
import { GiBlockHouse } from "react-icons/gi";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaAmbulance } from "react-icons/fa";

const EventSection = ({ showlist }: { showlist: RequestType[] }) => {
  return (
    <>
      <div className="flex flex-col gap-5 overflow-y-auto h-96">
        {showlist.map((item, index) => (
          <Card key={index} className="">
            <CardContent className="flex flex-col gap-3 p-3 text-sm">
              <div className="grid grid-cols-12 gap-5">
                <div className="text-muted-foreground col-span-3 flex justify-center items-center">
                  {item.label === "LT" && (
                    <HiMiniBuildingLibrary className="w-14 h-14" />
                  )}
                  {item.label === "Lab" && <ImLab className="w-14 h-14" />}
                  {item.label === "SAC" && (
                    <GiBlockHouse className="w-14 h-14" />
                  )}
                  {item.label === "Guest house" && (
                    <FaHouseChimneyUser className="w-14 h-14" />
                  )}
                  {item.label === "Vehicle" && (
                    <FaAmbulance className="w-14 h-14" />
                  )}
                </div>
                <div className="flex flex-col justify-center items-start gap-2 col-span-9">
                  <div className="flex gap-3">
                    <span className="font-semibold text-muted-foreground">
                      Booked Resource :{" "}
                    </span>
                    <span>{item.resourceName}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="font-semibold text-muted-foreground">
                      Time :
                    </span>
                    <span>
                      {item.startTime} - {item.endTime}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 pl-3">
                <div className="flex gap-2">
                  <span className=" font-semibold text-muted-foreground">
                    Booked By :
                  </span>
                  <span>{item.createdBy?.name}</span>
                </div>
                <div className="">
                  <span className=" font-semibold text-muted-foreground mr-2">
                    Description :
                  </span>
                  <span className="leading-6">{item.description}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default EventSection;
