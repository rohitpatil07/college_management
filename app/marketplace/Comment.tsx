"use client";
import { useState } from "react";
import axios from "axios";
import Thread from "./Thread";
const Comment = ({ post, auth }: any) => {
	const [showMessages, setShowMessages] = useState(false);
	const [replies, setReplies] = useState([]);
	const handleFetch = async () => {
		const response = await axios.post(
			"http://localhost:5000/market/lost_items/replies",
			{
				message_id: post.message_id,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.user.token}`,
				},
			}
		);
		setReplies(response.data);
	};
	const [showReplyForm, setshowReplyForm] = useState(false);
	const [comment, setComment] = useState("");
	const postComment = async () => {
		const comm = {
			email: `${auth.user.userData.user.email}`,
			item_id: parseInt(post.item_id),
			text: comment,
			reply_to: parseInt(post.message_id),
		};
		if (comment != "") {
			const response = await axios({
				method: "post",
				url: "http://localhost:5000/market/lost_items/addmessage",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${auth.user.token}`,
				},
				data: {
					message: comm,
				},
			});
			console.log(response.data);
			if (response.status == 200 && response.data) {
				setComment("");
				setshowReplyForm(false);
			}
		}
		handleFetch();
		window.location.reload();
	};

	const [updateForm, setupdateForm] = useState(false);
	const [updateText, setUpdateText] = useState("");
	const updateComment = async () => {
		if (updateText != "" && updateText != `${post.text}`) {
			const comm = {
				message_id: parseInt(post.message_id),
				text: updateText,
			};
			// const response = await axios({
			// 	method: "post",
			// 	url: "http://localhost:5000/market/lost_items/updatemessage",
			// 	headers: {
			// 		"Content-Type": "application/json",
			// 		Authorization: `Bearer ${auth.user.token}`,
			// 	},
			// 	data: {
			// 		comment: comm,
			// 	},
			// });
			const response = await axios.post(
				"http://localhost:5000/market/lost_items/updatemessage",
				comm,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${auth.user.token}`,
					},
				}
			);
			console.log(response.data);
			if (response.status == 200 && response.data) {
				setUpdateText("");
				setupdateForm(false);
			}
		}
		handleFetch();
		window.location.reload();
	};
	return (
		<>
			{post.reply_to == 0 ? (
				<div className="w-full rounded-xl drop-shadow-xl bg-white p-2 mt-2">
					<div className="w-full flex flex-wrap p-2 items-center justify-between border-b-2 border-b-gray-300">
						<div className="flex items-center">
							<div className="rounded-full bg-accent mr-1 p-1 text-xs text-white">
								{post.email.slice(0, 1).toUpperCase()}
								{post.replies}
							</div>
							<h3 className="text-md text-gray-700 mr-1">{post.email}</h3>
						</div>
						<div className="flex items-center">
							<h3 className="mr-1">
								{post.createdAt.slice(0, post.createdAt.indexOf("T"))}
							</h3>
							{auth.user.userData.user.email == post.email ? (
								<button onClick={()=>{}}>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-5 h-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
										/>
									</svg>
								</button>
							) : (
								""
							)}
						</div>
					</div>
					<div className="flex flex-row items-start my-2">
						{auth.user.userData.user.email == post.email ? (
							<>
								{updateForm ? (
									<button
										onClick={() => {
											setupdateForm(false);
											setUpdateText("");
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								) : (
									<button
										onClick={() => {
											setupdateForm(true);
											setUpdateText(`${post.text}`);
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-4 h-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
											/>
										</svg>
									</button>
								)}
							</>
						) : (
							""
						)}
						{updateForm ? (
							<input
								type="text"
								value={updateText}
								onChange={(e) => {
									setUpdateText(e.target.value);
								}}
								className="w-full border border-gray-500 rounded-md p-1"
							/>
						) : (
							<h3>{post.text}</h3>
						)}
					</div>
					{updateForm ? (
						<button
							onClick={updateComment}
							className="border-2 p-1 rounded-md bg-green-500 text-white"
						>
							Update
						</button>
					) : (
						""
					)}
					<div className="flex flex-wrap items-center">
						<button className="flex items-center text-gray-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
								/>
							</svg>
							<span className="text-md">{post.upvotes}</span>
						</button>
					</div>
					<div className="flex flex-wrap items-center">
						<button
							onClick={() => {
								setshowReplyForm(true);
							}}
							className="border-2 p-1 rounded-md border-gray-500 text-gray-700"
						>
							Reply
						</button>
						{post.replies == 0 ? (
							<button className="border-l-2 ml-1 p-1 border-l-gray-500 text-gray-700">
								View 0 replies
							</button>
						) : (
							<>
								{showMessages ? (
									<button
										onClick={() => {
											setShowMessages(false);
										}}
										className="border-l-2 ml-1 p-1 border-l-gray-500 text-gray-700"
									>
										Close Replies
									</button>
								) : (
									<button
										onClick={() => {
											handleFetch();
											setShowMessages(true);
										}}
										className="border-l-2 ml-1 p-1 border-l-gray-500 text-gray-700"
									>
										View {post.replies} Replies
									</button>
								)}
							</>
						)}
					</div>
					{showReplyForm ? (
						<div className="w-full border-y-2 border-y-gray-300 flex items-center p-2 mt-2">
							<input
								value={comment}
								onChange={(e) => {
									setComment(e.target.value);
								}}
								type="text"
								placeholder="Enter Reply"
								className="border border-gray-500 p-2 w-11/12 rounded-lg"
							/>
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
							<button
								onClick={() => {
									setshowReplyForm(false);
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
					) : (
						""
					)}
					{showMessages && <Thread thread={replies} auth={auth} />}
				</div>
			) : (
				<div className="w-full bg-white px-5 mt-2">
					<div className="w-full flex flex-wrap p-2 items-center justify-between border-b-2 border-b-gray-300">
						<div className="flex items-center">
							<div className="rounded-full bg-accent mr-1 p-1 text-xs text-white">
								{post.email.slice(0, 1).toUpperCase()}
								{post.replies}
							</div>
							<h3 className="text-sm text-gray-700 mr-1">{post.email}</h3>
						</div>
						<div className="flex items-center">
							<h3 className="text-xs mr-1">
								{post.createdAt.slice(0, post.createdAt.indexOf("T"))}
							</h3>
							{auth.user.userData.user.email == post.email ? (
								<button>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-4 h-4"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
										/>
									</svg>
								</button>
							) : (
								""
							)}
						</div>
					</div>
					<div className="flex flex-row items-start my-2">
						{auth.user.userData.user.email == post.email ? (
							<>
								{updateForm ? (
									<button
										onClick={() => {
											setupdateForm(false);
											setUpdateText("");
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-4 h-4"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								) : (
									<button
										onClick={() => {
											setupdateForm(true);
											setUpdateText(`${post.text}`);
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-3 h-3"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
											/>
										</svg>
									</button>
								)}
							</>
						) : (
							""
						)}
						{updateForm ? (
							<input
								type="text"
								value={updateText}
								onChange={(e) => {
									setUpdateText(e.target.value);
								}}
								className="text-xs w-full border border-gray-500 rounded-md p-1"
							/>
						) : (
							<h3 className="text-xs">{post.text}</h3>
						)}
					</div>
					{updateForm ? (
						<button
							onClick={updateComment}
							className="border-2 p-1 rounded-md bg-green-500 text-white text-xs"
						>
							Update
						</button>
					) : (
						""
					)}
					<div className="flex flex-wrap items-center">
						<button className="flex items-center text-gray-500">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
								/>
							</svg>
							<span className="text-sm">{post.upvotes}</span>
						</button>
					</div>
					<div className="flex flex-wrap items-center">
						<button
							onClick={() => {
								setshowReplyForm(true);
							}}
							className="text-xs border-2 p-1 rounded-md border-gray-500 text-gray-700"
						>
							Reply
						</button>
						{post.replies == 0 ? (
							<button className="text-xs border-l-2 ml-1 p-1 border-l-gray-500 text-gray-700">
								View 0 replies
							</button>
						) : (
							<>
								{showMessages ? (
									<button
										onClick={() => {
											setShowMessages(false);
										}}
										className="text-xs border-l-2 ml-1 p-1 border-l-gray-500 text-gray-700"
									>
										Close Replies
									</button>
								) : (
									<button
										onClick={() => {
											handleFetch();
											setShowMessages(true);
										}}
										className="text-xs border-l-2 ml-1 p-1 border-l-gray-500 text-gray-700"
									>
										View {post.replies} Replies
									</button>
								)}
							</>
						)}
					</div>
					{showReplyForm ? (
						<div className="w-full border-y-2 border-y-gray-300 flex items-center p-2 mt-2">
							<input
								value={comment}
								onChange={(e) => {
									setComment(e.target.value);
								}}
								type="text"
								placeholder="Enter Reply"
								className="border border-gray-500 p-2 w-11/12 rounded-lg"
							/>
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
							<button
								onClick={() => {
									setshowReplyForm(false);
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
					) : (
						""
					)}
					{showMessages && <Thread thread={replies} auth={auth} />}
				</div>
			)}
		</>
	);
};

export default Comment;
