"use client";
import useAuthStore from "@/Stores/UserStore";
import { BACKEND } from "@/config";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Login({ isRegister = false }: { isRegister?: boolean }) {
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function getData(data: any) {
    const res = await fetch(
      `${BACKEND}/u/${isRegister ? "register" : "login"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setLoginForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (isRegister && loginForm.password !== loginForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log("handlesubmit");
    try {
      setLoading(true);
      const response = await getData(loginForm);
      console.log("Login successful:", response);
      login(response.token);
      toast.success("Logged In...");
      router.push("/dashboard");
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
      console.error("Login failed:", error);
    }
  };
  if (loading) {
    return <span className="loading loading-dots loading-lg"></span>;
  }
  return (
    <div className="w-full max-w-sm p-6 bg-gray-200 rounded-lg shadow-md h-fit mt-10 mx-5">
      <h2 className="mb-4 text-2xl text-black font-bold text-center">
        {isRegister ? "Register" : "Login"}
      </h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={loginForm.email}
            onChange={handleChange}
            className="w-full px-5 py-2 rounded-full bg-slate-600 shadow-sm focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-bold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={loginForm.password}
            onChange={handleChange}
            className="w-full px-5 py-2 border rounded-full shadow-sm bg-slate-600 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        {isRegister && (
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-bold text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={loginForm.confirmPassword}
              onChange={handleChange}
              className="w-full px-5 py-2 border rounded-full shadow-sm bg-slate-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            {isRegister ? "Register" : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
