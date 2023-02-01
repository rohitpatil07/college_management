"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
const   Dashboard = () => {
  const router = useRouter();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const AuthData: any = useAuth();
  const [semester, setSemester] = useState(
    parseInt(`${AuthData.user.userData.user.semester}`)
  );
  const [subjects, setSubjects]: any = useState([]);
  const [showForm, setshowForm] = useState(false);
  const [showFormButton, setshowFormButton] = useState(false);
  const [formData, setFormData]: any = useState();
  const [showSemesterType, setShowSemesterType] = useState(false);
  let fac_data = subjects.faculty;
  const viewSubject = {
    roll_no: `${AuthData.user.userData.user.roll_no}`,
    semester: parseInt(`${AuthData.user.userData.user.semester}`),
    batch: parseInt(`${AuthData.user.userData.user.batch}`),
    department: `${AuthData.user.userData.user.department}`,
  };
  const get_subject = async () => {
    if (AuthData.user.userData.user.semester) {
      if (semester != parseInt(`${AuthData.user.userData.user.semester}`)) {
        const responsee = await axios.get(
          `${server}/lms/filter/department/subject/${AuthData.user.userData.user.batch}/${AuthData.user.userData.user.department}/${semester}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthData.user.token}`,
            },
          }
        );
        console.log("H", responsee);
        setSubjects(responsee.data);
      } else {
        const response = await axios.post(
          `${server}/lms/filter/student/subjects`,
          viewSubject,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthData.user.token}`,
            },
          }
        );
        console.log(response.data);
        if (response.data["enrolled_data"]) {
          setshowFormButton(true);
          setSubjects(response.data["enrolled_data"]);
          let zeebag: any = [];
          let zendai: any = [];
          for (let i = 0; i < response.data["form_data"].length; i++) {
            zeebag.push(Object.entries(response.data["form_data"][i]));
          }

          setFormData(zeebag);
        } else {
          setSubjects(response.data);
        }
      }
    }
  };
  const [subjectId, setsubjectId] = useState<number[]>([]);
  const setting_form_data = (
    array_no: number,
    index_no: number,
    d: number,
    id: number
  ) => {
    let forms = [...formData];
    let subId = [...subjectId];
    for (let i = 0; i < forms[array_no][d][1].length; i++) {
      if (subId.includes(forms[array_no][d][1][i]["subject_id"])) {
        subId.splice(subId.indexOf(forms[array_no][d][1][i]["subject_id"]), 1);
      }
    }
    subId.push(id);
    setsubjectId(subId);
    setFormData(forms);
  };
  const submit_opt_sub_resp = async () => {
    const body = {
      roll_no: [`${AuthData.user.userData.user.roll_no}`],
      subject_id: subjectId,
    };
    const response = await axios.post(`${server}/lms/form/addDILO`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthData.user.token}`,
      },
    });
    if (response.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Response Received",
        showConfirmButton: false,
        timer: 1500,
      });
      setshowForm(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed To Add Subjects",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  useEffect(() => {
    get_subject();
  }, [subjects]);
  return (
    <div className="w-full flex justify-center items-center align-middle">
      <div className="flex bg-slate-100 sm:bg-white w-full sm:w-11/12 mt-5 flex-col pt-8 items-center sm:rounded-2xl sm:drop-shadow-lg">
        <div className="w-11/12 mx-auto flex flex-col  justify-around container py-3 text-slate-500 font-medium">
          <Link
            href="/home"
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
          <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base font-medium">
            <div className="relative text-left inline-block w-full">
              <div>
                <button
                  onClick={() => {
                    setShowSemesterType(!showSemesterType);
                  }}
                  className="inline-flex w-full justify-between rounded-md border border-red-300 bg-accent px-4 py-2 text-xs sm:text-sm font-medium shadow-sm hover:bg-red-700 text-white"
                >
                  {semester == 1
                    ? "Semester I"
                    : semester == 2
                    ? "Semester II"
                    : semester == 3
                    ? "Semester III"
                    : semester == 4
                    ? "Semester IV"
                    : semester == 5
                    ? "Semester V"
                    : semester == 6
                    ? "Semester VI"
                    : semester == 7
                    ? "Semester VII"
                    : "Semester VIII"}
                  {showSemesterType ? (
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
              {showSemesterType ? (
                <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setSemester(1);
                        setShowSemesterType(!showSemesterType);
                      }}
                      className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                    >
                      I
                    </button>
                    <button
                      onClick={() => {
                        setSemester(2);
                        setShowSemesterType(!showSemesterType);
                      }}
                      className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                    >
                      II
                    </button>
                    <button
                      onClick={() => {
                        setSemester(3);
                        setShowSemesterType(!showSemesterType);
                      }}
                      className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                    >
                      III
                    </button>
                    <button
                      onClick={() => {
                        setSemester(4);
                        setShowSemesterType(!showSemesterType);
                      }}
                      className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                    >
                      IV
                    </button>
                    <button
                      onClick={() => {
                        setSemester(5);
                        setShowSemesterType(!showSemesterType);
                      }}
                      className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                    >
                      V
                    </button>
                    <button
                      onClick={() => {
                        setSemester(6);
                        setShowSemesterType(!showSemesterType);
                      }}
                      className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                    >
                      VI
                    </button>
                    <button
                      onClick={() => {
                        setSemester(7);
                        setShowSemesterType(!showSemesterType);
                      }}
                      className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                    >
                      VII
                    </button>
                    <button
                      onClick={() => {
                        setSemester(8);
                        setShowSemesterType(!showSemesterType);
                      }}
                      className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                    >
                      VIII
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {showFormButton ? (
            <button
              onClick={() => {
                setshowForm(true);
              }}
              className="mt-1 sm:mt-0 p-2 w-fit px-4 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
            >
              Select Opt Subjects
            </button>
          ) : (
            ""
          )}
        </div>
        {subjects ? (
          <div className="flex flex-col md:flex-row flex-wrap justify-evenly items-center w-full mb-5">
            {subjects.map(
              (
                {
                  subject_id,
                  subject_name,
                  semester,
                  department,
                  batch,
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
                    alt={subject_name}
                    className="w-full h-[15rem] min-h-[10rem] object-cover rounded-xl"
                  />
                  <div className="text-lg sm:text-xl font-medium text-gray-900 my-4 text-center">
                    {subject_name}
                  </div>
                  <Link
                    href={{
                      pathname: "/lms/subject",
                      query: {
                        subject_id: subject_id,
                        subject_name: subject_name,
                        email: email,
                        fac_data: fac_data,
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
        ) : (
          <>
            <Loading loadState="loading" />
          </>
        )}
      </div>
      {showForm ? (
        <div className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white border-solid border-2 border-neutral-200 rounded-lg px-4 mx-auto sm:mx-0 w-11/12 sm:w-10/12">
            <div className="border-b-2 border-gray-700 py-2 flex flex-row justify-between">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Optional Subjects Form
              </h3>
              <button
                onClick={() => {
                  setshowForm(false);
                }}
                className="w-fit h-fit rounded-full text-black hover:bg-red-500 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
            <div>
              {formData ? (
                <>
                  {formData.map((value: any, i: number) => (
                    <>
                      {value.map((z: any, d: number) => (
                        <>
                          {z[0].includes("D") ? (
                            <>
                              <h2 className="text-black text-lg">
                                DLO Subjects {z[0].slice(-1)}
                              </h2>
                              {z[1].map(
                                (
                                  {
                                    batch,
                                    department,
                                    division,
                                    email,
                                    semester,
                                    subject_code,
                                    subject_id,
                                    subject_name,
                                    type,
                                  }: any,
                                  k: number
                                ) => (
                                  <div
                                    key={subject_id}
                                    className="flex flex-row  items-center"
                                  >
                                    <input
                                      type="radio"
                                      id={type + z[0].slice(-1)}
                                      name={type + z[0].slice(-1)}
                                      onClick={() => {
                                        setting_form_data(i, k, d, subject_id);
                                      }}
                                      className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-500 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    />
                                    <div className="flex flex-col w-full m-2 bg-gray-100 p-2 rounded-xl drop-shadow-xl">
                                      <div className="flex flex-row justify-between items center sm:border-b-2 sm:border-b-gray-500">
                                        <h2 className="text-gray-700 text-lg">
                                          {subject_name}
                                        </h2>
                                        <h2 className="text-gray-700 text-lg">
                                          {subject_code}
                                        </h2>
                                      </div>
                                      <h2 className="hidden sm:block text-gray-500 text-lg">
                                        Faculty Mail : {email}
                                      </h2>
                                    </div>
                                  </div>
                                )
                              )}
                            </>
                          ) : (
                            <>
                              <h2 className="text-black text-lg">
                                ILO Subjects {z[0].slice(-1)}
                              </h2>
                              {z[1].map(
                                (
                                  {
                                    batch,
                                    department,
                                    division,
                                    email,
                                    semester,
                                    subject_code,
                                    subject_id,
                                    subject_name,
                                    type,
                                  }: any,
                                  k: number
                                ) => (
                                  <div
                                    key={subject_id}
                                    className="flex flex-row  items-center"
                                  >
                                    <input
                                      type="radio"
                                      id={type + z[0].slice(-1)}
                                      name={type + z[0].slice(-1)}
                                      onClick={() => {
                                        setting_form_data(i, k, d, subject_id);
                                      }}
                                      className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-500 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    />
                                    <div className="flex flex-col w-full m-2 bg-gray-100 p-2 rounded-xl drop-shadow-xl">
                                      <div className="flex flex-row justify-between items center sm:border-b-2 sm:border-b-gray-500">
                                        <h2 className="text-gray-700 text-lg">
                                          {subject_name}
                                        </h2>
                                        <h2 className="text-gray-700 text-lg">
                                          {subject_code}
                                        </h2>
                                      </div>
                                      <h2 className="hidden sm:block text-gray-500 text-lg">
                                        Faculty Mail : {email}
                                      </h2>
                                    </div>
                                  </div>
                                )
                              )}
                            </>
                          )}
                        </>
                      ))}
                    </>
                  ))}
                </>
              ) : (
                ""
              )}
            </div>
            <div className="flex justify-center items-center w-100 mt-3 border-t text-white p-3">
              <button
                onClick={submit_opt_sub_resp}
                className="px-3 py-1 rounded bg-accent text-white hover:scale-105 mr-2 transition-all"
              >
                Submit
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

export default Dashboard;
