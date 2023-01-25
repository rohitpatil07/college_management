"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

const Subject = ({ subject_id, subject_name }: any) => {
	const router = useRouter();
	const AuthData: any = useAuth();
	const [modules, setModules]: any = useState(null);
	const [subjectInfo, setSubjectInfo]: any = useState(null);
	const get_module = async () => {
		const response = await axios.get(
			`http://localhost:5000/lms/filter/allmodules/${subject_id}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
			}
		);
		setModules(response.data);
	};
	const current_subject = async () => {
		const response = await axios.get(
			`http://localhost:5000/lms/filter/subject/${subject_id}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
			}
		);
		setSubjectInfo(response.data);
	};
	useEffect(() => {
		get_module();
		current_subject();
	}, []);
	return (
		<div className="w-full flex justify-center items-center align-middle">
			<div className="flex bg-white w-11/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
				{subjectInfo ? (
							<h3 className="text-xl sm:text-2xl font-bold text-gray-900">
								{subjectInfo.subject_name}
							</h3>
				) : (
					<h3 className="text-xl sm:text-2xl font-bold text-gray-900">
						Getting Info
					</h3>
				)}

				<div className="px-4 py-6 text-sm w-11/12 flex flex-wrap cursor-pointer mt-2 mb-2 border-solid border-2 border-neutral-200 shadow-xl drop-shadow-xl rounded-xl">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-4 h-4 mr-1"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
						/>
					</svg>
					Discussion Forum
				</div>
				<Link  href={{
							pathname:"lms/assign",
							query:
							{
								subject_id:subject_id,
								subject_name:subject_name
							}
						}} className="px-4 py-6 text-sm w-11/12 flex flex-wrap cursor-pointer mt-2 mb-2 border-solid border-2 border-neutral-200 shadow-xl drop-shadow-xl rounded-xl">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-4 h-4 mr-1"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
						/>
					</svg>
					Assignment
				</Link>
				{modules ? (
					<div className="flex flex-col md:flex-row flex-wrap justify-evenly items-center w-full mb-5">
						{modules.map(
							(
								{ subject_id, module_name, module_number, module_id }: any,
								i: number
							) => (
								<div
									key={module_number}
									className="flex flex-col items-center w-10/12 scale-90 sm:w-3/5 md:w-2/5 shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden bg-white"
								>
									<img
										src={`/subjects/subject${i + 1}.jpg`}
										alt={module_name}
										className="w-full min-h-[10rem] object-cover rounded-xl"
									/>
									<div className="text-lg sm:text-xl font-medium text-gray-900 my-4 text-center">
										{module_number}. {module_name}
									</div>
									<Link
										href={{
											pathname: "/lms/modules",
											query: {
												module_id: module_id,
												module_name: module_name,
												subject_id: subject_id,
												subject_name: subject_name,
												module_number: module_number,
											},
										}}
										className="mb-5 w-fit mx-auto px-16 py-2 rounded-full bg-accent text-white hover:scale-105 transition-all"
									>
										Open
									</Link>
								</div>
							)
						)}
					</div>
				) : (
					<>
						<Loading loadState="loading" />
					</>
				)}
			</div>
		</div>
	);
};

export default Subject;
