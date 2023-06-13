import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const UpdateDrive = () => {
  const AuthData: any = useAuth();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();
  const searchParams: any = new URLSearchParams(window.location.search);
  const driveid = parseInt(searchParams.get("driveid"));
  const pack = parseInt(searchParams.get("package"));
  const role_desc = searchParams.get("role_desc");
  const job_location = searchParams.get("job_location");
  const twelve = parseInt(searchParams.get("twelve"));
  const gap = parseInt(searchParams.get("gap"));
  const dead = parseInt(searchParams.get("dead"));
  const tenth = parseInt(searchParams.get("tenth"));
  const live = parseInt(searchParams.get("live"));
  const be = parseInt(searchParams.get("be"));
  const cgpa = parseInt(searchParams.get("cgpa"));
  const roles = searchParams.get("role");
  const [drives, setDrives]: any = useState({
    drive_id: driveid,
    company_id: AuthData.user.userData.user.company_id,
    role: roles,
    package: pack,
    job_location: job_location,
    role_desc: role_desc,
    cgpa: cgpa,
    be_percent: be,
    tenth_percent: tenth,
    twelveth_percent: twelve,
    gender: "",
    gap: gap,
    livekt: live,
    deadkt: dead,
  });

  const handleFormFieldChange = (fieldName: any, e: any) => {
    setDrives({ ...drives, [fieldName]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const gear = {
        drive_id: driveid,
        company_id: AuthData.user.userData.user.company_id,
        role: drives.role,
        package: parseInt(drives.package),
        job_location: drives.job_location,
        role_desc: drives.role_desc,
        cgpa: parseInt(drives.cgpa),
        be_percent: parseInt(drives.be_percent),
        tenth_percent: parseInt(drives.tenth_percent),
        twelveth_percent: parseInt(drives.twelveth_percent),
        gender: drives.gender,
        gap: parseInt(drives.gap),
        livekt: parseInt(drives.livekt),
        deadkt: parseInt(drives.deadkt),
      };
      const response = await axios({
        method: "post",
        url: `${server}/add/company/drive`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
        data: {
          drive: gear, // This is the body part
        },
      });
      if (response.status == 200 && response.data.success == "Drive updated") {
        Swal.fire({
          icon: "success",
          title: "Drive Updated  Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        router.push("/company/viewdrive");
      } else {
        Swal.fire({
          icon: "error",
          title: "Drive Updation Failed..Please Try Again",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      // const queries = {
      // 			gender : {contains : drives.gender},
      // 			department: {contains : ""},
      // 			gap : {lte : drives.gap},
      // 			cgpa : {gte : drives.cgpa},
      // 			livekt : {lte : drives.livekt},
      // 			deadkt : {lte : drives.deadkt},
      // 			tenth_percent : {gte : drives.tenth_percent},
      // 			twelveth_percent : {gte : drives.twelveth_percent},
      // 		}
      // 		const message=`Notice for ${AuthData.user.userData.user.company_name} Placement Drive`
      // 		const subject=`Notification for  ${AuthData.user.userData.user.company_name} drive  for ${drives["role"]}`
      // 		const noti = await axios.post(`${server}/filter/notify`,
      // 			{ queries , message , subject },
      // 			{
      // 				headers: {
      // 					"Content-Type": "application/json",
      // 					Authorization: `Bearer ${AuthData.user.token}`,
      // 				},
      // 			});
      // 		console.log(response.data);
      //         console.log(noti);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="sm:w-[80%] mt-5 mx-auto flex flex-col drop-shadow-lg items-center bg-white container rounded-2xl">
      <div className="w-full flex flex-col items-center gap-2">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mt-5">
            Update Drive
          </h3>
          <p className="text-slate-400 text-sm text-center mb-5">
            Update Drive Details
          </p>
        </div>
        <div className="sm:w-[80%] px-5 sm:px-0 mx-auto flex justify-between flex-col gap-2">
          <div className="w-full flex justify-between">
            <h2 className="text-slate-700 font-medium">Enter Role</h2>
            <input
              className="border-2 rounded-md p-1 w-1/2"
              onChange={(e) => {
                handleFormFieldChange("role", e);
              }}
              value={drives["role"]}
            ></input>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-slate-700 font-medium">Enter Role Package</h2>
            <input
              type="number"
              className="border-2 rounded-md p-1 w-1/2"
              onChange={(e) => {
                handleFormFieldChange("package", e);
              }}
              value={drives["package"]}
            ></input>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-slate-700 font-medium">Enter Job Location</h2>
            <input
              value={drives["job_location"]}
              className="border-2 rounded-md p-1 w-1/2"
              onChange={(e) => {
                handleFormFieldChange("job_location", e);
              }}
            ></input>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-slate-700 font-medium">Role Description</h2>
            <input
              value={drives["role_desc"]}
              className="border-2 rounded-md p-1 w-1/2"
              onChange={(e) => {
                handleFormFieldChange("role_desc", e);
              }}
            ></input>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-slate-700 font-medium">CGPA</h2>
            <input
              value={drives["cgpa"]}
              type="number"
              className="border-2 rounded-md p-1 w-1/2"
              onChange={(e) => {
                handleFormFieldChange("cgpa", e);
              }}
            ></input>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-slate-700 font-medium">BE percent</h2>
            <input
              value={drives["be_percent"]}
              type="number"
              className="border-2 rounded-md p-1 w-1/2"
              onChange={(e) => {
                handleFormFieldChange("be_percent", e);
              }}
            ></input>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-slate-700 font-medium">Tenth Percent</h2>
            <input
              value={drives["tenth_percent"]}
              type="number"
              className="border-2 rounded-md p-1 w-1/2"
              onChange={(e) => {
                handleFormFieldChange("tenth_percent", e);
              }}
            ></input>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-slate-700 font-medium">Twelveth Percent</h2>
            <input
              value={drives["twelveth_percent"]}
              type="number"
              className="border-2 rounded-md p-1 w-1/2"
              onChange={(e) => {
                handleFormFieldChange("twelveth_percent", e);
              }}
            ></input>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-slate-700 font-medium">Gender</h2>
            <select
              name="gender"
              id="gender"
              onChange={(e) => {
                handleFormFieldChange("gender", e);
              }}
              className="border-2 rounded-md p-1 w-1/2"
            >
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="">N/A</option>
            </select>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-slate-700 font-medium">Gap</h2>
            <input
              value={drives["gap"]}
              className="border-2 rounded-md p-1 w-1/2"
              onChange={(e) => {
                handleFormFieldChange("gap", e);
              }}
            ></input>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-slate-700 font-medium">Live KT</h2>
            <input
              value={drives["livekt"]}
              placeholder={live.toString()}
              className="border-2 rounded-md p-1 w-1/2"
              onChange={(e) => {
                handleFormFieldChange("livekt", e);
              }}
            ></input>
          </div>
          <div className="w-full flex justify-between">
            <h2 className="text-slate-700 font-medium">Dead KT</h2>
            <input
              value={drives["deadkt"]}
              type="number"
              className="border-2 rounded-md p-1 w-1/2"
              onChange={(e) => {
                handleFormFieldChange("deadkt", e);
              }}
            ></input>
          </div>
        </div>
        <button
          className="p-2 bg-accent text-white mx-auto mb-5 px-8 rounded-lg hover:scale-105 transition-all"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateDrive;
