"use client";
import React from "react";
import Link from "next/link";
const FacultySideBarMobile = () => {
    const [editProf, setEditProf] = React.useState(false);
    const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      {isOpen ? (
        <button
          className="w-screen sm:hidden bg-white py-2 pl-[90vw] text-slate-500 font-medium"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      ) : (
        <>
          <button
            className="flex flex-row items-center text-slate-500 font-medium sm:hidden py-2 pl-2"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            Menu&nbsp;
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </>
      )}
      {isOpen ? (
        <aside className="absolute z-10 sm:hidden flex flex-col bg-white min-h-screen h-inherit w-full text-slate-500">
          <div className="flex flex-col bg-white h-fit pb-24">
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
            ) : (
                <></>
              )}
            </div>

  );
}

export default FacultySideBarMobile;
