"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
const Module = ({module_id,subject_id,module_name,module_number}: any) => {
    const [material, setmaterial] = useState();
    const fileChange=(file: any)=>{
        const reader: any = new FileReader();
		reader.readAsDataURL(file.target.files[0]);
		reader.onloadend = () => {
			setmaterial(reader.result);
		};
    }
    const post_material=()=>{
        console.log(material);
    }
    const [addmaterial, setAddMaterial] = useState(false);
  return (
    <div className="w-full flex justify-center items-center align-middle">
        <div className="flex bg-white w-11/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
        <div className='flex flex-row flex-wrap w-11/12 mb-2'>
            <div className='flex flex-row w-full md:w-8/12 flex-wrap justify-between ml-auto'>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
               Module {module_number}: {module_name}
              </h3>
              <button onClick={() => { setAddMaterial(!addmaterial) }} className="flex items-center p-2 w-fit px-4 py-2 rounded-lg bg-accent text-white hover:scale-105 transition-all ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add Material
              </button>
            </div>
          </div>
        {module_id}, {subject_id}
        </div>


        {addmaterial ?
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className='w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => { setAddMaterial(!addmaterial) }} className="cursor-pointer w-6 h-6 text-red-600 ml-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-center my-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Add Material</h3>
                    <div className="mt-2 mx-5">
                      <div
                        className="mt-8 mb-4 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium"
                      >
                        <label>Material Name</label>
                        <input
                          className=" border rounded-mg py-1 px-1 w-7/12"
                          type='text'
                        ></input>
                      </div>
                      <div
                        className="mt-8 mb-4 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium"
                      >
                        <label>Upload File</label>
                        <input
                          className="block border rounded-mg  w-7/12
                          py-1.5 px-2"
                          type='file'
                          onChange={(e)=>{fileChange(e)}}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-50 px-4 py-3 flex items-center justify-center">
                  <button onClick={post_material} className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div> : ''
      }

      
    </div>
  );
}

export default Module;
