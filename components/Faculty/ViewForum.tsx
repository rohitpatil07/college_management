"use client";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import api from "../../contexts/adapter";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";

const ViewForum = (subject_id:any) => {
	const AuthData: any = useAuth();
	const [fileType, setfileType]: any = useState();
	const [readingmaterial, setreadingmaterial]:any = useState(null);
	const [material, setmaterial] = useState();
	const [materialname, setmaterialname]: any = useState('');
	const [forums,setForums]:any=useState(null);
	const searchParams:any = useSearchParams();
	const moduleid=parseInt(searchParams.get('module_id'))
	const get_forums = async () => {
		const responses = await axios.get(
			`http://localhost:5000/lms/filter/getallForums/${moduleid}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
			}
		);
        console.log(responses.data)
		setForums(responses.data);
	};
	useEffect(() =>
	{
		get_forums();
	},[forums])
	return (
		<div className="w-full bg-slate-100 sm:bg-white sm:w-11/12 mx-auto flex flex-col items-center justify-around bg-white container sm:rounded-xl sm:drop-shadow-xl">
			 <div className="flex flex-col gap-5">
            
			<h3 className="text-xl sm:text-2xl font-medium text-gray-900 my-8">
				View Forums
			</h3>
            {forums==null ? <>
			</> : 
			forums.length==0 ? <>
				<h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
					No Forums Created Yet
				</h3>
			</> : 
			<div className="flex flex-col gap-5">
			{forums.map(({ forum_id,topic,createdAt,description}: any) => (
				<div key={forum_id}className="flex flex-col mx-auto mb-3 w-full p-5 bg-white border-2 border-neutral-300 rounded-md">
					<div className="flex flex-col-reverse sm:flex-row items-center justify-between">
						<h2 className="text-base font-semibold text-center sm:text-left mb-2 mt-2">
							Topic:{topic}
						</h2>
                        <h2 className="text-base font-semibold text-center sm:text-left mb-2 mt-2">
							Created At:{createdAt.slice(0,createdAt.indexOf('T'))}
						</h2>
                        <h2 className="text-base font-semibold text-center sm:text-left mb-2 mt-2">
							Description:{description}
						</h2>
					</div>
                    <Link href={{
							pathname:"lms/viewforum",
							query:
							{
								module_id:moduleid,
                                forum_id:forum_id
							}
						}} className="p-1 mb-3 md:mb-0 text-sm w-48 bg-white text-slate-900 font-semibold border-2 border-slate-900 rounded-md">
							View Discussions
						</Link>
					
				</div>
			))}
			</div>
}
		</div>
            </div>

	);
};

export default ViewForum;
