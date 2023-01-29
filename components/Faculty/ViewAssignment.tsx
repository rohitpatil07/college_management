"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";

const ViewAssignment = ({ deadline }: any) => {
  const router = useRouter();
  const AuthData: any = useAuth();
  const [readingmaterial, setreadingmaterial]: any = useState(null);
  const [material, setmaterial] = useState();
  const [materialname, setmaterialname]: any = useState("");
  const [fileType, setfileType]: any = useState();
  const [addmaterial, setAddMaterial] = useState(false);
  const searchParams: any = useSearchParams();
  const assignmentid = parseInt(searchParams.get("assignment_id"));
  const assign_name=searchParams.get("assign_name");
  const server=process.env.NEXT_PUBLIC_SERVER_URL;

  const downloadZip = async () => {
    console.log(assignmentid);
    const response = await axios
      .get(`${server}/lms/download/getzip/${assignmentid}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${assign_name}_submissions.zip`;
        a.click();
      });
  }
  const get_material = async () => {
    const response = await axios.get(
      `${server}/lms/filter/faculty/getassignment/${assignmentid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    let dead = deadline;

    for (let i = 0; i < response.data.student_submissions.length; i++) {
      response.data.student_submissions[i]['display'] = true; 
      let deadlineDate: any = dead.split("T");
      let dd = parseInt(deadlineDate[0].slice(8));
      let mm = parseInt(deadlineDate[0].slice(5, 7));
      let hour = parseInt(deadlineDate[1].slice(0, 2));
      let minutes = parseInt(deadlineDate[1].slice(3, 5));
      let deadline =
        response.data.student_submissions[i]["last_modified"].split("T");
      if (mm > parseInt(deadline[0].slice(5, 7))) {
        let diff = mm - parseInt(deadline[0].slice(5, 7));
        if (diff == 1) {
          response.data.student_submissions[i]["due"] =
            "By " + diff + " month";
        } else {
          response.data.student_submissions[i]["due"] =
            "By " + diff + " months";
        }
      } else if (dd > parseInt(deadline[0].slice(8))) {
        let diff = dd - parseInt(deadline[0].slice(8));
        if (diff == 1) {
          response.data.student_submissions[i]["due"] = "By " + diff + " day";
        } else {
          response.data.student_submissions[i]["due"] =
            "By " + diff + " days";
        }
      } else if (hour > parseInt(deadline[1].slice(0, 2))) {
        let diff = hour - parseInt(deadline[1].slice(0, 2));
        if (diff == 1) {
          response.data.student_submissions[i]["due"] =
            "By " + diff + " hour";
        } else {
          response.data.student_submissions[i]["due"] =
            "By " + diff + " hours";
        }
      } else if (minutes > parseInt(deadline[1].slice(3, 5))) {
        let diff = minutes - parseInt(deadline[1].slice(0, 2));
        if (diff == 1) {
          response.data.student_submissions[i]["due"] =
            "By " + diff + " hour";
        } else {
          response.data.student_submissions[i]["due"] =
            "By " + diff + " hours";
        }
      } else {
        response.data.student_submissions[i]["due"] = "Submitted On Time";
      }
    }
    console.log(response.data.student_submissions);
    setreadingmaterial(response.data.student_submissions);
  };
  const downloadMat = async ({ assignment_id, file_name, file_type,roll_no }: any) => {
    console.log(assignment_id, file_name, file_type);
    const response = await axios
      .get(`${server}/lms/download/getsubmission/${assignment_id}/${roll_no}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        const blob = response.data;
        console.log(blob);
        const url = window.URL.createObjectURL(blob);
        console.log(url);
        const a = document.createElement("a");
        console.log(a);
        a.href = url;
        a.download = `${file_name}.${file_type}`;
        a.click();
      });
    console.log(response);
  };
  const getAssByRoll = async(value:string)=>{
    let count=0;
    let readMat=[...readingmaterial]
    for(let i=0;i<readMat.length;i++){
      if(readMat[i]['roll_no']==value){
        count+=1;
      }
    }
    if(count==1){
       for(let i=0;i<readMat.length;i++){
      if(readMat[i]['roll_no']!=value){
        readMat[i]['display']=false;
      }
    }
    }
    else{
      for(let i=0;i<readMat.length;i++){
        console.log("z");
        readMat[i]['display']=true;
    }
    }
    setreadingmaterial(readMat);
  }
  useEffect(() => {
    get_material();
  }, []);
  return (
    <div className="w-full flex justify-center items-center align-middle">
      <div className="flex bg-white w-11/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
        <h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
          Submissions
        </h3>
        {readingmaterial ? (
          <>
            {readingmaterial.length == 0 ? (
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                No Submissions Done
              </h3>
            ) : (
              <div className="w-full px-2">
               <div className='flex flex-wrap items-center justify-between border-b-2 border-b-gray-500 my-1'>
                        <input onChange={(e)=>getAssByRoll(e.target.value)} className="rounded-md border border-gray-700 py-1 px-1 my-1" placeholder="Enter Roll No." type='text' />
                        <button onClick={downloadZip} className="my-1  w-fit px-4 py-2 rounded-md bg-gray-500 text-white hover:scale-105 transition-all flex items-center justify-between text-sm">Download All
                        <svg stroke="white"
              className="w-5 h-5 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#00b8df" d="M47 112h10v6H47zM37 118h10v6H37zM47 100h10v6H47zM37 106h10v6H37zM47 88h10v6H47zM37 94h10v6H37zM47 76h10v6H47zM37 82h10v6H37zM47 64h10v6H47zM37 70h10v6H37zM56 29H40c-1.1 0-2 .9-2 2v25c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V31c0-1.1-.9-2-2-2zm-3 16H43V34h10v11zM104 80c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm10.882 16.988-.113.176-8.232 11.438c-.548.866-1.508 1.398-2.537 1.398s-1.989-.532-2.536-1.397l-8.346-11.614a3.01 3.01 0 0 1 .01-2.994 3.01 3.01 0 0 1 2.596-1.494H100V86c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v6.5h4.276c1.065 0 2.061.572 2.596 1.494a3.01 3.01 0 0 1 .01 2.994z"/><path fill="#ff9a30" d="m84 125.95-.05.05H84zM114 77v-.05l-.05.05z"/><path fill="#00b8df" d="M111.071 44.243 71.757 4.929A9.936 9.936 0 0 0 64.687 2H24c-5.514 0-10 4.486-10 10v104c0 5.514 4.486 10 10 10h59.95l-4-4H24c-3.309 0-6-2.691-6-6V12c0-3.309 2.691-6 6-6h40.687c1.603 0 3.109.624 4.242 1.757l39.314 39.314A6.044 6.044 0 0 1 110 51.313V72.95l4 4V51.313c0-2.67-1.04-5.181-2.929-7.07z"/><path fill="#fff" d="m113.95 77 .05-.05-4-4"/></svg>
                        </button>
                      </div>
                {readingmaterial.map(
                  ({
                    file_name,
                    file_type,
                    assignment_id,
                    roll_no,
                    createdAt,
                    last_modified,
                    due,
                    display
                  }: any) => (
                    
                  <>
                    {display ? 
                    <div
                      key={assignment_id}
                      className="px-2 py-4 text-sm w-full flex flex-wrap justify-between items-center mt-2 mb-2 border-solid border-2 border-neutral-200 shadow-xl drop-shadow-xl rounded-xl"
                    >
                     
                      <div className="flex flex-wrap items-center ">
                        {file_type == "pptx" ? (
                          <svg
                            onClick={() => {
                              downloadMat({
                                assignment_id,
                                file_name,
                                file_type,
                                roll_no
                              });
                            }}
                            className="w-8 h-8 mr-1 cursor-pointer"
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
                            onClick={() => {
                              downloadMat({
                                assignment_id,
                                file_name,
                                file_type,
                              });
                            }}
                            className="w-8 h-8 mr-1 cursor-pointer"
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
                            onClick={() => {
                              downloadMat({
                                assignment_id,
                                file_name,
                                file_type,
                              });
                            }}
                            className="w-8 h-8 mr-1 cursor-pointer"
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
                            onClick={() => {
                              downloadMat({
                                assignment_id,
                                file_name,
                                file_type,
                              });
                            }}
                            className="w-8 h-8 mr-1 cursor-pointer"
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
                        <p>File-Name : {file_name}</p>
                      </div>
                      <p>Roll No: {roll_no}</p>
                      {due == "Submitted On Time" 
                      ? 
                      <p>
                        Submitted At:{" "}
                        {last_modified.slice(0, last_modified.indexOf("T"))}
                      </p>
                      :
                      <p>
                        Late{" "}{due}
                      </p>
                      }
                    </div>
                      :''
                    }
                  </>
                  )
                )}
              </div>
            )}
          </>
        ) : (
          <>
            <Loading loadState="loading" />
          </>
        )}
      </div>
    </div>
  );
};

export default ViewAssignment;
