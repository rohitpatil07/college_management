"use client";
import React, { useState } from "react";
// import Image from "next/image";

const ImagePreview = ({ image, close }: any) => {
	const [showImagePreview, setShowImagePreview] = useState(false);

	return (
		<>
			<div className="fixed inset-0 z-50 w-full h-full">
				<div className="relative bg-gray-800 blur-bg-2 w-full h-full bg-opacity-50">
					<div className="absolute flex justify-center bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl w-4/5 sm:w-fit h-fit drop-shadow-xl p-4 sm:p-10 overflow-hidden">
						<img src={image} className="" alt="image" />
						<button
							onClick={() => {
								setShowImagePreview(false);
								close();
							}}
							className="absolute top-0 right-0 cursor-pointer hover:scale-110 text-red-600 rounded-full m-2 transition-all"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-6 h-6"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ImagePreview;
