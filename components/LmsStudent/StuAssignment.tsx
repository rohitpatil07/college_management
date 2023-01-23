"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSearchParams } from 'next/navigation'

const StuAssignment = ({ subject_id, subject_name }: any) => {
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
			<h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
				View Assignment
			</h3>
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
							pathname:"lms/subAssign",
							query:
							{
								subject_id:subjectid,
								assignment_id:assignment_id
							}
						}} className="p-1 mb-3 md:mb-0 text-sm w-48 bg-white text-slate-900 font-semibold border-2 border-slate-900 rounded-md">
							Submit Assignmennt
						</Link>
						<Link href={{
							pathname:"lms/editAssign",
							query:
							{
								subject_id:subjectid,
								assignment_id:assignment_id
							}
						}} className="p-1 mb-3 md:mb-0 text-sm w-48 bg-white text-slate-900 font-semibold border-2 border-slate-900 rounded-md">
							Edit Assignmennt
						</Link>
					
				</div>
			))}
		</div>
			}
            </div>
		</div>
	);
};

export default StuAssignment;
