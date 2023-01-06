"use client"
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../../public/avatar.png";
import axios from "axios";
import Logo from "../../public/logo.png";
import Image from "next/image";
import AcademicTable from "./AcademicTable";
import Dot from "../../public/primitive.svg";

function NextResume() {
	const AuthData : any = useAuth();
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [link, setLink] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState(0);
	const [department, setDepartment] = useState('');
	const [extra, setExtra]:any = useState(null);
	// const [pos1, setPos1] = useState('');
	// const [pos2, setPos2] = useState('');
	// const [pos3, setPos3] = useState('');
	const [proj, setProj]:any= useState(null);
	const [intern, setIntern]:any = useState(null);
	const [rdata, setRdata]:any = useState('');
	const [base, setBase] = useState('');
	const fetchData = async () =>
	{
		const response = await axios.get(`http://localhost:5000/filter/student/${AuthData.user.userData.user.roll_no}`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${AuthData.user.token}`
			},
		  });
		console.log(response.data)
		setFname(response.data.first_name);
		setLname(response.data.last_name);
		setLink(response.data.linkedin);
		setEmail(response.data.email);
		setDepartment(response.data.department);
		setPhone(response.data.phone_number);
		setExtra(response.data.extra_curricular);
		// setPos1(response.data.other_info.pos_of_res_one);
		// setPos2(response.data.other_info.pos_of_res_two);
		// setPos3(response.data.other_info.pos_of_res_three);
		setProj(response.data.projects);
		setIntern(response.data.work_experience);
		setRdata(response.data.resume_data);
		setBase(response.data.photo);
	}
	useEffect(()=>{
		fetchData();
	},[]);
	const download = async () =>
	{
		const response = await axios.get(`http://localhost:5000/download/resume/${AuthData.user.userData.user.roll_no}`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${AuthData.user.token}`
			},
			responseType: 'blob'
		  }).then((response) =>  {
			const blob=response.data
			console.log(blob);
			const url = window.URL.createObjectURL(blob);
			console.log(url);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${AuthData.user.userData.user.roll_no}.pdf`;
			a.click();
		  });
	}
	console.log(base);
	return (

		<>
			<div className="w-[794px] h-[1123px] mx-auto my-5 rounded-lg shadow-lg p-0 bg-white relative">
				<div className="bg-accent flex  w-full rounded-t-lg items-center py-2 px-5">

					<div className="text-white flex float-left flex-col font-semibold">
						<p>Name: {fname} {lname}</p>
						<p>Department: {department}</p>
						<p>Mobile: {phone}</p>
						<p>Email: {email}</p>
						<p>Linkedin: {link}</p>
					</div>
					{base==undefined?
					<Image
						src={Avatar}
						className="translate-y-10 translate-x-12 mx-auto z-10 w-[150px] h-[150px] rounded-full bg-white"
						alt="Profile"
					/>
				     :
					<Image
						src={`data:image/jpg; base64, ${base}`}
						className="translate-y-10 mx-5 z-10 w-[150px] h-[150px] rounded-full bg-white"
						alt="Profile"
						width={150}
						height={150}
					/>
					}
					<Image
						src={Logo}
						className="right-5 absolute w-[200px] h-[120px] bg-white rounded-lg p-2"
						alt="logo"
					/>
				</div>
				<div className="h-[15px] bg-black"></div>
				<div className="flex w-full p-5">
					<h3 className="text-accent font-bold text-xl w-1/4">
						Career Objective
					</h3>
					<p className="w-3/4 text-justify">
						{rdata.career_obj}
					</p>
				</div>
				<div className="px-5 grid grid-cols-[320px_25px_400px]">
					<div className="mr-2">
						<div>
							<h3 className="text-white bg-accent px-2 font-bold text-lg">
								Academic Background
							</h3>
							<p className="text-justify py-5">
								<AcademicTable></AcademicTable>
							</p>
						</div>
						<div>
							<h3 className="text-white bg-accent px-2 font-bold text-lg">
								Academic Achievements
							</h3>
							<ul>
									<li>
										{rdata.acad_achievement_one}
									</li>
									<li>
										{rdata.acad_achievement_two}
									</li>
									<li>
										{rdata.acad_achievement_three}
									</li>
								</ul>
						</div>
						<div>
							<h3 className="text-white bg-accent px-2 font-bold text-lg">
								Additional Information
							</h3>
							<ul>
									<li>
									Preffered Language: {rdata.pref_language}
									</li>
									<li>
									Tech Stack:{rdata.technologies}
									</li>
									<li>
									Hobbies:{rdata.hobbies}
									</li>
								</ul>
						</div>
					</div>
					<div className="w-[5px] h-[780px] bg-accent mx-auto"></div>
					<div className="ml-2">
						<div>
							<h3 className="text-accent font-bold text-lg">
								<span
									className="absolute left-[345px] text-black z-30
                                "
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="8" height="16"><path fill-rule="evenodd" d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"/></svg>
								</span>{" "}
								Certifications ▶▶▶
							</h3>
							<ul>
									<li>
									{rdata.certificate_one}
									{' '}
									:
									{' '}
									{rdata.certificate_one_completion_date}
									</li>
									<li>
									{rdata.certificate_two}
									{' '}
									:
									{' '}
									{rdata.certificate_two_completion_date}
									</li>
									<li>
									{rdata.certificate_three}
									{' '}
									:
									{' '}
									{rdata.certificate_three_completion_date}
									</li>
								</ul>
						</div>
						<div>
							<h3 className="text-accent font-bold text-lg">
								<span
									className="absolute left-[345px] text-black z-30
                                "
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="8" height="16"><path fill-rule="evenodd" d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"/></svg>
								</span>{" "}
								Projects and Internships ▶▶▶
							</h3>
							<h3 className="text-accent font-bold text-md">Projects</h3>
							<div>
								{proj==null ?
								<></>:
								<div>
									{proj.map(({ proj_name, proj_desc, role}: any) => (
									<ul>
									<li>
										{proj_name}
										{' '}
										:
										{' '}
										{proj_desc}
										{' '}
										{' '}
										,Role:{role}
									</li>
								</ul>
							))}
								</div>
							}
							</div>
							<div>
							<h3 className="text-accent font-bold text-md">Internships</h3>
							<div>
								{intern==null ?
								<></>:
								<div>
									{intern.map(({ company_name, description,start_month,end_month,year}: any) => (
									<ul>
									<li>
										{company_name}
										{' '}
										:
										{' '}
										{description}
										{' '}
										{' '}
										,{start_month}-{end_month} {year}
									</li>
								</ul>
							))}
								</div>
							}
							</div>
							</div>
						</div>
						<div>
							<h3 className="text-accent font-bold text-lg">
								<span
									className="absolute left-[345px] text-black z-30
                                "
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="8" height="16"><path fill-rule="evenodd" d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"/></svg>
								</span>{" "}
								Extra Curricular Achievements ▶▶▶
							</h3>
						</div>
						<div>
								{extra==null ?
								<></>:
								<div>
									{extra.map(({ description,activity_month,activity_year}: any) => (
									<ul>
									<li>
										{description}
										{' '}
										:
										{' '}
										{activity_month} {activity_year}
									</li>
								</ul>
							))}
								</div>
							}
							</div>
						{/* <div>
							<h3 className="text-accent font-bold text-lg">
								<span
									className="absolute left-[345px] text-black z-30
                                "
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="8" height="16"><path fill-rule="evenodd" d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"/></svg>
								</span>{" "}
								Position Of Responsibility ▶▶▶
							</h3>
							<p className="text-justify py-3">
								Tempor sint ipsum minim eiusmod nulla laboris velit id dolore.
								Laboris nulla eiusmod Lorem dolore veniam cillum. Excepteur
								incididunt reprehenderit quis sit tempor cillum adipisicing duis
								et.
							</p>
						</div> */}
					</div>
				</div>
			</div>
			<div className="flex justify-between my-5">
				<button onClick={download} className="bg-accent text-center mx-auto text-white px-2 py-2 rounded-xl font-semibold flex gap-2 items-center justify-center flex-wrap">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
						/>
					</svg>
					Download / Print Resume
				</button>
			</div>
		</>
	);
}

export default NextResume;
