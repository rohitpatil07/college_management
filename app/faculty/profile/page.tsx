"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
const Page = () => {
    const AuthData : any  = useAuth();
    console.log(AuthData);
  return (
    <div className="sm:w-[80%] mt-5 mx-auto flex flex-col drop-shadow-lg items-center bg-white container rounded-2xl">
    <div className="w-full flex flex-col items-center gap-2">
        <div>
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 text-center mt-5">
                Profile
            </h3>
        </div>
    </div>
    </div>
  )
}

export default Page;