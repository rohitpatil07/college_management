"use client";
// import { METHODS } from "http";
import React from "react";
// import { updatePersonalData } from "../../routes/routes.js";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import fileDownload from "js-file-download";

const StudentLookup = () => {
	const [personalInfo, setPersonalInfo] = React.useState([
		{
			value: "",
			label: "First Name",
			id: "first_name",
			type: "text",
			status: false,
		},
		{
			value: "",
			label: "Last Name",
			id: "last_name",
			type: "text",
			status: false,
		},
		{
			value: "",
			label: "Email Address",
			id: "email",
			type: "email",
			status: false,
		},
		{ value: "", label: "Gender", id: "gender", type: "radio", status: false },
		{
			value: "",
			label: "Department",
			id: "department",
			type: "text",
			status: false,
		},
		{ value: "", label: "Batch", id: "batch", type: "text", status: false },
	]);
	const [academicInfo, setAcademicInfo] = React.useState([
		{
			value: "",
			label: "Roll Number",
			id: "roll_no",
			type: "text",
			status: false,
		},
		{
			value: "",
			label: "Tenth Percentage",
			id: "10percent",
			type: "text",
			status: false,
		},
		{
			value: "",
			label: "Twelth Percentage",
			id: "12percent",
			type: "text",
			status: false,
		},
		{ value: "", label: "CGPA", id: "cgpa", type: "text", status: false },
		{ value: "", label: "Gap", id: "gap", type: "text", status: false },
		{ value: "", label: "Live KT", id: "livekt", type: "text", status: false },
		{ value: "", label: "Dead KT", id: "deadkt", type: "text", status: false },
	]);

	const AuthData: any = useAuth();
	console.log(AuthData);

	const updatePersonal = (val: string, i: string) => {
		let newInfo = [...personalInfo];
		for (let z = 0; z < newInfo.length; z++) {
			if (newInfo[z].id == i) {
				newInfo[z].value = val;
				if (val == "") newInfo[z].status = false;
				else newInfo[z].status = true;
			}
		}
		// console.log(newInfo);
		setPersonalInfo(newInfo);
	};
	const updateAcademic = (val: string, i: string) => {
		let newInfo = [...academicInfo];
		for (let z = 0; z < newInfo.length; z++) {
			if (newInfo[z].id == i) {
				newInfo[z].value = val;
				if (val == "") newInfo[z].status = false;
				else newInfo[z].status = true;
			}
		}
		// console.log(newInfo);
		setAcademicInfo(newInfo);
	};

	const getExcel = async () => {
		let selectData: any = {
			academic_info: {
				select: {},
			},
		};
		let queryData: any = {
			academic_info: {
				select: {},
			},
		};
		for (let i = 0; i < personalInfo.length; i++) {
			if (personalInfo[i].status == true) {
				selectData[personalInfo[i].id] = true;
				queryData[personalInfo[i].id] = personalInfo[i].value;
			}
		}
		for (let i = 0; i < academicInfo.length; i++) {
			if (academicInfo[i].status == true) {
				selectData.academic_info.select[academicInfo[i].id] = true;
				queryData.academic_info.select[academicInfo[i].id] =
					academicInfo[i].value;
			}
		}

		let final_response = { select_fields: selectData, queries: queryData };

		axios
			.post("http://localhost:5000/download/excel", final_response, {
				responseType: "blob",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
					// "Content-Disposition": "attachment; filename=template.xlsx",
				},
			})
			.then((response) => {
				const type = response.headers["content-type"];
				const blob: any = new Blob([response.data], { type: type });
				const link = document.createElement("a");
				link.href = window.URL.createObjectURL(blob);
				link.download = "file.xlsx";
				link.click();
			});
	};

	// const url = window.URL.createObjectURL(blob);
	// const a = document.createElement('a');
	// a.href = url;
	// a.download = 'data.xlsx';
	// a.click();

	const getCSV = async () => {
		let selectData: any = {
			academic_info: {
				select: {},
			},
		};
		let queryData: any = {
			academic_info: {
				select: {},
			},
		};
		for (let i = 0; i < personalInfo.length; i++) {
			if (personalInfo[i].status == true) {
				selectData[personalInfo[i].id] = true;
				queryData[personalInfo[i].id] = personalInfo[i].value;
			}
		}
		for (let i = 0; i < academicInfo.length; i++) {
			if (academicInfo[i].status == true) {
				selectData.academic_info.select[academicInfo[i].id] = true;
				queryData.academic_info.select[academicInfo[i].id] =
					academicInfo[i].value;
			}
		}

		let final_response = { select_fields: selectData, queries: queryData };

		console.log(final_response);

		// axios
		// 	.post("http://localhost:5000/download/csv", final_response, {
		// 		// responseType: "blob",
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 			Authorization: `Bearer ${AuthData.user.token}`,
		// 		},
		// 	})
		// 	.then((response) => {
		// 		const url = window.URL.createObjectURL(new Blob([response.data]));
		// 		const link = document.createElement("a");
		// 		link.href = url;
		// 		link.setAttribute("download", "template.csv");
		// 		document.body.appendChild(link);
		// 		link.click();
		// 	});

		axios
			.post("http://localhost:5000/download/csv", final_response, {
				// responseType: "arraybuffer",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
			})
			.then((res) => {
				console.log(res);
				console.log(res.data);
				fileDownload(res.data, "report.csv");
			});
	};

	return (
		<div className="w-full flex justify-center items-center align-middle">
			<div className="flex bg-white w-10/12 mt-5 flex-col px-20 pt-8 items-center rounded-2xl drop-shadow-lg">
				<h3 className="text-xl sm:text-2xl font-bold text-gray-900">
					Student Lookup
				</h3>
				<p className="text-slate-400 text-sm">
					Filter Students based on the required fields
				</p>
				<div className="w-full pt-10 grid grid-cols-2 gap-x-10 gap-y-4">
					{personalInfo.map(({ value, label, id, type }: any) => (
						<>
							{id == "gender" ? (
								<div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
									Gender
									<div className="flex flex-row justify-around items-center gap-24">
										<div>
											<input
												className="bg-white"
												type="radio"
												id="gender"
												name="gender"
												value="M"
												onChange={(e) => {
													updatePersonal(e.target.value, id);
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
													updatePersonal(e.target.value, id);
												}}
											/>
											&nbsp;
											<label>Female</label>
										</div>
									</div>
								</div>
							) : (
								<div
									className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium"
									key={id}
								>
									<label>{label}</label>
									<input
										value={value}
										className=" border rounded-md p-1"
										type={type}
										id={id}
										name={id}
										onChange={(e) => {
											updatePersonal(e.target.value, id);
										}}
									></input>
								</div>
							)}
						</>
					))}
					{academicInfo.map(({ value, label, id, type }: any) => (
						<>
							<div
								className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium"
								key={id}
							>
								<label>{label}</label>
								<input
									value={value}
									className=" border rounded-md py-1 px-1"
									type={type}
									id={id}
									name={id}
									onChange={(e) => {
										updateAcademic(e.target.value, id);
									}}
								></input>
							</div>
						</>
					))}
				</div>
				<br />
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
