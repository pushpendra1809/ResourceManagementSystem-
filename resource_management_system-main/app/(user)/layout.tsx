import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";
import UserNavbar from "./_components/UserNavbar";
import UnauthorizePage from "./_components/UnauthorizePage";
import NonVerifiedUser from "../_components/NonVerifiedUser";

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session?.user.verified !== true) {
    return <NonVerifiedUser />;
  }
  if (session?.user.role !== "user") {
    return <UnauthorizePage />;
  }

  return (
    <>
      <div className="w-full h-screen flex flex-col">
        <UserNavbar />
        {children}
      </div>
    </>
  );
};

export default layout;
