"use client";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { getAllRequests } from "@/server-action/request";
import { RequestType } from "@/types/model-type";
import React, { useEffect, useState } from "react";
import RequestCard from "./_components/RequestCard";
import EmptyBox from "./_components/EmptyBox";
import { set } from "mongoose";
import LoadingCard from "./_components/LoadingCard";

const page = () => {
  const [loading, setLoading] = useState(true);
  const [allRequests, setAllRequests] = useState<RequestType[]>([]);
  const [pendingRequests, setPendingRequests] = useState<RequestType[]>([]);
  useEffect(() => {
    const getData = async () => {
      const res = (await getAllRequests()) as RequestType[];
      setAllRequests(res);
    };
    getData();
  }, []);
  useEffect(() => {
    setPendingRequests(
      allRequests.filter((request) => request.status === "pending")
    );
    setLoading(false);
  }, [allRequests]);
  return (
    <div className="flex justify-center w-full h-full pb-5">
      <Card className="w-full lg:w-[90%] p-5">
        {loading ? (
          <LoadingCard />
        ) : (
          <div>
            {pendingRequests.length === 0 ? (
              <EmptyBox />
            ) : (
              <RequestCard
                pendingRequests={pendingRequests}
                setPendingRequests={setPendingRequests}
              />
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default page;
