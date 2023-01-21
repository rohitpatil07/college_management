"use client";
import React , {useState} from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";

const CreateFaculty = () => {
	const AuthData : any  = useAuth();
	const [faculty, setFaculty]:any= useState({
				first_name:"",
				last_name:"",
				email:"",
				phone_number:0,
				gender: "",
				college_name:"",
				secondary_mail:"",
				password:"",
				department:"",
				photo:""
	})

	const handleFormFieldChange = (fieldName : any , e : any) => {
    	setFaculty({...faculty , [fieldName]:e.target.value});
    }
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
				console.log(faculty)
				console.log(faculty[0])
				faculty.photo= reader.result.slice(reader.result.indexOf(',')+1);
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
	};
	const handleSubmit = async (e : React.FormEvent) =>{
		e.preventDefault();
		console.log(faculty);
		try {
			const teacher={
				first_name:faculty.first_name,
				last_name:faculty.last_name,
				email:faculty.email,
				phone_number:faculty.phone_number,
				gender: faculty.gender,
				college_name:faculty.college_name,
				secondary_mail:faculty.secondary_mail,
				password:faculty.password,
				department:faculty.department,
				photo:faculty.photo
			};
			const response = await axios({
					method: 'post',
					url: "http://localhost:5000/lms/form/addfaculty",
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${AuthData.user.token}`
					}, 
					data: {
						faculty: teacher, // This is the body part
					}
					});
					if (response.status == 200) {
						Swal.fire({
							icon: "success",
							title: "Faculty Created  Successfully",
							showConfirmButton: false,
							timer: 1500,
						});
					} else {
						Swal.fire({
							icon: "error",
							title: "Faculty Creation Failed..Please Try Again",
							showConfirmButton: false,
							timer: 1500,
						});
					}

		} catch (error) {
			alert(error);
		}

	}
	return (
		<div className="w-full sm:w-8/12 mx-auto  flex flex-col drop-shadow-lg items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
			<div className="mt-5 flex flex-col justify-around w-11/12 rounded-md overflow-hidden bg-white border-gray-300 sm:border-white border-solid border-2 p-2">
				<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 mt-5 text-center">
					Create Faculty
				</h3>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Enter First Name</h2>
					<input
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("first_name" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Enter Last Name</h2>
					<input
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("last_name" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Enter Email</h2>
					<input
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("email" , e)}}
						type="mail"
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Enter Phone Number</h2>
					<input
					type="number"
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("phone_number" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Gender</h2>
					<div>
												<input
													className=""
													type="radio"
													id="gender"
													name="gender"
													value="M"
													onChange={(e) => {handleFormFieldChange("gender" , e)}}
												/>
												<label>Male</label>
											</div>
											<div>
												<input
													type="radio"
													id="gender"
													name="gender"
													value="F"
													onChange={(e) => {handleFormFieldChange("gender" , e)}}
												/>
												<label>Female</label>
										</div>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Enter College Name</h2>
					<input
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("college_name" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Enter Secondary Mail</h2>
					<input
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("secondary_mail" , e)}}
						type="mail"
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Password</h2>
					<input
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("password" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Department</h2>
					<input
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("department" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
				<h2 className="text-left mb-3">Enter Photo</h2>
				<input
								type="file"
								onChange={handlePhotoInputs}
								accept="image/*"
							/>
				</div>
				<button className="p-2 w-full mx-auto px-5 rounded-md my-6 bg-accent text-white" onClick={(e)=>{handleSubmit(e)}}>
					Create
				</button>
			</div>
		</div>
	);
};

export default CreateFaculty;
