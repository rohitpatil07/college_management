"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const UpdateFoundComponent = () => {
	const AuthData: any = useAuth();

	const [itemData, setItemData] = useState({
		item_image: "",
		item_name: "",
		story: "",
		owner: "",
	});

	const handlePhotoUpload = (e: any) => {
		const file = e.target.files[0];
		const reader: any = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setItemData({ ...itemData, item_image: reader.result });
		};
	};

	const handleSubmit = async () => {
		const item_data = {
			item_image: itemData.item_image,
			item_name: itemData.item_name,
			owner: AuthData.user.userData.user.email,
			story: itemData.story,
			found: true,
		};

		console.log(item_data);

		try {
			const response = await axios.post(
				"http://localhost:5000/market/lost_items/updateLostItem",
				{ lost_item: item_data },
				{
					headers: {
						"Content-Type": "application/json",
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
			window.location.href = "/marketplace/lostfound";
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
							href="/marketplace/lostfound"
							className="flex flex-row items-center border-slate-300"
						>
							Lost and Found
						</Link>
						<p className="mx-2">/</p>
						<Link
							href="/marketplace/lostfound/reportFoundItem"
							className="flex flex-row items-center border-slate-300"
						>
							Report Found Item
						</Link>
					</div>
					<h3 className="text-xl sm:text-2xl font-bold text-gray-800 py-2 border-b-2 w-11/12 text-center">
						Report a Found Item
					</h3>
					<div className="pt-5 w-11/12 grid grid-cols-1 lg:grid-cols-2 gap-x-10 gap-y-4">
						<div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
							<label className="">Item Name</label>
							<input
								className="border-2 rounded-md p-1 w-1/2"
								type="text"
								onChange={(e) => {
									setItemData({
										...itemData,
										item_name: e.target.value,
									});
								}}
							/>
						</div>
						<div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
							<label className="">Item Description</label>
							<textarea
								placeholder="Describe the item and give any additional contact information"
								className="border-2 rounded-md p-1 w-1/2"
								onChange={(e) => {
									setItemData({
										...itemData,
										story: e.target.value,
									});
								}}
							></textarea>
						</div>
						<div>
							<div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
								<label className="">Item Image</label>
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

export default UpdateFoundComponent;
