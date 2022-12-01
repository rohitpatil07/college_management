"use client";
import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import React from "react";
import { useState } from "react";

const Nav = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<div className="w-full">
			<div className="hidden sm:flex flex-row bg-white text-black justify-between items-center px-4 py-3 drop-shadow-lg">
				<img src={`/logo.png`} alt={`logo`} className="w-1/12 scale-90" />
				<div className="flex flex-row justify-around items-center">
					<button className="flex flex-row text-base text-slate-700 font-medium items-center hover:text-accent">
						<svg
							className="mr-2 w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
							<path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
						</svg>
						Messages
					</button>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button className="flex flex-row text-base text-slate-700 font-medium items-center hover:text-accent">
						<svg
							className="mr-2 w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z"
								clipRule="evenodd"
							/>
						</svg>
						Notifications
					</button>
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<button className="flex flex-row text-base text-slate-700 font-medium items-center hover:text-accent">
						<svg
							className="mr-2 w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
								clipRule="evenodd"
							/>
						</svg>
						Calendar
					</button>
				</div>
				<div className="flex flex-row items-center">
					<div className="flex flex-col items-end">
						<h5 className="text-sm text-slate-700 font-medium">
							Hridayesh Padalkar
						</h5>
						<h6 className="text-xs text-slate-500">19IT1093</h6>
					</div>
					&nbsp;&nbsp;
					<button
						className="flex items-center"
						onClick={() => setIsOpen(!isOpen)}
					>
						<img
							src={"./avatar.png"}
							className="rounded-full border-2 w-9 h-9 scale-110"
							alt=""
						/>
						<div className="flex">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 20 20"
								fill="currentColor"
								className="w-6 h-6"
							>
								<path
									fillRule="evenodd"
									d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
					</button>
				</div>
			</div>
			{isOpen ? (
				<div className="flex justify-end">
					<div className="bg-white text-slate-700 font-medium text-sm w-1/6 rounded-b-lg absolute z-10 drop-shadow-lg">
						<button className="flex gap-1 w-full justify-start p-4 border-y-2 hover:bg-slate-200">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-5 h-5"
							>
								<path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
								<path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
							</svg>
							Edit Profile
						</button>
						<button className="flex gap-1 w-full justify-start p-4 hover:bg-slate-200">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="w-5 h-5"
							>
								<path
									fill-rule="evenodd"
									d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm5.03 4.72a.75.75 0 010 1.06l-1.72 1.72h10.94a.75.75 0 010 1.5H10.81l1.72 1.72a.75.75 0 11-1.06 1.06l-3-3a.75.75 0 010-1.06l3-3a.75.75 0 011.06 0z"
									clip-rule="evenodd"
								/>
							</svg>
							Logout
						</button>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default Nav;
