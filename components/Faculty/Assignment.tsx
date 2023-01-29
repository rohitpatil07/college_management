"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";

const Assignment = ({ subject_id, subject_name }: any) => {
  const router = useRouter();
  const AuthData: any = useAuth();
  const server=process.env.NEXT_PUBLIC_SERVER_URL;
  const searchParams: any = useSearchParams();
  const [fileType, setfileType]: any = useState();
  const [material, setmaterial] = useState();
  const [materialname, setmaterialname]: any = useState("");
  const subjectid = parseInt(searchParams.get("subject_id"));
  const [assign, setAssign]: any = useState(null);
  const [editAssign, setEditAssign]: any = useState(null);
  const get_assign = async () => {
    const response = await axios.get(
      `${server}/lms/filter/getallassignments/${subjectid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    for(let i=0;i<response.data.length;i++){
      response.data[i]['edit']=false;
    }
    setAssign(response.data);
    setEditAssign(response.data);
  };
  const [showAddAssignmentForm, setShowAddAssignmentForm] = useState(false);
  let year = new Date().getFullYear();
  const [newAssign, setNewAssign] = useState({
    assign_name: "",
    assign_des: "",
    file_name: "",
    file_type: "",
    file: "",
    links: "",
    deadlinedate: "",
    deadlinetime: "",
  });
  const handleFormFieldChange = (fieldName: any, e: any) => {
    setNewAssign({ ...newAssign, [fieldName]: e.target.value });
  };
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
  const assignment = {
    subject_id: subjectid,
    assign_name: newAssign.assign_name,
    assign_des: newAssign.assign_des,
    file_name: materialname,
    file_type: fileType,
    file: material,
    links: newAssign.links,
    deadlineAt: newAssign.deadlinedate + "T" + newAssign.deadlinetime + "Z",
  };
  const [assignload, setassignload] = useState(false);
  const addAssignment = async () => {
    setassignload(true);
    const response = await axios.post(
      `${server}/lms/form/faculty/upsertAssignment`,
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
        title: " Assignment Created Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Assignment Creation  Failed..Please Try Again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setassignload(false);
    setShowAddAssignmentForm(false);
    get_assign();
  };
  const onChangeEdit = (i:number,key:string,value:any) =>{
    let editass = [...editAssign];
    if(key=='file'){
    const fil = value.target.files[0];
    let s = fil.name;
    let stop = s.indexOf(".");
    editass[i]['file_name'] = s.slice(0, stop);
    const reader: any = new FileReader();
    reader.readAsDataURL(value.target.files[0]);
    if (
      value.target.files[0].type ==
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ) {
      editass[i]['file_type'] = "pptx";
      reader.onloadend = () => {
        editass[i][key] = reader.result.slice(reader.result.indexOf(",") + 1);
      };
    } else if (value.target.files[0].type == "application/pdf") {
       editass[i]['file_type'] = "pdf";
      reader.onloadend = () => {
        editass[i][key] = reader.result.slice(reader.result.indexOf(",") + 1);
      };
    } else if (
      value.target.files[0].type ==
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
       editass[i]['file_type'] = "docx";
      reader.onloadend = () => {
        editass[i][key] = reader.result.slice(reader.result.indexOf(",") + 1);
      };
    } else if (value.target.files[0].type == "image/jpeg") {
       editass[i]['file_type'] = "jpeg";
      reader.onloadend = () => {
        editass[i][key] = reader.result.slice(reader.result.indexOf(",") + 1);
      };
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please Enter File Formats Of Pdf, Ppt, Docs, Jpeg",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    }
    else if(key=='deadlineAt'){
      editass[i][key] = value + ":00Z";
    }
    else{
      editass[i][key] = value;
    }
    setEditAssign(editass);
  }
  const changeEdit = (id:number) => {
    let ass = [...assign];
    for(let i=0;i<ass.length;i++){
      if(ass[i]['assignment_id']==id){
        if(ass[i]['edit']){
           assign[i]['edit'] = false;
        }
        else{
           assign[i]['edit'] = true;
        }
      }
    }
    setAssign(ass);
  }
  const [eloading, seteloading] = useState(false);
  const editForm = async (i:number,id: number) => {
    seteloading(true);
    const { ['edit']: edit, ...actualData } = editAssign[i];  
     const response = await axios.post(
      `${server}/lms/form/faculty/upsertAssignment`,
      actualData,
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
        title: "Assignment Updation  Failed..Please Try Again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    seteloading(false);
    get_assign();
  };
   const downloadMat = async ({ assignment_id, file_name, file_type }: any) => {
    console.log(assignment_id, file_name, file_type);
    const response = await axios
      .get(`${server}/lms/download/getmaterial/${assignment_id}`, {
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
            Home / Dashboard / {subject_name} / Assignments
          </Link>
        </div>
        <h3 className="text-xl sm:text-2xl font-medium text-gray-900">
          Assignments
        </h3>
        <div className="border-t-4 my-2 py-3 w-11/12 flex flex-row flex-wrap items-center justify-between">
          <button
            onClick={() => {
              setShowAddAssignmentForm(true);
            }}
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
            Add New Assignment
          </button>
        </div>
        <div className="flex flex-col md:flex-row flex-wrap justify-evenly items-center w-full mb-5 overflow-auto">
          {assign ? (
            <table className="overflow-auto w-full table-auto border-separate border-spacing-2 border-slate-500">
              <thead>
                <tr>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    No.
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Name
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Desc.
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Deadline
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    File
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Edit
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Submissions
                  </th>
                </tr>
              </thead>
              <tbody>
                {assign.map(
                  (
                    { assignment_id, assign_name, createdAt, deadlineAt,edit,links,file_name,assign_des,file_type }: any,
                    i: number
                  ) => (
                    <tr>
                      <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 text-center text-xs">
                        <>{i + 1}</>
                      </td>
                      <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 text-center text-xs">
                        {edit ? <input value={editAssign[i]['assign_name']} onChange={(e)=>onChangeEdit(i,'assign_name',e.target.value)} className='h-6 text-xs text-black bg-white border-gray-500 border-2 rounded-md border-opacity-50 outline-none focus:border-blue-600 placeholder-gray-700 placeholder-opacity-0 transition-duration-200' type='text'/> : <>{assign_name}</>}
                      </td>
                       <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 text-center text-xs p-0">
                        {edit ? <input value={editAssign[i]['assign_des']} onChange={(e)=>onChangeEdit(i,'assign_des',e.target.value)} className='h-6 text-xs text-black bg-white border-gray-500 border-2 rounded-md border-opacity-50 outline-none focus:border-blue-600 placeholder-gray-700 placeholder-opacity-0 transition-duration-200' type='text'/> : <>{assign_des}</>}
                      </td>
                      <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 text-center text-xs">
                        {edit ? 
                        <input onChange={(e)=>onChangeEdit(i,'deadlineAt',e.target.value)} className='h-6 text-xs text-black bg-white border-gray-500 border-2 rounded-md border-opacity-50 outline-none focus:border-blue-600 placeholder-gray-700 placeholder-opacity-0 transition-duration-200' type="datetime-local"/>  : <>{deadlineAt.slice(0, deadlineAt.indexOf("T"))}</>}
                      </td>
                       <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 text-center text-xs">
                        {edit ? <>                        
                        <input  onChange={(e)=>{onChangeEdit(i,'file',e)}} className="rounded-md border border-gray-300 md:w-11/12 my-1" type='file'/>
                        </> : <>
                        <button  onClick={() => {
                                downloadAssignment(
                                  assignment_id,
                                  file_name,
                                  file_type
                                );
                              }} className="p-1 my-1 text-sm bg-white text-slate-900 font-semibold border-2 border-slate-900 rounded-md flex items-center">
                            {file_name}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>

                          </button></>}
                      </td>
                      <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 pb-2">
                        {edit ? 
                       <div className="flex flex-wrap items-center justify-around">
                         {eloading ? 
                        <button className="p-1 my-1 text-sm bg-gray-500 text-white font-semibold rounded-md">
                            Saving
                          </button>
                          :
                          <button onClick={()=>{editForm(i,assignment_id)}} className="p-1 my-1 text-sm bg-accent text-white font-semibold  rounded-md">
                            Save
                          </button> 
                        }
                          <button className='border-2 border-slate-700 rounded-full' onClick={() => {
                              changeEdit(assignment_id);
                              get_assign();
                            }}>
<svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                onClick={() => {
                  setShowAddAssignmentForm(false);
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
                            </button>
                       </div>
                       :
                       <div className="flex flex-wrap items-center justify-around">
                          <button
                            onClick={() => {
                              changeEdit(assignment_id);
                            }}
                            className="p-1 my-1 text-sm bg-white text-slate-900 font-semibold border-2 border-slate-900 rounded-md"
                          >
                            Edit
                          </button>
                        </div>
                      }
                        
                      </td>
                      <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 pb-2">
                        <Link
                          href={{
                            pathname: "faculty/viewAssign",
                            query: {
                              assignment_id: assignment_id,
                              subject_id:subject_id,
                              subject_name:subject_name,
                              assignment_name:assign_name,
                              deadline:deadlineAt,
                              assign_name:assign_name
                            },
                          }}
                          className="p-1 my-1 text-sm bg-white text-slate-900 font-semibold border-2 border-slate-900 rounded-md"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          ) : (
            ""
          )}
        </div>
      </div>

      {showAddAssignmentForm ? (
        <div className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white border-solid border-2 border-neutral-200 rounded-lg px-4 mx-auto sm:mx-0 w-11/12 sm:w-5/12">
            <div className="flex flex-row items-center justify-between border-b-2 border-gray-900 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Add Assignment
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                onClick={() => {
                  setShowAddAssignmentForm(false);
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-14 lg:gap-x-24 mt-2">
              <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                <label>Name</label>
                <input
                  className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
                  type="text"
                  onChange={(e) => {
                    handleFormFieldChange("assign_name", e);
                  }}
                ></input>
              </div>
              <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                <label>Assignment Description</label>
                <input
                  maxLength={200}
                  className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
                  type="text"
                  onChange={(e) => {
                    handleFormFieldChange("assign_des", e);
                  }}
                ></input>
              </div>
              <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                <label>Upload File</label>
                <input
                  className="block border rounded-mg  w-7/12
								py-1.5 px-2"
                  type="file"
                  onChange={(e) => {
                    fileChange(e);
                  }}
                ></input>
              </div>
              <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                <label>Add Links for reference</label>
                <input
                  value={newAssign.links}
                  maxLength={200}
                  className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
                  type="text"
                  onChange={(e) => {
                    handleFormFieldChange("links", e);
                  }}
                ></input>
              </div>
              <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                <label>Enter deadline date</label>
                <input
                  maxLength={200}
                  className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
                  type="date"
                  onChange={(e) => {
                    handleFormFieldChange("deadlinedate", e);
                  }}
                ></input>
              </div>
              <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                <label>Enter deadline time</label>
                <input
                  maxLength={200}
                  className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
                  type="time"
                  step="1"
                  onChange={(e) => {
                    handleFormFieldChange("deadlinetime", e);
                  }}
                ></input>
              </div>
            </div>
            <div className="my-4 w-full flex justify-center items-center">
             {assignload
             ?
              <button
                className="p-2 w-fit mx-auto px-8 py-2 rounded-md bg-gray-500 text-white"
              >
                Adding
              </button>
              :
               <button
                className="p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
                onClick={addAssignment}
              >
                Add
              </button>
             }
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

    </div>
  );
};

export default Assignment;
