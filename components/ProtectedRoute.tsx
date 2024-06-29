"use client";
import useAuthStore from "@/Stores/UserStore";
import Link from "next/link";
import React, { ReactNode } from "react";

const ProtectedRoute = ({
  role,
  children,
}: {
  role: string;
  children: ReactNode;
}) => {
  const { user } = useAuthStore();
  if (user.role == role) {
    return children;
  }
  return (
    <div>
      <h1 className="flex flex-col gap-3 p-12 justify-center items-center text-5xl">
        Sorry, You can not access this page
        <Link href={"/"} className="btn btn-link">
          Click here to return
        </Link>
      </h1>
    </div>
  );
};

export default ProtectedRoute;
