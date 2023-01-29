"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const AddProduct = () => {
	const AuthData: any = useAuth();

	const productCategories = [
		"Books",
		"Mobiles & Accessories",
		"Clothing",
		"Electronics",
		"Computer Hardware",
		"Sports",
		"Cars/Motorcycles",
		"Fashion Accessories",
		"Home Appliances",
		"Medical Equipment",
		"Others",
	];
	const [productData, setProductData] = useState({
		product_image: "",
		product_name: "",
		price: 0,
		category: productCategories[0],
		product_des: "",
	});

	const handlePhotoUpload = (e: any) => {
		const file = e.target.files[0];
		const reader: any = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setProductData({ ...productData, product_image: reader.result });
		};
	};

	const handleSubmit = async () => {
		const product_data: {
			product_image: string;
			product_name: string;
			owner: string;
			owner_role: string;
			price: number;
			category: string;
			product_des: string;
		} = {
			product_image: productData.product_image,
			product_name: productData.product_name,
			owner: AuthData.user.userData.user.email,
			owner_role: AuthData.user.userData.user.role,
			price: productData.price,
			category: productData.category,
			product_des: productData.product_des,
		};

		try {
			const response = await axios.post(
				"http://localhost:5000/market/products/addproduct",
				{ product_data },
				{
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ${AuthData.user.token}`,
					},
				}
			);
			if (response.status == 200) {
				Swal.fire({
					icon: "success",
					title: "Added Successfully",
					showConfirmButton: false,
					timer: 1500,
				});
			} else {
				Swal.fire({
					icon: "error",
					title: "Failed..Please Try Again",
					showConfirmButton: false,
					timer: 1500,
				});
			}
			window.location.href = "/marketplace/products";
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="flex justify-center mt-5">
				<div className="bg-white w-11/12 sm:w-[75%] rounded-2xl p-5 flex flex-col justify-center items-center shadow-xl">
					<div className="mx-auto w-11/12 flex flex-wrap justify-start container py-3 text-slate-500 font-medium border-b">
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
						<p className="mx-2">/</p>
						<Link
							href="/marketplace/products/addProduct"
							className="flex flex-row items-center border-slate-300"
						>
							Add Product
						</Link>
					</div>
					<h3 className="text-xl sm:text-2xl font-bold text-gray-800 py-2 border-b-2 w-11/12 text-center">
						Add New Product
					</h3>
					<div className="pt-5 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4">
						<div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
							<label className="">Product Name</label>
							<input
								className="border-2 rounded-md p-1 w-1/2"
								type="text"
								onChange={(e) => {
									setProductData({
										...productData,
										product_name: e.target.value,
									});
								}}
							/>
						</div>
						<div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
							<label className="">Price (in ₹)</label>
							<input
								className="border-2 rounded-md p-1 w-1/2"
								type="number"
								onChange={(e) => {
									setProductData({
										...productData,
										price: parseInt(e.target.value),
									});
								}}
							/>
						</div>
						<div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
							<label className="">Category</label>
							<select
								className="border-2 rounded-md p-1 w-1/2"
								onChange={(e) => {
									setProductData({ ...productData, category: e.target.value });
								}}
							>
								{productCategories.map((item) => {
									return (
										<option key={item} value={item}>
											{item}
										</option>
									);
								})}
							</select>
						</div>
						<div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
							<label className="">Product Description</label>
							<textarea
								className="border-2 rounded-md p-1 w-1/2"
								onChange={(e) => {
									setProductData({
										...productData,
										product_des: e.target.value,
									});
								}}
							></textarea>
						</div>
						<div>
							<div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
								<label className="">Photo</label>
								<input
									className="border-2 rounded-md p-1 w-1/2"
									type="file"
									accept="image/jpeg, image/png, image/jpg"
									onChange={(e) => {
										handlePhotoUpload(e);
									}}
								/>
							</div>
						</div>
					</div>

					<button
						className="p-2 bg-accent text-white mx-auto mt-8 mb-4 px-8 rounded-lg hover:scale-105 transition-all"
						onClick={handleSubmit}
					>
						Submit
					</button>
				</div>
			</div>
		</>
	);
};

export default AddProduct;
