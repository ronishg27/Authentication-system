"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast/headless";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [Loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const respone = await axios.post("api/users/login", user);
      console.log("Login successful: ", respone.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed: ", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>{Loading ? "processing" : "Sign up"}</h1>
      <hr />
      <label htmlFor="email">Email</label>
      <input
        className="p-2 rounded-xl mb-4 border-gray-400 focus:outline-none focus:border-gray-700"
        type="email"
        name="email"
        id="email"
        value={user.email}
        placeholder="email"
        autoComplete="off"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <label htmlFor="password">password</label>
      <input
        className="p-2 rounded-xl mb-4 border-gray-400 focus:outline-none focus:border-gray-700"
        type="password"
        name="password"
        id="password"
        value={user.password}
        placeholder="password"
        autoComplete="off"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className="p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-slate-300 text-black"
        onClick={onLogin}
      >
        Login
      </button>
      <Link href="/signup" className="p-2 border rounded-lg border-gray-500">
        signup here
      </Link>
    </div>
  );
};

export default LoginPage;
