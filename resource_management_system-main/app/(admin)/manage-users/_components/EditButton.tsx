import { Button } from "@/components/ui/button";
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
import { FaEdit } from "react-icons/fa";
import { ObjectId } from "mongodb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UserModelType } from "@/types/model-type";
import { Dispatch, SetStateAction, useState } from "react";
import { changeRole } from "@/server-action/user";
import { toast } from "sonner";

const EditButton = ({
  user,
  setVerifiedUser,
}: {
  user: UserModelType;
  setVerifiedUser: Dispatch<SetStateAction<UserModelType[]>>;
}) => {
  const [role, setRole] = useState<string>(user.role);
  const editHandler = async () => {
    const res = await changeRole(user._id, role as "user" | "admin");
    if (res.success) {
      setVerifiedUser((prev) =>
        prev.map((prevUser) =>
          prevUser._id === user._id
            ? { ...prevUser, role: role as "user" | "admin" }
            : prevUser
        )
      );
      toast.success(res.message);
    } else toast.error(res.message);
  };
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="ghost" className="group">
          <FaEdit className="w-5 h-5 cursor-pointer text-muted-foreground group-hover:text-primary transition-all duration-300 ease-in-out" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit User Detail</DialogTitle>
        <DialogDescription>edit user detail here</DialogDescription>
        <div className="grid grid-cols-5 items-center">
          <Label htmlFor="name" className="">
            Name
          </Label>
          <Input
            placeholder="Name"
            id="name"
            disabled
            className="col-span-4"
            value={user.name}
          />
        </div>
        <div className="grid grid-cols-5 items-center">
          <Label htmlFor="email">Email</Label>
          <Input
            placeholder="Email"
            id="email"
            disabled
            value={user.email}
            className="col-span-4"
          />
        </div>
        <div className="grid grid-cols-5 items-center">
          <Label htmlFor="role">Role</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="user">user</SelectItem>
              <SelectItem value="admin">admin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={editHandler}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;
