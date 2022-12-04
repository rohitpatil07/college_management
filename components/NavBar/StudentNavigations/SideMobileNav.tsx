"use client";
import React from "react";
import Link from "next/link";
const SideMobile = () => {
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
        <aside className="absolute z-10 block sm:hidden flex flex-col bg-white min-h-screen h-inherit w-full text-slate-500">
          <div className="flex flex-col bg-white h-fit pb-24">
            <Link
              href="/home"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="flex flex-row px-2 py-2 items-center font-medium hover:bg-blue-100 active:bg-blue-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp;&nbsp; Home
            </Link>
            <button
              onClick={() => {
                setEditProf(!editProf);
              }}
              className="flex flex-row px-2 py-2 justify-between items-center font-medium hover:bg-blue-100 active:bg-blue-100"
            >
              <div className="flex flex-row ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                </svg>
                &nbsp;&nbsp;Edit Profile
              </div>
              <div className="flex flex-row ">
                {editProf ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.77 12.79a.75.75 0 01-1.06-.02L10 8.832 6.29 12.77a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
                &nbsp;
              </div>
            </button>
            {editProf ? (
              <div className="flex flex-col w-full">
                <Link
                  href="/tpc/editProfile/personalInfo"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  className="px-8 py-2 font-medium hover:bg-blue-100 active:bg-blue-100"
                >
                  Personal Info
                </Link>
                <Link
                  href="/tpc/editProfile/academicDetails"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  className="px-8 py-2 font-medium hover:bg-blue-100 active:bg-blue-100"
                >
                  Academic Details
                </Link>
                <Link
                  href="/tpc/editProfile/workExperience"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  className="px-8 py-2 font-medium hover:bg-blue-100 active:bg-blue-100"
                >
                  Work Experience
                </Link>
                <Link
                  href="/tpc/editProfile/project"
                  className="px-8 py-2 font-medium hover:bg-blue-100 active:bg-blue-100"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  Projects
                </Link>
                <Link
                  href="/"
                  className="px-8 py-2 font-medium hover:bg-blue-100 active:bg-blue-100"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                >
                  Offer Details
                </Link>
                <Link
                  href="/tpc/editProfile/changePassword"
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  className="px-8 py-2 font-medium hover:bg-blue-100 active:bg-blue-100"
                >
                  Change Password
                </Link>
              </div>
            ) : (
              <></>
            )}
            <Link
              href="/tpc/availableDrives"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="flex flex-row items-center font-medium  px-2 py-2 hover:bg-blue-100 active:bg-blue-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp;&nbsp; Available Drives
            </Link>
            <Link
              href="/"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="flex flex-row px-2 py-2 items-center font-medium hover:bg-blue-100 active:bg-blue-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp;&nbsp; Applied Drives
            </Link>
            <Link
              href="/"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="flex flex-row px-2 py-2 items-center font-medium hover:bg-blue-100 active:bg-blue-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 2A1.5 1.5 0 003 3.5v13A1.5 1.5 0 004.5 18h11a1.5 1.5 0 001.5-1.5V7.621a1.5 1.5 0 00-.44-1.06l-4.12-4.122A1.5 1.5 0 0011.378 2H4.5zm7.75 9.75a.75.75 0 000-1.5h-4.5a.75.75 0 000 1.5h4.5z"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp;&nbsp; View / Download Resume
            </Link>
          </div>
          <Link
            href="#"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            className="flex flex-row px-2 py-2 items-center font-medium border-t hover:bg-blue-100 active:bg-blue-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
                clipRule="evenodd"
              />
            </svg>
            &nbsp;&nbsp; Log Out
          </Link>
        </aside>
      ) : (
        ""
      )}
    </div>
  );
};

export default SideMobile;
