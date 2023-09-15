"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [Data, setData] = useState("nothing");
  const [Username, setUsername] = useState("");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      console.log("logout successfully");
      toast.success("logout successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("api/users/me");
    console.log(res.data);
    setData(res.data.data._id); // 2nd data  is from the me/route.ts
    setUsername(res.data.data.username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      {/* <p>Profile page</p> */}
      <h2 className=" bg-purple-400 rounded px-4 py-1 text-black">
        {Data === "nothing" ? (
          "Nothing is here"
        ) : (
          <Link href={`/profile/${Username}`}>{Username}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={getUserDetails}
        className="bg-lime-400 hover:bg-lime-500 text-black mt-4  font-bold py-2 px-4 rounded"
      >
        Get User Details
      </button>

      <button
        onClick={logout}
        className="bg-slate-400 hover:bg-slate-500 text-black mt-4  font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
