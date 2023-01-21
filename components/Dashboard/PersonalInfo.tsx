"use client";
import React, { useState, useEffect } from "react";
import { updatePersonalData } from "../../routes/routes.js";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import api from "../../contexts/adapter";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import Swal from "sweetalert2";
const PersonalInfo = () => {
	const AuthData: any = useAuth();
	const [loadState, setLoadState] = useState("loading");
	const [loading, setLoading] = useState(true);
	const [updloading, setUpdateLoading] = useState(false);
	const [disabling, setDisabling] = useState(true);
	const [personalInfo, setPersonalInfo] = React.useState([
		{ value: "", label: "First Name", id: "first_name", type: "text" },
		{ value: "", label: "Middle Name", id: "middle_name", type: "text" },
		{ value: "", label: "Last Name", id: "last_name", type: "text" },
		{ value: "", label: "Email Address", id: "email", type: "email" },
		{ value: null, label: "Phone Number", id: "phone_number", type: "number" },
		{ value: "", label: "Gender", id: "gender", type: "radio" },
		{ value: "", label: "Github", id: "github", type: "text" },
		{ value: "", label: "LinkedIn", id: "linkedin", type: "text" },
		{ value: "", label: "LeetCode", id: "leetcode", type: "text" },
		{ value: "", label: "Hacker Rank", id: "hackerrank", type: "text" },
		{ value: "", label: "Department", id: "department", type: "text" },
		{ value: null, label: "Batch", id: "batch", type: "number" },
		{ value: "", label: "College Email", id: "secondary_mail", type: "email" },
		{ value: "", label: "College Name", id: "college_name", type: "text" },
		{ value: "", label: "Profile Pic", id: "photo", type: "text" },
	]);
	const [stu_info, setstu_info]: any = useState();
	const getProfileData = async () => {
		let i = 0;
		const response = await axios.get(
			`http://localhost:5000/filter/student/${AuthData.user.userData.user.roll_no}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
			}
		);
		setstu_info(response.data);
		setLoading(false);
		for (let k = 0; k < personalInfo.length; k++) {
			personalInfo[k].value = response.data[personalInfo[k].id];
		}
		if (response.data["photo"]) {
			setPreviewSource(response.data["photo"]);
		}
	};
	useEffect(() => {
		getProfileData();
	}, []);

	const UpdateData = (val: any, i: string) => {
		var newInfo = [...personalInfo];
		for (let z = 0; z < newInfo.length; z++) {
			if (newInfo[z].id == i) {
				newInfo[z].value = val;
				if (stu_info[i] == val) {
					setDisabling(true);
				} else {
					setDisabling(false);
				}
			}
		}
		setPersonalInfo(newInfo);
	};
	const [previewsource, setPreviewSource] = React.useState(
		"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
	);
	const handlePhotoInputs = (e: any) => {
		const file = e.target.files[0];
		previewFile(file);
	};
	const previewFile = (file: any) => {
		const reader: any = new FileReader();
		reader.readAsDataURL(file);
		if(file.type=='image/jpeg'){
			reader.onloadend = () => {
				personalInfo[personalInfo.length - 1].value = reader.result.slice(reader.result.indexOf(',')+1);
			  setPreviewSource(reader.result.slice(reader.result.indexOf(',')+1));
			};
		  }
		  else {
			Swal.fire({
			  icon: "warning",
			  title: "Please Enter File Formats Of Jpg Jpeg",
			  showConfirmButton: false,
			  timer: 1500,
			});
		  }
		setDisabling(false);
	};

	const save = async () => {
		setDisabling(true);
		setLoadState("Updating");
		setUpdateLoading(true);
		let student: any = {
			roll_no: `${AuthData.user.userData.user.roll_no}`,
			semester: stu_info['semester']
		};
		for (let i = 0; i < personalInfo.length; i++) {
			if (stu_info[personalInfo[i].id] != personalInfo[i].value) {
				student[personalInfo[i].id] = personalInfo[i].value;
			}
		}
		let data = { student };
		const response = await axios.post(
			"http://localhost:5000/add/student",
			data,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
			}
		);
		setUpdateLoading(false);
		if (response.status == 200) {
			Swal.fire({
				icon: "success",
				title: "Update Successfully",
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
			setDisabling(false);
		}
	};
	return (
		<div className="w-full sm:w-11/12 mx-auto flex flex-col items-center justify-around bg-white container rounded-lg">
			<br />
			<h3 className="text-xl sm:text-2xl font-bold text-gray-900">
				Personal Info
			</h3>
			<br />
			{loading ? (
				<>
					<Loading loadState={loadState} />
				</>
			) : (
				<>
					<div className="w-[100px] h-[100px] relative rounded-full text-black">
						<img
							className="rounded-full w-[100px] h-[100px]"
							src={`data:image/jpg; base64, ${previewsource}`}
							alt="profilePic"
						/>
						<div className="text-slate-500 text-center absolute bg-white rounded-full bottom-[-10%] right-[32%] border-gray-300 border-solid border-2 w-8 h-8 overflow-hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="w-5 h-5 absolute top-[10%] left-1 cursor-pointer"
							>
								<path
									fillRule="evenodd"
									d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z"
									clipRule="evenodd"
								/>
							</svg>
							<input
								className="absolute cursor-pointer top-0 scale-110 opacity-0"
								type="file"
								onChange={handlePhotoInputs}
								accept="image/*"
							/>
						</div>
					</div>
					<br />
					<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-14 lg:gap-x-24 px-10 sm:px-20">
						{personalInfo.map(({ value, label, id, type }: any) => (
							<>
								{id == "gender" ? (
									<div className="flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
										Gender
										<div className="flex flex-row justify-around items-center w-1/2">
											<div>
												<input
													className=""
													type="radio"
													id="gender"
													name="gender"
													value="M"
													onChange={(e) => {
														UpdateData(e.target.value, id);
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
														UpdateData(e.target.value, id);
													}}
												/>
												&nbsp;
												<label>Female</label>
											</div>
										</div>
									</div>
								) : id == "photo" ? (
									<></>
								) : (
									<div
										className="flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium"
										key={id}
									>
										<label>{label}</label>
										<input
											value={value}
											className=" border rounded-mg py-1 px-1 w-6/12"
											type={type}
											id={id}
											name={id}
											onChange={(e) => {
												UpdateData(e.target.value, id);
											}}
										></input>
									</div>
								)}
							</>
						))}
					</div>
					<br />
					<div className="w-full flex justify-center items-center">
						{disabling ? (
							<button
								disabled
								className="flex items-center justify-center p-2 w-fit mx-auto px-8 py-2 rounded-md bg-gray-400 text-white"
							>
								Save
								{updloading ? (
									<>
										<ClipLoader className='ml-2' size={20} color="#d63636" />
									</>
								) : (
									<></>
								)}
							</button>
						) : (
							<div className="flex flex-col">
								<button
									className="p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
									onClick={save}
								>
									Save
								</button>
							</div>
						)}
					</div>
				</>
			)}

			<br />
		</div>
	);
};

export default PersonalInfo;
