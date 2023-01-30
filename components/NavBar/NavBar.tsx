"use client";
import React, { useState, useEffect } from "react";
import Nav from "./StudentNavigations/Nav";
import MobileNav from "./StudentNavigations/MobileNav";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
const NavBar = () => {
	const AuthData: any = useAuth();
	const server = process.env.NEXT_PUBLIC_SERVER_URL;
	const [previewsource, setPreviewSource] = useState();
	const getProfileData = async () => {
		let i = 0;
		const response = await axios.get(
			`${server}/filter/student/${AuthData.user.userData.user.roll_no}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
			}
		);
		if (response.data["photo"]) {
			setPreviewSource(response.data["photo"]);
		}
	};
	useEffect(() => {
		getProfileData();
	}, []);
	return (
		<div>
			<Nav previewsource={previewsource} />
			<MobileNav />
		</div>
	);
};

export default NavBar;
