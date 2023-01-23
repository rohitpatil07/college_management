"use client";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import api from "../../contexts/adapter";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { useSearchParams } from 'next/navigation'
import Link from "next/link";

const CreateForum = (subject_id:any) => {
	const AuthData: any = useAuth();
    const [flag, setflag]=useState(0);
	const searchParams:any = useSearchParams();
	const moduleid=parseInt(searchParams.get('module_id'))
    const [forums,setForums]:any=useState(null);
	const [newForum, setNewForum] = useState({
		topic: "",
		description: "",
	});
	const handleFormFieldChange = (fieldName : any , e : any) => {
    	setNewForum({...newForum , [fieldName]:e.target.value});
    }
	const forum={
		module_id:moduleid,
        roll_no:`${AuthData.user.userData.user.roll_no}`,
        email:`${AuthData.user.userData.user.email}`,
        topic:newForum.topic,
        description:newForum.description
	};
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
	const save = async () => {
        setflag(1);
        const response = await axios({
            method: "post",
            url: "http://localhost:5000/lms/form/upsertForum",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthData.user.token}`,
            },
            data: {
              forum: forum,
            },
          });
		console.log(response.data);
		if (response.status == 200 && response.data.forum_id!=undefined || response.data.forum_id!=null) {
            setflag(0)
			Swal.fire({
				icon: "success",
				title: " Forum Created Successfully",
				showConfirmButton: false,
				timer: 1500,
			});
            window.location.reload();
		} else {
            setflag(0)
			Swal.fire({
				icon: "error",
				title: "Forum Creation  Failed..Please Try Again",
				showConfirmButton: false,
				timer: 1500,
			});
		}
	
	};
    useEffect(() => {
        get_forums();
    },[forums])
	return (
		<div className="w-full bg-slate-100 sm:bg-white sm:w-11/12 mx-auto flex flex-col items-center justify-around bg-white container sm:rounded-xl sm:drop-shadow-xl">
			
			<h3 className="text-xl sm:text-2xl font-medium text-gray-900 my-8">
				Create Forum
			</h3>
			<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-14 lg:gap-x-24 px-10 sm:px-20">
				<div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
					<label>Topic</label>
					<input
						className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
						type="text"
						onChange={(e)=>{handleFormFieldChange("topic" , e)}}
					></input>
				</div>
				<div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
					<label>Forum Description</label>
					<input
						maxLength={200}
						className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
						type="text"
						onChange={(e)=>{handleFormFieldChange("description" , e)}}
					></input>
				</div>
			<div className="my-12 w-full flex justify-center items-center">
            {flag==1 ? (
							<button
								disabled
								className="flex items-center justify-center p-2 w-fit mx-auto px-8 py-2 rounded-md bg-gray-400 text-white"
							>
								Save
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
            <div className="flex flex-col gap-5">
                <div className="item-center">
                    <h3 className="text-xl sm:text-2xl font-medium text-gray-900 my-8">
                        View Forums
                    </h3>
                </div>
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
						<h2 className="text-xl font-semibold text-center">
							Topic:{topic}
						</h2>
                        <h2 className="text-xl font-semibold text-center">
							Created At:{createdAt.slice(0,createdAt.indexOf('T'))}
						</h2>
                        <h2 className="text-xl font-semibold text-center">
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
	</div>
	);
};

export default CreateForum;
