"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import { CLIENT_STATIC_FILES_PATH } from "next/dist/shared/lib/constants";

const StuAssignment = ({ subject_id, subject_name }: any) => {
  const router = useRouter();
  const server=process.env.NEXT_PUBLIC_SERVER_URL;
  const AuthData: any = useAuth();
  const searchParams: any = useSearchParams();
  const subjectid = parseInt(searchParams.get("subject_id"));
  const [assign, setAssign]: any = useState(null);
  const [addmodule, setAddModule] = useState(false);
  const get_assign = async () => {
    const response = await axios.get(
      `${server}/lms/filter/student/getsubmission/${AuthData.user.userData.user.roll_no}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    const response1 = await axios.get(
      `${server}/lms/filter/getallassignments/${subjectid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    for (let i = 0; i < response1.data.length; i++) {
      response1.data[i]["submitted"] = false;
      let deadline = response1.data[i]["deadlineAt"].split("T");
      let month = deadline[0].slice(5, 7);
      let day = deadline[0].slice(8);
      let year = deadline[0].slice(0, 4);
      response1.data[i]["deadlineDate"] = day + "-" + month + "-" + year;
      let minute = deadline[1].slice(3, 5);
      let hour = deadline[1].slice(0, 2);
      let designation = "";
      if (parseInt(hour) >= 12) {
        designation = "PM";
      } else {
        designation = "AM";
      }
      if (hour == "00") {
        hour = "12";
      }
      response1.data[i]["deadlineTime"] =
        hour + ":" + minute + ":" + designation;
      if (response.data && response.data.length != 0) {
        for (let j = 0; j < response.data.length; j++) {
          if (
            response.data[j]["assignment_id"] ==
            response1.data[i]["assignment_id"]
          ) {
            response1.data[i]["submitted"] = true;
            response1.data[i]["submitted_file_name"] =
              response.data[j]["file_name"];
            response1.data[i]["submitted_file_type"] =
              response.data[j]["file_type"];
          }
        }
      }
    }
    setAssign(response1.data);
  };

  const roll_no = `${AuthData.user.userData.user.roll_no}`;
  const [fileType, setfileType]: any = useState();
  const [material, setmaterial]: any = useState();
  const [assignName, setAssignName]: any = useState("");
  const [materialname, setmaterialname]: any = useState("");
  const [assignId, setAssignId] = useState();
  const [assignDes, setAssignDes] = useState("");
  const [edit, setEdit] = useState(false);
  const fileChange = (file: any) => {
    const fil = file.target.files[0];
    let s = fil.name;
    let stop = s.indexOf(".");
    setmaterialname(s.slice(0, stop));
    const reader: any = new FileReader();
    reader.readAsDataURL(file.target.files[0]);
    if (
      file.target.files[0].type ==
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      setfileType("pptx");
      reader.onloadend = () => {
        setmaterial(reader.result.slice(reader.result.indexOf(",") + 1));
      };
    } else if (file.target.files[0].type == "application/pdf") {
      setfileType("pdf");
      reader.onloadend = () => {
        setmaterial(reader.result.slice(reader.result.indexOf(",") + 1));
      };
    } else if (
      file.target.files[0].type ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setfileType("docx");
      reader.onloadend = () => {
        setmaterial(reader.result.slice(reader.result.indexOf(",") + 1));
      };
    } else if (file.target.files[0].type == "image/jpeg") {
      setfileType("jpeg");
      reader.onloadend = () => {
        setmaterial(reader.result.slice(reader.result.indexOf(",") + 1));
      };
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please Enter File Formats Of Pdf, Ppt, Docs, Jpeg",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const [showForm, setShowForm] = useState(false);
  const submitEditForm = async () => {
    if (
      material == "" ||
      !material ||
      material == null ||
      material == undefined
    ) {
      Swal.fire({
        icon: "warning",
        title: "Nothing Uploaded",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const assignment = {
        assignment_id: assignId,
        submission_des: assignDes,
        file_name: materialname,
        file_type: fileType,
        file: material,
        roll_no: `${AuthData.user.userData.user.roll_no}`,
      };
      if (edit) {
        const response = await axios.post(
          `${server}/lms/form/student/updatesubmission`,
          assignment,
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
            title: " Assignment Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Assignment Updation Failed..Please Try Again",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        const response = await axios.post(
          `${server}/lms/form/student/submitAssignment`,
          assignment,
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
            title: " Assignment Sumitted Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Assignment Submission  Failed..Please Try Again",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
      get_assign();
      setShowForm(false);
      setAssignDes("");
      setmaterialname("");
      setmaterial();
      setfileType();
    }
  };

  const downloadSubmitted = async (
    assignment_id: number,
    file_name: string,
    file_type: string
  ) => {
    const response = await axios
      .get(
        `${server}/lms/download/getsubmission/${assignment_id}/${AuthData.user.userData.user.roll_no}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthData.user.token}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${file_name}.${file_type}`;
        a.click();
      });
  };
  const downloadAssignment = async (
    assignment_id: number,
    file_name: string,
    file_type: string
  ) => {
    const response = await axios
      .get(
        `${server}/lms/download/getassignment/${assignment_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthData.user.token}`,
          },
          responseType: "blob",
        }
      )
      .then((response) => {
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${file_name}.${file_type}`;
        a.click();
      });
  };
  useEffect(() => {
    get_assign();
  }, []);
  return (
    <div className="w-full flex justify-center items-center align-middleoverflow-scroll">
      <div className="flex bg-white w-full sm:w-11/12 mt-5 flex-col pt-8 items-center sm:rounded-2xl sm:drop-shadow-lg overflow-y-scroll">
        {assign == null ? (
          <></>
        ) : assign.length == 0 ? (
          <>
            <h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
              No Assignments Created Yet
            </h3>
          </>
        ) : (
          <div className="flex flex-col items-start w-full px-5 sm:px-15 overflow-auto">
            <table className="overflow-auto w-full table-auto border-separate border-spacing-2 border-slate-500 bg-red">
              <thead>
                <tr>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Sr. No.
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Name
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Deadline
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Links
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Assignment
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Submission
                  </th>
                </tr>
              </thead>
              <tbody>
                {assign.map(
                  (
                    {
                      assignment_id,
                      assign_name,
                      deadlineDate,
                      deadlineTime,
                      submitted,
                      file_name,
                      file_type,
                      links,
                      submitted_file_name,
                      submitted_file_type,
                    }: any,
                    i: number
                  ) => (
                    <tr key={assignment_id}>
                      <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 ">
                        {i + 1}
                      </td>
                      <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 text-center text-sm">
                        {assign_name}
                      </td>
                      <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 flex flex-col items-center text-center text-sm text-xs">
                        <>{deadlineDate}</>
                        <br />
                        <>{deadlineTime}</>
                      </td>
                      <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 text-center text-sm text-xs">
                        {links}
                      </td>
                      <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 ">
                        <button 
                          onClick={() => {
                                downloadAssignment(
                                  assignment_id,
                                  file_name,
                                  file_type
                                );
                              }}
                        className="flex items-center text-xs">
                          {file_type == "pptx" ? (
                            <svg
                              className="w-5 h-5 mr-1 cursor-pointer"
                              xmlns="http://www.w3.org/2000/svg"
                              enable-background="new 0 0 128 128"
                              viewBox="0 0 128 128"
                            >
                              <path
                                fill="#ff5a29"
                                d="M75.984 72.422c0 3.688-1.152 6.508-3.457 8.461s-5.582 2.93-9.832 2.93h-3.117V96h-7.266V61.734h10.945c4.156 0 7.316.895 9.48 2.684s3.247 4.457 3.247 8.004zm-16.406 5.437h2.391c2.234 0 3.906-.441 5.016-1.324s1.664-2.168 1.664-3.855c0-1.703-.465-2.961-1.395-3.773s-2.387-1.219-4.371-1.219h-3.305v10.171zM104 80c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm10.882 16.988-.113.176-8.232 11.438c-.548.866-1.508 1.398-2.537 1.398s-1.989-.532-2.536-1.397l-8.346-11.614a3.01 3.01 0 0 1 .01-2.994 3.01 3.01 0 0 1 2.596-1.494H100V86c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v6.5h4.276c1.065 0 2.061.572 2.596 1.494a3.01 3.01 0 0 1 .01 2.994z"
                              />
                              <path
                                fill="#ff9a30"
                                d="m84 125.95-.05.05H84zM114 77v-.05l-.05.05z"
                              />
                              <path
                                fill="#ff5a29"
                                d="M111.071 44.243 71.757 4.929A9.936 9.936 0 0 0 64.687 2H24c-5.514 0-10 4.486-10 10v104c0 5.514 4.486 10 10 10h59.95l-4-4H24c-3.309 0-6-2.691-6-6V12c0-3.309 2.691-6 6-6h40.687c1.603 0 3.109.624 4.242 1.757l39.314 39.314A6.044 6.044 0 0 1 110 51.313V72.95l4 4V51.313c0-2.67-1.04-5.181-2.929-7.07z"
                              />
                              <path fill="#fff" d="m113.95 77 .05-.05-4-4" />
                            </svg>
                          ) : file_type == "pdf" ? (
                            <svg
                              className="w-5 h-5 mr-1 cursor-pointer"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 128 128"
                            >
                              <path
                                fill="#ff402f"
                                d="M95.21 80.32c-.07-.51-.48-1.15-.92-1.58-1.26-1.24-4.03-1.89-8.25-1.95-2.86-.03-6.3.22-9.92.73-1.62-.93-3.29-1.95-4.6-3.18-3.53-3.29-6.47-7.86-8.31-12.89.12-.47.22-.88.32-1.3 0 0 1.98-11.28 1.46-15.1-.07-.52-.12-.67-.26-1.08l-.17-.44c-.54-1.25-1.6-2.57-3.26-2.5l-.98-.03h-.02c-1.86 0-3.36.95-3.76 2.36-1.2 4.44.04 11.09 2.29 19.69l-.58 1.4c-1.61 3.94-3.63 7.9-5.41 11.39l-.23.45c-1.88 3.67-3.58 6.79-5.13 9.43l-1.59.84c-.12.06-2.85 1.51-3.49 1.89-5.43 3.25-9.03 6.93-9.63 9.85-.19.94-.05 2.13.92 2.68l1.54.78c.67.33 1.38.5 2.1.5 3.87 0 8.36-4.82 14.55-15.62 7.14-2.32 15.28-4.26 22.41-5.32 5.43 3.05 12.11 5.18 16.33 5.18.75 0 1.4-.07 1.92-.21.81-.22 1.49-.68 1.91-1.3.82-1.23.98-2.93.76-4.67zM36.49 99.33c.7-1.93 3.5-5.75 7.63-9.13.26-.21.9-.81 1.48-1.37-4.32 6.89-7.21 9.63-9.11 10.5zM60.95 43c1.24 0 1.95 3.13 2.01 6.07.06 2.94-.63 5-1.48 6.53-.71-2.26-1.05-5.82-1.05-8.15 0 0-.05-4.45.52-4.45zm-7.3 40.14c.87-1.55 1.77-3.19 2.69-4.92 2.25-4.25 3.67-7.57 4.72-10.3 2.1 3.82 4.72 7.07 7.79 9.67.39.32.8.65 1.22.98-6.25 1.23-11.66 2.74-16.42 4.57zm39.43-.35c-.38.23-1.47.37-2.17.37-2.26 0-5.07-1.03-9-2.72 1.51-.11 2.9-.17 4.14-.17 2.27 0 2.94-.01 5.17.56 2.22.57 2.25 1.72 1.86 1.96z"
                              />
                              <path
                                fill="#ff402f"
                                d="M104 80c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm10.882 16.988-.113.176-8.232 11.438c-.548.866-1.508 1.398-2.537 1.398s-1.989-.532-2.536-1.397l-8.346-11.614a3.01 3.01 0 0 1 .01-2.994 3.01 3.01 0 0 1 2.596-1.494H100V86c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v6.5h4.276c1.065 0 2.061.572 2.596 1.494a3.01 3.01 0 0 1 .01 2.994z"
                              />
                              <path
                                fill="#ff9a30"
                                d="m84 125.95-.05.05H84zM114 77v-.05l-.05.05z"
                              />
                              <path
                                fill="#ff402f"
                                d="M111.071 44.243 71.757 4.929A9.936 9.936 0 0 0 64.687 2H24c-5.514 0-10 4.486-10 10v104c0 5.514 4.486 10 10 10h59.95l-4-4H24c-3.309 0-6-2.691-6-6V12c0-3.309 2.691-6 6-6h40.687c1.603 0 3.109.624 4.242 1.757l39.314 39.314A6.044 6.044 0 0 1 110 51.313V72.95l4 4V51.313c0-2.67-1.04-5.181-2.929-7.07z"
                              />
                              <path fill="#fff" d="m113.95 77 .05-.05-4-4" />
                            </svg>
                          ) : file_type == "docx" ? (
                            <svg
                              className="w-5 h-5 mr-1 cursor-pointer"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 128 128"
                            >
                              <path
                                fill="#1d409d"
                                d="M78.688 96h-8.273l-4.641-18c-.172-.641-.465-1.965-.879-3.973s-.652-3.355-.715-4.043c-.094.844-.328 2.199-.703 4.066s-.664 3.199-.867 3.996L57.992 96h-8.25L41 61.734h7.148l4.383 18.703c.766 3.453 1.32 6.445 1.664 8.977.094-.891.309-2.27.645-4.137s.652-3.316.949-4.348l4.992-19.195h6.867l4.992 19.195c.219.859.492 2.172.82 3.938s.578 3.281.75 4.547c.156-1.219.406-2.738.75-4.559s.656-3.293.938-4.418l4.359-18.703h7.148L78.688 96zM104 80c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm10.882 16.988-.113.176-8.232 11.438c-.548.866-1.508 1.398-2.537 1.398s-1.989-.532-2.536-1.397l-8.346-11.614a3.01 3.01 0 0 1 .01-2.994 3.01 3.01 0 0 1 2.596-1.494H100V86c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v6.5h4.276c1.065 0 2.061.572 2.596 1.494a3.01 3.01 0 0 1 .01 2.994z"
                              />
                              <path
                                fill="#ff9a30"
                                d="m84 125.95-.05.05H84zM114 77v-.05l-.05.05z"
                              />
                              <path
                                fill="#1d409d"
                                d="M111.071 44.243 71.757 4.929A9.936 9.936 0 0 0 64.687 2H24c-5.514 0-10 4.486-10 10v104c0 5.514 4.486 10 10 10h59.95l-4-4H24c-3.309 0-6-2.691-6-6V12c0-3.309 2.691-6 6-6h40.687c1.603 0 3.109.624 4.242 1.757l39.314 39.314A6.044 6.044 0 0 1 110 51.313V72.95l4 4V51.313c0-2.67-1.04-5.181-2.929-7.07z"
                              />
                              <path fill="#fff" d="m113.95 77 .05-.05-4-4" />
                            </svg>
                          ) : file_type == "jpeg" ? (
                            <svg
                              className="w-5 h-5 mr-1 cursor-pointer"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 128 128"
                            >
                              <path
                                fill="#61bee2"
                                d="M104 126H24c-5.5 0-10-4.5-10-10V12c0-5.5 4.5-10 10-10h40.7c2.7 0 5.2 1 7.1 2.9l39.3 39.3c1.9 1.9 2.9 4.4 2.9 7.1V116c0 5.5-4.5 10-10 10zM24 6c-3.3 0-6 2.7-6 6v104c0 3.3 2.7 6 6 6h80c3.3 0 6-2.7 6-6V51.3c0-1.6-.6-3.1-1.8-4.2L68.9 7.8C67.8 6.6 66.3 6 64.7 6H24z"
                              />
                              <path
                                fill="#61bee2"
                                d="M45.2 91.5c-.7 0-1.5-.2-2.1-.6-1.2-.7-1.9-2-1.9-3.4V50c0-1.4.7-2.7 1.9-3.4 1.2-.7 2.7-.8 3.9-.1l37.5 19.6c1.4.7 2.2 2.1 2.1 3.6 0 1.5-.9 2.9-2.3 3.5L47 91.1c-.6.3-1.2.4-1.8.4zm0-41.5v37.5l37.5-17.9L45.2 50z"
                              />
                            </svg>
                          ) : (
                            ""
                          )}
                          {file_name}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4 ml-1"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                            />
                          </svg>
                        </button>
                      </td>
                      <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 ">
                        {submitted ? (
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => {
                                downloadSubmitted(
                                  assignment_id,
                                  submitted_file_name,
                                  submitted_file_type
                                );
                              }}
                              className="flex items-center text-xs"
                            >
                              {submitted_file_type == "pptx" ? (
                                <svg
                                  className="w-5 h-5 mr-1 cursor-pointer"
                                  xmlns="http://www.w3.org/2000/svg"
                                  enable-background="new 0 0 128 128"
                                  viewBox="0 0 128 128"
                                >
                                  <path
                                    fill="#ff5a29"
                                    d="M75.984 72.422c0 3.688-1.152 6.508-3.457 8.461s-5.582 2.93-9.832 2.93h-3.117V96h-7.266V61.734h10.945c4.156 0 7.316.895 9.48 2.684s3.247 4.457 3.247 8.004zm-16.406 5.437h2.391c2.234 0 3.906-.441 5.016-1.324s1.664-2.168 1.664-3.855c0-1.703-.465-2.961-1.395-3.773s-2.387-1.219-4.371-1.219h-3.305v10.171zM104 80c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm10.882 16.988-.113.176-8.232 11.438c-.548.866-1.508 1.398-2.537 1.398s-1.989-.532-2.536-1.397l-8.346-11.614a3.01 3.01 0 0 1 .01-2.994 3.01 3.01 0 0 1 2.596-1.494H100V86c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v6.5h4.276c1.065 0 2.061.572 2.596 1.494a3.01 3.01 0 0 1 .01 2.994z"
                                  />
                                  <path
                                    fill="#ff9a30"
                                    d="m84 125.95-.05.05H84zM114 77v-.05l-.05.05z"
                                  />
                                  <path
                                    fill="#ff5a29"
                                    d="M111.071 44.243 71.757 4.929A9.936 9.936 0 0 0 64.687 2H24c-5.514 0-10 4.486-10 10v104c0 5.514 4.486 10 10 10h59.95l-4-4H24c-3.309 0-6-2.691-6-6V12c0-3.309 2.691-6 6-6h40.687c1.603 0 3.109.624 4.242 1.757l39.314 39.314A6.044 6.044 0 0 1 110 51.313V72.95l4 4V51.313c0-2.67-1.04-5.181-2.929-7.07z"
                                  />
                                  <path
                                    fill="#fff"
                                    d="m113.95 77 .05-.05-4-4"
                                  />
                                </svg>
                              ) : submitted_file_type == "pdf" ? (
                                <svg
                                  className="w-5 h-5 mr-1 cursor-pointer"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 128 128"
                                >
                                  <path
                                    fill="#ff402f"
                                    d="M95.21 80.32c-.07-.51-.48-1.15-.92-1.58-1.26-1.24-4.03-1.89-8.25-1.95-2.86-.03-6.3.22-9.92.73-1.62-.93-3.29-1.95-4.6-3.18-3.53-3.29-6.47-7.86-8.31-12.89.12-.47.22-.88.32-1.3 0 0 1.98-11.28 1.46-15.1-.07-.52-.12-.67-.26-1.08l-.17-.44c-.54-1.25-1.6-2.57-3.26-2.5l-.98-.03h-.02c-1.86 0-3.36.95-3.76 2.36-1.2 4.44.04 11.09 2.29 19.69l-.58 1.4c-1.61 3.94-3.63 7.9-5.41 11.39l-.23.45c-1.88 3.67-3.58 6.79-5.13 9.43l-1.59.84c-.12.06-2.85 1.51-3.49 1.89-5.43 3.25-9.03 6.93-9.63 9.85-.19.94-.05 2.13.92 2.68l1.54.78c.67.33 1.38.5 2.1.5 3.87 0 8.36-4.82 14.55-15.62 7.14-2.32 15.28-4.26 22.41-5.32 5.43 3.05 12.11 5.18 16.33 5.18.75 0 1.4-.07 1.92-.21.81-.22 1.49-.68 1.91-1.3.82-1.23.98-2.93.76-4.67zM36.49 99.33c.7-1.93 3.5-5.75 7.63-9.13.26-.21.9-.81 1.48-1.37-4.32 6.89-7.21 9.63-9.11 10.5zM60.95 43c1.24 0 1.95 3.13 2.01 6.07.06 2.94-.63 5-1.48 6.53-.71-2.26-1.05-5.82-1.05-8.15 0 0-.05-4.45.52-4.45zm-7.3 40.14c.87-1.55 1.77-3.19 2.69-4.92 2.25-4.25 3.67-7.57 4.72-10.3 2.1 3.82 4.72 7.07 7.79 9.67.39.32.8.65 1.22.98-6.25 1.23-11.66 2.74-16.42 4.57zm39.43-.35c-.38.23-1.47.37-2.17.37-2.26 0-5.07-1.03-9-2.72 1.51-.11 2.9-.17 4.14-.17 2.27 0 2.94-.01 5.17.56 2.22.57 2.25 1.72 1.86 1.96z"
                                  />
                                  <path
                                    fill="#ff402f"
                                    d="M104 80c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm10.882 16.988-.113.176-8.232 11.438c-.548.866-1.508 1.398-2.537 1.398s-1.989-.532-2.536-1.397l-8.346-11.614a3.01 3.01 0 0 1 .01-2.994 3.01 3.01 0 0 1 2.596-1.494H100V86c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v6.5h4.276c1.065 0 2.061.572 2.596 1.494a3.01 3.01 0 0 1 .01 2.994z"
                                  />
                                  <path
                                    fill="#ff9a30"
                                    d="m84 125.95-.05.05H84zM114 77v-.05l-.05.05z"
                                  />
                                  <path
                                    fill="#ff402f"
                                    d="M111.071 44.243 71.757 4.929A9.936 9.936 0 0 0 64.687 2H24c-5.514 0-10 4.486-10 10v104c0 5.514 4.486 10 10 10h59.95l-4-4H24c-3.309 0-6-2.691-6-6V12c0-3.309 2.691-6 6-6h40.687c1.603 0 3.109.624 4.242 1.757l39.314 39.314A6.044 6.044 0 0 1 110 51.313V72.95l4 4V51.313c0-2.67-1.04-5.181-2.929-7.07z"
                                  />
                                  <path
                                    fill="#fff"
                                    d="m113.95 77 .05-.05-4-4"
                                  />
                                </svg>
                              ) : submitted_file_type == "docx" ? (
                                <svg
                                  className="w-5 h-5 mr-1 cursor-pointer"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 128 128"
                                >
                                  <path
                                    fill="#1d409d"
                                    d="M78.688 96h-8.273l-4.641-18c-.172-.641-.465-1.965-.879-3.973s-.652-3.355-.715-4.043c-.094.844-.328 2.199-.703 4.066s-.664 3.199-.867 3.996L57.992 96h-8.25L41 61.734h7.148l4.383 18.703c.766 3.453 1.32 6.445 1.664 8.977.094-.891.309-2.27.645-4.137s.652-3.316.949-4.348l4.992-19.195h6.867l4.992 19.195c.219.859.492 2.172.82 3.938s.578 3.281.75 4.547c.156-1.219.406-2.738.75-4.559s.656-3.293.938-4.418l4.359-18.703h7.148L78.688 96zM104 80c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm10.882 16.988-.113.176-8.232 11.438c-.548.866-1.508 1.398-2.537 1.398s-1.989-.532-2.536-1.397l-8.346-11.614a3.01 3.01 0 0 1 .01-2.994 3.01 3.01 0 0 1 2.596-1.494H100V86c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v6.5h4.276c1.065 0 2.061.572 2.596 1.494a3.01 3.01 0 0 1 .01 2.994z"
                                  />
                                  <path
                                    fill="#ff9a30"
                                    d="m84 125.95-.05.05H84zM114 77v-.05l-.05.05z"
                                  />
                                  <path
                                    fill="#1d409d"
                                    d="M111.071 44.243 71.757 4.929A9.936 9.936 0 0 0 64.687 2H24c-5.514 0-10 4.486-10 10v104c0 5.514 4.486 10 10 10h59.95l-4-4H24c-3.309 0-6-2.691-6-6V12c0-3.309 2.691-6 6-6h40.687c1.603 0 3.109.624 4.242 1.757l39.314 39.314A6.044 6.044 0 0 1 110 51.313V72.95l4 4V51.313c0-2.67-1.04-5.181-2.929-7.07z"
                                  />
                                  <path
                                    fill="#fff"
                                    d="m113.95 77 .05-.05-4-4"
                                  />
                                </svg>
                              ) : submitted_file_type == "jpeg" ? (
                                <svg
                                  className="w-5 h-5 mr-1 cursor-pointer"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 128 128"
                                >
                                  <path
                                    fill="#61bee2"
                                    d="M104 126H24c-5.5 0-10-4.5-10-10V12c0-5.5 4.5-10 10-10h40.7c2.7 0 5.2 1 7.1 2.9l39.3 39.3c1.9 1.9 2.9 4.4 2.9 7.1V116c0 5.5-4.5 10-10 10zM24 6c-3.3 0-6 2.7-6 6v104c0 3.3 2.7 6 6 6h80c3.3 0 6-2.7 6-6V51.3c0-1.6-.6-3.1-1.8-4.2L68.9 7.8C67.8 6.6 66.3 6 64.7 6H24z"
                                  />
                                  <path
                                    fill="#61bee2"
                                    d="M45.2 91.5c-.7 0-1.5-.2-2.1-.6-1.2-.7-1.9-2-1.9-3.4V50c0-1.4.7-2.7 1.9-3.4 1.2-.7 2.7-.8 3.9-.1l37.5 19.6c1.4.7 2.2 2.1 2.1 3.6 0 1.5-.9 2.9-2.3 3.5L47 91.1c-.6.3-1.2.4-1.8.4zm0-41.5v37.5l37.5-17.9L45.2 50z"
                                  />
                                </svg>
                              ) : (
                                ""
                              )}
                              {submitted_file_name}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4 ml-1 "
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                                />
                              </svg>
                            </button>
                            <button
                              onClick={() => {
                                setShowForm(true);
                                setEdit(true);
                                setAssignId(assignment_id);
                                setAssignName(assign_name);
                              }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 border border-gray-700 rounded-full p-1 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setShowForm(true);
                              setEdit(false);
                              setAssignId(assignment_id);
                              setAssignName(assign_name);
                            }}
                            className="px-2 py-1 bg-accent rounded-md text-xs hover:scale-105 transition-all text-white cursor-pointer"
                          >
                            Submit
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showForm ? (
        <div className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white border-solid border-2 border-neutral-200 rounded-lg px-4 mx-auto sm:mx-0 w-11/12 sm:w-5/12">
            <div className="flex flex-row items-center justify-between border-b-2 border-gray-900 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                {edit ? "Edit " : "Submit "} {assignName}{" "}
                {edit ? " Submissions" : ""}
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                onClick={() => {
                  setShowForm(false);
                  setAssignDes("");
                  setmaterialname("");
                  setmaterial();
                  setfileType();
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="mt-2 w-full">
              <input
                value={assignDes}
                onChange={(e) => {
                  setAssignDes(e.target.value);
                }}
                type="text"
                placeholder="Description"
                className="rounded-md p-2 w-full border my-2 border-gray-300"
              />
              <input
                onChange={(e) => {
                  fileChange(e);
                }}
                type="file"
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex justify-center items-center w-100 mt-3 border-t text-white p-3">
              <button
                onClick={submitEditForm}
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

export default StuAssignment;
