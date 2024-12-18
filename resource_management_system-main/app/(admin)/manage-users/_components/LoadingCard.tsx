import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LoadingCard = () => {
  return (
    <div className="w-full flex flex-col gap-5 pr-5 py-3">
      <Card className="w-full px-5 py-2 flex flex-col gap-3">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-28" />
      </Card>
      <Card className="w-full px-5 py-2 flex flex-col gap-3">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-28" />
      </Card>
      <Card className="w-full px-5 py-2 flex flex-col gap-3">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-5 w-28" />
      </Card>
    </div>
  );
};

export default LoadingCard;
