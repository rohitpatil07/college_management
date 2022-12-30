'use client'
import React from "react";
import PersonalInfo from "../../../../components/Dashboard/PersonalInfo";
import Link from "next/link";
const page = () => {
  return (
    <div className="w-full flex flex-col bg-slate-200 ">
      <div className="w-11/12 mx-auto flex flex-col  justify-around container py-3 text-slate-500 font-medium">
        <Link href='/home' className="flex flex-row items-center pb-2 mb-1 border-b border-slate-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              clipRule="evenodd"
            />
          </svg>
          Home / Personal Info
        </Link>
      </div>
      <PersonalInfo />
    </div>
  );
};

export default page;
