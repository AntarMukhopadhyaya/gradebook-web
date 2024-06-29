import Login from "@/components/Login";
import React from "react";

function Page() {
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen">
        <Login isRegister={true} />
      </div>
    </div>
  );
}

export default Page;
