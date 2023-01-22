"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Link from "next/link"
import { useSearchParams } from 'next/navigation'

const ViewAssignment = () => {
	const AuthData : any = useAuth();
	const[drive,setDrive]:any=useState(null);
	const searchParams:any = useSearchParams();
	const assignmentid=parseInt(searchParams.get('assignment_id'))
	const fetchDrive = async () =>
	{
		const response = await axios.get(`http://localhost:5000/lms/filter/faculty/getassignment/${assignmentid}`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${AuthData.user.token}`
			},
		  });
		console.log(response)
	}
	useEffect(()=>{
		fetchDrive();
	},[drive]);
	
	return (
		<div className="w-full sm:w-11/12 mx-auto py-5 flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
			<h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
				View Assignment Details
			</h3>
			{drive==null ? <>
			</> : 
			drive.length==0 ? <>
				<h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
					No Assignment submissions
				</h3>
			</> : 
			<div className="flex flex-col gap-5">
			{drive.map(({ drive_id,role, desc,job_location,tenth_percent,twelveth_percent,pack}: any) => (
				<div key={drive_id}className="flex flex-col mx-auto mb-3 w-11/12 p-5 bg-white border-2 border-neutral-300 rounded-md">
					<div className="flex flex-col-reverse sm:flex-row items-center justify-between">
						<h2 className="text-xl font-semibold text-center">
							Role:{role}
						</h2>
					</div>
					<h2 className="text-base font-semibold text-center sm:text-left mb-2 mt-2">
						Role-Description:{desc}
					</h2>
                    <h2 className="text-base font-semibold text-center sm:text-left mb-2 mt-2">
						Job Location:{job_location}
					</h2>
                    <h2 className="text-base font-semibold text-center sm:text-left mb-2 mt-2">
						Tenth-percent:{tenth_percent}
					</h2>
					<h2 className="text-base font-semibold text-center sm:text-left mb-2 mt-2">
						Twelveth-percent:{twelveth_percent}
					</h2>
					<h2 className="text-base font-semibold text-center sm:text-left mb-2 mt-2">
						CTC:{pack}
					</h2>
					<div className="flex flex-col md:flex-row items-center justify-between">
						<Link href={{
							pathname:"company/driveinfo",
							query:
							{
								drive_id:drive_id
							}
						}} className="p-1 mb-3 md:mb-0 text-sm w-48 bg-white text-slate-900 font-semibold border-2 border-slate-900 rounded-md">
							Check Here For More Info
						</Link>
					</div>
				</div>
			))}
		</div>
			}
			
		</div>
	);
};

export default ViewAssignment;
