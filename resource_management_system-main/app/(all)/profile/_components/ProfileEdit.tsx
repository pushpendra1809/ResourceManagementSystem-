"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePassword } from "@/server-action/user";
import { set } from "mongoose";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "sonner";

const ProfileEdit = () => {
  const { data: session } = useSession();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const user = session?.user;
  const handleChangePassword = async () => {
    console.log(oldPassword, newPassword, confirmPassword);
    setLoading(true);
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
      toast.error("Please fill all the fields");
    } else if (newPassword !== confirmPassword) {
      toast.error("new password and confirm password does not match");
    } else {
      const res = await changePassword(user?.id, oldPassword, newPassword);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    }
    setLoading(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="flex flex-col gap-5 w-full md:w-2/3">
      <div className="grid lg:grid-cols-12 items-center gap-3">
        <Label htmlFor="name">Name</Label>
        <Input
          placeholder="Name"
          id="name"
          className="col-span-9"
          value={user?.name || ""}
          disabled
        />
      </div>
      <div className="grid lg:grid-cols-12 items-center gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="demo@gmail.com"
          id="name"
          type="email"
          className="col-span-9"
          disabled
          value={user?.email || ""}
        />
      </div>

      <span className="mt-5">Change Password</span>
      <div className="grid  lg:grid-cols-12 items-center gap-3">
        <Label htmlFor="name" className="col-span-3">
          Old Password
        </Label>
        <Input
          placeholder="**********"
          type="password"
          id="oldPassword"
          className="col-span-9"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <div className="grid lg:grid-cols-12 items-center gap-3">
        <Label htmlFor="name" className="col-span-3">
          New Password
        </Label>
        <Input
          placeholder="**********"
          type="password"
          id="newPassword"
          className="col-span-9"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="grid lg:grid-cols-12 items-center gap-3">
        <Label htmlFor="name" className="col-span-3">
          Confirm Password
        </Label>
        <Input
          placeholder="**********"
          type="password"
          id="name"
          className="col-span-9"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="w-full mt-2">
        <Button className="w-full" onClick={handleChangePassword} disabled={loading}>
          {loading ? <FaSpinner className="animate-spin w-5 h-5 text-muted-foreground" /> : "Change Password"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileEdit;
