"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { updateStatusRequest } from "@/server-action/request";
import { RequestType } from "@/types/model-type";
import { format } from "date-fns";
import React from "react";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import { toast } from "sonner";
import { ObjectId } from "mongodb";
import { IoIosMail } from "react-icons/io";
import { requestAcceptEmail, requestRejectEmail } from "@/server-action/emails";
import { EmailDataType } from "@/types/email-type";
import { createReminder } from "@/server-action/reminder";

const RequestCard = ({
  pendingRequests,
  setPendingRequests,
}: {
  pendingRequests: RequestType[];
  setPendingRequests: React.Dispatch<React.SetStateAction<RequestType[]>>;
}) => {
  const acceptRequest = async (id: ObjectId, data: EmailDataType) => {
    const res = await updateStatusRequest(id, "accepted");
    await createReminder({
      userEmail: data.email,
      name: data.name,
      reminderDate: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      description: data.description,
      resourceName: data.resourceName,
    });
    
    if (res.success) {
      setPendingRequests(
        pendingRequests.filter((request) => request._id !== id)
      );
      toast.success("request for booking accepted successfully");
      handleAcceptEmail(data);
    } else {
      toast.error(res.message);
    }
  };
  const rejectRequest = async (id: ObjectId, data: EmailDataType) => {
    const res = await updateStatusRequest(id, "rejected");
    if (res.success) {
      setPendingRequests(
        pendingRequests.filter((request) => request._id !== id)
      );
      toast.success("request for booking rejected");
      handleRejectEmail(data);
    } else {
      toast.error(res.message);
    }
  };
  const handleRejectEmail = async (data: EmailDataType) => {
    const res = await requestRejectEmail(data);
    if (res.success) {
      toast.success("Email sent successfully");
    } else {
      toast.error(res.message);
    }
  };
  const handleAcceptEmail = async (data: EmailDataType) => {
    const res = await requestAcceptEmail(data);
    if (res.success) {
      toast.success("Email sent successfully");
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div className="flex flex-col gap-3 overflow-auto h-[630px] pr-5">
      {pendingRequests.map((request, index) => (
        <Card key={index} className="py-5">
          <CardContent className="text-sm grid grid-cols-12">
            <div className="col-span-11 flex flex-col gap-3 ">
              <div className="flex flex-col gap-1">
                <span className="font-semibold">User Info</span>
                <div className="grid lg:grid-cols-2 gap-1">
                  <div className="flex gap-3">
                    <span>CreatedBy: </span>
                    <span className="text-muted-foreground">
                      {request.createdBy?.name}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <span>Email: </span>
                    <span className="text-muted-foreground">
                      {request.createdBy?.email}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Event Info</span>
                <div className="grid lg:grid-cols-2 gap-1">
                  <div className="flex gap-3">
                    <span>Event Date:</span>
                    <span className="text-muted-foreground">
                      {format(request.date, "dd-MM-yyyy")}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <span>Time: </span>
                    <span className="text-muted-foreground">
                      {request.startTime} - {request.endTime}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span>Resource: </span>
                  <span className="text-muted-foreground">
                    {request.resourceName}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span>Description: </span>
                  <span className="text-muted-foreground line-clamp-3">
                    {request.description}
                  </span>
                </div>
              </div>
            </div>
            <div className="col-span-1 flex flex-col gap-3 items-end">
              <Button
                variant="ghost"
                className="w-8 h-8 p-1 text-green-500 hover:text-green-600"
                onClick={() =>
                  acceptRequest(request._id, {
                    email: request.createdBy?.email,
                    name: request.createdBy?.name,
                    date: format(request.date, "dd MMM yyyy"),
                    startTime: request.startTime,
                    endTime: request.endTime,
                    resourceName: request.resourceName,
                    description: request.description,
                  })
                }
              >
                <FaCheck className="w-5 h-5 " />
              </Button>
              <Button
                variant="ghost"
                className="w-8 h-8 p-1 text-red-500 hover:text-red-600"
                onClick={() =>
                  rejectRequest(request._id, {
                    email: request.createdBy?.email,
                    name: request.createdBy?.name,
                    date: format(request.date, "dd MMM yyyy"),
                    startTime: request.startTime,
                    endTime: request.endTime,
                    resourceName: request.resourceName,
                    description: request.description,
                  })
                }
              >
                <FaXmark className="w-5 h-5 " />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RequestCard;
