import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingCard = () => {
  return (
    <Card className="w-full h-full mt-5">
      <CardHeader>
        <Skeleton className="h-6 w-[100px]" />
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Skeleton className="h-4 w-[150px]" />
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-4/5" />
      </CardContent>
    </Card>
  );
};

export default LoadingCard;
