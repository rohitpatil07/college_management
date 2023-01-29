"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
const server=process.env.NEXT_PUBLIC_SERVER_URL;

const CreateForm = () => {
  const AuthData: any = useAuth();
  const [createdForm, setCreatedForm] = useState([]);
  const [createdFormData, setCreatedFormData]: any = useState();
  const [displayData, setdisplayData] = useState(false);
  const [subData, setSubData]: any = useState([]);
  const created_form = async () => {
    const response = await axios.get(
      `${server}/lms/filter/admin/data/${AuthData.user.userData.user.email}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    setCreatedForm(response.data.forms);
  };
  const DisplayInfoData = async (id: number) => {
    const response = await axios.get(
      `${server}/lms/filter/admin/DILOform/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    let dlo_ilo = [];
    for (let i = 0; i < response.data.DILO.length; i++) {
      dlo_ilo.push(Object.entries(response.data.DILO[i]));
    }
    setSubData(dlo_ilo);
    setCreatedFormData(response.data);
    setdisplayData(true);
  };
  const [semester, setSemester] = useState(1);
  const [showSemesterType, setShowSemesterType] = useState(false);
  let year = new Date().getFullYear();
  const [batch, setBatch] = useState(year);
  const sem_array = [1, 2, 3, 4, 5, 6, 7, 8];
  const year_array = [
    year,
    year - 1,
    year - 2,
    year - 3,
    year - 4,
    year - 5,
    year - 6,
    year - 7,
    year - 8,
    year - 9,
    year - 10,
  ];
  const [showBatchType, setShowBatchType] = useState(false);
  const [type, setType] = useState("DLO");
  const [showSubType, setShowSubType] = useState(false);
  const [department, setDepartment] = useState("");
  const [formModal, setFormModal] = useState(false);
  const [allDLOSubjects, setAllDLOSubjects] = useState([]);
  const [DLOSubjectsLoading, setDLOSubjectsLoading] = useState(false);
  const [allILOSubjects, setAllILOSubjects] = useState([]);
  const [ILOSubjectsLoading, setILOSubjectsLoading] = useState(false);
  const [dLONumber, setDLONumber] = useState("");
  const [iLONumber, setILONumber] = useState("");
  const [DLO, setDLO]: any = useState([]);
  const [ILO, setILO]: any = useState([]);
  const [DLONameArray, setDLONameArray]: any = useState([]);
  const [ILONameArray, setILONameArray]: any = useState([]);
  const [showDLOType, setShowDLOType] = useState(false);
  const [showILOType, setShowILOType] = useState(false);
  const [dloPointer, setDLOPointer]: any = useState(0);
  const [iloPointer, setILOPointer]: any = useState(0);
  const [dlo_check_array, setdlo_check_array]: any = useState([]);
  const [ilo_check_array, setilo_check_array]: any = useState([]);
  const [preview, setpreview] = useState(false);
  const ILOArray = (i: string) => {
    setILONumber(i);
    let name_array = [];
    let obj: any = {};
    for (let x = 0; x < parseInt(i); x++) {
      obj[`ILO${x + 1}`] = [];
    }
    const entries = Object.entries(obj);
    const result = entries.map(([key, val]) => {
      const obj = { [key]: val };
      return obj;
    });
    for (let k = 0; k < result.length; k++) {
      name_array.push(`I L O Subject ${k + 1} Options`);
    }
    setilo_check_array([]);
    setILONameArray(name_array);
    setILO(result);
  };
  const DLOArray = (i: string) => {
    setDLONumber(i);
    let name_array = [];
    let obj: any = {};
    for (let x = 0; x < parseInt(i); x++) {
      obj[`DLO${x + 1}`] = [];
    }
    const entries = Object.entries(obj);
    const result = entries.map(([key, val]) => {
      const obj = { [key]: val };
      return obj;
    });
    for (let k = 0; k < result.length; k++) {
      name_array.push(`D L O Subject ${k + 1} Options`);
    }
    setdlo_check_array([]);
    setDLONameArray(name_array);
    setDLO(result);
  };
  const DLOPointerfunc = (i: number) => {
    setDLOPointer(i);
  };
  const ILOPointerfunc = (i: number) => {
    setILOPointer(i);
  };
  const append_dlo_array = (id: number, name: string) => {
    if (dLONumber == "") {
      Swal.fire({
        icon: "warning",
        title:
          "Kindly Enter The Number Of Options Of DLO Subjects For The Current Batch",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      let dlo = [...DLO];
      let dlo_check = [...dlo_check_array];
      dlo_check.push(id);
      dlo[dloPointer][`DLO${dloPointer + 1}`].push(id);
      setdlo_check_array(dlo_check);
      setDLO(dlo);
    }
  };
  const append_ilo_array = (id: number, name: string) => {
    if (iLONumber == "") {
      Swal.fire({
        icon: "warning",
        title:
          "Kindly Enter The Number Of Options Of ILO Subjects For The Current Batch",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      let ilo = [...ILO];
      let ilo_check = [...ilo_check_array];
      ilo_check.push(id);
      ilo[iloPointer][`ILO${iloPointer + 1}`].push(id);
      setilo_check_array(ilo_check);
      setILO(ilo);
    }
  };
  const remove_dlo_array = (
    to_track_arrays: number,
    to_get_index: number,
    id: any
  ) => {
    let dlo = [...DLO];
    let dlo_check = [...dlo_check_array];
    let dlo_check_new = [];
    dlo[to_track_arrays][`DLO${to_track_arrays + 1}`].splice(to_get_index, 1);
    for (let i = 0; i < dlo_check.length; i++) {
      if (dlo_check[i] !== id) {
        dlo_check_new.push(dlo_check[i]);
      }
    }
    setdlo_check_array(dlo_check_new);
    setDLO(dlo);
  };
  const remove_ilo_array = (
    to_track_arrays: number,
    to_get_index: number,
    id: any
  ) => {
    let ilo = [...ILO];
    let ilo_check = [...ilo_check_array];
    let ilo_check_new = [];
    ilo[to_track_arrays][`ILO${to_track_arrays + 1}`].splice(to_get_index, 1);
    for (let i = 0; i < ilo_check.length; i++) {
      if (ilo_check[i] !== id) {
        ilo_check_new.push(ilo_check[i]);
      }
    }
    setilo_check_array(ilo_check_new);
    setILO(ilo);
  };
  const search = async (bat: number, dept: string, sem: number) => {
    if (dept && bat && sem) {
      setAllDLOSubjects([]);
      setAllILOSubjects([]);
      setDLONumber("");
      setILONumber("");
      setDLO([]);
      setILO([]);
      setILOPointer(0);
      setDLOPointer(0);
      setILONameArray([]);
      setDLONameArray([]);
      setilo_check_array([]);
      setdlo_check_array([]);
      setDLOSubjectsLoading(true);
      setILOSubjectsLoading(true);
      setShowDLOType(false);
      setShowILOType(false);
      const response = await axios.get(
        `${server}/lms/filter/findDILO/${bat}/${dept}/${sem}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthData.user.token}`,
          },
        }
      );
      if (response.data["DLO"].length > 0) {
        setAllDLOSubjects(response.data["DLO"]);
      }
      if (response.data["ILO"].length > 0) {
        setAllILOSubjects(response.data["ILO"]);
      }
      setDLOSubjectsLoading(false);
      setILOSubjectsLoading(false);
    }
  };
  const preview_form = () => {
    let count = 0;
    for (let i = 0; i < DLO.length; i++) {
      if (DLO[i][`DLO${i + 1}`].length < 2) {
        count += 1;
      }
    }
    for (let i = 0; i < ILO.length; i++) {
      if (ILO[i][`ILO${i + 1}`].length < 2) {
        count += 1;
      }
    }
    if (count > 0) {
      Swal.fire({
        icon: "warning",
        title:
          "Minimum 2 Subjects should be selected for Each DLO's and ILO's option respectively",
        showConfirmButton: false,
        timer: 3000,
      });
    } else if (DLO.length == 0 || ILO.length == 0) {
      Swal.fire({
        icon: "warning",
        title:
          "Kindly Enter The Number Of ILO or DLO Subjects For The Current Batch",
        showConfirmButton: false,
        timer: 3000,
      });
    } else {
      setpreview(true);
    }
  };
  const create_new_form = async () => {
    const form = {
      email: `${AuthData.user.userData.user.email}`,
      semester: semester,
      department: department,
      batch: batch,
      DILO: [].concat(DLO, ILO),
    };
    const response = await axios({
      method: "post",
      url: `${server}/lms/form/addDILOform`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthData.user.token}`,
      },
      data: {
        form: form,
      },
    });
    if (response.status == 200) {
      Swal.fire({
        icon: "success",
        title: " Form Created Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Form Creation  Failed..Please Try Again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setpreview(false);
    setFormModal(false);
  };
  useEffect(() => {
    created_form();
  }, [createdForm]);
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
            Home / Manage Subjects
          </Link>
        </div>
        <div className="flex flex-col items-start w-full px-10 sm:px-20">
          <h2 className="text-lg sm:text-xl font-medium text-gray-700 my-4">
            Forms Created -
          </h2>
          <div className="flex flex-row flex-wrap w-full">

            {createdForm ? (
              <table className="w-full table-auto border-separate border-spacing-2 border-slate-500 bg-red">
                <thead>
                  <tr>
                    <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">Form Id</th>
                    <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">Batch</th>
                    <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">Department</th>
                    <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">Semester</th>
                    <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">Data</th>
                  </tr>
                </thead>
              
                  {createdForm.map(
                    (
                      {
                        form_id,
                        email,
                        semester,
                        department,
                        batch,
                        DILO,
                      }: any,
                      i: number
                    ) => (
                        <tbody>
                      <tr key={form_id}>
                        <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 ">{form_id}</td>
                        <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 ">{batch}</td>
                        <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 ">
                          {department}
                        </td>
                        <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 ">{semester}</td>
                        <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 ">
                          <button
                            className="my-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                            onClick={() => {
                              DisplayInfoData(form_id);
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                        </tbody>
                    )
                  )}
              
              </table>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="my-12 w-full flex justify-center items-center">
          <button
            onClick={() => {
              setFormModal(true);
            }}
            className="p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
          >
            Create New Form
          </button>
        </div>
      </div>
      {displayData ? (
        <div className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
          {createdFormData ? (
            <div className="bg-white border-solid border-2 border-neutral-200 rounded-lg px-4 mx-auto sm:mx-0 w-11/12 sm:w-5/12">
              <div className="border-b-2 border-gray-900 py-2 flex flex-row justify-between">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {createdFormData["form_id"]}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                  onClick={() => {
                    setdisplayData(false);
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h6 className="text-md sm:text-lg font-base text-gray-500">
                  Batch - {createdFormData["batch"]}
                </h6>
                <h6 className="text-md sm:text-lg font-base text-gray-500">
                  Department - {createdFormData["department"]}
                </h6>
                <h6 className="text-md sm:text-lg font-base text-gray-500">
                  Semester - {createdFormData["semester"]}
                </h6>
                {subData.map((value: any) => (
                  <>
                    {value.map((z: any, i: number) => (
                      <>
                        {z[0].includes("D") ? (
                          <>
                            <h2 className="text-black text-lg">
                              DLO Subjects {z[0].slice(-1)}
                            </h2>
                            {z[1].map(
                              ({
                                batch,
                                department,
                                division,
                                email,
                                semester,
                                subject_code,
                                subject_id,
                                subject_name,
                                type,
                              }: any) => (
                                <div className="flex flex-col w-full m-2 bg-gray-100 p-2 rounded-xl drop-shadow-xl">
                                  <div className="flex flex-row justify-between items center">
                                    <h2 className="text-gray-700 text-lg">
                                      {subject_name}
                                    </h2>
                                    <h2 className="text-gray-700 text-lg">
                                      {subject_code}
                                    </h2>
                                  </div>
                                  <h2 className="text-gray-500 text-lg">
                                    Faculty Mail : {email}
                                  </h2>
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
                              ({
                                batch,
                                department,
                                division,
                                email,
                                semester,
                                subject_code,
                                subject_id,
                                subject_name,
                                type,
                              }: any) => (
                                <div className="flex flex-col w-full m-2 bg-gray-100 p-2 rounded-xl drop-shadow-xl">
                                  <div className="flex flex-row justify-between items center">
                                    <h2 className="text-gray-700 text-lg">
                                      {subject_name}
                                    </h2>
                                    <h2 className="text-gray-700 text-lg">
                                      {subject_code}
                                    </h2>
                                  </div>
                                  <h2 className="text-gray-500 text-lg">
                                    Faculty Mail : {email}
                                  </h2>
                                </div>
                              )
                            )}
                          </>
                        )}
                      </>
                    ))}
                  </>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      {formModal ? (
        <div className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="overflow-auto bg-white border-solid border-2 border-neutral-200 px-4 mx-auto sm:mx-0 w-screen h-screen">
            <div className="flex flex-row items-center justify-between border-b-2 border-gray-900 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Create Form
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                onClick={() => {
                  setFormModal(false);
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="w-full mt-2 grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-14 lg:gap-x-24 px-5">
              <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                <label>Semester</label>
                <div className="relative text-left inline-block w-7/12">
                  <div>
                    <button
                      onClick={() => {
                        setShowSemesterType(!showSemesterType);
                      }}
                      className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    >
                      {semester == 1
                        ? "I"
                        : semester == 2
                        ? "II"
                        : semester == 3
                        ? "III"
                        : semester == 4
                        ? "IV"
                        : semester == 5
                        ? "V"
                        : semester == 6
                        ? "VI"
                        : semester == 7
                        ? "VII"
                        : "VIII"}
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
                        {sem_array.map((value: number) => (
                          <button
                            onClick={() => {
                              setSemester(value);
                              setShowSemesterType(!showSemesterType);
                              search(batch, department, value);
                            }}
                            className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                          >
                            {value == 1
                              ? "I"
                              : value == 2
                              ? "II"
                              : value == 3
                              ? "III"
                              : value == 4
                              ? "IV"
                              : value == 5
                              ? "V"
                              : value == 6
                              ? "VI"
                              : value == 7
                              ? "VII"
                              : "VIII"}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                <label>Batch</label>
                <div className="relative text-left inline-block w-7/12">
                  <div>
                    <button
                      onClick={() => {
                        setShowBatchType(!showBatchType);
                      }}
                      className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    >
                      {batch}
                      {showBatchType ? (
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
                  {showBatchType ? (
                    <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {year_array.map((value: number) => (
                          <button
                            onClick={() => {
                              setBatch(value);
                              setShowBatchType(!showBatchType);
                              search(value, department, semester);
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

              <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                <label>Department</label>
                <input
                  value={department}
                  className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
                  type="text"
                  onChange={(e) => {
                    setDepartment(e.target.value);
                    search(batch, e.target.value, semester);
                  }}
                ></input>
              </div>

              <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                <label>Select Subjects For - </label>
                <div className="relative text-left inline-block w-7/12">
                  <div>
                    <button
                      onClick={() => {
                        setShowSubType(!showSubType);
                      }}
                      className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                    >
                      {type == "DLO"
                        ? "Department Level Opt..."
                        : type == "ILO"
                        ? "Institute Level Optional"
                        : ""}
                      {showSubType ? (
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
                  {showSubType ? (
                    <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setType("DLO");
                            setShowSubType(!showSubType);
                          }}
                          className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                        >
                          Deparment Level Optional
                        </button>
                        <button
                          onClick={() => {
                            setType("ILO");
                            setShowSubType(!showSubType);
                          }}
                          className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                        >
                          Institute Level Optional
                        </button>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                <label>
                  No. Of{" "}
                  {type == "DLO"
                    ? "Department Level Opt..."
                    : type == "ILO"
                    ? "Institute Level Optional"
                    : ""}{" "}
                  Subjects
                </label>
                <input
                  value={type == "DLO" ? dLONumber : iLONumber}
                  className="rounded-md border border-gray-300 py-1 px-1 w-4/12"
                  type="text"
                  onChange={(e) => {
                    type == "DLO"
                      ? DLOArray(e.target.value)
                      : ILOArray(e.target.value);
                  }}
                ></input>
              </div>
            </div>

            <div className="w-full mt-2 flex flex-col px-5">
              <h2 className="underline underline-offset-2 text-gray-900 font-medium text-lg sm:text-xl">
                Subjects Selected -{" "}
              </h2>
              {type == "DLO" ? (
                <div className="w-full mt-2 grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-14 lg:gap-x-24 px-5">
                  {DLONameArray.map((value: string, i: number) => (
                    <div className="flex flex-col w-full">
                      <div className="w-full text-gray-700 font-medium">
                        {value} -{" "}
                      </div>
                      <div className="w-full">
                        {DLO[i] && DLO[i][`DLO${i + 1}`].length == 0 ? (
                          <div className="underline underline-offset-2 text-gray-500 font-medium text-sm sm:text-md">
                            No Subject Selected
                          </div>
                        ) : (
                          <div className="flex flex-wrap">
                            {allDLOSubjects.map(
                              ({
                                subject_code,
                                subject_id,
                                subject_name,
                              }: any) => (
                                <>
                                  {DLO[i][`DLO${i + 1}`].map(
                                    (value: number, z: number) => (
                                      <>
                                        {value == subject_id ? (
                                          <div className="flex scale-90 hover:scale-95 bg-slate-500 rounded-lg text-white flex-wrap py-2 px-1 sm:items-center justify-between transition-all">
                                            <h2>{subject_name}</h2>
                                            <div className="flex flex-col sm:flex-row sm:items-center">
                                              <button
                                                onClick={() => {
                                                  remove_dlo_array(
                                                    i,
                                                    z,
                                                    subject_id
                                                  );
                                                }}
                                                className="p-[0.5] rounded-full bg-green-600 text-white hover:text-slate-500 hover:bg-white ml-2"
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 24 24"
                                                  fill="currentColor"
                                                  className="w-6 h-6"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                                    clipRule="evenodd"
                                                  />
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    )
                                  )}
                                </>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full mt-2 grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-14 lg:gap-x-24 px-5">
                  {ILONameArray.map((value: string, i: number) => (
                    <div className="flex flex-col w-full">
                      <div className=" w-full text-gray-700 font-medium">
                        {value}
                      </div>
                      <div className="w-full">
                        {ILO[i] && ILO[i][`ILO${i + 1}`].length == 0 ? (
                          <div className="underline underline-offset-2 text-gray-500 font-medium text-sm sm:text-md">
                            No Subject Selected
                          </div>
                        ) : (
                          <div className="flex flex-wrap">
                            {allILOSubjects.map(
                              ({
                                subject_code,
                                subject_id,
                                subject_name,
                              }: any) => (
                                <>
                                  {ILO[i][`ILO${i + 1}`].map(
                                    (value: number, z: number) => (
                                      <>
                                        {value == subject_id ? (
                                          <div className="flex scale-90 hover:scale-95 bg-slate-500 rounded-lg text-white flex-wrap py-2 px-1 sm:items-center justify-between transition-all">
                                            <h2>{subject_name}</h2>
                                            <div className="flex flex-col sm:flex-row sm:items-center">
                                              <button
                                                onClick={() => {
                                                  remove_ilo_array(
                                                    i,
                                                    z,
                                                    subject_id
                                                  );
                                                }}
                                                className="p-[0.5] rounded-full bg-green-600 text-white hover:text-slate-500 hover:bg-white ml-2"
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 24 24"
                                                  fill="currentColor"
                                                  className="w-6 h-6"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
                                                    clipRule="evenodd"
                                                  />
                                                </svg>
                                              </button>
                                            </div>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    )
                                  )}
                                </>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full mt-2 flex flex-col px-5 border-t-2 border-t-gray-500 pt-2">
              <h2 className="underline underline-offset-2 text-gray-900 font-medium text-lg sm:text-xl border-b-2 border-b-gray-300 mb-2 pb-2">
                Available Subjects -{" "}
              </h2>
              {type == "DLO" ? (
                <>
                  {DLO.length > 0 ? (
                    <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium border-b-2 border-b-gray-300 pb-2">
                      <label className="text-gray-700 underline underline-offset-2">
                        Select Subjects For -
                      </label>
                      <div className="relative text-left inline-block w-7/12">
                        <div>
                          <button
                            onClick={() => {
                              setShowDLOType(!showDLOType);
                            }}
                            className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                          >
                            {DLONameArray[dloPointer]}
                            {showDLOType ? (
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
                        {showDLOType ? (
                          <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {DLONameArray.map((value: string, i: number) => (
                                <button
                                  onClick={() => {
                                    DLOPointerfunc(i);
                                    setShowDLOType(false);
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
                  ) : (
                    ""
                  )}
                  {allDLOSubjects.length > 0 ? (
                    <div className="w-full my-2 grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-14 lg:gap-x-24 px-5">
                      {allDLOSubjects.map(
                        (
                          {
                            subject_code,
                            subject_id,
                            subject_name,
                            email,
                          }: any,
                          i: number
                        ) => (
                          <>
                            {!dlo_check_array.includes(subject_id) ? (
                              <div className="w-full flex flex-col rounded-lg drop-shadow-xl bg-gray-200 py-3 px-1 sm:items-start justify-between scale-95 hover:scale-100 transition-all">
                                <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-b-gray-500 pb-2">
                                  <h2>{subject_name}</h2>
                                  <div className="flex flex-col sm:flex-row sm:items-center">
                                    <h2 className="sm:mr-3">
                                      - {subject_code}
                                    </h2>
                                    <button
                                      onClick={() =>
                                        append_dlo_array(
                                          subject_id,
                                          subject_name
                                        )
                                      }
                                      className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 mr-2"
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                                <h2 className="text-md text-gray-500">
                                  Faculty Mail : {email}
                                </h2>
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        )
                      )}
                    </div>
                  ) : (
                    <div>
                      {DLOSubjectsLoading
                        ? "Fetching Data"
                        : "Select Batch , Semester And Enter Department Properly For Seeing Current Subjects"}
                    </div>
                  )}
                </>
              ) : (
                ""
              )}

              {type == "ILO" ? (
                //ILO Selector
                <>
                  {ILO.length > 0 ? (
                    <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium border-b-2 border-b-gray-300 pb-2">
                      <label className="text-gray-700 underline underline-offset-2">
                        Select Subjects For -
                      </label>
                      <div className="relative text-left inline-block w-7/12">
                        <div>
                          <button
                            onClick={() => {
                              setShowILOType(!showILOType);
                            }}
                            className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                          >
                            {ILONameArray[iloPointer]}
                            {showILOType ? (
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
                        {showILOType ? (
                          <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {ILONameArray.map((value: string, i: number) => (
                                <button
                                  onClick={() => {
                                    ILOPointerfunc(i);
                                    setShowILOType(false);
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
                  ) : (
                    ""
                  )}
                  {allILOSubjects.length > 0 ? (
                    <div className="w-full my-2 grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-14 lg:gap-x-24 px-5">
                      {allILOSubjects.map(
                        (
                          {
                            subject_code,
                            subject_id,
                            subject_name,
                            email,
                          }: any,
                          i: number
                        ) => (
                          <>
                            {!ilo_check_array.includes(subject_id) ? (
                              <div className="w-full flex flex-col rounded-lg drop-shadow-xl bg-gray-200 py-3 px-1 sm:items-start justify-between scale-95 hover:scale-100 transition-all">
                                <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-b-gray-500 pb-2">
                                  <h2>{subject_name}</h2>
                                  <div className="flex flex-col sm:flex-row sm:items-center">
                                    <h2 className="sm:mr-3">{subject_code}</h2>
                                    <button
                                      onClick={() =>
                                        append_ilo_array(
                                          subject_id,
                                          subject_name
                                        )
                                      }
                                      className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 mr-2"
                                    >
                                      Add
                                    </button>
                                  </div>
                                </div>
                                <h2 className="text-md text-gray-500">
                                  Faculty Mail : {email}
                                </h2>
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        )
                      )}
                    </div>
                  ) : (
                    <>
                      {ILOSubjectsLoading
                        ? "Fetching Data"
                        : "Select Batch , Semester And Enter Department Properly For Seeing Current Subjects"}
                    </>
                  )}
                </>
              ) : (
                ""
              )}
            </div>
            <div className="flex justify-center items-center w-100 mt-3 border-t text-white p-3">
              <button
                onClick={() => {
                  preview_form();
                }}
                className="px-3 py-1 rounded bg-accent text-white hover:scale-105 mr-2 transition-all"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {preview ? (
        <div className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white border-solid border-2 border-neutral-200 rounded-lg px-4 mx-auto sm:mx-0 w-11/12 sm:w-5/12">
            <div className="flex flex-row items-center justify-between border-b-2 border-gray-900 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Preview
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                onClick={() => {
                  setpreview(false);
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="w-full px-2 py-2">
              <h6 className="text-md sm:text-lg font-base text-gray-700 underline underlin-offset-2">
                Creating Form For -
              </h6>
              <h6 className="text-md sm:text-lg font-base text-gray-500">
                Batch - {batch}
              </h6>
              <h6 className="text-md sm:text-lg font-base text-gray-500">
                Department - {department}
              </h6>
              <h6 className="text-md sm:text-lg font-base text-gray-500">
                Semester - {semester}
              </h6>
              <h6 className="text-md sm:text-lg font-base text-gray-700 underline underlin-offset-2">
                With -
              </h6>
              {DLONameArray.map((value: string, i: number) => (
                <div className="flex flex-col w-full">
                  <div className="w-full text-gray-500">{value}</div>
                  <div className="w-full">
                    {DLO[i] && DLO[i][`DLO${i + 1}`].length == 0 ? (
                      "No Subject Selected"
                    ) : (
                      <div className="flex flex-wrap">
                        {allDLOSubjects.map(
                          ({ subject_code, subject_id, subject_name }: any) => (
                            <>
                              {DLO[i][`DLO${i + 1}`].map(
                                (value: number, z: number) => (
                                  <>
                                    {value == subject_id ? (
                                      <div className="flex bg-slate-300 mx-1 text-gray-700 flex-wrap py-2 px-1 sm:items-center justify-between transition-all">
                                        <h2>{subject_name}</h2>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                )
                              )}
                            </>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {ILONameArray.map((value: string, i: number) => (
                <div className="flex flex-col w-full">
                  <div className="w-full text-gray-500">{value}</div>
                  <div className="w-full">
                    {ILO[i] && ILO[i][`ILO${i + 1}`].length == 0 ? (
                      "No Subject Selected"
                    ) : (
                      <div className="flex flex-wrap">
                        {allILOSubjects.map(
                          ({ subject_code, subject_id, subject_name }: any) => (
                            <>
                              {ILO[i][`ILO${i + 1}`].map(
                                (value: number, z: number) => (
                                  <>
                                    {value == subject_id ? (
                                      <div className="flex bg-slate-300 mx-1 text-gray-700 flex-wrap py-2 px-1 sm:items-center justify-between transition-all">
                                        <h2>{subject_name}</h2>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                )
                              )}
                            </>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center items-center w-100 mt-3 border-t text-white p-3">
              <button
                onClick={() => {
                  create_new_form();
                }}
                className="px-3 py-1 rounded bg-accent text-white hover:scale-105 mr-2 transition-all"
              >
                Create
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

export default CreateForm;
