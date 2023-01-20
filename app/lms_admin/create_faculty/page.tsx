"use client"
import React from "react";
import CreateFaculty from "../../../components/LmsAdmin/CreateFaculty";
import { useAuth } from "../../../contexts/AuthContext";

function page() {
	return (
		<div>
			<CreateFaculty/>
		</div>
	);
}

export default page;