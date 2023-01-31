"use client";
import Thread from "../../../Thread";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../../../contexts/AuthContext";
import { useSearchParams } from 'next/navigation'


type PageProps = {
	params: {
		item_id: number;
	};
};

const Discuss = ({ params: { item_id } }: PageProps) => {
	// const item_image = null;
	// const item_name = "Item Name";
	// const story = "Story";
	const searchParams:any = useSearchParams();
	const image=searchParams.get('item_image');
	const story=searchParams.get('s');
	const [item, setItem]: any = useState({});
	const [thread, setThread] = useState([]);
	const [comment, setComment] = useState("");
	const [disableBtn, setDisableBtn] = useState(false);
	const AuthData: any = useAuth();

	const getLostItem = async () => {
		try {
			const response = await axios.post(
				"http://localhost:5000/market/lost_items/lost_item",
				{ item_id },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${AuthData.user.token}`,
					},
				}
			);
			setItem(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const getThread = async () => {
		try {
			const response = await axios.post(
				"http://localhost:5000/market/lost_items/lostitemthread",
				{ item_id },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${AuthData.user.token}`,
					},
				}
			);
			setThread(response.data);
			console.log(response)
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	const postComment = async () => {
		const comm = {
			item_id: item_id,
			email: `${AuthData.user.userData.user.email}`,
			text: comment,
			reply_to: 0,
		};
		if (comment != "") {
			setDisableBtn(true);
			const response = await axios({
				method: "post",
				url: "http://localhost:5000/market/lost_items/addmessage",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
				data: {
					message: comm,
				},
			});
			console.log(response.data);
			if (response.status == 200 && response.data) {
				setComment("");
			}
			setDisableBtn(false);
		}
		getThread();
	};

	useEffect(() => {
		getLostItem();
		getThread();
	}, []);

	return (
		<div className="px-5 py-3 w-full">
			{/* item info */}
			<div className="flex flex-col md:flex-row w-11/12 items-center drop-shadow-2xl rounded-xl overflow-hidden bg-white mx-auto">
				{item["item_image"] != null ? (
					<>
						<img
							src={item["item_image"]}
							alt={item["item_name"]}
							// onClick={() => {
							//     setShowImagePreview(true);
							//     setCurrentImage(item_image);
							// }}
							className="w-full md:w-[40%] h-[10rem] object-cover rounded-xl cursor-pointer"
						/>
					</>
				) : (
					<div className="w-full md:w-[40%] h-[10rem] object-cover rounded-xl flex items-center justify-center bg-gray-300">
						{" "}
						<p>No image uploaded</p>
					</div>
				)}
				<div className="flex flex-col w-[60%] justify-center items-center">
					<div className="text-lg sm:text-xl font-medium text-gray-900 my-4 whitespace-nowrap overflow-hidden text-ellipsis">
						{item["item_name"]}
					</div>
					<div className="text-gray-600 text-[0.75rem] text-justify mx-5 mb-5 h-12 text-ellipsis">
						{item["story"] != null
							? item["item_name"]
							: "No description provided"}
					</div>
				</div>
			</div>
			<div className="w-11/12 mx-auto mt-5 rounded-xl drop-shadow-xl bg-white p-2 flex items-center">
				<input
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					type="text"
					placeholder="Enter Comment Here"
					className="border border-gray-500 p-2 w-11/12 rounded-lg"
				/>
				{disableBtn ? (
					<button className="opacity-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8 ml-1"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				) : (
					<button onClick={postComment}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-8 h-8 ml-1"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</button>
				)}
				<button
					onClick={() => {
						setComment("");
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-8 h-8 ml-1"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
			</div>
			{thread.length && <div className="w-full md:w-11/12 mx-auto px-5">
				<Thread thread={thread} auth={AuthData} />
			</div>}
		</div>
	);
};

export default Discuss;
