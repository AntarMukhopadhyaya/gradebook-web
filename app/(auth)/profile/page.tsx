"use client";
import useAuthStore from "@/Stores/UserStore";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { user }: { user: any } = useAuthStore();
  const router = useRouter();
  if (!user) {
    toast.error("You need to login first");
    return router.push("/login");
  }
  return (
    <div className="flex justify-center min-h-screen">
      <div className="card w-96 bg-white shadow-lg rounded-lg p-4 h-fit mt-24">
        <div className="flex items-center space-x-4 mb-4">
          <div className="avatar">
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <img src={user.avatar} />
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold">DUMMY</h2>
            <p className="text-sm text-gray-500">Software Engineer</p>
          </div>
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">ID:</span> {user._id}
          </p>
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Role:</span> {user.role}
          </p>
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Created At:</span>{" "}
            {new Date(user.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="mb-2 flex items-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Verified:</span>
          </p>
          <div className="ml-2">
            {user.verified ? (
              <span className="badge badge-success">Yes</span>
            ) : (
              <span className="badge badge-error">No</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
