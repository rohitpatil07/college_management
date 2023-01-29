"use client";
import React, { useState, useEffect } from "react";
import Loading from "../Loaders/Loading";
import Link from "next/link";
import axios from "axios";
import ImagePreview from "./ImagePreview";

const LostAndFound = () => {
	const [lostItems, setLostItems] = useState([]);
	const [modalDisplay, setModayDisplay] = useState(false);
	const [itemName, setItemName] = useState("");
	const [owner, setOwner] = useState("");
	const [showImagePreview, setShowImagePreview] = useState(false);
	const [currentImage, setCurrentImage] = useState("");

	const getLostItems = async () => {
		try {
			const response = await axios.get(
				"http://localhost:5000/market/lost_items",
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			setLostItems(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getLostItems();
	}, []);

	const [lostItemToggle, setLostItemToggle] = useState(true);
	return (
		<>
			<div className="w-full flex justify-center items-center align-middle">
				<div className="flex bg-slate-100 sm:bg-white w-full sm:w-11/12 mt-5 flex-col pt-8 items-center sm:rounded-2xl sm:drop-shadow-lg">
					<div className="mx-auto w-11/12 flex justify-start container py-3 text-slate-500 font-medium border-b">
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
						<p className="mx-2">/</p>
						<Link
							href="/marketplace/lostfound"
							className="flex flex-row items-center border-slate-300"
						>
							Lost and Found
						</Link>
					</div>
					<h3 className="text-xl sm:text-2xl font-medium text-gray-900 py-2">
						Lost and Found Items
					</h3>
					<div className="border-t-4 pt-3 w-11/12 flex flex-col sm:flex-row items-center justify-between">
						<Link
							href="/marketplace/lostfound/addLostItem"
							className="flex items-center p-2 w-fit px-4 py-2 rounded-lg bg-accent text-white hover:scale-105 transition-all"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 mr-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Add a lost item
						</Link>
						<Link
							href="/marketplace/lostfound/reportFoundItem"
							className="flex items-center p-2 w-fit px-4 py-2 rounded-lg bg-accent text-white hover:scale-105 transition-all"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-6 h-6 mr-1"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
								/>
							</svg>
							Report a Found Item
						</Link>
					</div>
					<div className="w-11/12 grid grid-cols-2 my-4 border-2 rounded-xl p-2">
						<button
							onClick={() => {
								setLostItemToggle(true);
							}}
							className={`transition-all px-2 py-3 rounded-md ${
								lostItemToggle
									? "bg-accent text-white"
									: "bg-white text-gray-800"
							}`}
						>
							Lost Items
						</button>
						<button
							onClick={() => {
								setLostItemToggle(false);
							}}
							className={`transition-all px-2 py-3 rounded-md ${
								!lostItemToggle
									? "bg-accent text-white"
									: "bg-white text-gray-800"
							}`}
						>
							Found Items
						</button>
					</div>

					{lostItemToggle ? (
						lostItems.length > 0 ? (
							<>
								<div className="w-11/12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-center justify-items-center my-5">
									{lostItems.map(
										({ item_id, item_image, item_name, story, owner }: any) => (
											<>
												<div
													key={item_id}
													className="flex flex-col items-center w-full drop-shadow-2xl rounded-xl overflow-hidden bg-white"
												>
													{item_image != null ? (
														<>
															<img
																src={item_image}
																alt={item_name}
																onClick={() => {
																	setShowImagePreview(true);
																	setCurrentImage(item_image);
																}}
																className="w-full h-[10rem] object-cover rounded-xl cursor-pointer"
															/>
														</>
													) : (
														<div className="w-full h-[10rem] object-cover rounded-xl flex items-center justify-center bg-gray-300">
															{" "}
															<p>No image uploaded</p>
														</div>
													)}
													<div className="text-lg sm:text-xl font-medium text-gray-900 my-4 whitespace-nowrap overflow-hidden text-ellipsis">
														{item_name}
													</div>
													<div className="text-gray-600 text-[0.75rem] text-justify mx-5 mb-5 h-12 text-ellipsis">
														{story != null ? story : "No description provided"}
													</div>
													<div className="flex flex-col gap-4 mb-5 w-11/12">
														<button
															onClick={() => {
																setModayDisplay(true);
																setOwner(owner);
																setItemName(item_name);
															}}
															className="w-full mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
														>
															Contact Owner
														</button>
														<button
															onClick={() => {}}
															className="w-full mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
														>
															Discuss
														</button>
													</div>
												</div>
											</>
										)
									)}
								</div>
							</>
						) : (
							<>
								<Loading loadState="loading" />
							</>
						)
					) : (
						""
					)}

					{showImagePreview && (
						<ImagePreview
							image={currentImage}
							close={() => {
								setShowImagePreview(false);
							}}
						/>
					)}

					{modalDisplay && (
						<div className="fixed inset-0 z-50 w-full h-full">
							<div className="relative bg-gray-800 blur-bg-2 w-full h-full bg-opacity-50">
								<div className="absolute bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl w-4/5 sm:w-fit h-fit drop-shadow-xl p-4 sm:p-10 overflow-hidden">
									<div className="flex flex-col justify-center items-center gap-8">
										<h1 className="font-bold text-xl text-gray-800">
											Purchase "{itemName}"
										</h1>
										<button
											className="absolute top-0 right-0 m-2 hover:scale-110 transition-all"
											onClick={() => {
												setModayDisplay(false);
											}}
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												fill="none"
												viewBox="0 0 24 24"
												stroke-width="1.5"
												stroke="currentColor"
												className="w-6 h-6 stroke-red-600"
											>
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
												/>
											</svg>
										</button>
										<p className="text-gray-600 text-[0.9rem] font-medium">
											Chat with the owner to discuss about the item
										</p>
										<Link
											href={`mailto:${owner}`}
											className="w-fit mx-auto px-5 py-2 rounded-lg bg-accent text-white hover:scale-105 transition-all"
										>
											Chat with the owner via Email
										</Link>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default LostAndFound;
