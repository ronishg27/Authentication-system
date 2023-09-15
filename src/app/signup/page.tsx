"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [Loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success: ", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed, error: ", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.username.length > 0 &&
      user.email.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
      <h1>{Loading ? "Processing" : "Sign up"} </h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-2 rounded-xl mb-4 border-gray-400 focus:outline-none focus:border-gray-700"
        type="text"
        name="username"
        id="username"
        value={user.username}
        placeholder="username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        autoComplete="off"
      />
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
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button
        className="p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-slate-300 text-black"
        onClick={onSignup}
      >
        {buttonDisabled ? "No signup" : "Signup here"}
      </button>
      <Link href="/login" className="p-2 border rounded-lg border-gray-500">
        Login here
      </Link>
    </div>
  );
};

export default SignupPage;
