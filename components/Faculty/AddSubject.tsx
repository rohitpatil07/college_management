"use client";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import api from "../../contexts/adapter";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
const AddSubject = () => {
	const AuthData: any = useAuth();
	const server=process.env.NEXT_PUBLIC_SERVER_URL;
	let year:any = new Date().getFullYear();
	const [newSubject, setNewSubject] = useState({
		subject_code: "",
		subject_name: "",
		semester: 1,
		department: "",
		batch:year,
		type: "MD",
		email:`${AuthData.user.userData.user.email}`,
		division:"A"
	});
	const [updloading, setUpdateLoading] = useState(false);
	const div =["A","B","C","D","E","F","G","H","I","J","K"];
	const subDiv = [
    "A1",
    "A2",
    "A3",
    "A4",
    "B1",
    "B2",
    "B3",
    "B4",
    "C1",
    "C2",
    "C3",
	"C4",
"D1",
"D2",
"D3",
"D4",
"E1",
"E2",
"E3",
"E4",
"F1",
"F2",
"F3",
"F4"];
	const [checkFormCompletionStatus, setCheckFormCompletionStatus] =
		useState(false);
	const UpdateData = (value: any, key: string) => {
		let changedValue: any = { ...newSubject };
		changedValue[key] = value;
		let upvote = 0;
		if(key=='type' && value=='LAB'){
			changedValue['division'] = 'A1';
		}
		if(key=='type' && value!='LAB'){
			changedValue['division'] = 'A';
		}
		for (let keys in changedValue) {
			if (changedValue[keys] == "") {
				upvote += 1;
			}
		}
		if (upvote == 0) {
			setCheckFormCompletionStatus(true);
		} else {
			setCheckFormCompletionStatus(false);
		}
		setNewSubject(changedValue);
	};
	const [showSubType, setShowSubType] = useState(false);
	const [showDivType, setShowDivType] = useState(false);
	const [showBatchType, setShowBatchType] = useState(false);
	const [showSemesterType, setShowSemesterType] = useState(false);
	const save = async () => {
		setCheckFormCompletionStatus(false);
		setUpdateLoading(true);
		const response = await axios({
			method: "post",
			url: `${server}/lms/form/addsubject`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${AuthData.user.token}`,
			},
			data: {
				subject: newSubject,
			},
		});
		console.log(response);
		if (response.status == 200) {
			Swal.fire({
				icon: "success",
				title: " Subject Created Successfully",
				showConfirmButton: false,
				timer: 1500,
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Subject Creation  Failed..Please Try Again",
				showConfirmButton: false,
				timer: 1500,
			});
		}
		setUpdateLoading(false);
		setNewSubject({
			subject_code: "",
			subject_name: "",
			semester: 1,
			department: "",
			batch: `${year}`,
			type: "MD",
			email:`${AuthData.user.userData.user.email}`,
		division:"A"
		});
	};
	return (
		<div className="w-full bg-slate-100 sm:bg-white sm:w-11/12 mx-auto flex flex-col items-center justify-around bg-white container sm:rounded-xl sm:drop-shadow-xl">
			<h3 className="text-xl sm:text-2xl font-medium text-gray-900 my-8">
				Add a New Subject
			</h3>
			<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-14 lg:gap-x-24 px-10 sm:px-20">
				<div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
					<label>Subject Code</label>
					<input
						value={newSubject.subject_code}
						className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
						type="text"
						onChange={(e) => {
							UpdateData(e.target.value, "subject_code");
						}}
					></input>
				</div>
				<div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
					<label>Name</label>
					<input
						value={newSubject.subject_name}
						className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
						type="text"
						onChange={(e) => {
							UpdateData(e.target.value, "subject_name");
						}}
					></input>
				</div>
				<div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
					<label>Type</label>
					<div className="relative text-left inline-block w-7/12">
						<div>
							<button
								onClick={() => {
									setShowSubType(!showSubType);
								}}
								className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
							>
								{newSubject.type == "MD"
									? "Regular"
									: newSubject.type == "DLO"
									? "Department Level Opt..."
									: newSubject.type == "ILO"
									? "Institute Level Optional"
									: newSubject.type == "LAB"
									? "LAB"
								:""}
								{showSubType ? (
									""
								) : (
									<svg
										className="-mr-1 ml-2 h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
											clip-rule="evenodd"
										/>
									</svg>
								)}
							</button>
						</div>
						{showSubType ? (
							<div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div className="py-1">
									<button
										onClick={() => {
											UpdateData("MD", "type");
											setShowSubType(!showSubType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										Regular
									</button>
									<button
										onClick={() => {
											UpdateData("LAB", "type");
											setShowSubType(!showSubType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										LAB
									</button>
									<button
										onClick={() => {
											UpdateData("DLO", "type");
											setShowSubType(!showSubType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										Deparment Level Optional
									</button>
									<button
										onClick={() => {
											UpdateData("ILO", "type");
											setShowSubType(!showSubType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										Institute Level Optional
									</button>
								</div>
							</div>
						) : (
							""
						)}
					</div>
				</div>
				<div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
					<label>Division</label>
					<div className="relative text-left inline-block w-7/12">
						<div>
							<button
								onClick={() => {
									setShowDivType(!showDivType);
								}}
								className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
							>
								{newSubject.division}
								{showDivType ? (
									""
								) : (
									<svg
										className="-mr-1 ml-2 h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
											clip-rule="evenodd"
										/>
									</svg>
								)}
							</button>
						</div>
						{showDivType ? (
							<>
							{
								newSubject.type=='LAB' ? 
										<div  className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div className="py-1">
									
									{
										subDiv.map((value:string,x:number)=>(
											<button
											key={x}
										onClick={() => {
											UpdateData(subDiv[x], "division");
											setShowDivType(!showDivType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										{value}
									</button>
										))
									}
								</div>
							</div>
								:		<div  className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div className="py-1">
									
									{
										div.map((value:string,x:number)=>(
											<button
											key={x}
										onClick={() => {
											UpdateData(div[x], "division");
											setShowDivType(!showDivType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										{value}
									</button>
										))
									}
								</div>
							</div>
							}
							</>
						) : (
							""
						)}
					</div>
				</div>
				<div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
					<label>Semester</label>
					<div className="relative text-left inline-block w-7/12">
						<div>
							<button
								onClick={() => {
									setShowSemesterType(!showSemesterType);
								}}
								className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
							>
								{newSubject.semester == 1
									? "I"
									: newSubject.semester == 2
									? "II"
									: newSubject.semester == 3
									? "III"
									: newSubject.semester == 4
									? "IV"
									: newSubject.semester == 5
									? "V"
									: newSubject.semester == 6
									? "VI"
									: newSubject.semester == 7
									? "VII"
									: "VIII"}
								{showSemesterType ? (
									""
								) : (
									<svg
										className="-mr-1 ml-2 h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
											clip-rule="evenodd"
										/>
									</svg>
								)}
							</button>
						</div>
						{showSemesterType ? (
							<div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div className="py-1">
									<button
										onClick={() => {
											UpdateData(1, "semester");
											setShowSemesterType(!showSemesterType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										I
									</button>
									<button
										onClick={() => {
											UpdateData(2, "semester");
											setShowSemesterType(!showSemesterType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										II
									</button>
									<button
										onClick={() => {
											UpdateData(3, "semester");
											setShowSemesterType(!showSemesterType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										III
									</button>
									<button
										onClick={() => {
											UpdateData(4, "semester");
											setShowSemesterType(!showSemesterType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										IV
									</button>
									<button
										onClick={() => {
											UpdateData(5, "semester");
											setShowSemesterType(!showSemesterType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										V
									</button>
									<button
										onClick={() => {
											UpdateData(6, "semester");
											setShowSemesterType(!showSemesterType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										VI
									</button>
									<button
										onClick={() => {
											UpdateData(7, "semester");
											setShowSemesterType(!showSemesterType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										VII
									</button>
									<button
										onClick={() => {
											UpdateData(8, "semester");
											setShowSemesterType(!showSemesterType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										VIII
									</button>
								</div>
							</div>
						) : (
							""
						)}
					</div>
				</div>

				<div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
					<label>Department</label>
					<input
						value={newSubject.department}
						className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
						type="text"
						onChange={(e) => {
							UpdateData(e.target.value, "department");
						}}
					></input>
				</div>
				<div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
					<label>Batch</label>
					<div className="relative text-left inline-block w-7/12">
						<div>
							<button
								onClick={() => {
									setShowBatchType(!showBatchType);
								}}
								className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
							>
								{newSubject.batch}
								{showBatchType ? (
									""
								) : (
									<svg
										className="-mr-1 ml-2 h-5 w-5"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
										aria-hidden="true"
									>
										<path
											fill-rule="evenodd"
											d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
											clip-rule="evenodd"
										/>
									</svg>
								)}
							</button>
						</div>
						{showBatchType ? (
							<div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div className="py-1">
									<button
										onClick={() => {
											UpdateData(year - 5, "batch");
											setShowBatchType(!showBatchType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										{year - 5}
									</button>
									<button
										onClick={() => {
											UpdateData(year - 4, "batch");
											setShowBatchType(!showBatchType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										{year - 4}
									</button>
									<button
										onClick={() => {
											UpdateData(year - 3, "batch");
											setShowBatchType(!showBatchType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										{year - 3}
									</button>
									<button
										onClick={() => {
											UpdateData(year - 2, "batch");
											setShowBatchType(!showBatchType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										{year - 2}
									</button>
									<button
										onClick={() => {
											UpdateData(year - 1, "batch");
											setShowBatchType(!showBatchType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										{year - 1}
									</button>
									<button
										onClick={() => {
											UpdateData(year, "batch");
											setShowBatchType(!showBatchType);
										}}
										className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
									>
										{year}
									</button>
								</div>
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
			<div className="my-12 w-full flex justify-center items-center">
				{checkFormCompletionStatus ? (
					<button
						className="p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
						onClick={save}
					>
						Save
					</button>
				) : (
					<button
						disabled
						className="flex items-center justify-center p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white"
					>
						Save
						{updloading ? (
							<>
								<ClipLoader className="ml-2" size={20} color="#d63636" />
							</>
						) : (
							<></>
						)}
					</button>
				)}
			</div>
		</div>
	);
};

export default AddSubject;
