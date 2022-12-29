"use client";
import React from "react";
import Link from "next/link";
const SideNavBar = () => {
	return (
		<aside className="xs:hidden sm:flex flex flex-col bg-white min-h-screen h-inherit sm:2/5 md:w-1/5 text-slate-500">
			<div className="flex flex-col bg-white pb-24">
				<Link
					href="/home"
					className="xs:hidden sm:flex flex flex-row px-2 py-2 items-center font-medium hover:bg-blue-100 active:bg-blue-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-4 h-4 mr-1"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
						/>
					</svg>
					Home
				</Link>

				<Link
					href="/admin/dashboard"
					className="flex flex-row items-center font-medium  px-2 py-2 hover:bg-blue-100 active:bg-blue-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="w-4 h-4 mr-1"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
						/>
					</svg>
					Dashboard
				</Link>

				<Link
					href="/admin/lookup"
					className="flex flex-row items-center font-medium  px-2 py-2 hover:bg-blue-100 active:bg-blue-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="w-4 h-4 mr-1"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					Student Lookup
				</Link>
				<Link
					href="/"
					className="flex flex-row px-2 py-2 items-center font-medium hover:bg-blue-100 active:bg-blue-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						className="w-4 h-4 mr-1"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
						/>
					</svg>
					Send Notifications
				</Link>
			</div>
			<Link
				href="#"
				className="flex flex-row px-2 py-2 items-center font-medium border-t hover:bg-blue-100 active:bg-blue-100"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="w-5 h-5 mr-1"
				>
					<path
						fillRule="evenodd"
						d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
						clipRule="evenodd"
					/>
					<path
						fillRule="evenodd"
						d="M6 10a.75.75 0 01.75-.75h9.546l-1.048-.943a.75.75 0 111.004-1.114l2.5 2.25a.75.75 0 010 1.114l-2.5 2.25a.75.75 0 11-1.004-1.114l1.048-.943H6.75A.75.75 0 016 10z"
						clipRule="evenodd"
					/>
				</svg>{" "}
				Log Out
			</Link>
		</aside>
	);
};

export default SideNavBar;
