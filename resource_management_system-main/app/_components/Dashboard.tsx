"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaSpinner } from "react-icons/fa6";
import { ImSpinner9 } from "react-icons/im";

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();
  console.log("session: ", session?.user);
  useEffect(() => {
    // Check the session status
    if (status === "loading") {
      return;
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
    // Redirect if user is logged in
    if (session?.user.role == "admin") {
      router.push("/all-booking");
    } else if (session?.user.role == "user") {
      router.push("/book-resource");
    }
  }, [session, status, router]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <FaSpinner className="animate-spin w-10 h-10 text-muted-foreground" />
    </div>
  );
}
