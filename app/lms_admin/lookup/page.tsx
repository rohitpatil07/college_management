"use client";
import React from "react";
import LmsAdminLookUp from "../../../components/LmsAdmin/LmsAdminLookUp";
import { useAuth } from "../../../contexts/AuthContext";

function page() {
	return (
		<div>
			<LmsAdminLookUp/>
		</div>
	);
}

export default page;