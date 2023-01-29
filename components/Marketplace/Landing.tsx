"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import marketplace from "../../public/marketplace.jpg";

const Landing = () => {
	const [showLightBox, setShowLightBox] = useState(false);
	return (
		<div className="flex flex-col bg-white w-[85%] m-auto rounded-2xl mt-5 shadow-lg py-8 px-10">
			<div className="mx-auto flex justify-start container py-3 text-slate-500 font-medium border-b">
				<Link
					href="/home"
					className="flex flex-row items-center border-slate-300"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						className="w-4 h-4 mr-2"
					>
						<path
							fillRule="evenodd"
							d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
							clipRule="evenodd"
						/>
					</svg>
					Home
				</Link>
				<p className="mx-2">/</p>
				<Link
					href="/marketplace"
					className="flex flex-row items-center border-slate-300"
				>
					Marketplace
				</Link>
			</div>
			<div className="flex w-full py-10 flex-col-reverse md:flex-row">
				<div className="w-full md:w-1/2 flex flex-col justify-around gap-5">
					<div className="text-center md:text-start">
						<h1 className="font-medium capitalize text-[6vw] sm:text-[4vw] md:text-[2vw]">
							WELCOME TO
						</h1>
						<h1 className="font-bold text-accent capitalize text-[8vw] sm:text-[6vw] md:text-[3vw]">
							MARKETPLACE
						</h1>
					</div>
					<p className="text-slate-800 font-medium text-justify py-2 text-sm sm:text-md">
						Discover the convenience of our college campus marketplace. Buy and
						sell products with ease within our community of students and
						faculty. Our user-friendly platform makes it easy to connect with
						sellers within campus and find what you need. Join now and start
						exploring all your campus has to offer.
					</p>
					<div className="flex w-full xl:w-fit gap-5 flex-col xl:flex-row items-start">
						<Link
							href="/marketplace/products"
							className="p-2 bg-accent text-white mx-auto px-8 rounded-lg hover:scale-105 transition-all w-full xl:w-fit"
						>
							Buy/Sell Products
						</Link>
						<Link
							href="/marketplace/lostfound"
							className="p-2 bg-accent text-white mx-auto px-8 rounded-lg hover:scale-105 transition-all w-full xl:w-fit"
						>
							Lost and Found
						</Link>
					</div>
				</div>
				<div className="relative flex w-full md:w-1/2 p-5">
					{showLightBox && (
						<div className="w-full bg-gray-200 text-sm text-center my-2 py-2 rounded-md absolute top-0">
							<a href="https://www.freepik.com/free-vector/online-shopping-concept_14449322.htm#query=marketplace&position=4&from_view=search&track=sph">
								Image by pikisuperstar
							</a>{" "}
							on Freepik
						</div>
					)}
					<div className="flex items-center justify-center">
						<Image
							src={marketplace}
							alt="marketplace-illustration"
							className=""
							onClick={() => {
								setShowLightBox(true);
								const timeOutID = setTimeout(() => {
									setShowLightBox(false);
								}, 3000);
								return () => clearTimeout(timeOutID);
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
