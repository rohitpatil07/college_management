"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import Thread from "./Thread";
const ViewForum = ({
	module_id,
	subject_id,
	module_name,
	module_number,
	subject_name,
	topic,
	description,
	author_first_name,
	author_last_name,
	author_email,
	email,
	forum_id,
}: any) => {
	const AuthData: any = useAuth();
	const [comment, setComment] = useState("");
	const [disableBtn, setDisableBtn] = useState(false);
	const [forumMessages, setForumMessages] = useState([]);
	const getComment = async () => {
		const response = await axios.get(
			`http://localhost:5000/lms/filter/getreplies/0`,
			{
						headers: {
					"Content-Type": "application/json",
					
				},
				withCredentials: true,
			}
		);
		let blank_array: any = [];
		for (let i = 0; i < response.data.length; i++) {
			if (response.data[i]["forum_id"] == forum_id) {
				blank_array.push(response.data[i]);
			}
		}
		console.log(blank_array);
		setForumMessages(blank_array);
	};
	const postComment = async () => {
		const comm = {
			email: `${AuthData.user.userData.user.email}`,
			forum_id: parseInt(forum_id),
			text: comment,
		};
		if (comment != "") {
			setDisableBtn(true);
			const response = await axios({
				method: "post",
				url: "http://localhost:5000/lms/form/postcomment",
						headers: {
					"Content-Type": "application/json",
					
				},
				withCredentials: true,
				data: {
					comment: comm,
				},
			});
			console.log(response.data);
			if (response.status == 200 && response.data) {
				setComment("");
			}
			setDisableBtn(false);
		}
		getComment();
	};
	useEffect(() => {
		getComment();
	}, [forumMessages]);
	return (
		<div className="w-full sm:w-11/12 mx-auto flex flex-col items-center justify-around container">
			<div className="w-full rounded-xl drop-shadow-xl bg-white p-2 mb-2">
				<div className="w-full flex flex-wrap p-2 items-center border-b-2 border-b-gray-300">
					<div className="rounded-full bg-accent mr-1 p-1 text-xs text-white">
						{author_first_name.slice(0, 1)}
						{author_last_name.slice(0, 1)}
					</div>
					<h3 className="text-md text-gray-700 mr-1">
						{author_first_name} {author_last_name}{" "}
					</h3>
					{/* <h3 className='text-xs text-gray-500 underline underline-offset-2'>{author_email}</h3> */}
				</div>
				<h3 className="text-xl sm:text-2xl font-medium text-gray-900 my-8">
					{topic}
				</h3>
				<h3>{description}</h3>
			</div>
			<div className="w-full rounded-xl drop-shadow-xl bg-white p-2 flex items-center">
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
			{forumMessages && (
				<Thread forumMessages={forumMessages} auth={AuthData} />
			)}
		</div>
	);
};

export default ViewForum;
