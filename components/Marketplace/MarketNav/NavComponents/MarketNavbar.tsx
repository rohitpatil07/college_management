"use client";
import React from "react";
import { useState } from "react";
import Avatar from "../../../../public/avatar.png";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../../../contexts/AuthContext";

const MarketNavbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const AuthData: any = useAuth();

	const handleSearch = (e: any) => {
		e.preventDefault();
	};

	return (
		<div className="w-full">
			<div className="hidden sm:flex flex-row bg-white text-black justify-between items-center px-4 py-2 drop-shadow-lg">
				<img src={`/logo.png`} alt={`logo`} className="w-1/12 scale-90" />

				<form className="relative flex" onSubmit={handleSearch}>
					<input
						type="text"
						className="border-2 rounded-lg px-4 py-2 w-[40vw] bg-slate-100"
						placeholder="Search for products..."
					/>
					<button
						className="absolute inset-y-0 right-0 flex items-center text-slate-400 p-4"
						onClick={handleSearch}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-5 h-5 stroke-2"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</button>
				</form>

				<div className="flex flex-row items-center">
					<div className="flex flex-col items-end">
						<h5 className="text-sm text-slate-700 font-medium">
							{`${AuthData.user.userData.user.role}` == "student"
								? `${AuthData.user.userData.user.first_name} ${AuthData.user.userData.user.last_name}`
								: `${AuthData.user.userData.user.role}` == "admin"
								? `${AuthData.user.userData.user.role}`
								: `${AuthData.user.userData.user.role}` == "company"
								? `${AuthData.user.userData.user.company_name}`
								: `${AuthData.user.userData.user.role}` == "faculty"
								? `${AuthData.user.userData.user.first_name} ${AuthData.user.userData.user.last_name}`
								: ""}
						</h5>
						<h6 className="text-xs text-slate-500">
							{`${AuthData.user.userData.user.role}` == "student"
								? `${AuthData.user.userData.user.roll_no}`
								: ""}
						</h6>
					</div>
					&nbsp;&nbsp;
					<button
						className="flex items-center"
						onClick={() => setIsOpen(!isOpen)}
					>
						<Image
							src={Avatar}
							className="rounded-full border-2 scale-110"
							alt="avatar"
							width={36}
							height={36}
							unoptimized
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
						<Link
							href="/login"
							className="flex gap-1 w-full justify-start p-4 hover:bg-slate-200"
							onClick={AuthData.logout()}
						>
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
						</Link>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default MarketNavbar;
