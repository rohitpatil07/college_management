"use client";
import React, { useState, useEffect } from "react";
// import { updatePersonalData } from "../../routes/routes.js";
import axios from "axios";

import { useAuth } from "../../contexts/AuthContext";
import fileDownload from "js-file-download";

const StudentLookup = () => {
	const [personalInfo, setPersonalInfo] = useState({
		roll_no: {
			value: "",
			label: "Roll Number",
			type: "text",
			status: true,
		},
		first_name: {
			value: "",
			label: "First Name",
			type: "text",
			status: false,
		},
		middle_name: {
			value: "",
			label: "Middle Name",
			type: "text",
			status: false,
		},
		last_name: {
			value: "",
			label: "Last Name",
			type: "text",
			status: false,
		},
		email: {
			value: "",
			label: "Email Address",
			type: "email",
			status: false,
		},
		phone_number: {
			value: "",
			label: "Phone Number",
			type: "number",
			status: false,
		},
		gender: { value: "", label: "Gender", type: "radio", status: false },
		github: {
			value: "",
			label: "Github",
			type: "text",
			status: false,
		},
		linkedin: {
			value: "",
			label: "LinkedIn",
			type: "text",
			status: false,
		},
		leetcode: {
			value: "",
			label: "Leetcode",
			type: "text",
			status: false,
		},
		hackerrank: {
			value: "",
			label: "Hackerrank",
			type: "text",
			status: false,
		},
	});

	const AuthData: any = useAuth();
	console.log(AuthData);

	// const updatePersonal = (val: string, i: string) => {
	// 	let newInfo = { ...personalInfo };
	// 	for (let z = 0; z < newInfo.; z++) {
	// 		if (newInfo[z].id == i) {
	// 			newInfo[z].value = val;
	// 			if (val == "") newInfo[z].status = false;
	// 			else newInfo[z].status = true;
	// 		}
	// 	}
	// 	// console.log(newInfo);
	// 	setPersonalInfo(newInfo);
	// };

	const handleChange = (val: any, i: any) => {
		let newInfo = { ...personalInfo };
		newInfo[i].value = val;
		setPersonalInfo(newInfo);
	};

	// const handleSubmit = () => {};

	const generateFinalFields = () => {
		let select_fields = {};
		let queries = {};
		Object.keys(personalInfo).forEach((key) => {
			if (personalInfo[key].status)
				select_fields[key] = personalInfo[key].status;
		});
		Object.keys(personalInfo).forEach((key) => {
			if (personalInfo[key].value != "") queries[key] = personalInfo[key].value;
		});
		return { select_fields, queries };
	};

	const getExcel = async () => {
		const { select_fields, queries } = generateFinalFields();

		let final_response = {
			select_fields,
			queries,
		};

		console.log(final_response);

		axios
			.post("http://localhost:5000/download/excel", final_response, {
				responseType: "blob",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
			})
			.then((response) => {
				console.log(response);
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", "export.xlsx");
				document.body.appendChild(link);
				link.click();
			});
	};

	const getCSV = async () => {
		const { select_fields, queries } = generateFinalFields();

		let final_response = {
			select_fields,
			queries,
		};

		console.log(final_response);

		axios
			.post("http://localhost:5000/download/csv", final_response, {
				responseType: "blob",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
			})
			.then((response) => {
				console.log(response);
				const url = window.URL.createObjectURL(new Blob([response.data]));
				const link = document.createElement("a");
				link.href = url;
				link.setAttribute("download", "export.csv");
				document.body.appendChild(link);
				link.click();
			});
	};

	return (
		<div className="w-full flex justify-center items-center align-middle">
			<div className="flex bg-white w-10/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
				<h3 className="text-xl sm:text-2xl font-bold text-gray-900">
					Student Lookup
				</h3>
				<p className="text-slate-400 text-sm">
					Filter Students based on the required fields
				</p>
				<div className="border shadow-lg rounded-lg p-5 w-11/12 my-5">
					<h3 className="font-semibold">Select Fields Required in the Data</h3>
					<hr className="py-3" />
					<div className="flex flex-wrap gap-3">
						{Object.keys(personalInfo).map((e) => (
							<p
								className={`px-5 py-2 rounded-full cursor-pointer ${
									personalInfo[e].status
										? "bg-accent text-white"
										: "bg-slate-200"
								}`}
								onClick={() => {
									let newInfo = { ...personalInfo };
									newInfo[e].status = !newInfo[e].status;
									setPersonalInfo(newInfo);
								}}
							>
								{personalInfo[e].label}
							</p>
						))}
					</div>
				</div>
				<div className="border shadow-lg rounded-lg p-8 w-11/12">
					<h3 className="font-semibold">Filter Data through below fields</h3>
					<hr />
					<div className="pt-5 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4">
						{Object.keys(personalInfo).map((item: any) => (
							<>
								{item == "gender" ? (
									<div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
										Gender
										<div className="flex flex-row justify-around items-center w-1/2">
											<div>
												<input
													className="bg-white"
													type="radio"
													id="gender"
													name="gender"
													value="M"
													onChange={(e) => {
														handleChange(e.target.value, item);
													}}
												/>
												&nbsp;
												<label>Male</label>
											</div>
											<div>
												<input
													type="radio"
													id="gender"
													name="gender"
													value="F"
													onChange={(e) => {
														handleChange(e.target.value, item);
													}}
												/>
												&nbsp;
												<label>Female</label>
											</div>
										</div>
									</div>
								) : (
									<div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
										<label>{personalInfo[item].label}</label>
										<input
											value={personalInfo[item].value}
											className="border-2 rounded-md p-1 w-1/2"
											type={personalInfo[item].type}
											id={item}
											name={personalInfo[item].label}
											onChange={(e) => {
												handleChange(e.target.value, item);
											}}
										></input>
									</div>
								)}
							</>
						))}
					</div>
				</div>
				<br />
				{/* <button
					className="p-2 bg-accent text-white mx-auto px-8 rounded-lg hover:scale-105 transition-all"
					onClick={handleSubmit}
				>
					Get Data
				</button> */}
				<div className="flex gap-10">
					<button
						className="p-2 bg-accent text-white mx-auto px-8 rounded-lg hover:scale-105 transition-all"
						onClick={getExcel}
					>
						Get Excel
					</button>
					<button
						className="p-2 bg-accent text-white mx-auto px-8 rounded-lg hover:scale-105 transition-all"
						onClick={getCSV}
					>
						Get CSV
					</button>
				</div>
				<br />
			</div>
		</div>
	);
};

export default StudentLookup;
