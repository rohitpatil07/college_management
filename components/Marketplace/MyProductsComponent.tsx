"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Loading from "../Loaders/Loading";
import axios from "axios";
import ImagePreview from "./ImagePreview";
import { useAuth } from "../../contexts/AuthContext";

const ProductListings = () => {
	const AuthData: any = useAuth();

	const [products, setProducts]: any = useState([]);
	const [showImagePreview, setShowImagePreview] = useState(false);
	const [currentImage, setCurrentImage] = useState("");
	const [loadingState, setLoadingState] = useState(false);
	const [currentTab, setCurrentTab] = useState({
		products: true,
		lostitem: false,
		founditem: false,
	});
	const [lostFoundItems, setLostFoundItems] = useState([]);

	const getProduct = async () => {
		try {
			setLoadingState(true);
			const response = await axios.get(
				"http://localhost:5000/market/products",
				{
					headers: {
						"Content-Type": "application/json",
						
					},
				}
			);
			// console.log(response);
			setLoadingState(false);
			setProducts(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getlostFoundItems = async () => {
		try {
			setLoadingState(true);
			const response = await axios.get(
				"http://localhost:5000/market/lost_items",
				{
					headers: {
						"Content-Type": "application/json",
						
					},
				}
			);
			setLoadingState(false);
			setLostFoundItems(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const filteredProducts: any = products.length
		? products.filter(
				(product: any) => product.owner === AuthData.user.userData.user.email
		  )
		: [];

	const filteredLostItems: any = lostFoundItems.length
		? lostFoundItems.filter(
				(product: any) =>
					product.owner === AuthData.user.userData.user.email &&
					product.found == false
		  )
		: [];

	const filteredFoundItems: any = lostFoundItems.length
		? lostFoundItems.filter(
				(product: any) =>
					product.owner === AuthData.user.userData.user.email &&
					product.found == true
		  )
		: [];

	const handleProductDeletion = async (product_id: any) => {
		try {
			const response = await axios.post(
				"http://localhost:5000/market/products/delete",
				{ product_id: product_id },
				{
					headers: {
						"Content-Type": "application/json",
						
					},
				}
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
		window.location.reload();
	};

	const handleLostFoundItemDeletion = async (item_id: any) => {
		try {
			const response = await axios.post(
				"http://localhost:5000/market/lost_items/delete",
				{ item_id: item_id },
				{
					headers: {
						"Content-Type": "application/json",
						
					},
				}
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
		window.location.reload();
	};

	useEffect(() => {
		getProduct();
		getlostFoundItems();
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
							href="/marketplace/myproducts"
							className="flex flex-row items-center border-slate-300"
						>
							My Products
						</Link>
					</div>
					<h3 className="text-xl sm:text-2xl font-medium text-gray-900">
						My Products
					</h3>

					<div className="w-11/12 grid grid-cols-3 my-4 border-2 rounded-xl p-2">
						<button
							onClick={() => {
								setCurrentTab({
									products: true,
									lostitem: false,
									founditem: false,
								});
							}}
							className={`transition-all px-2 py-3 rounded-md ${
								currentTab.products
									? "bg-accent text-white"
									: "bg-white text-gray-800"
							}`}
						>
							Products
						</button>
						<button
							onClick={() => {
								setCurrentTab({
									products: false,
									lostitem: true,
									founditem: false,
								});
							}}
							className={`transition-all px-2 py-3 rounded-md ${
								currentTab.lostitem
									? "bg-accent text-white"
									: "bg-white text-gray-800"
							}`}
						>
							Lost Items
						</button>
						<button
							onClick={() => {
								setCurrentTab({
									products: false,
									lostitem: false,
									founditem: true,
								});
							}}
							className={`transition-all px-2 py-3 rounded-md ${
								currentTab.founditem
									? "bg-accent text-white"
									: "bg-white text-gray-800"
							}`}
						>
							Found Items
						</button>
					</div>

					{currentTab.products && (
						<>
							{loadingState && <Loading loadState="loading" />}
							<div className="w-11/12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-center justify-items-center my-5">
								{filteredProducts.map(
									(
										{
											product_id,
											product_name,
											product_image,
											owner,
											owner_role,
											price,
											category,
											product_des,
										}: any,
										i: number
									) => (
											<div
												key={product_id}
												className="relative flex flex-col items-center w-full drop-shadow-2xl rounded-xl overflow-hidden bg-white"
											>
												<div className="absolute top-0 right-0 flex gap-2 m-2">
													<Link
														href={`/marketplace/products/updateProduct/${product_id}`}
														className="rounded-full bg-blue-500 hover:scale-110 p-1 shadow-md transition-all"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth="1.5"
															stroke="currentColor"
															className="w-6 h-6 stroke-white"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
															/>
														</svg>
													</Link>
													<button
														onClick={() => handleProductDeletion(product_id)}
														className="rounded-full bg-red-500 hover:scale-110 p-1 shadow-md transition-all"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth="1.5"
															stroke="currentColor"
															className="w-6 h-6 stroke-white"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
															/>
														</svg>
													</button>
												</div>
												{product_image != null ? (
													<>
														<img
															src={product_image}
															alt={product_name}
															onClick={() => {
																setShowImagePreview(true);
																setCurrentImage(product_image);
															}}
															className="w-full h-[10rem] object-cover rounded-xl cursor-pointer"
														/>
													</>
												) : (
													<div className="w-full h-[10rem] object-cover rounded-xl flex items-center justify-center bg-gray-300">
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
												<div className="text-gray-600 text-[0.75rem] text-justify mx-5 mb-5 h-12 text-ellipsis">
													{product_des != null
														? product_des
														: "No description provided"}
												</div>
											</div>
									)
								)}
							</div>
						</>
					)}

					{currentTab.lostitem && (
						<>
							{loadingState && <Loading loadState="loading" />}
							<div className="w-11/12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-center justify-items-center my-5">
								{filteredLostItems.map(
									({ item_id, item_image, item_name, story, owner }: any) => (
										<>
											<div
												key={item_id}
												className="relative flex flex-col items-center w-full drop-shadow-2xl rounded-xl overflow-hidden bg-white"
											>
												<div className="absolute top-0 right-0 flex gap-2 m-2">
													<Link
														href={`/marketplace/lostfound/updateLostItem/${item_id}`}
														onClick={() => handleLostFoundItemDeletion(item_id)}
														className="rounded-full bg-blue-500 hover:scale-110 p-1 shadow-md transition-all"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke-width="1.5"
															stroke="currentColor"
															className="w-6 h-6 stroke-white"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
															/>
														</svg>
													</Link>
													<button
														onClick={() => handleLostFoundItemDeletion(item_id)}
														className="rounded-full bg-red-500 hover:scale-110 p-1 shadow-md transition-all"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth="1.5"
															stroke="currentColor"
															className="w-6 h-6 stroke-white"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
															/>
														</svg>
													</button>
												</div>
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
					)}
					{currentTab.founditem && (
						<>
							{loadingState && <Loading loadState="loading" />}
							<div className="w-11/12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-center justify-items-center my-5">
								{filteredFoundItems.map(
									({ item_id, item_image, item_name, story, owner }: any) => (
										<>
											<div
												key={item_id}
												className="relative flex flex-col items-center w-full drop-shadow-2xl rounded-xl overflow-hidden bg-white"
											>
												<div className="absolute top-0 right-0 flex gap-2 m-2">
													<button
														onClick={() => handleLostFoundItemDeletion(item_id)}
														className="rounded-full bg-blue-500 hover:scale-110 p-1 shadow-md transition-all"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															stroke-width="1.5"
															stroke="currentColor"
															className="w-6 h-6 stroke-white"
														>
															<path
																stroke-linecap="round"
																stroke-linejoin="round"
																d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
															/>
														</svg>
													</button>
													<button
														onClick={() => handleLostFoundItemDeletion(item_id)}
														className="rounded-full bg-red-500 hover:scale-110 p-1 shadow-md transition-all"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth="1.5"
															stroke="currentColor"
															className="w-6 h-6 stroke-white"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
															/>
														</svg>
													</button>
												</div>
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
					)}
				</div>

				{showImagePreview && (
					<ImagePreview
						image={currentImage}
						close={() => {
							setShowImagePreview(false);
						}}
					/>
				)}
			</div>
		</>
	);
};

export default ProductListings;
