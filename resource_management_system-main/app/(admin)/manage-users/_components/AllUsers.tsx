import { Dispatch, SetStateAction } from "react";
import { UserModelType } from "@/types/model-type";
import { Card } from "@/components/ui/card";
import { MdDelete } from "react-icons/md";
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
import { Button } from "@/components/ui/button";
import { ObjectId } from "mongodb";
import { deleteUser } from "@/server-action/user";
import { toast } from "sonner";
import EditButton from "./EditButton";

const AllUsers = ({
  verifiedUser,
  setVerifiedUser,
}: {
  verifiedUser: UserModelType[];
  setVerifiedUser: Dispatch<SetStateAction<UserModelType[]>>;
}) => {
  const deleteHandler = async (id: ObjectId) => {
    const res = await deleteUser(id);
    if (res.success) {
      setVerifiedUser(verifiedUser.filter((user) => user._id !== id));
      toast.success(res.message);
    } else toast.error(res.message);
  };


  return (
    <div className="w-full flex flex-col gap-5 h-[600px] overflow-auto pr-5 py-3">
      {verifiedUser.map((user, index) => (
        <Card key={index} className="w-full px-5 py-2 grid grid-cols-12">
          <div className="flex flex-col gap-1 col-span-11">
            <div className="flex gap-3">
              <span>User Name :</span>
              <span className="text-muted-foreground">{user.name}</span>
            </div>
            <div className="flex gap-3">
              <span>Email ID :</span>
              <span className="text-muted-foreground">{user.email}</span>
            </div>
            <div className="flex gap-3">
              <span>Role :</span>
              <span className="text-muted-foreground">{user.role}</span>
            </div>
          </div>
          <div className="flex flex-col items-end col-span-1">
            <Dialog>
              <DialogTrigger>
                <Button variant="ghost" className="group">
                  <MdDelete className="w-5 h-5 cursor-pointer text-muted-foreground group-hover:text-primary transition-all duration-300 ease-in-out" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Are you sure you want to delete this user?
                  </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  Once deleted, this action cannot be undone and the user data
                  will be permanently removed from the system.
                </DialogDescription>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      type="submit"
                      onClick={() => deleteHandler(user._id)}
                    >
                      Delete
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <EditButton user={user} setVerifiedUser={setVerifiedUser} />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AllUsers;
