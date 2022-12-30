import React from "react";
import Avatar from "../../public/avatar.png";
import Logo from "../../public/logo.png";
import Image from "next/image";
import AcademicTable from "./AcademicTable";

function NextResume() {
	return (
		<>
			<div className="w-[794px] h-[1123px] mx-auto my-5 rounded-lg shadow-lg p-0 bg-white relative">
				<div className="bg-accent flex justify-between rounded-t-lg items-center py-2 px-5">
					<div className="text-white flex flex-col font-semibold">
						<p>Name:</p>
						<p>Department:</p>
						<p>Mobile:</p>
						<p>Email:</p>
						<p>Linkedin:</p>
					</div>
					<Image
						src={Avatar}
						className="translate-y-10 translate-x-12 mx-auto z-10 w-[150px] h-[150px] rounded-full bg-white"
						alt="Profile"
					/>
					<Image
						src={Logo}
						className="w-[200px] h-[120px] bg-white rounded-lg p-2"
						alt="logo"
					/>
				</div>
				<div className="h-[15px] bg-black"></div>
				<div className="flex w-full p-5">
					<h3 className="text-accent font-bold text-xl w-1/4">
						Career Objective
					</h3>
					<p className="w-3/4 text-justify">
						Deserunt elit anim cupidatat excepteur velit cupidatat excepteur
						pariatur et incididunt culpa incididunt in qui. Consequat quis quis
						magna anim velit magna ex ex incididunt. Tempor exercitation culpa
						minim ea id cillum non.
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
							<p className="text-justify py-5">
								Cillum cupidatat sit cupidatat culpa velit incididunt sunt ad
								consequat tempor eiusmod. Ea sunt non reprehenderit eu ad quis
								minim ea veniam nisi est deserunt eiusmod. Exercitation pariatur
								consequat minim irure ut. Elit nulla enim adipisicing ut.
							</p>
						</div>
						<div>
							<h3 className="text-white bg-accent px-2 font-bold text-lg">
								Additional Information
							</h3>
							<p className="text-justify py-5">
								Cillum cupidatat sit cupidatat culpa velit incididunt sunt ad
								consequat tempor eiusmod. Ea sunt non reprehenderit eu ad quis
								minim ea veniam nisi est deserunt eiusmod. Exercitation pariatur
								consequat minim irure ut. Elit nulla enim adipisicing ut.
							</p>
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
									⏺
								</span>{" "}
								Certifications ▶▶▶
							</h3>
							<p className="text-justify py-3">
								Tempor sint ipsum minim eiusmod nulla laboris velit id dolore.
								Laboris nulla eiusmod Lorem dolore veniam cillum. Excepteur
								incididunt reprehenderit quis sit tempor cillum adipisicing duis
								et.
							</p>
						</div>
						<div>
							<h3 className="text-accent font-bold text-lg">
								<span
									className="absolute left-[345px] text-black z-30
                                "
								>
									⏺
								</span>{" "}
								Projects and Internships ▶▶▶
							</h3>
							<div>
								<h3 className="text-accent font-bold text-md">Projects</h3>
								<p className="text-justify py-3">
									Tempor sint ipsum minim eiusmod nulla laboris velit id dolore.
									Laboris nulla eiusmod Lorem dolore veniam cillum. Excepteur
									incididunt reprehenderit quis sit tempor cillum adipisicing
									duis et. Qui nostrud dolor eu reprehenderit officia sint.
								</p>
							</div>
							<div>
								<h3 className="text-accent font-bold text-md">Internships</h3>
								<p className="text-justify py-3">
									Tempor sint ipsum minim eiusmod nulla laboris velit id dolore.
									Laboris nulla eiusmod Lorem dolore veniam cillum. Excepteur
									incididunt reprehenderit quis sit tempor cillum adipisicing
									duis et. Qui nostrud dolor eu reprehenderit officia sint.
								</p>
							</div>
						</div>
						<div>
							<h3 className="text-accent font-bold text-lg">
								<span
									className="absolute left-[345px] text-black z-30
                                "
								>
									⏺
								</span>{" "}
								Extra Curricular Achievements ▶▶▶
							</h3>
							<p className="text-justify py-3">
								Tempor sint ipsum minim eiusmod nulla laboris velit id dolore.
								Laboris nulla eiusmod Lorem dolore veniam cillum. Excepteur
								incididunt reprehenderit quis sit tempor cillum adipisicing duis
								et.
							</p>
						</div>
						<div>
							<h3 className="text-accent font-bold text-lg">
								<span
									className="absolute left-[345px] text-black z-30
                                "
								>
									⏺
								</span>{" "}
								Position Of Responsibility ▶▶▶
							</h3>
							<p className="text-justify py-3">
								Tempor sint ipsum minim eiusmod nulla laboris velit id dolore.
								Laboris nulla eiusmod Lorem dolore veniam cillum. Excepteur
								incididunt reprehenderit quis sit tempor cillum adipisicing duis
								et.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div className="flex justify-between my-5">
				<button className="bg-accent text-center mx-auto text-white px-2 py-2 rounded-xl font-semibold flex gap-2 items-center justify-center flex-wrap">
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
