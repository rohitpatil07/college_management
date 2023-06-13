"use client";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import api from "../../contexts/adapter";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import Swal from "sweetalert2";
const WorkExperience = () => {
	const AuthData: any = useAuth();
	console.log(AuthData);
	const [workExps, setworkExps]: any = useState([]);
	const server = process.env.NEXT_PUBLIC_SERVER_URL;
	const [work2, setWork2]: any = useState([]);
	const [loadState, setLoadState] = useState("loading");
	const [loading, setLoading] = useState(true);
	const [updloading, setUpdateLoading] = useState(false);
	const [WorkExperience, setWorkExperience] = useState([
		{
			id: 0,
			company_name: "",
			location: "",
			role: "",
			description: "",
			disabling: true,
			start_month: null,
			end_month: null,
			year: null,
		},
	]);
	const getProfileData = async () => {
		const response = await axios.get(
			`${server}/filter/student/${AuthData.user.userData.user.roll_no}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		let month: any = {
			Jan: "-01",
			Feb: "-02",
			Mar: "-03",
			Apr: "-04",
			May: "-05",
			Jun: "-06",
			Jul: "-07",
			Aug: "-08",
			Sep: "-09",
			Oct: "-10",
			Nov: "-11",
			Dec: "-12",
		};
		setWork2(response.data["work_experience"]);
		for (let i = 0; i < response.data["work_experience"].length; i++) {
			response.data["work_experience"][i]["editing"] = false;
			response.data["work_experience"][i]["start_month"] =
				response.data["work_experience"][i].year +
				month[response.data["work_experience"][i]["start_month"].slice(0, 3)];
			response.data["work_experience"][i]["end_month"] =
				response.data["work_experience"][i].year +
				month[response.data["work_experience"][i]["end_month"].slice(0, 3)];
		}
		setworkExps(response.data["work_experience"]);
		WorkExperience[0]["id"] = response.data["work_experience"].length + 1;
		setLoading(false);
	};
	useEffect(() => {
		getProfileData();
	}, []);
	function addWorkExperience(i: number) {
		var addExperience = [...WorkExperience];
		if (i < 3) {
			addExperience[i] = {
				id: WorkExperience.length + workExps.length + 1,
				company_name: "",
				location: "",
				role: "",
				disabling: true,
				description: "",
				start_month: null,
				end_month: null,
				year: null,
			};
		}
		setWorkExperience(addExperience);
	}
	function removeExperience(i: number) {
		var removeExp = [...WorkExperience];
		for (let j = 0; j < removeExp.length; j++) {
			if (j > i) {
				if (j - i == 2) {
					removeExp[removeExp.length - 1]["id"] = 2;
				} else {
					removeExp[j]["id"] = removeExp[j - 1]["id"];
				}
			}
		}
		removeExp.splice(i, 1);
		setWorkExperience(removeExp);
	}

	const UpdateExistingData = (key: string, val: string, i: number) => {
		var newInfo = [...workExps];
		let month: any = {
			1: "January",
			2: "February",
			3: "March",
			4: "April",
			5: "May",
			6: "June",
			7: "July",
			8: "August",
			9: "September",
			10: "October",
			11: "November",
			12: "December",
		};
		if (key == "start_month") {
			let data: string = val.slice(val.length - 2, val.length - 1);
			if (data == "1") {
				newInfo[i]["start"] = month[val.slice(val.length - 2, val.length)];
			} else {
				newInfo[i]["start"] = month[val.slice(val.length - 1, val.length)];
			}
		} else if (key == "end_month") {
			newInfo[i]["year"] = parseInt(val.slice(0, 4));
			let data: string = val.slice(val.length - 2, val.length - 1);
			if (data == "1") {
				newInfo[i]["end"] = month[val.slice(val.length - 2, val.length)];
			} else {
				newInfo[i]["end"] = month[val.slice(val.length - 1, val.length)];
			}
		}
		newInfo[i][key] = val;
		setworkExps(newInfo);
	};

	const UpdateData = (key: string, val: string, i: number) => {
		var newInfo = [...WorkExperience];
		var info: any = newInfo[i];
		info[key] = val;
		let upvote = 0;
		let month: any = {
			1: "January",
			2: "February",
			3: "March",
			4: "April",
			5: "May",
			6: "June",
			7: "July",
			8: "August",
			9: "September",
			10: "October",
			11: "November",
			12: "December",
		};
		if (key == "start_month") {
			let data: string = val.slice(val.length - 2, val.length - 1);
			if (data == "1") {
				info["start"] = month[val.slice(val.length - 2, val.length)];
			} else {
				info["start"] = month[val.slice(val.length - 1, val.length)];
			}
		}
		if (key == "end_month") {
			info["year"] = parseInt(val.slice(0, 4));
			let data: string = val.slice(val.length - 2, val.length - 1);
			if (data == "1") {
				info["end"] = month[val.slice(val.length - 2, val.length)];
			} else {
				info["end"] = month[val.slice(val.length - 1, val.length)];
			}
		}
		if (key == "description") {
			upvote = 0;
		} else {
			for (let keys in info) {
				if (info[keys] == "") {
					upvote += 1;
				}
			}
		}
		if (upvote > 0) {
			info["disabling"] = true;
		} else {
			info["disabling"] = false;
		}
		newInfo[i] = info;
		setWorkExperience(newInfo);
	};
	const changeEditing = (id: string) => {
		// console.log(id);
		let work = [...workExps];
		for (let i = 0; i < work.length; i++) {
			if (work[i]["work_id"] == id) {
				work[i]["editing"] = !work[i]["editting"];
			}
		}
		setworkExps(work);
		// console.log(workExps);
	};

	const saveExistingData = async (r: number) => {
		setUpdateLoading(true);
		let k: any = workExps[r];
		let work: any = {
			work_id: k["work_id"],
			roll_no: `${AuthData.user.userData.user.roll_no}`,
		};
		for (let keys in work2[r]) {
			if (k[keys] != work2[keys]) {
				work[keys] = k[keys];
			}
		}
		work["start_month"] = work["start"];
		work["end_month"] = work["end"];
		delete work.editing;
		delete work.start;
		delete work.end;
		// console.log(work);
		const body = { work: work };
		const response = await axios.post(
			`${server}/add/student/workexperience`,
			body,
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true
			}
		);
		// console.log(response);
		setUpdateLoading(false);
		if (response.status == 200) {
			Swal.fire({
				icon: "success",
				title: "Update Successful",
				showConfirmButton: false,
				timer: 1500,
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Update Failed",
				showConfirmButton: false,
				timer: 1500,
			});
		}
		getProfileData();
	};

	const save = async (r: number) => {
		setUpdateLoading(true);
		var working_id =
			`${AuthData.user.userData.user.roll_no}` + `${workExps.length + 1}`;
		let k: any = WorkExperience[r];
		let work: any = {
			work_id: working_id,
			roll_no: `${AuthData.user.userData.user.roll_no}`,
		};
		for (let keys in work2[r]) {
			if (k[keys] != work2[keys]) {
				work[keys] = k[keys];
			}
		}
		delete k.id;
		delete k.disabling;
		for (let keys in k) {
			work[keys] = k[keys];
		}
		work["start_month"] = work["start"];
		work["end_month"] = work["end"];
		delete work.start;
		delete work.end;
		// console.log(work);
		const body = { work: work };
		const response = await axios.post(
			`${server}/add/student/workexperience`,
			body,
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true
			}
		);
		setUpdateLoading(false);
		if (response.status == 200) {
			Swal.fire({
				icon: "success",
				title: "Work Experience Added",
				showConfirmButton: false,
				timer: 1500,
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Work Experience addition Failed",
				showConfirmButton: false,
				timer: 1500,
			});
		}
		getProfileData();
	};
	return (
		<div className="w-full sm:w-11/12 mx-auto  flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
			<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-4">
				Work Experience
			</h3>
			{loading ? (
				<Loading loadState={loadState} />
			) : (
				<>
					{workExps.map(
						(
							{
								work_id,
								company_name,
								location,
								role,
								description,
								start_month,
								end_month,
								editing,
							}: any,
							x: number
						) => (
							<div
								className="flex flex-col drop-shadow-xl text-black mx-auto my-5 py-1 px-3 w-11/12 bg-white border-2 border-neutral-300 rounded-lg"
								key={work_id}
							>
								{editing ? (
									<div className="w-full flex flex-row mx-auto items-center justify-end my-2 border-b-gray-300 border-b-4 pb-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											onClick={() => {
												changeEditing(work_id);
											}}
											className="w-4 h-4 sm:w-6 sm:h-6 ml-auto hover:scale-75 cursor-pointer"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</div>
								) : (
									<div className="w-full flex flex-row mx-auto items-center justify-end my-2 border-b-gray-300 border-b-4 pb-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											onClick={() => {
												changeEditing(work_id);
											}}
											className="w-4 h-4 sm:w-6 sm:h-6 mr-2 hover:scale-75 cursor-pointer"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
											/>
										</svg>
									</div>
								)}
								<div className="flex flex-col-reverse sm:flex-wrap sm:flex-row items-center justify-between">
									{editing ? (
										<input
											type="text"
											onChange={(e) => {
												UpdateExistingData("company_name", e.target.value, x);
											}}
											value={company_name}
											placeholder="Company Name"
											className="my-2 mr-2 bg-white border-gray-300 border-solid border-2 rounded-mg text-black p-1"
										/>
									) : (
										<h2 className="text-xl font-semibold text-center">
											{company_name}
										</h2>
									)}
									{editing ? (
										<div className="flex flex-row flex-wrap">
											<input
												type="month"
												value={start_month}
												onChange={(e) => {
													UpdateExistingData("start_month", e.target.value, x);
												}}
												className="my-2 mr-2 bg-white border-gray-300 border-solid border-2 rounded- text-black p-2"
											/>
											<input
												type="month"
												value={end_month}
												onChange={(e) => {
													UpdateExistingData("end_month", e.target.value, x);
												}}
												className="my-2 bg-white border-gray-300 border-solid border-2 rounded-lg text-black p-2"
											/>
										</div>
									) : (
										<h2 className="text-sm">
											{start_month} - {end_month}
										</h2>
									)}
								</div>
								{editing ? (
									<input
										type="text"
										onChange={(e) => {
											UpdateExistingData("location", e.target.value, x);
										}}
										value={location}
										placeholder="Location"
										className="my-2 bg-white border-gray-300 border-solid border-2 rounded-lg text-black p-2"
									/>
								) : (
									<h2 className="text-base text-center sm:text-left mb-2 mt-1">
										{location}
									</h2>
								)}
								{editing ? (
									<input
										type="text"
										onChange={(e) => {
											UpdateExistingData("role", e.target.value, x);
										}}
										value={role}
										placeholder="Role"
										className="my-2 bg-white border-gray-300 border-solid border-2 rounded-lg text-black p-21"
									/>
								) : (
									<h2 className="text-base font-semibold text-center sm:text-left mb-2 mt-2">
										{role}
									</h2>
								)}
								{editing ? (
									<textarea
										value={description}
										maxLength={300}
										onChange={(e) => {
											UpdateExistingData("description", e.target.value, x);
										}}
										placeholder="Work Description"
										className="my-2 bg-white border-gray-300 border-solid border-2 rounded-lg text-black p-21"
										rows={4}
									></textarea>
								) : (
									<p className="text-sm text-justify mb-3">{description}</p>
								)}
								{editing ? (
									<button
										onClick={() => {
											saveExistingData(x);
										}}
										className="flex items-center mt-2 mb-2 p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
									>
										Update
										{updloading ? (
											<>
												<ClipLoader className="ml-2" size={20} color="white" />
											</>
										) : (
											<></>
										)}
									</button>
								) : (
									<></>
								)}
							</div>
						)
					)}
					{workExps.length < 3 ? (
						<>
							{WorkExperience.map(
								(
									{
										id,
										company_name,
										location,
										role,
										description,
										start_month,
										end_month,
										disabling,
									}: any,
									x: number
								) => (
									<div
										className="flex flex-col items-center mx-auto mb-3 w-11/12 p-2 bg-white border-2 border-neutral-300 drop-shadow-xl rounded-lg"
										key={id}
									>
										<div className="w-11/12">
											<div className="flex flex-row items-center justify-between w-full text-black mb-2 border-b-gray-300 border-b-4 pb-2">
												<h2 className="text-xl sm:text-2xl font-bold text-gray-900">
													Work Experience {id}
												</h2>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													onClick={() => {
														removeExperience(x);
													}}
													className="w-4 h-4 sm:w-6 sm:h-6 mr-2 hover:scale-75 cursor-pointer"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
													/>
												</svg>
											</div>
											<input
												placeholder="Company Name"
												type="text"
												value={company_name}
												onChange={(e) => {
													UpdateData("company_name", e.target.value, x);
												}}
												className="mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-lg text-black py-2 px-2"
											></input>
										</div>
										<div className="w-11/12">
											<input
												placeholder="Location eg. Work From Home, Banglore, Mumbai, etc."
												type="text"
												value={location}
												onChange={(e) => {
													UpdateData("location", e.target.value, x);
												}}
												className="mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-lg text-black py-2 px-2"
											></input>
										</div>
										<div className="w-11/12">
											<input
												placeholder="Role"
												type="text"
												value={role}
												onChange={(e) => {
													UpdateData("role", e.target.value, x);
												}}
												className="mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-lg text-black py-2 px-2"
											></input>
										</div>
										<div className="w-11/12">
											<textarea
												placeholder="Description - share your experience and tech stacks learned"
												value={description}
												onChange={(e) => {
													UpdateData("description", e.target.value, x);
												}}
												className="mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-lg text-black py-2 px-2"
												name="txtname"
												rows={4}
											></textarea>
										</div>
										<div className="w-11/12">
											<div className="flex mx-auto flex-col sm:flex-row w-full justify-around sm:items-center mb-2 border-b-2 pb-4">
												<h2 className="my-1 sm:my-0 text-sm sm:text-base text-slate-700 font-medium">
													Start Month
												</h2>
												<input
													type="month"
													value={start_month}
													onChange={(e) => {
														UpdateData("start_month", e.target.value, x);
													}}
													className="my-1 sm:my-0 mx-auto w-full md:w-4/12 bg-white border-gray-300 border-solid border-2 rounded-lg text-black py-2 px-2"
												></input>
												<h2 className="my-1 sm:my-0 text-sm sm:text-base text-slate-700 font-medium">
													End Month
												</h2>
												<input
													type="month"
													value={end_month}
													onChange={(e) => {
														UpdateData("end_month", e.target.value, x);
													}}
													className="my-1 sm:my-0 mx-auto w-full  md:w-4/12 bg-white border-gray-300 border-solid border-2 rounded-lg text-black py-2 px-2"
												></input>
											</div>
										</div>
										{disabling ? (
											<button
												disabled
												className="flex items-center justify-center p-2 w-fit mx-auto px-8 py-2 rounded-md bg-gray-400 text-white"
											>
												Save
											</button>
										) : (
											<button
												onClick={() => {
													save(x);
												}}
												className="flex items-center mt-2 mb-2 p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
											>
												Save
												{updloading ? (
													<>
														<ClipLoader
															className="ml-2"
															size={20}
															color="white"
														/>
													</>
												) : (
													<></>
												)}
											</button>
										)}
									</div>
								)
							)}
						</>
					) : (
						""
					)}
					{WorkExperience.length < 3 - workExps.length ? (
						<button
							className="p-2 w-11/12 sm:w-5/12 mx-auto px-5 rounded-md mb-7 hover:scale-105 transition-all"
							style={{ backgroundColor: "#c9243f", color: "white" }}
							onClick={() => {
								addWorkExperience(WorkExperience.length);
							}}
						>
							Add Work Experience
						</button>
					) : (
						""
					)}
				</>
			)}
		</div>
	);
};

export default WorkExperience;
