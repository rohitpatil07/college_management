"use client";
import React , {useState} from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";

const CreateDrive = () => {
	const AuthData : any  = useAuth();
	let keys=["company_id","role","package","job_location","role_desc","cgpa","be_percent","tenth_percent","twelveth_percent","gender","gap","livekt","deadkt"]
	const [drives, setDrives]:any= useState({
				company_id : AuthData.user.userData.user.company_id,
				role:"",
				package:0,
				job_location:"",
				role_desc:"",
				cgpa:0,
				be_percent: 0,
				tenth_percent:0,
				twelveth_percent:0,
				gender:"",
				gap:0,
				livekt:0,
				deadkt:0
	})

	const handleFormFieldChange = (fieldName : any , e : any) => {
    	setDrives({...drives , [fieldName]:e.target.value});
    }
	const handleSubmit = async (e : React.FormEvent) =>{
		e.preventDefault();
		try {
			setDrives({
				company_id : AuthData.user.userData.user.company_id,
				role:drives.role,
				package:Number(drives.package),
				job_location:drives.job_location,
				role_desc:drives.role_desc,
				cgpa:Number(drives.cgpa),
				be_percent: Number(drives.be_percent),
				tenth_percent:Number(drives.tenth_percent),
				twelveth_percent:Number(drives.twelveth_percent),
				gender:drives.gender,
				gap:Number(drives.gap),
				livekt:Number(drives.livekt),
				deadkt:Number(drives.deadkt)
			});
			const response = await axios({
					method: 'post',
					url: "http://localhost:5000/add/company/drive",
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${AuthData.user.token}`
					}, 
					data: {
						drive: drives, // This is the body part
					}
					});
					const queries = {
						gender : {contains : drives.gender},
						department: {contains : ""},
						gap : {lte : drives.gap},
						cgpa : {gte : drives.cgpa},
						livekt : {lte : drives.livekt},
						deadkt : {lte : drives.deadkt},
						tenth_percent : {gte : drives.tenth_percent},
						twelveth_percent : {gte : drives.twelveth_percent},
					}
				    console.log(queries);
					const message=`Notice for ${AuthData.user.userData.user.company_name} Placement Drive`
					const subject=`Notification for  ${AuthData.user.userData.user.company_name} drive  for ${drives["role"]}`
					console.log(message);
                    console.log(subject);
					const noti = await axios.post("http://localhost:5000/filter/notify",
						{ queries , message , subject },
						{
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${AuthData.user.token}`,
							},
						});
					console.log(response.data);
			        console.log(noti);
		} catch (error) {
			alert(error);
		}

	}
  console.log(AuthData);
	return (
		<div className="w-full sm:w-8/12 mx-auto  flex flex-col drop-shadow-lg items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
			<div className="mt-5 flex flex-col justify-around w-11/12 rounded-md overflow-hidden bg-white border-gray-300 sm:border-white border-solid border-2 p-2">
				<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 mt-5 text-center">
					Create Drive
				</h3>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Enter Role</h2>
					<input
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("role" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Enter Role Package</h2>
					<input
           type="number"
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("package" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Enter Job Location</h2>
					<input
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("job_location" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Role Description</h2>
					<input
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("role_desc" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">CGPA</h2>
					<input
            type="number"
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("cgpa" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">BE percent</h2>
					<input
           type="number"
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("be_percent" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Tenth Percent</h2>
					<input
            type="number"
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("tenth_percent" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Twelveth Percent</h2>
					<input
            type="number"
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("twelveth_percent" , e)}}
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
					<h2 className="text-left mb-3">Gap</h2>
					<input
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("gap" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Live KT</h2>
					<input
           type="number"
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("livekt" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Dead KT</h2>
					<input
           type="number"
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("deadkt" , e)}}
					></input>
				</div>
				<button className="p-2 w-full mx-auto px-5 rounded-md my-6 bg-accent text-white" onClick={(e)=>{handleSubmit(e)}}>
					Create
				</button>
			</div>
		</div>
	);
};

export default CreateDrive;
