"use client";
import React from "react";
import UploadOffers from "../../../components/Admin/UploadOffers";
import { useAuth } from "../../../contexts/AuthContext";

function Page() {
	console.log(useAuth());
	return (
		<div>
			<UploadOffers />
		</div>
	);
}

export default Page;
