"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import FacultSkeleton from "./Skeletons/FacultSkeleton";
import SubjectSkeleton from "./Skeletons/SubjectSkeleton";

const LmsAdminLookUp = () => {
  const router = useRouter();
  const AuthData: any = useAuth();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [showFilters, setShowFilters] = useState(false);
  const [allFaculty, setAllFaculty] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]);
  const [subswitch, setsubSwitch] = useState(false);
  const [facultyLoading, setfacultyLoading] = useState(false);
  const [subjectLoading, setsubjectLoading] = useState(false);
  const serial_text = [
    "All Faculties",
    "Faculty By Dept",
    "Faculty By Mail",
    "Subject Of Faculty",
    "Subject By Department",
    "All subjects",
  ];
  const modal_text: any = [
    "Department",
    "Email",
    "Faculty Email",
    ["Batch", "Department", "Sem"],
  ];
  const [modal_number, setmodal_number] = useState(0);
  const [modal, setmodal] = useState(false);
  const [modal_current_input, setmodal_current_input] = useState("");
  const [modal_dept_input, setmodal_dept_input] = useState(["", "", ""]);
  const deptInput = (i: number, value: string) => {
    let particular_dept_input = [...modal_dept_input];
    particular_dept_input[i] = value;
    setmodal_dept_input(particular_dept_input);
  };
  const [current_text, setcurrent_text] = useState(serial_text[0]);
  const on_serial_click = (i: number) => {
    console.log(i);
    console.log(AuthData);
    setcurrent_text(serial_text[i]);
    if (i == 0) {
      get_faculty(0);
    }
    if (i == 1) {
      setmodal_number(0);
      setmodal(true);
    }
    if (i == 2) {
      setmodal_number(1);
      setmodal(true);
    }
    if (i == 3) {
      setmodal_number(2);
      setmodal(true);
    }
    if (i == 4) {
      setmodal_number(3);
      setmodal(true);
    }
    if (i == 5) {
      get_subject(0, "");
    }
  };
  const search = (x: number) => {
    console.log(x);
    if (x == 0) {
      get_faculty(1);
    }
    if (x == 1) {
      get_faculty(2);
    }
    if (x == 2) {
      get_subject(1, "");
    }
    if (x == 3) {
      get_subject(2, "");
    }
  };
  const get_subject = async (i: number, email: string) => {
    setsubjectLoading(true);
    setsubSwitch(true);
    if (email) {
      setcurrent_text(serial_text[3]);
      const response = await axios({
        method: "post",
        url: `${server}/lms/filter/facultysubjects`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
        data: {
          email: `${email}`,
        },
      });
      response.data.sort(function (a: any, b: any) {
        return b.batch - a.batch;
      });
      setAllSubjects(response.data);
    } else {
      if (i == 0) {
        const response = await axios.get(`${server}/lms/filter/allsubjects`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthData.user.token}`,
          },
        });
        response.data.sort(function (a: any, b: any) {
          return b.batch - a.batch;
        });
        setAllSubjects(response.data);
      }
      if (i == 1) {
        if (modal_current_input == "") {
          window.alert("Enter Text");
        } else {
          const response = await axios({
            method: "post",
            url: `${server}/lms/filter/facultysubjects`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthData.user.token}`,
            },
            data: {
              email: `${modal_current_input}`,
            },
          });
          response.data.sort(function (a: any, b: any) {
            return b.batch - a.batch;
          });
          setAllSubjects(response.data);
        }
      }
      if (i == 2) {
        if (
          modal_dept_input[0] == "" ||
          modal_dept_input[1] == "" ||
          modal_dept_input[2] == ""
        ) {
          window.alert("Enter Text");
        } else {
          const response = await axios.get(
            `${server}/lms/filter/department/subject/${modal_dept_input[0]}/${modal_dept_input[1]}/${modal_dept_input[2]}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${AuthData.user.token}`,
              },
            }
          );
          response.data.sort(function (a: any, b: any) {
            return b.batch - a.batch;
          });
          setAllSubjects(response.data);
        }
      }
    }
    setmodal_current_input("");
    setsubjectLoading(false);
  };
  const get_faculty = async (i: number) => {
    setfacultyLoading(true);
    setsubSwitch(false);
    if (i == 0) {
      const response = await axios.get(`${server}/lms/filter/allfaculties`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      });
      console.log(response.data);
      setAllFaculty(response.data);
    }
    if (i == 1) {
      if (modal_current_input == "") {
        window.alert("Enter Text");
      } else {
        console.log(modal_current_input);
        const response = await axios.get(
          `${server}/lms/filter/faculty/${modal_current_input}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthData.user.token}`,
            },
          }
        );
        setAllFaculty(response.data);
      }
    }
    if (i == 2) {
      if (modal_current_input == "") {
        window.alert("Enter Text");
      } else {
        console.log(modal_current_input);
        const response = await axios.get(
          `${server}/lms/filter/mailfaculty/${modal_current_input}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthData.user.token}`,
            },
          }
        );
        setAllFaculty(response.data);
      }
    }
    setmodal_current_input("");
    setfacultyLoading(false);
  };
  useEffect(() => {
    get_faculty(0);
  }, []);
  return (
    <div className="w-full flex justify-center items-center align-middle">
      <div className="flex bg-slate-100 sm:bg-white w-full sm:w-11/12 mt-5 flex-col pt-8 items-center sm:rounded-2xl sm:drop-shadow-lg overflow-auto">
        <div className="w-11/12 mx-auto flex flex-col  justify-around container py-3 text-slate-500 font-medium">
          <Link
            href="/lms_admin/lookup"
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
            Home / LookUp
          </Link>
        </div>
        <h3 className="text-xl sm:text-2xl font-medium text-gray-900">
          LMS LookUp
        </h3>
        <div className="border-t-4 my-2 py-3 w-full md:w-11/12 flex flex-row flex-wrap items-end justify-end ">
          <div className="relative text-left inline-block w-full md:w-6/12">
            <div>
              <button
                onClick={() => {
                  setShowFilters(!showFilters);
                }}
                className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-accent text-white hover:scale-105 px-4 py-2 text-xs sm:text-sm font-medium shadow-sm focus:outline-none"
              >
                {current_text}
                {showFilters ? (
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
            {showFilters ? (
              <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {serial_text.map((value: string, x: number) => (
                    <button
                      key={x}
                      onClick={() => {
                        on_serial_click(x);
                        setShowFilters(!showFilters);
                      }}
                      className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div>
          <>
            {subswitch ? (
              <>
                {subjectLoading ? (
                  <SubjectSkeleton />
                ) : (
                  <div className="flex flex-col md:flex-row flex-wrap justify-evenly items-center w-full mb-5">
                    {allSubjects.map(
                      (
                        {
                          subject_id,
                          subject_code,
                          subject_name,
                          semester,
                          email,
                          division,
                          department,
                          batch,
                          type,
                        }: any,
                        i: number
                      ) => (
                        <div
                          key={subject_id}
                          className="px-4 py-6 text-sm w-11/12 flex flex-wrap items-center justify-between cursor-pointer mt-2 mb-2 border-solid border-2 border-neutral-200 shadow-xl drop-shadow-xl rounded-xl"
                        >
                          <div className="flex flex-wrap items-center justify-center">
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
                                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                              />
                            </svg>
                            {subject_name}
                          </div>
                          <div className="flex flex-wrap items-center ">
                            | {batch}{" "}
                            {department == "NA" ? "" : `| ${department}`}{" "}
                            {division == "NA" ? "" : `| ${division}`} |{" "}
                            {semester} | {type}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                {facultyLoading ? (
                  <FacultSkeleton />
                ) : (
                  <div className="flex flex-col md:flex-row flex-wrap justify-evenly items-center w-full mb-5">
                    {allFaculty.map(
                      (
                        {
                          college_name,
                          department,
                          photo,
                          secondary_mail,
                          phone_number,
                          middle_name,
                          linkedin,
                          last_name,
                          gender,
                          first_name,
                          email,
                        }: any,
                        i: number
                      ) => (
                        <div
                          key={i}
                          className="flex flex-col items-center px-5 w-full scale-90 sm:w-full md:w-2/5 shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden bg-white"
                        >
                          {photo ? (
                            <img
                              src={`data:image/jpeg; base64, ${photo}`}
                              className="w-[50px] h-[50px] sm:w-[75px] sm:h-[75px] rounded-full bg-white mt-2"
                              alt="Profile"
                            />
                          ) : (
                            <img
                              src="/avatar.png"
                              className="w-[50px] h-[50px] sm:w-[75px] sm:h-[75px] rounded-full bg-white mt-2"
                              alt="Profile"
                            />
                          )}

                          <h2 className="text-center text-lg sm:text-xl font-medium text-gray-900 my-4 text-center">
                            {first_name} {middle_name} {last_name}{" "}
                            {gender == "M" ? "sir" : "ma'am"}
                          </h2>
                          <h2 className="text-sm sm:text-md font-light text-gray-500  text-center ">
                            {email}
                          </h2>
                          <button
                            onClick={() => {
                              get_subject(1, email);
                            }}
                            className="my-4 w-fit mx-auto px-3 py-1 sm:px-16 sm:py-2 rounded-full bg-accent text-white hover:scale-105 transition-all"
                          >
                            Subjects
                          </button>
                        </div>
                      )
                    )}
                  </div>
                )}
              </>
            )}
          </>
        </div>
      </div>

      {modal ? (
        <div className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white border-solid border-2 border-neutral-200 rounded-lg px-4 mx-auto sm:mx-0 w-11/12 sm:w-5/12">
            <div className="border-b-2 border-gray-900 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Search
              </h3>
            </div>

            {modal_number == 3 ? (
              <>
                {modal_text[3].map((value: string, x: number) => (
                  <div
                    key={x}
                    className="mb-8 mt-2 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium"
                  >
                    <label>{modal_text[modal_number][x]}</label>
                    <input
                      className="rounded-md border border-gray-700 py-1 px-1 w-7/12"
                      value={modal_dept_input[x]}
                      onChange={(e) => {
                        deptInput(x, e.target.value);
                      }}
                      type="text"
                    ></input>
                  </div>
                ))}
              </>
            ) : (
              <div className="mb-8 mt-2 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                <label>{modal_text[modal_number]}</label>
                <input
                  className="rounded-md border border-gray-700 py-1 px-1 w-7/12"
                  value={modal_current_input}
                  onChange={(e) => {
                    setmodal_current_input(e.target.value);
                  }}
                  type="text"
                ></input>
              </div>
            )}
            <div className="flex justify-end items-center w-100 border-t text-white p-3">
              <button
                onClick={() => {
                  search(modal_number);
                  setmodal(false);
                }}
                className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 mr-2"
              >
                Search
              </button>
              <button
                onClick={() => {
                  setmodal(false);
                }}
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LmsAdminLookUp;
