"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import Swal from "sweetalert2";

const CreateDrive = () => {
	const AuthData : any  = useAuth();
	const server=process.env.NEXT_PUBLIC_SERVER_URL;
	let keys=["company_id","role","package","job_location","role_desc","cgpa","be_percent","tenth_percent","twelveth_percent","gender","gap","livekt","deadkt"]
	const [drives, setDrives]:any= useState({
				company_id : AuthData.user.userData.user.company_id,
				role:"",
				package:0,
				job_location:"",
				role_desc:"",
				cgpa:0,
				be_percent: 0,
				tenth_percent:0,
				twelveth_percent:0,
				gender:"M",
				gap:0,
				livekt:0,
				deadkt:0
	})

	const handleFormFieldChange = (fieldName: any, e: any) => {
		setDrives({ ...drives, [fieldName]: e.target.value });
	};
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log(drives);
		try {
			const gear={
				company_id : AuthData.user.userData.user.company_id,
				role:drives.role,
				package:parseFloat(drives.package),
				job_location:drives.job_location,
				role_desc:drives.role_desc,
				cgpa:parseFloat(drives.cgpa),
				be_percent: parseInt(drives.be_percent),
				tenth_percent:parseInt(drives.tenth_percent),
				twelveth_percent:parseInt(drives.twelveth_percent),
				gender:drives.gender,
				gap:parseInt(drives.gap),
				livekt:parseInt(drives.livekt),
				deadkt:parseInt(drives.deadkt),
				subject:"",
				message:"",
				queries:{}			
			};
			
			const queries = {
						gender : {contains : gear.gender},
						department: {contains : ""},
						academic_info:{
							gap : {lte : gear.gap},
							cgpa : {gte : gear.cgpa},
							livekt : {lte : gear.livekt},
							deadkt : {lte : gear.deadkt},
							tenth_percent : {gte : gear.tenth_percent},
							twelveth_percent : {gte : gear.twelveth_percent},
						}
					}
					const message=`Notice for ${AuthData.user.userData.user.company_name} Placement Drive`
					const subject=`Notification for  ${AuthData.user.userData.user.company_name} drive  for ${drives["role"]}`
					gear['subject']=subject
					gear['queries']=queries
					gear['message']=message
					console.log(gear)
					const response = await axios({
						method: 'post',
						url: `${server}/add/company/drive`,
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${AuthData.user.token}`
						}, 
						data: {
							drive: gear, // This is the body part
						}
						});
						if (response.status == 200) {
							Swal.fire({
								icon: "success",
								title: "Drive Created  Successfully",
								showConfirmButton: false,
								timer: 1500,
							});
							window.location.reload();
						} else {
							Swal.fire({
								icon: "error",
								title: "Drive Creation Failed..Please Try Again",
								showConfirmButton: false,
								timer: 1500,
							});
							window.location.reload()
						}
						

		} catch (error) {
			alert(error);
		}
	};
	return (
		<div className="sm:w-[80%] mt-5 mx-auto flex flex-col drop-shadow-lg items-center bg-white container rounded-2xl">
			<div className="w-full flex flex-col items-center gap-2">
				<div>
					<h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mt-5">
						Create Drive
					</h3>
					<p className="text-slate-400 text-sm text-center mb-5">
						Create a drive with custom eligibility requirements
					</p>
				</div>
				<div className="sm:w-[80%] px-5 sm:px-0 mx-auto flex justify-between flex-col gap-2">
					<div className="w-full flex justify-between">
						<h2 className="text-slate-700 font-medium">Enter Role</h2>
						<input
							className="border-2 rounded-md p-1 w-1/2"
							onChange={(e) => {
								handleFormFieldChange("role", e);
							}}
						></input>
					</div>
					<div className="w-full flex justify-between">
						<h2 className="text-slate-700 font-medium">Enter Role Package</h2>
						<input
							type="number"
							className="border-2 rounded-md p-1 w-1/2"
							onChange={(e) => {
								handleFormFieldChange("package", e);
							}}
						></input>
					</div>
					<div className="w-full flex justify-between">
						<h2 className="text-slate-700 font-medium">Enter Job Location</h2>
						<input
							className="border-2 rounded-md p-1 w-1/2"
							onChange={(e) => {
								handleFormFieldChange("job_location", e);
							}}
						></input>
					</div>
					<div className="w-full flex justify-between">
						<h2 className="text-slate-700 font-medium">Role Description</h2>
						<input
							className="border-2 rounded-md p-1 w-1/2"
							onChange={(e) => {
								handleFormFieldChange("role_desc", e);
							}}
						></input>
					</div>
					<div className="w-full flex justify-between">
						<h2 className="text-slate-700 font-medium">CGPA</h2>
						<input
							type="number"
							className="border-2 rounded-md p-1 w-1/2"
							onChange={(e) => {
								handleFormFieldChange("cgpa", e);
							}}
						></input>
					</div>
					<div className="w-full flex justify-between">
						<h2 className="text-slate-700 font-medium">BE percent</h2>
						<input
							type="number"
							className="border-2 rounded-md p-1 w-1/2"
							onChange={(e) => {
								handleFormFieldChange("be_percent", e);
							}}
						></input>
					</div>
					<div className="w-full flex justify-between">
						<h2 className="text-slate-700 font-medium">Tenth Percent</h2>
						<input
							type="number"
							className="border-2 rounded-md p-1 w-1/2"
							onChange={(e) => {
								handleFormFieldChange("tenth_percent", e);
							}}
						></input>
					</div>
					<div className="w-full flex justify-between">
						<h2 className="text-slate-700 font-medium">Twelveth Percent</h2>
						<input
							type="number"
							className="border-2 rounded-md p-1 w-1/2"
							onChange={(e) => {
								handleFormFieldChange("twelveth_percent", e);
							}}
						></input>
					</div>
					<div className="w-full flex justify-between">
						<h2 className="text-slate-700 font-medium">Gender</h2>
						<select
							name="gender"
							id="gender"
							onChange={(e) => {
								handleFormFieldChange("gender", e);
							}}
							className="border-2 rounded-md p-1 w-1/2"
						>
							<option value="M">Male</option>
							<option value="F">Female</option>
							<option value="">N/A</option>
						</select>
					</div>
					<div className="w-full flex justify-between">
						<h2 className="text-slate-700 font-medium">Gap</h2>
						<input
							className="border-2 rounded-md p-1 w-1/2"
							onChange={(e) => {
								handleFormFieldChange("gap", e);
							}}
						></input>
					</div>
					<div className="w-full flex justify-between">
						<h2 className="text-slate-700 font-medium">Live KT</h2>
						<input
							type="number"
							className="border-2 rounded-md p-1 w-1/2"
							onChange={(e) => {
								handleFormFieldChange("livekt", e);
							}}
						></input>
					</div>
					<div className="w-full flex justify-between">
						<h2 className="text-slate-700 font-medium">Dead KT</h2>
						<input
							type="number"
							className="border-2 rounded-md p-1 w-1/2"
							onChange={(e) => {
								handleFormFieldChange("deadkt", e);
							}}
						></input>
					</div>
				</div>
				<button
					className="p-2 bg-accent text-white mx-auto mb-5 px-8 rounded-lg hover:scale-105 transition-all"
					onClick={(e) => {
						handleSubmit(e);
					}}
				>
					Create
				</button>
			</div>
		</div>
	);
};

export default CreateDrive;
