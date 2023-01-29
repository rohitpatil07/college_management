"use client";
import React from "react";
import Link from "next/link";
const SideNavBar = () => {
	return (
		<aside className="xs:hidden sm:flex flex flex-col bg-white min-h-screen h-inherit sm:2/5 md:w-1/5 text-slate-500">
			<div className="flex flex-col bg-white pb-24">
				<Link
					href="/company"
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
					href="company/notify"
					className="flex flex-row items-center font-medium  px-2 py-2 hover:bg-blue-100 active:bg-blue-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-4 h-4 mr-1"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
						/>
					</svg>
					Notify
				</Link>
				<Link
					href="company/createdrive"
					className="flex flex-row items-center font-medium  px-2 py-2 hover:bg-blue-100 active:bg-blue-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-4 h-4 mr-1"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
						/>
					</svg>
					Create Drive
				</Link>
				<Link
					href="company/viewdrive"
					className="flex flex-row items-center font-medium  px-2 py-2 hover:bg-blue-100 active:bg-blue-100"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="1.5"
						stroke="currentColor"
						className="w-4 h-4 mr-1"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
						/>
					</svg>
					View Drive
				</Link>
			</div>
		</aside>
	);
};

export default SideNavBar;
