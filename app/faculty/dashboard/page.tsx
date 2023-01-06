"use client";
import React from "react";
import Dashboard from "../../../components/Faculty/Dashboard";
import { useAuth } from "../../../contexts/AuthContext";

function page() {
	return (
		<div>
			<Dashboard />
		</div>
	);
}

export default page;