import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingCard = () => {
  return (
    <Card className="w-full py-5 pr-0">
      <CardContent className="flex flex-col gap-2">
        <Skeleton className="h-4 w-20" />
        <div className="flex gap-96">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-4 w-20 mt-2" />
        <div className="flex gap-96">
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-4/5" />
      </CardContent>
    </Card>
  );
};

export default LoadingCard;
