"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSearchParams } from 'next/navigation'

const Assignment = ({ subject_id, subject_name }: any) => {
	const router = useRouter();
	const AuthData: any = useAuth();
    const searchParams:any = useSearchParams();
    const subjectid=parseInt(searchParams.get('subject_id'))
	const [assign, setAssign]: any = useState(null);
	const [addmodule, setAddModule] = useState(false);
	const get_assign = async () => {
		const response = await axios.get(
			`http://localhost:5000/lms/filter/getallassignments/${subjectid}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
			}
		);
		setAssign(response.data);
	};
	useEffect(() => {
		get_assign();
	}, []);
	return (
		<div className="w-full flex justify-center items-center align-middle">
			
            <div className="w-full sm:w-11/12 mx-auto py-5 flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
			
			{assign==null ? <>
			</> : 
			assign.length==0 ? <>
				<h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
					No Assignments Created Yet
				</h3>
			</> : 
			
			<div className="flex flex-col gap-5">
			
			{assign.map(({ assignment_id,assign_name,createdAt,deadlineAt}: any) => (
				<div key={assignment_id}className="flex flex-col mx-auto mb-3 w-11/12 p-5 bg-white border-2 border-neutral-300 rounded-md">
					
					<div className="flex flex-col-reverse sm:flex-row items-center justify-between">
						<h2 className="text-xl font-semibold text-center">
							Name:{assign_name}
						</h2>
                        <h2 className="text-xl font-semibold text-center">
							Created At:{createdAt.slice(0,createdAt.indexOf('T'))}
						</h2>
                        <h2 className="text-xl font-semibold text-center">
							Deadline:{deadlineAt.slice(0,deadlineAt.indexOf('T'))}
						</h2>
					</div>
                    <Link href={{
							pathname:"faculty/viewAssign",
							query:
							{
								assignment_id:assignment_id
							}
						}} className="p-1 mb-3 md:mb-0 text-sm w-48 bg-white text-slate-900 font-semibold border-2 border-slate-900 rounded-md">
							View Submissions
						</Link>
						<Link href={{
							pathname:"faculty/feditAssign",
							query:
							{
								assignment_id:assignment_id
							}
						}} className="p-1 mb-3 md:mb-0 text-sm w-48 bg-white text-slate-900 font-semibold border-2 border-slate-900 rounded-md">
							Edit Assignment
						</Link>
				</div>
				
			))}
		</div>
			}
			<div className="flex bg-white w-11/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
					<div className="flex flex-row flex-wrap w-11/12 mb-2">
						<div className="flex flex-row w-full md:w-1/2 flex-wrap justify-between ml-auto">
							<Link href={{
							pathname:"faculty/addAssign",
							query:
							{
								subject_id:subjectid
							}
						}}
								className="flex items-center p-2 w-fit px-4 py-2 rounded-lg bg-accent text-white hover:scale-105 transition-all ml-auto"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 h-6 mr-1"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								Add Assignment
                            </Link>
							</div>
						</div>
				</div>
            </div>
		</div>
	);
};

export default Assignment;
