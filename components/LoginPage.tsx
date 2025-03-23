"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

function LoginPage() {
  const router = useRouter();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  console.log("url",server);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [password, setPassword] = useState("");

  const AuthData: any = useAuth();

  const fpassword = async () => {
    if (email) {
      const response = await axios({
        method: "post",
        url: `${server}/auth/forgot_mail`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: email,
          role: role,
        },
      });
      Swal.fire({
        icon: "info",
        title: `E-mail sent to ${email} to recover password`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: `Please enter your email address`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const handleSubmit = async () => {
    const data = { email, role, password };
    console.log(data);
    console.log("server", server);
    try {
      const response = await axios.post(`${server}/auth/login`, data, {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      });

      console.log("zo", response.data);

      if (
        response.data == "You are not authorized" ||
        Object.keys(response.data).length == 0 ||
        response.data.length == 0
      ) {
        Swal.fire({
          icon: "error",
          title: "Login Failed,Incorrect Credentials",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const respp = await AuthData.login();
        console.log(respp);
        const userRole = response.data.success;
        console.log(userRole);
        if (
          userRole !== undefined &&
          userRole !== null &&
          userRole.length > 0
        ) {
          Swal.fire({
            icon: "success",
            title: "Login Successfull",
            showConfirmButton: false,
            timer: 1500,
          });
          if (userRole == "student")
            router.push("/tpc/editProfile/personalInfo");
          else if (userRole == "admin") router.push("/admin/lookup");
          else router.push("/company");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div>
        <div className="flex w-full justify-center md:justify-start">
          <img
            src={`/logo.png`}
            alt={`logo`}
            className="w-1/2 my-3 mx-1 scale-90 md:w-1/4 xl:w-1/6"
          />
        </div>
        <div className="flex flex-col bg-white w-10/12 xl:w-1/2 drop-shadow-lg m-auto items-center py-10 rounded-2xl mb-2">
          <h1 className="font-bold text-xl">Sign in to account</h1>
          <form
            className="flex flex-col items-start w-3/4 mt-4 gap-2"
            action=""
          >
            <label htmlFor="userIdentity">Sign in as:</label>
            <select
              name="userIdentity"
              className="w-full border-2 px-5 py-4 rounded-xl"
              id=""
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
              <option value="company">Company</option>
            </select>
            <label className="mt-6" htmlFor="email">
              Email Address
            </label>
            <input
              type="text"
              className="w-full border px-5 py-3 rounded-xl outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              className="w-full border px-5 py-3 rounded-xl outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="btn btn-outline-primary w-full bg-accent text-white rounded-xl px-5 py-3 mt-8 hover:scale-105 transition-all"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <div className="flex flex-col md:flex-row w-full md:justify-between">
              <div className="flex my-3 md:my-0 gap-1 justify-center">
                <input type="checkbox" name="remember" id="" />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <button
                className="flex justify-center hover:text-blue-500"
                onClick={fpassword}
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
