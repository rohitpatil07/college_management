"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "../Loaders/Loading";
import axios from "axios";

const ProductListings = () => {
	const [products, setProducts]: any = useState([]);
	const [modalDisplay, setModayDisplay] = useState(false);
	const [productId, setProductId]: any = useState([]);
	const [productName, setProductName]: any = useState([]);
	const [owner, setOwner]: any = useState([]);

	const getProduct = async () => {
		try {
			const response = await axios.get(
				"http://localhost:5000/market/products",
				{
					headers: {
						"Content-Type": "application/json",
						// Authorization: `Bearer ${AuthData.user.token}`,
					},
				}
			);
			// console.log(response);
			setProducts(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getProduct();
	}, []);
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
							href="/marketplace/products"
							className="flex flex-row items-center border-slate-300"
						>
							Products
						</Link>
					</div>
					<h3 className="text-xl sm:text-2xl font-medium text-gray-900">
						Recently Uploaded Products
					</h3>
					<div className="border-t-4 my-2 py-3 w-11/12 flex flex-col sm:flex-row items-center justify-between">
						<button className="flex items-center p-2 w-fit px-4 py-2 rounded-lg bg-accent text-white hover:scale-105 transition-all">
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
							Add New Products
						</button>
						<button className="flex mt-1 sm:mt-0 p-2 w-fit px-4 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all">
							Filter Products
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-6 h-6 ml-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								/>
							</svg>
						</button>
					</div>
					{products.length > 0 ? (
						<div className="w-11/12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-center justify-items-center">
							{products.map(
								(
									{
										product_id,
										product_name,
										product_image,
										owner,
										owner_role,
										price,
										category,
										product_desc,
									}: any,
									i: number
								) => (
									<div
										key={product_id}
										className="flex flex-col items-center w-full drop-shadow-2xl rounded-xl overflow-hidden bg-white"
									>
										{product_image != null ? (
											<img
												src={product_image}
												alt={product_name}
												className="w-full min-h-[10rem] object-cover rounded-xl"
											/>
										) : (
											<div className="w-full min-h-[10rem] object-cover rounded-xl flex items-center justify-center bg-gray-300">
												{" "}
												<p className="">No image uploaded</p>
											</div>
										)}
										<div className="w-full flex justify-between px-5 py-2 items-center gap-5">
											<div className="text-lg sm:text-xl font-medium text-gray-900 my-4 whitespace-nowrap overflow-hidden text-ellipsis">
												{product_name}
											</div>
											<h1 className="font-semibold text-accent text-2xl">
												₹{price}
											</h1>
										</div>
										<div className="text-gray-600 text-[0.75rem] text-justify mx-5 mb-5">
											{product_desc != null
												? product_desc
												: "No description provided"}
										</div>
										<button
											onClick={() => {
												setModayDisplay(true);
												setProductId(product_id);
												setProductName(product_name);
												setOwner(owner);
											}}
											className="mb-4 w-fit mx-auto px-16 py-2 rounded-full bg-accent text-white hover:scale-105 transition-all"
										>
											Open
										</button>
									</div>
								)
							)}
						</div>
					) : (
						<>
							<Loading loadState="loading" />
						</>
					)}
				</div>
				{modalDisplay && (
					<div className="fixed inset-0 z-50 w-full h-full">
						<div className="relative bg-gray-800 blur-bg-2 w-full h-full bg-opacity-50">
							<div className="absolute bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl w-4/5 sm:w-fit h-fit drop-shadow-xl p-4 sm:p-10 overflow-hidden">
								<div className="flex flex-col justify-center items-center gap-8">
									<h1 className="font-bold text-xl text-gray-800">
										Purchase "{productName}"
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
										Chat with the seller to mutually decide the transaction
									</p>
									<Link
										href={`mailto:${owner}`}
										className="w-fit mx-auto px-5 py-2 rounded-lg bg-accent text-white hover:scale-105 transition-all"
									>
										Chat with the seller via Email
									</Link>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default ProductListings;
