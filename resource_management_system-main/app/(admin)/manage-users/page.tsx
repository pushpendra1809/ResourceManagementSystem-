"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import AllUsers from "./_components/AllUsers";
import PendingUsers from "./_components/PendingUsers";
import { getAllUser } from "@/server-action/user";
import { toast } from "sonner";
import { UserModelType } from "@/types/model-type";
import LoadingCard from "./_components/LoadingCard";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [allUsers, setAllUsers] = useState<UserModelType[]>([]);
  const [verifiedUser, setVerifiedUser] = useState<UserModelType[]>([]);
  const [nonVerifiedUser, setNonVerifiedUser] = useState<UserModelType[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = await getAllUser();
      if (res.success) {
        console.log(res.data);
        const verifiedUsers = res.data.filter(
          (user: UserModelType) => user.verified === true
        );
        const nonVerifiedUsers = res.data.filter(
          (user: UserModelType) => user.verified === false
        );
        setVerifiedUser(verifiedUsers);
        setNonVerifiedUser(nonVerifiedUsers);
        setLoading(false);
      } else {
        toast.error(res.message);
      }
    };
    getData();
  }, []);
  return (
    <div className="w-full h-full flex justify-center pb-5">
      <Card className=" w-full lg:w-[90%]">
        <Tabs defaultValue="allUsers" className="py-3 px-5">
          <TabsList className="">
            <TabsTrigger value="allUsers">All verified Users</TabsTrigger>
            <TabsTrigger value="nonVerifiedUsers">
              Non verified Users
            </TabsTrigger>
          </TabsList>
          <TabsContent value="allUsers">
            {loading ? (
              <LoadingCard />
            ) : (
              <AllUsers
                verifiedUser={verifiedUser}
                setVerifiedUser={setVerifiedUser}
              />
            )}
          </TabsContent>
          <TabsContent value="nonVerifiedUsers">
          {loading ? (
              <LoadingCard />
            ) : (
              <PendingUsers
                nonVerifiedUser={nonVerifiedUser}
                setNonVerifiedUser={setNonVerifiedUser}
              />
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default page;
