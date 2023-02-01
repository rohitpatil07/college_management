'use client'

import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

const DriveInfo = ()=>
{
    const[stu,setStu]:any=useState(null);
    const searchParams:any = useSearchParams();
    const driveid=parseInt(searchParams.get('driveid'));
	console.log(driveid)
	const server=process.env.NEXT_PUBLIC_SERVER_URL;
    const AuthData : any = useAuth();
    const fetchStudents = async () =>
	{
		const response = await axios.get(`${server}/filter/company/appliedstudents/${driveid}`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${AuthData.user.token}`
			},
		  });
		console.log(response.data.students)
		setStu(response.data.students);
	}
    const download = async (roll:any) =>
	{
		const response = await axios.get(`${server}/download/resume/${roll}`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${AuthData.user.token}`
			},
			responseType: 'blob'
		  }).then((response) =>  {
			const blob=response.data
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${roll}.pdf`;
			a.click();
		  });
	}
	const downloadZip = async () =>
	{
		const rolls=[]
		for(let i=0;i<stu.length;i++)
		{
			rolls.push(stu[i].roll_no)
		}
		const resp=await axios({
			method: 'post',
			url: `${server}/download/zip`,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${AuthData.user.token}`
			}, 
			responseType: 'blob',
			data: {
				data: rolls, // This is the body part
			}
			}).then((response) =>  {
				const blob=response.data
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement('a');
				a.href = url;
				a.download = `Resume_students.zip`;
				a.click();
			  });
	}
	useEffect(()=>{
		fetchStudents();
	},[stu]);
    return (
		<div className="w-full sm:w-11/12 mx-auto py-5 flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
			<h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
				View Drive Candidates
			</h3>
			{stu==null || stu==undefined? <>
			</> : 
			stu.length==0?
			<>
				<h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
				     No Candidates Registered
				</h3>
			</>:
			<div className="flex flex-col gap-5">
				<button  onClick={downloadZip}  className="p-1 mb-3 md:mb-0 ml-0 md:ml-2 w-48 md:w-fit mx-auto px-10 rounded-md bg-emerald-500 text-white">
								Download All resume
							</button>
			{stu.map(({ first_name, middle_name, last_name, department,college_name,roll_no,batch}: any) => (
				<div key={roll_no}className="flex flex-col mx-auto mb-3 w-12/12 p-5 bg-white border-2 border-neutral-300 rounded-md">
					<div className="flex flex-col-reverse sm:flex-row items-center justify-between">
						<h2 className="text-xl font-semibold">
							Name:{first_name} {middle_name} {last_name}
						</h2>
					</div>
					<h2 className="text-base font-semibold text-center sm:text-left mb-2 mt-2">
						College Name:{college_name}
					</h2>
					<p className="text-sm text-justify mb-3">Department and Batch:{department},{batch}</p>
					<div className="flex flex-col md:flex-row items-center justify-between">
						<div className="flex flex-col-reverse md:flex-row items-center justify-between">
							{/* <button
								className="p-1 w-48 mb-3 md:mb-0 md:ml-2 md:w-fit mx-auto px-10 rounded-md"
								style={{ backgroundColor: "#c9243f", color: "white" }}
							>
								Decline */}
							{/* </button> */}
							<button  onClick={() => download(roll_no)}  className="p-1 mb-3 md:mb-0 ml-0 md:ml-2 w-48 md:w-fit mx-auto px-10 rounded-md bg-emerald-500 text-white">
								Download Resume
							</button>
						</div>
					</div>
				</div>
			))}
		</div>
			}
			
		</div>
	);
}

export default DriveInfo;