import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { SessionProvider } from "next-auth/react";
import ProfileEdit from "./_components/ProfileEdit";
import { Button } from "@/components/ui/button";
import { MdLogout } from "react-icons/md";
import { logoutUser } from "@/server-action/user";

const page = () => {
  return (
    <div className="w-full h-[90%] flex justify-center">
      <Card className="w-[90%]">
        <CardHeader className="flex flex-row justify-between">
          <span>Profile</span>
          <form action={logoutUser}>
            <Button variant="destructive" className="" type="submit">
              <MdLogout className=" mr-2 w-5 h-5" />
              Sign Out
            </Button>
          </form>
        </CardHeader>
        <CardContent>
          <SessionProvider>
            <ProfileEdit />
          </SessionProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
