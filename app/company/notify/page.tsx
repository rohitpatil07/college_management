"use client";
import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

function Page() {
	const AuthData: any = useAuth();

	const [form, setForm] = useState({
		livekt: 0,
		deadkt: 0,
		gap: 0,
		cgpa: 0,
		be_percent: 0,
		tenth_percent: 0,
		twelveth_percent: 0,
		dept: "",
		gender: "",
		offers: 0,
		package: 0,
	});

	const [message, setMessage] = useState("");
	const [subject, setSubject] = useState("");

	const handleFormFieldChange = (fieldName: any, e: any) => {
		if (
			fieldName != "gender" &&
			fieldName != "dept" &&
			fieldName != "subject"
		) {
			setForm({ ...form, [fieldName]: parseFloat(e.target.value) });
		} else {
			setForm({ ...form, [fieldName]: e.target.value });
		}
	};

	const handleSubmit = async () => {
		const queries = {
			gender: { contains: form.gender },
			department: { contains: form.dept },
			gap: { lte: form.gap },
			cgpa: { gte: form.cgpa },
			livekt: { lte: form.livekt },
			deadkt: { lte: form.deadkt },
			tenth_percent: { gte: form.tenth_percent },
			twelveth_percent: { gte: form.twelveth_percent },
		};

		const response = await axios.post(
			"http://localhost:5000/filter/notify",
			{ queries, message, subject },
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
			}
		);
		console.log(response);

		//send data here
		console.log(form);
	};

	return (
		<div className="sm:w-[80%] mt-5 mx-auto flex flex-col drop-shadow-lg items-center bg-white container rounded-2xl">
			<div className="flex flex-col items-center">
				<div className="my-5">
					<h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center">
						Create Notifications
					</h3>
					<p className="text-slate-400 text-sm text-center">
						Create drive notifications with custom eligibility requirements
					</p>
				</div>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4 m-auto pt-5 px-5 lg:px-10 xs:px-auto">
					<div className="flex w-full justify-between">
						<p className="text-slate-700 font-medium">CGPA</p>
						<input
							type="text"
							onChange={(e) => handleFormFieldChange("cgpa", e)}
							className="border-2 rounded-md p-1 w-1/2"
						/>
					</div>
					<div className="flex w-full justify-between">
						<p className="text-slate-700 font-medium"> Live KT</p>
						<input
							type="text"
							onChange={(e) => handleFormFieldChange("livekt", e)}
							className="border-2 rounded-md p-1 w-1/2"
						/>
					</div>
					<div className="flex w-full justify-between">
						<p className="text-slate-700 font-medium"> Dead KT</p>
						<input
							type="text"
							onChange={(e) => handleFormFieldChange("deadkt", e)}
							className="border-2 rounded-md p-1 w-1/2"
						/>
					</div>
					<div className="flex w-full justify-between">
						<p className="text-slate-700 font-medium">GAP</p>
						<input
							type="text"
							onChange={(e) => handleFormFieldChange("gap", e)}
							className="border-2 rounded-md p-1 w-1/2"
						/>
					</div>
					<div className="flex w-full justify-between">
						<p className="text-slate-700 font-medium">Tenth Percent</p>
						<input
							type="text"
							onChange={(e) => handleFormFieldChange("tenth_percent", e)}
							className="border-2 rounded-md p-1 w-1/2"
						/>
					</div>
					<div className="flex w-full justify-between">
						<p className="text-slate-700 font-medium">Twelveth Percent</p>
						<input
							type="text"
							onChange={(e) => handleFormFieldChange("twelveth_percent", e)}
							className="border-2 rounded-md p-1 w-1/2"
						/>
					</div>
					<div className="flex w-full justify-between">
						<p className="text-slate-700 font-medium">Department</p>
						<input
							type="text"
							onChange={(e) => handleFormFieldChange("dept", e)}
							className="border-2 rounded-md p-1 w-1/2"
						/>
					</div>
					<div className="flex w-full justify-between">
						<p className="text-slate-700 font-medium">Gender</p>
						<select
							name=""
							id=""
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
					<div className="flex w-full justify-between">
						<p className="text-slate-700 font-medium">Offer</p>
						<input
							type="text"
							onChange={(e) => handleFormFieldChange("offer", e)}
							className="border-2 rounded-md p-1 w-1/2"
						/>
					</div>
					<div className="flex w-full justify-between">
						<p className="text-slate-700 font-medium">Package</p>
						<input
							type="text"
							onChange={(e) => handleFormFieldChange("package", e)}
							className="border-2 rounded-md p-1 w-1/2"
						/>
					</div>
				</div>
				<div className="w-full border-t-2 bg-slate-400 my-5"></div>
				<div className="flex flex-col pt-5 px-5 lg:px-10 xs:px-auto items-center">
					<h3 className="text-lg sm:text-2xl font-semibold text-gray-900 mb-5">
						Make Email Body
					</h3>
					<div className="flex justify-between mb-5">
						<p className="text-slate-700 font-medium">Subject :</p> &nbsp;&nbsp;
						<textarea
							onChange={(e) => {
								setSubject(e.target.value);
							}}
							cols={80}
							rows={2}
							className="border-2 rounded-md p-1 w-2/3"
						></textarea>
					</div>
					<div className="flex justify-between mb-5">
						<p className="text-slate-700 font-medium">Message :</p>
						<textarea
							onChange={(e) => {
								setMessage(e.target.value);
							}}
							cols={80}
							rows={6}
							className="border-2 rounded-md p-1 w-2/3"
						></textarea>
					</div>
				</div>
				<button
					type="submit"
					onClick={handleSubmit}
					className="p-2 bg-accent text-white mx-auto mb-5 px-8 rounded-lg hover:scale-105 transition-all"
				>
					Submit
				</button>
			</div>
		</div>
	);
}

export default Page;
