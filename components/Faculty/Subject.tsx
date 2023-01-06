"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Subject = ({subject_id}: any) => {
  const router = useRouter();
    const AuthData: any = useAuth();
    const[modules,setModules]:any=useState(null);
    const[subjectInfo,setSubjectInfo]:any=useState(null);
    const get_module=async()=>{
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
    const current_subject=async()=>{
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
			<div className="flex bg-white w-10/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
			{subjectInfo ? 
    	<h3 className="text-xl sm:text-2xl font-bold text-gray-900">
      {subjectInfo.subject_name}
    </h3>
    :  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
    Getting Info
  </h3>
    }
                {modules ? <>
                    {modules.map(({ subject_id, module_name, module_number,module_id }: any, x: number) =>
                    <div key={module_number}>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{module_name}</h3>
                        
                    </div>
                    )}
                </> :
                 <>
                 <Loading loadState='loading'/>
                 </>}
			</div>
		</div>
  )
}

export default Subject