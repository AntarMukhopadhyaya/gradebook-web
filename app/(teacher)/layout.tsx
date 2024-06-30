import ProtectedRoute from "@/components/ProtectedRoute";
import React, { ReactNode, Suspense } from "react";
import Loading from "./loading";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <ProtectedRoute role="teacher">{children}</ProtectedRoute>
      </Suspense>
    </div>
  );
};

export default layout;
