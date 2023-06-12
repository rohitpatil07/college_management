"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
const Dashboard = () => {
  const router = useRouter();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const AuthData: any = useAuth();
  const [subjects, setSubjects]: any = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Subjects");
  const get_subject = async () => {
    const response = await axios({
      method: "post",
      url: `${server}/lms/filter/facultysubjects`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthData.user.token}`,
      },
      data: {
        email: `${AuthData.user.userData.user.email}`,
      },
    });
    console.log(response.data);
    setSubjects(response.data);
  };
  const sorting = (e: string) => {
    let sub: any = [];
    if (e == "l") {
      sub = subjects.sort(function (a: any, b: any) {
        return b.subject_id - a.subject_id;
      });
    } else {
      sub = subjects.sort(function (a: any, b: any) {
        return a.subject_id - b.subject_id;
      });
    }
    setSubjects(sub);
  };
  useEffect(() => {
    get_subject();
  }, []);
  return (
    <div className="w-full flex justify-center items-center align-middle">
      <div className="flex bg-slate-100 sm:bg-white w-full sm:w-11/12 mt-5 flex-col pt-8 items-center sm:rounded-2xl sm:drop-shadow-lg">
        <div className="w-11/12 mx-auto flex flex-col  justify-around container py-3 text-slate-500 font-medium">
          <Link
            href="/faculty/dashboard"
            className="flex flex-row items-center pb-2 mb-1 border-b border-slate-300"
          >
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
            Home / Dashboard
          </Link>
        </div>
        <h3 className="text-xl sm:text-2xl font-medium text-gray-900">
          All Subjects
        </h3>
        <div className="border-t-4 my-2 py-3 w-11/12 flex flex-row flex-wrap items-center justify-between">
          <Link
            href={"/faculty/addSub"}
            className="flex items-center p-2 w-fit px-4 py-2 rounded-lg bg-accent text-white hover:scale-105 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 mr-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Add New Subject
          </Link>

          <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
            <div className="relative text-left inline-block w-full">
              <div>
                <button
                  onClick={() => {
                    setShowFilter(!showFilter);
                  }}
                  className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                >
                  {selectedFilter}
                  {showFilter ? (
                    ""
                  ) : (
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {showFilter ? (
                <>
                  <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          sorting("f");
                          setSelectedFilter("All Subjects");
                          setShowFilter(!showFilter);
                        }}
                        className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                      >
                        All Subjects
                      </button>

                      <button
                        onClick={() => {
                          sorting("l");
                          setSelectedFilter("Latest First");
                          setShowFilter(!showFilter);
                        }}
                        className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                      >
                        Latest First
                      </button>
                      <button
                        onClick={() => {
                          sorting("f");
                          setSelectedFilter("Oldest First");
                          setShowFilter(!showFilter);
                        }}
                        className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                      >
                        Oldest First
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap justify-evenly items-center w-full mb-5">
          {subjects.map(
            (
              {
                subject_id,
                subject_code,
                subject_name,
                semester,
                department,
                batch,
                division,
                type,
                email,
              }: any,
              i: number
            ) => (
              <div
                key={subject_id}
                className="flex flex-col items-center w-10/12 scale-90 sm:w-3/5 md:w-2/5 shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden bg-white"
              >
                <img
                  src={`/subjects/subject${i + 1}.jpg`}
                  className="w-full h-[15rem] min-h-[10rem] object-cover rounded-xl"
                />
                <div className="text-lg sm:text-xl font-medium text-gray-900 my-4 text-center">
                  {subject_name}
                </div>
                <Link
                  href={{
                    pathname: "/faculty/subject",
                    query: {
                      subject_id: subject_id,
                      subject_name: subject_name,
                    },
                  }}
                  className="mb-4 w-fit mx-auto px-16 py-2 rounded-full bg-accent text-white hover:scale-105 transition-all"
                >
                  Open
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
