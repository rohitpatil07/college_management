import React from "react";
import Image from "next/image";
import Link from "next/link";

function Login() {
	return (
		<div>
			<div className="flex w-full justify-center md:justify-start">
				<img
					src={`/logo.png`}
					alt={`logo`}
					className="w-1/2 my-3 md:w-1/3 xl:w-1/6"
				/>
			</div>
			<div className="flex flex-col bg-white w-10/12 xl:w-1/2 drop-shadow-lg m-auto items-center py-10 rounded-2xl mb-2">
				<h1 className="font-bold text-xl">Sign in to account</h1>
				<form className="flex flex-col items-start w-3/4 mt-4 gap-2" action="">
					<label htmlFor="userIdentity">Sign in as:</label>
					<select
						name="userIdentity"
						className="w-full border-2 px-5 py-4 rounded-xl"
						id=""
					>
						<option value="Student">Student</option>
						<option value="Faculty">Faculty</option>
						<option value="Admin">Admin</option>
						<option value="Company">Company</option>
					</select>
					<label className="mt-6" htmlFor="email">
						Email Address
					</label>
					<input
						type="text"
						className="w-full border px-5 py-3 rounded-xl outline-none"
					/>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						className="w-full border px-5 py-3 rounded-xl outline-none"
					/>
					<button
						type="button"
						className="btn btn-outline-primary w-full bg-accent text-white rounded-xl px-5 py-3 mt-8 hover:scale-105 transition-all"
					>
						Submit
					</button>
					<div className="flex flex-col md:flex-row w-full md:justify-between">
						<div className="flex my-3 md:my-0 gap-1 justify-center">
							<input type="checkbox" name="remember" id="" />
							<label htmlFor="remember">Remember Me</label>
						</div>
						<Link className="flex justify-center hover:text-blue-500" href="/">
							Forgot Password?
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
