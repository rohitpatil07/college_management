"use client";
import React from "react";
import LmsAdminLookUp from "../../../components/LmsAdmin/CreateFaculty";
import { useAuth } from "../../../contexts/AuthContext";
import CreateFaculty from "../../../components/LmsAdmin/CreateFaculty";

function page() {
	return (
		<div>
			<CreateFaculty/>
		</div>
	);
}

export default page;