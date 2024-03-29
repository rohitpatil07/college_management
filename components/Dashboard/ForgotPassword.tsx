"use client";
import React , {useState} from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const ForgotPassword = () => {


	const AuthData : any  = useAuth();
	const server=process.env.NEXT_PUBLIC_SERVER_URL;

	const [form, setForm] = useState({
		email : AuthData.user.userData.user.email,
		password : "",
        password2: ""
	})

	const handleFormFieldChange = (fieldName : any , e : any) => {
    	setForm({...form , [fieldName]:e.target.value});
    }

	const handleSubmit = async (e : React.FormEvent) =>{
		e.preventDefault();
		try {

			if(form.password.length < 1) throw new Error("Please enter Current password");
			

			if(form.password != form.password2) {
				throw new Error("Passwords dont match");
			}

			const response = await axios.post(`${server}/auth/reset_password` , form , {
						headers: {
					"Content-Type": "application/json",
					
				},
				withCredentials: true,
			});
			alert(response.data);

			setForm({
				email : AuthData.user.userData.user.email,
				password : "",
				password2 : "",
			});


		} catch (error) {
			alert(error);
		}

	}

	return (
		<div className="w-full sm:w-8/12 mx-auto  flex flex-col drop-shadow-lg items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
			<div className="mt-5 flex flex-col justify-around w-11/12 rounded-md overflow-hidden bg-white border-gray-300 sm:border-white border-solid border-2 p-2">
				<h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 mt-5 text-center">
					Change Password
				</h3>
				{/* <div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Current Password</h2>
					<input
						type="password"
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("old_password" , e)}}
					></input>
				</div> */}
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Enter a New Password</h2>
					<input
						type="password"
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("password" , e)}}
					></input>
				</div>
				<div className="w-full flex flex-col">
					<h2 className="text-left mb-3">Confirm New Password</h2>
					<input
						type="password"
						className="mb-5 w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1 rounded-md"
						onChange={(e)=>{handleFormFieldChange("password2" , e)}}
					></input>
				</div>
				<button className="p-2 w-full mx-auto px-5 rounded-md my-6 bg-accent text-white" onClick={(e)=>{handleSubmit(e)}}>
					Save
				</button>
			</div>
		</div>
	);
};

export default ForgotPassword;
