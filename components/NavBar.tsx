"use client";
import useAuthStore from "@/Stores/UserStore";
import Link from "next/link";
import { useEffect, useState } from "react";

function NavBar() {
  const [isMounted, setIsMounted] = useState<boolean | null>(null);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { isAuthenticated, user, logout } = useAuthStore();
  if (!isMounted) return null;
  return (
    <div className="navbar bg-base-300 pt-3">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost text-xl">
          GradeBook
          {user && user.role === "teacher" ? (
            <span className="badge badge-primary badge-sm">teacher</span>
          ) : (
            <span className="badge badge-secondary badge-sm">student</span>
          )}
        </Link>
      </div>
      <div className="flex-none gap-2">
        {user && isAuthenticated ? (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="avatar mx-3">
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
                <img src={user.avatar} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href={"/profile"} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={() => logout()}>Logout</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-1">
            <Link className="btn btn-ghost btn-sm" href="/login">
              Login
            </Link>
            <Link
              className="btn btn-outline btn-primary btn-sm"
              href="/register"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
