"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Dashboard = () => {
    const router = useRouter();
    const AuthData: any = useAuth();
    const[subjects,setSubjects]:any=useState(null);
    const get_subject=async()=>{
        const response = await axios.get(
			'http://localhost:5000/lms/filter/allSubjects',
			{
				headers: {
					"Content-Type": "application/json",
					// Authorization: `Bearer ${AuthData.user.token}`,
				},
			}
		);
    console.log(response);
    setSubjects(response.data);
    }
    useEffect(() => {
        get_subject();
      }, []);
	return (
		<div className="w-full flex justify-center items-center align-middle">
			<div className="flex bg-white w-10/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
				<h3 className="text-xl sm:text-2xl font-bold text-gray-900">
					All Subjects
				</h3>
                {subjects ? <>
                    {subjects.map(({ subject_id, subject_name, semester, department, batch, type }: any, x: number) =>
                    <div key={subject_id}>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">{subject_name}</h3>
                        <Link href={{
							pathname:"/faculty/subject",
							query:
							{
								subject_id:subject_id
							}
						}} className="p-1 mb-3 md:mb-0 text-sm w-48 bg-white text-slate-900 font-semibold border-2 border-slate-900 rounded-md">
							Check Here For More Info
						</Link>
                    </div>
                    )}
                </> :
                 <>
                 <Loading loadState='loading'/>
                 </>}
			</div>
		</div>
	);
};

export default Dashboard;
