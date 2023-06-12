"use client";
import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Link from "next/link";
const Drives = () => {
  const AuthData: any = useAuth();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [drive, setDrive]: any = useState(null);
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All Drives");
  const [companyName, setCompanyName]: any = useState([]);
  const [showCompanyName, setShowCompanyName]: any = useState(false);
  const [selectedCompany, setselectedCompany]: any = useState("Select Company");
  const fetchDrive = async () => {
    const response = await axios.get(`${server}/filter/drive`, {
      headers: {
        "Content-Type": "application/json",
        
      },
      withCredentials: true,
    });
    let compArr = [];
    for (let i = 0; i < response.data.length; i++) {
      response.data[i]["pack"] = response.data[i]["package"];
      compArr.push({
        company_id: response.data[i]["company_id"],
        company_name: response.data[i]["company_name"],
      });
    }
    setCompanyName(compArr);
    setDrive(response.data);
  };
  const fetchCompanyDrive = async (id: number) => {
    const response = await axios.get(`${server}/filter/company/drive/${id}`, {
      headers: {
        "Content-Type": "application/json",
        
      },
      withCredentials: true,
    });
    for (let i = 0; i < response.data.length; i++) {
      response.data[i]["pack"] = response.data[i]["package"];
    }
    setDrive(response.data);
    setOpen(!open);
  };
  useEffect(() => {
    fetchDrive();
  }, []);
  return (
    <div className="w-full flex justify-center items-center align-middle flex-col">
      <div className="flex bg-white w-10/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          All Drives
        </h3>
        <div className=" ml-auto mb-8 mr-2 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
          <div className="relative text-left inline-block w-full">
            <div>
              <button
                onClick={() => {
                  setShowFilter(!showFilter);
                }}
                className="inline-flex w-full justify-between rounded-md border border-gray-500 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
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
                        setSelectedFilter("All Drives");
                        setShowFilter(!showFilter);
                      }}
                      className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                    >
                      All Drives
                    </button>

                    <button
                      onClick={() => {
                        setOpen(!open);
                        setSelectedFilter("Company Drive");
                        setShowFilter(!showFilter);
                      }}
                      className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                    >
                      Company Drive
                    </button>
                  </div>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        {drive == null ? (
          <></>
        ) : drive.length == 0 ? (
          <>
            <h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
              No Drives Created Yet
            </h3>
          </>
        ) : (
          <div className="flex flex-col w-full">
            {drive.map(
              ({
                drive_id,
                role,
                role_desc,
                job_location,
                tenth_percent,
                twelveth_percent,
                pack,
                cgpa,
                be_percent,
                gap,
                live_kt,
                dead_kt,
              }: any) => (
                <div
                  key={drive_id}
                  className="flex flex-col mx-auto mb-3 w-11/12 px-2 py-3 bg-white border-2 border-neutral-300 rounded-lg drop-shadow-xl"
                >
                  <div className="flex flex-col py-1 w-full border-b-2 border-b-slate-500">
                    <h2 className="underline underline-offset-2 text-xl font-semibold">
                      {role}
                    </h2>
                    <h2 className="text-base font-semibold text-center sm:text-left mb-1 mt-1">
                      {role_desc}
                    </h2>
                  </div>
                  <h2 className="text-base font-medium text-center sm:text-left mb-1 mt-1">
                    Location: {job_location}
                  </h2>
                  <h2 className="underline underline-offset-2 text-base font-semibold text-center sm:text-left mb-1 mt-2">
                    Criteria -
                  </h2>
                  <h2 className="text-sm font-medium text-center sm:text-left mb-1 mt-1">
                    Tenth-percent: {tenth_percent}
                  </h2>
                  <h2 className="text-sm font-medium text-center sm:text-left mb-1 mt-1">
                    Twelveth-percent: {twelveth_percent}
                  </h2>
                  <h2 className="text-sm font-medium text-center sm:text-left mb-1 mt-1">
                    CTC: {pack}
                  </h2>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden sm:rounded-lg text-left shadow-xl transition-all my-0 h-screen sm:h-fit sm:my-8 w-screen sm:w-full sm:max-w-lg">
                  <div className="bg-white h-full px-3 pt-2 pb-2 sm:p-6 sm:pb-4 overflow-y-auto">
                    <div className="flex flex-col sm:flex-row sm:items-start">
                      <svg
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="block sm:hidden absolute top-0 right-2 w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900 flex flex-row items-center justify-center sm:justify-between"
                        >
                          Select Company
                          <svg
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="hidden sm:block w-4 h-4 sm:w-6 sm:h-6 my-2 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Dialog.Title>

                        <div className="mb-3 flex flex-row gap-2 py-5 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                          <div className="relative text-left inline-block w-full">
                            <div>
                              <button
                                onClick={() => {
                                  setShowCompanyName(!showCompanyName);
                                }}
                                className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                              >
                                {selectedCompany}
                                {showCompanyName ? (
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
                            {showCompanyName ? (
                              <>
                                <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                  <div className="py-1">
                                    {companyName.map(
                                      ({ company_id, company_name }: any) => (
                                        <button
                                          key={company_id}
                                          onClick={() => {
                                            setselectedCompany(company_name);
                                            setShowCompanyName(
                                              !showCompanyName
                                            );
                                            fetchCompanyDrive(company_id);
                                          }}
                                          className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                                        >
                                          {company_name}
                                        </button>
                                      )
                                    )}
                                  </div>
                                </div>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default Drives;
