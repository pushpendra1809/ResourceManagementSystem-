import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RequestModelType } from "@/types/model-type";
import { format } from "date-fns";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { ObjectId } from "mongodb";
import { deleteRequest } from "@/server-action/request";
import { toast } from "sonner";
const PendingRequests = ({
  pendingRequests,
  setPendingRequests,
}: {
  pendingRequests: RequestModelType[];
  setPendingRequests: React.Dispatch<React.SetStateAction<RequestModelType[]>>;
}) => {
  const handleSubmit = async (id: ObjectId) => {
    console.log(id);
    const res = await deleteRequest(id);
    if (res.success) {
      setPendingRequests(
        pendingRequests.filter((request) => request._id !== id)
      );
      toast.success(res.message);
    } else toast.error(res.message);
  };
  return (
    <div className="flex flex-col gap-3 overflow-auto h-[580px] mt-5 pr-5">
      {pendingRequests.map((request, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row justify-between">
            <span>{format(request.date, "dd-MM-yyyy")}</span>
            <Dialog>
              <DialogTrigger>
                <MdDelete className="w-5 h-5 cursor-pointer text-muted-foreground hover:text-primary transition-all duration-300 ease-in-out" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete this booked request? Once
                    deleted, this action cannot be undone and the booking
                    request will be permanently removed from the system.
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      onClick={() => handleSubmit(request._id)}
                    >
                      Delete
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="flex flex-col gap-1 text-sm ">
            <div className="flex gap-3">
              <span>Time: </span>
              <span className="text-muted-foreground">
                {request.startTime} - {request.endTime}
              </span>
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PendingRequests;
