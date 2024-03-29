import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../../public/avatar.png";
import ResumeWaterMark from "../../public/resumeWatermark.png";
import axios from "axios";
import Logo from "../../public/logo.png";
import Image from "next/image";
import AcademicTable from "./AcademicTable";

function NextResume() {
	const AuthData: any = useAuth();
	const server = process.env.NEXT_PUBLIC_SERVER_URL;
	const [fname, setFname] = useState("");
	const [lname, setLname] = useState("");
	const [gender, setGender] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState(0);
	const [github, setGithub] = useState("");
	const [link, setLink] = useState("");
	const [hack, setHack] = useState("");
	const [leetcode, setLeetcode] = useState("");
	const [extra, setExtra]: any = useState(null);
	const [proj, setProj]: any = useState(null);
	const [intern, setIntern]: any = useState(null);
	const [rdata, setRdata]: any = useState("");
	const [base, setBase] = useState("");
	const fetchData = async () => {
		const response = await axios.get(
			`${server}/filter/student/${AuthData.user.userData.user.roll_no}`,
			{
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			}
		);
		setFname(response.data.first_name);
		setLname(response.data.last_name);
		setGender(response.data.gender);
		setEmail(response.data.email);
		setPhone(response.data.phone_number);
		setGithub(response.data.github);
		setLink(response.data.linkedin);
		setHack(response.data.hackerrank);
		setLeetcode(response.data.leetcode);
		setExtra(response.data.extra_curricular);
		setProj(response.data.projects);
		setIntern(response.data.work_experience);
		setRdata(response.data.resume_data);
		setBase(response.data.photo);
	};
	useEffect(() => {
		fetchData();
	}, []);
	console.log(extra);
	const download = async () => {
		const response = await axios
			.get(`${server}/download/resume/${AuthData.user.userData.user.roll_no}`, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
				responseType: "blob",
			})
			.then((response) => {
				const blob = response.data;
				const url = window?.URL?.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = url;
				a.download = `${AuthData.user.userData.user.roll_no}.pdf`;
				a.click();
			});
	};
	return (
		<>
			<div className="w-[794px] h-[1123px] mx-auto my-5 rounded-lg shadow-lg p-0 bg-white relative">
				<div className="bg-accent flex  w-full rounded-t-lg items-center py-2 px-5 relative">
					<div className="text-white flex float-left flex-col font-semibold text-sm">
						<p>
							Name: {fname} {lname}
						</p>
						<p>Gender: {gender}</p>
						<p>Email: {email}</p>
						<p>Mobile: {phone}</p>
						<p>Github:{github}</p>
						<p>Linkedin: {link}</p>
						<p>Hackerrank: {hack}</p>
						<p>Leetcode: {leetcode}</p>
					</div>
					{base == undefined ? (
						<Image
							src={Avatar}
							className="absolute left-1/2 -translate-x-1/2 translate-y-[60%] z-10 w-[50px] h-[50px] rounded-full bg-white"
							alt="Profile"
						/>
					) : (
						<img
							src={`data:image/jpeg; base64, ${base}`}
							className="absolute left-1/2 -translate-x-1/2 translate-y-[60%] z-10 w-[100px] h-[100px] rounded-full bg-white"
							alt="Profile"
							width={100}
							height={100}
						/>
					)}
					<div className="absolute right-5 w-[250px] h-[120px] rounded-lg bg-white flex align-middle">
						<Image src={Logo} alt="logo" />
					</div>
				</div>
				<div className="h-[5px] bg-black"></div>
				<div className="flex w-full p-5 items-start">
					<h3 className="text-accent font-bold text-lg w-1/4">
						Career Objective :
					</h3>
					{rdata == null || rdata == undefined ? (
						<></>
					) : (
						<p className="w-3/4 text-justify">{rdata.career_obj}</p>
					)}
				</div>
				<div className="px-5 grid grid-cols-[320px_25px_400px]">
					<div className="mr-2">
						<div>
							<h3 className="text-white bg-accent px-2 font-bold text-lg">
								Academic Background
							</h3>
							<p className="text-justify py-4">
								<AcademicTable></AcademicTable>
							</p>
						</div>
						<div>
							{rdata == undefined ||
							rdata == null ||
							rdata.acad_achievement_one == null ||
							rdata.acad_achievement_one == undefined ? (
								<></>
							) : (
								<>
									<h3 className="mt-2 text-white bg-accent px-2 font-bold text-lg">
										Academic Achievements
									</h3>
									<ul
										className="pl-4 text-sm mt-1"
										style={{ listStyleType: "disc" }}
									>
										<li>{rdata.acad_achievement_one}</li>
										<li>{rdata.acad_achievement_two}</li>
										<li>{rdata.acad_achievement_three}</li>
									</ul>
								</>
							)}
						</div>
						<div>
							{rdata.pref_language == null ||
							rdata.technologies == null ||
							rdata.hobbies == null ? (
								<></>
							) : (
								<>
									<h3 className="mt-3 text-white bg-accent px-2 font-bold text-lg">
										Additional Information
									</h3>
									<ul
										className="pl-4 text-sm mt-1"
										style={{ listStyleType: "disc" }}
									>
										<li>Preffered Language: {rdata.pref_language}</li>
										<li>Tech Stack:{rdata.technologies}</li>
										<li>Hobbies:{rdata.hobbies}</li>
									</ul>
								</>
							)}
						</div>
						<div>
							{extra == null || extra == undefined || extra.length == 0 ? (
								<></>
							) : (
								<>
									<div>
										<h3 className="mt-3 text-white bg-accent px-2 font-bold text-lg">
											Extra Curricular Achievements
										</h3>
									</div>
									<div>
										{extra.map(
											({ description, activity_month, activity_year }: any) => (
												<ul
													className="pl-4 text-sm mt-1"
													style={{ listStyleType: "disc" }}
													key={description}
												>
													<li>
														<p>Activity Description:{description}</p>
														<p>
															Activity Duration: {activity_month}{" "}
															{activity_year}
														</p>
													</li>
												</ul>
											)
										)}
									</div>
								</>
							)}
						</div>
						<div>
							{rdata == undefined ||
							rdata == null ||
							rdata.certificate_one == null ? (
								<> </>
							) : (
								<>
									<h3 className="mt-3 text-white bg-accent px-2 font-bold text-lg">
										Certifications
									</h3>
									<ul
										className="pl-4 text-sm mt-1"
										style={{ listStyleType: "disc" }}
									>
										<li>
											<p>
												Certificate of {rdata.certificate_one} completed in{" "}
												{rdata.certificate_one_completion_date}
											</p>
										</li>
										<li>
											<p>
												Certificate of {rdata.certificate_two} completed in{" "}
												{rdata.certificate_two_completion_date}
											</p>
										</li>
										<li>
											<p>
												Certificate of {rdata.certificate_three} completed in{" "}
												{rdata.certificate_three_completion_date}
											</p>
										</li>
									</ul>
								</>
							)}
						</div>
					</div>
					<div className="w-[4px] h-[780px] bg-accent mx-auto"></div>
					<div className="ml-2 relative">
						<div className="absolute top-1/4 opacity-10 pointer-events-none text-white bg-transparent text-xl transform z-50">
							<Image
								src={ResumeWaterMark}
								alt="Resume WaterMark"
								className=""
							/>
						</div>
						<div>
							<div>
								{proj == null || proj == undefined || proj.length == 0 ? (
									<></>
								) : (
									<div>
										<h3 className="text-accent font-bold text-lg">
											Projects and Internships ▶▶▶
										</h3>
										<h3 className="text-accent font-bold text-md">Projects</h3>
										{proj.map(({ proj_name, proj_desc, role }: any) => (
											<ul
												className="pl-4"
												style={{ listStyleType: "disc" }}
												key={proj_name}
											>
												<li>
													<p className="font-medium">{proj_name}</p>
													<p className="text-justify text-sm">{proj_desc}</p>
												</li>
											</ul>
										))}
									</div>
								)}
							</div>
							<div>
								<h3 className="text-accent font-bold text-md">Internships</h3>
								<div>
									{intern == null ||
									intern == undefined ||
									intern.length == 0 ? (
										<></>
									) : (
										<div>
											{intern.map(
												({
													company_name,
													description,
													start_month,
													end_month,
													year,
												}: any) => (
													<ul
														className="pl-4"
														style={{ listStyleType: "disc" }}
														key={description}
													>
														<li>
															<p className="font-medium">{company_name}</p>
															<p className="text-sm text-justify">
																{description}
															</p>
															<p className="text-sm text-gray-600 text-right">
																{start_month}- {end_month} {year}
															</p>
														</li>
													</ul>
												)
											)}
										</div>
									)}
								</div>
							</div>
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
				<button
					onClick={download}
					className="bg-accent text-center mx-auto text-white px-2 py-2 rounded-xl font-semibold flex gap-2 items-center justify-center flex-wrap"
				>
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
