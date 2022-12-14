"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Subject = ({ subject_id }: any) => {
  const router = useRouter();
  const AuthData: any = useAuth();
  const [modules, setModules]: any = useState(null);
  const [addmodule, setAddModule] = useState(false);
  const [subjectInfo, setSubjectInfo]: any = useState(null);
  const get_module = async () => {
    const response = await axios.get(
      `http://localhost:5000/lms/filter/allmodules/${subject_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    console.log(response.data);
    setModules(response.data);
  }
  const current_subject = async () => {
    const response = await axios.get(
      `http://localhost:5000/lms/filter/subject/${subject_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    console.log(response.data);
    setSubjectInfo(response.data);
  }
  useEffect(() => {
    get_module();
    current_subject();
  }, []);
  return (
    <div className="w-full flex justify-center items-center align-middle">
      <div className="flex bg-white w-11/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
        {subjectInfo ?
          <div className='flex flex-row flex-wrap w-11/12 mb-2'>
            <div className='flex flex-row w-full md:w-1/2 flex-wrap justify-between ml-auto'>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                {subjectInfo.subject_name}
              </h3>
              <button onClick={() => { setAddModule(!addmodule) }} className="flex items-center p-2 w-fit px-4 py-2 rounded-lg bg-accent text-white hover:scale-105 transition-all ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

                Add New Module
              </button>
            </div>
          </div>
          : <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            Getting Info
          </h3>
        }

        <div className='px-4 py-6 text-sm w-11/12 flex flex-wrap cursor-pointer mt-2 mb-2 border-solid border-2 border-neutral-200 shadow-xl drop-shadow-xl rounded-xl'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
          </svg>
          Discussion Forum
        </div>
        <div className='px-4 py-6 text-sm w-11/12 flex flex-wrap cursor-pointer mt-2 mb-2 border-solid border-2 border-neutral-200 shadow-xl drop-shadow-xl rounded-xl'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
          Quiz
        </div>
        <div className='px-4 py-6 text-sm w-11/12 flex flex-wrap cursor-pointer mt-2 mb-2 border-solid border-2 border-neutral-200 shadow-xl drop-shadow-xl rounded-xl'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75" />
          </svg>
          Assignments
        </div>
        <div className='px-4 py-6 text-sm w-11/12 flex flex-wrap cursor-pointer mt-2 mb-2 border-solid border-2 border-neutral-200 shadow-xl drop-shadow-xl rounded-xl'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          General Resourcess
        </div>
        {modules ? <div className='flex flex-col md:flex-row justify-evenly items-center w-full mb-5'>
          {modules.map(({ subject_id, module_name, module_number, module_id }: any, i: number) =>
            <div key={module_number} className='flex flex-col items-center w-10/12 scale-90 md:scale-100 md:w-72 xl:w-2/5 xl:scale-90 shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden bg-white'>
              <img src={`/subjects/subject${i + 1}.jpg`} alt={module_name} className="w-full min-h-[10rem] object-cover rounded-xl" />
              <div className="text-lg sm:text-xl font-medium text-gray-900 my-4 text-center">{module_number}. {module_name}</div>
              <Link href={{
                pathname: "/faculty/subject",
                query:
                {
                  module_id: module_id,
                  module_name: module_name
                }
              }} className="mb-4 w-fit mx-auto px-16 py-2 rounded-full bg-accent text-white hover:scale-105 transition-all">
                Open
              </Link>
            </div>
          )}
        </div> :
          <>
            <Loading loadState='loading' />
          </>}
      </div>
      {addmodule ?
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className='w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => { setAddModule(!addmodule) }} className="cursor-pointer w-6 h-6 text-red-600 ml-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-center my-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Add New Module</h3>
                    <div className="mt-2 mx-5">
                      <div
                        className="mt-8 mb-4 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium"
                      >
                        <label>Module Number</label>
                        <input
                          className=" border rounded-mg py-1 px-1 w-7/12"
                          type='number'
                        ></input>
                      </div>
                      <div
                        className="mt-8 mb-4 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium"
                      >
                        <label>Module Name</label>
                        <input
                          className=" border rounded-mg py-1 px-1 w-7/12"
                          type='text'
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-50 px-4 py-3 flex items-center justify-center">
                  <button onClick={() => { setAddModule(!addmodule) }} className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div> : ''
      }
    </div>
  )
}

export default Subject