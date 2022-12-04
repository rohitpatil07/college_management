"use client";
import React from "react";
import StudentLookup from "../../../components/Admin/StudentLookup";
import { useAuth } from "../../../contexts/AuthContext";

function page() {
	console.log(useAuth());
	return (
		<div>
			<StudentLookup />
		</div>
	);
}

export default page;
