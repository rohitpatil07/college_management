"use client";
import React from "react";
import Link from "next/link";
const FacultySideBar = () => {
  return (
    <aside className="hidden sm:flex flex-col bg-white min-h-screen h-inherit sm:2/5 md:w-1/5 text-slate-500">
    <div className="flex flex-col bg-white pb-24">
      <Link
        href="/faculty/dashboard"
        className="xs:hidden sm:flex flex flex-row px-2 py-2 items-center font-medium hover:bg-blue-100 active:bg-blue-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
        Dashboard
      </Link>
      </div>
      </aside>
  )
}

export default FacultySideBar