import React, { Fragment, useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
const CreateCompany = () => {
  const AuthData: any = useAuth();
  const [company_name, setCompanyName] = useState("");
  const [company_desc, setCompanyDesc] = useState("");
  const [link_one, setLinkOne] = useState("");
  const [updating, setupdating] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      company: {
        company_name,
        company_desc,
        link_one,
        email,
        password,
      },
    };
    setupdating(true);
    const response = await axios.post(`${server}/add/company`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthData.user.token}`,
      },
    });
    console.log(response);
    if (response.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Update Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setupdating(false);
    setCompanyDesc("");
    setCompanyName("");
    setEmail("");
    setPassword("");
    setLinkOne("");
  };
  return (
    <div className="w-full flex justify-center items-center align-middle">
      <div className="flex bg-white w-full sm:w-10/12 mt-5 flex-col px-10 md:px-20 pt-8 items-center rounded-2xl drop-shadow-lg">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Create Company
        </h3>
        <input
          type="text"
          id="name"
          value={company_name}
          placeholder="Company Name"
          onChange={(e) => setCompanyName(e.target.value)}
          className="border-gray-300 border-2 py-2 px-4 rounded-lg w-full my-3"
        />
        <input
          type="text"
          id="name"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="border-gray-300 border-2 py-2 px-4 rounded-lg w-full my-3"
        />
        <input
          type="password"
          id="name"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="border-gray-300 border-2 py-2 px-4 rounded-lg w-full my-3"
        />
        <textarea
          id="description"
          rows={4}
          placeholder="Description Of The Company"
          value={company_desc}
          onChange={(e) => setCompanyDesc(e.target.value)}
          className="ml-2 w-full border-gray-300 border-2 py-2 px-4 rounded-lg w-full my-3"
        />
        <input
          type="text"
          id="link_1"
          placeholder="company_page_links"
          className="ml-2 border-gray-300 border-2 py-2 px-4 rounded-lg w-full my-3"
          value={link_one}
          onChange={(e) => setLinkOne(e.target.value)}
        />
        <div className="w-full flex justify-center items-center my-3">
          {updating ? (
            <button
              disabled
              className="flex items-center justify-center p-2 w-fit mx-auto px-8 py-2 rounded-md bg-gray-400 text-white"
            >
              Creating
              <ClipLoader className="ml-2" size={20} color="#d63636" />
            </button>
          ) : (
            <div className="flex flex-col">
              <button
                className="p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCompany;
