"use client";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import api from "../../contexts/adapter";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { useSearchParams } from 'next/navigation'
const FacultyEditAssignment = () => {
	const AuthData: any = useAuth();
    const roll_no=`${AuthData.user.userData.user.roll_no}`
	const [fileType, setfileType]: any = useState();
	const [readingmaterial, setreadingmaterial]:any = useState(null);
	const [material, setmaterial] = useState();
	const [materialname, setmaterialname]: any = useState('');
	const [assign,setAssign]:any=useState('');
	const searchParams:any = useSearchParams();
	const subjectid=parseInt(searchParams.get('subject_id'));
    const assignmentid=parseInt(searchParams.get('assignment_id'))
	let year = new Date().getFullYear();
	const [newAssign, setNewAssign] = useState({
		assign_name: "",
		assign_des: "",
		file_name: "",
		file_type:"",
		file: "",
		deadlinedate:"",
		deadlinetime:"",

	});
	const handleFormFieldChange = (fieldName : any , e : any) => {
    	setNewAssign({...newAssign , [fieldName]:e.target.value});
    }
	const fileChange=(file: any)=>{
		const fil=file.target.files[0]
		let s=fil.name
		let stop=s.indexOf('.')
		setmaterialname(s.slice(0,stop))
		const reader: any = new FileReader();
			reader.readAsDataURL(file.target.files[0]);
		if(file.target.files[0].type=='application/vnd.openxmlformats-officedocument.presentationml.presentation'){
		  setfileType('pptx');
		  reader.onloadend = () => {
			setmaterial(reader.result.slice(reader.result.indexOf(',')+1));
		  };
		}
		else if(file.target.files[0].type=='application/pdf'){
		  setfileType('pdf');
		  reader.onloadend = () => {
			setmaterial(reader.result.slice(reader.result.indexOf(',')+1));
		  };
		}
		else if(file.target.files[0].type=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
		  setfileType('docx');
		  reader.onloadend = () => {
			setmaterial(reader.result.slice(reader.result.indexOf(',')+1));
		  };
		}
		else if(file.target.files[0].type=='image/jpeg'){
		  setfileType('jpeg');
		  reader.onloadend = () => {
			setmaterial(reader.result.slice(reader.result.indexOf(',')+1));
		  };
		}
		else {
		  Swal.fire({
			icon: "warning",
			title: "Please Enter File Formats Of Pdf, Ppt, Docs, Jpeg",
			showConfirmButton: false,
			timer: 1500,
		  });
		}
	}
	const assignment={
        assignment_id:assignmentid,
		submission_des: newAssign.assign_des,
		file_name:newAssign.file_name ,
		file_type:fileType,
		file: material,
        roll_no:roll_no,
		deadlineAt:newAssign.deadlinedate+"T"+newAssign.deadlinetime+"Z",
	};
    console.log(assignment)
	const save = async () => {
		const response = await axios.post("http://localhost:5000/lms/form/faculty/upsertAssignment", assignment, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthData.user.token}`
      },

    });
		console.log(response);
		if (response.status == 200) {
			Swal.fire({
				icon: "success",
				title: " Assignment Sumitted Successfully",
				showConfirmButton: false,
				timer: 1500,
			});
		} else {
			Swal.fire({
				icon: "error",
				title: "Assignment Submission  Failed..Please Try Again",
				showConfirmButton: false,
				timer: 1500,
			});
		}
	
	};
	return (
		<div className="w-full bg-slate-100 sm:bg-white sm:w-11/12 mx-auto flex flex-col items-center justify-around bg-white container sm:rounded-xl sm:drop-shadow-xl">
			
			<h3 className="text-xl sm:text-2xl font-medium text-gray-900 my-8">
				Edit Assignment 
			</h3>
			<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-14 lg:gap-x-24 px-10 sm:px-20">
				<div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
					<label>Assignment Description</label>
					<input
						maxLength={200}
						className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
						type="text"
						onChange={(e)=>{handleFormFieldChange("assign_des" , e)}}
					></input>
				</div>
				<div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
						<label>Upload File</label>
								<input
								className="block border rounded-mg  w-7/12
								py-1.5 px-2"
								type='file'
								onChange={(e)=>{fileChange(e)}}
								></input>
				</div>
				<div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
					<label>Enter File Name</label>
					<input
						className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
						type="text"
						onChange={(e)=>{handleFormFieldChange("file_name" , e)}}
					></input>
				</div>
				<div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
					<label>Enter deadline date</label>
					<input
						maxLength={200}
						className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
						type="date"
						onChange={(e)=>{handleFormFieldChange("deadlinedate" , e)}}
					></input>
				</div>
				<div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
					<label>Enter deadline day time</label>
					<input
						maxLength={200}
						className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
						type="time"
						step="1"
						onChange={(e)=>{handleFormFieldChange("deadlinetime" , e)}}
					></input>
				</div>
			<div className="my-12 w-full flex justify-center items-center">
					<button
						className="p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
						onClick={save}
					>
						Save
					</button>
	
			</div>
		</div>
	</div>
	);
};

export default FacultyEditAssignment;
