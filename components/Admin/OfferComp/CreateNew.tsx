"use client";
import React, { Fragment, useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { Dialog, Transition } from "@headlessui/react";
const CreateNew = ({ children }: any) => {
  const AuthData: any = useAuth();
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [newInfo, setNewInfo]: any = useState({
    roll_no: "",
    company_name: "",
    role: "",
  });
  const [companyData, setCompanyData]: any = useState([]);
  const [companyName, setCompanyName]: any = useState([]);
  const [showCompanyName, setShowCompanyName] = useState(false);
  const [selectedCompany, setselectedCompany] = useState("Select Company");
  const [drive, setdrive] = useState([]);
  const [drive_message, setdrive_message] = useState("");
  const [showPackage, setShowPackage] = useState(false);
  const [selectedPackage, setselectedPackage] = useState("Select Package");
  const [showRole, setShowRole] = useState(false);
  const [selectedRole, setselectedRole] = useState("Select Role");
  const get_info = async () => {
    const response = await axios.get(`${server}/filter/company/drives`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthData.user.token}`,
      },
    });
    let compArr = [];
    for (let i = 0; i < response.data.length; i++) {
      compArr.push(
        {
          company_id: response.data[i]["company_id"],
          company_name: response.data[i]["company_name"],
        },
      );
    }
    setCompanyName(compArr);
    setCompanyData(response.data);
  };
  const updateEntries = (id: number) => {
    let info = { ...newInfo };
    for (let i = 0; i < companyData.length; i++) {
      if (companyData[i]["company_id"] == id) {
        info["company_name"] = companyData[i]["company_name"];
        if (
          companyData[i]["drive"].length == 0 ||
          companyData[i]["drive"] == null
        ) {
          setdrive_message(
            `No Drives Created For ${companyData[i]["company_name"]}`
          );
        } else {
          setdrive(companyData[i]["drive"]);
        }
      }
    }
    setNewInfo(info);
  };
  const updateOtherFields = (id: number, type: string, value: any) => {
    let info = { ...newInfo };
    info[type] = value;
    info['drive_id'] = id;
    for (let i = 0; i < drive.length; i++) {
      if (drive[i]["drive_id"] == id) {
        info["package"] = drive[i]["package"];
      }
    }
    setNewInfo(info);
  };
  const updateRoll=(value:string)=>{
    let info={...newInfo};
    info['roll_no'] = value;
    setNewInfo(info);
  }
  useEffect(() => {
    return () => {
      get_info();
    };
  }, []);
  const [loading, setLoading] = useState(false);
  const submit = async () => {
    if (
      newInfo["roll_no"] == "" ||
      newInfo["company_name"] == "" ||
      newInfo["package"] == 0 ||
      newInfo["role"] == ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Fill All The Details",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setLoading(true);
      newInfo["package"] = parseInt(newInfo["package"]);
      const body = { offer: newInfo };
      const response = await axios.post(
        `${server}/add/admin/student/offer`,
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthData.user.token}`,
          },
        }
      );
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Successfully Entered Data",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (response.status == 401) {
        Swal.fire({
          icon: "warning",
          title: "Maximum Offers Reached",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Something Went Wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setLoading(false);
      setNewInfo({ roll_no: "", company_name: "", role: "" });
    }
  };
  return (
    <>
      {children ? (
        <span
          onClick={() => {
            setOpen(!open);
          }}
        >
          {children}
        </span>
      ) : (
        ""
      )}
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
                  <div className="bg-white h-full px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
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
                          Add Offer
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
                        <div className="mt-2">
                          <input
                            type="text"
                            placeholder="Roll No"
                            value={newInfo["roll_no"]}
                            onChange={(e) => {
                              updateRoll(e.target.value)
                            }}
                            className="w-full my-2 border border-gay-500 px-1 py-2 rounded-md"
                          />

                          <div className="mb-3 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
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
                                              updateEntries(company_id);
                                              setselectedCompany(company_name);
                                              setShowCompanyName(
                                                !showCompanyName
                                              );
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

                          {drive.length != 0 || drive != null ? (
                            <>
                              <div className="mb-3 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                                <div className="relative text-left inline-block w-full">
                                  <div>
                                    <button
                                      onClick={() => {
                                        setShowRole(!showRole);
                                      }}
                                      className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                                    >
                                      {selectedRole}
                                      {showRole ? (
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
                                  {showRole ? (
                                    <>
                                      <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                          {drive.map(
                                            ({ drive_id, role }: any) => (
                                              <button
                                                key={drive_id}
                                                onClick={() => {
                                                  updateOtherFields(
                                                    drive_id,
                                                    "role",
                                                    role
                                                  );
                                                  setselectedRole(role);
                                                  setShowRole(!showRole);
                                                }}
                                                className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                                              >
                                                {role}
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
                            </>
                          ) : (
                            <>{drive_message}</>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hidden sm:block bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {loading ? (
                      <button
                        disabled
                        className="flex flex-row items-center justify-center px-3 py-1 rounded bg-gray-400 text-white mr-1"
                      >
                        Add <ClipLoader size={15} color="#d63636" />
                      </button>
                    ) : (
                      <button
                        onClick={submit}
                        className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 mr-1"
                      >
                        Add
                      </button>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default CreateNew;
