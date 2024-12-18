"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const UserNavbar = () => {
  const currentPath = usePathname();

  return (
    <nav className="w-full flex justify-center p-1 text-sm">
      <ul className="bg-muted flex rounded-md w-full lg:w-1/2 justify-evenly gap-1 p-1">
        <Link
          href="/book-resource"
          prefetch={true}
          className={`text-muted-foreground py-2 w-1/3 text-center ${
            currentPath.startsWith("/book-resource") &&
            "bg-white rounded-md text-primary shadow-sm"
          }`}
        >
          Book Resource
        </Link>
        <Link
          href="/my-booking"
          prefetch={true}
          className={`text-muted-foreground py-2 w-1/3 text-center ${
            currentPath.startsWith("/my-booking") &&
            "bg-white rounded-md text-primary shadow-sm"
          }`}
        >
          My Booking
        </Link>
        <Link
          href="/profile"
          prefetch={true}
          className={`text-muted-foreground py-2 w-1/3 text-center ${
            currentPath.startsWith("/profile") &&
            "bg-white rounded-md text-primary shadow-sm"
          }`}
        >
          Profile
        </Link>
      </ul>
    </nav>
  );
};

export default UserNavbar;
