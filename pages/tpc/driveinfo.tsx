import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const DriveInfo = () => {
  const router = useRouter();
  const { query } = router;
  const [dinfo, setDinfo]: any = useState(null);
  const searchParams: any = new URLSearchParams(window?.location?.search);
  const driveid = parseInt(searchParams.get("drive_id"));
  const cname = searchParams.get("company_name");
  console.log(cname);
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const AuthData: any = useAuth();
  const fetchStudents = async () => {
    const response = await axios.get(
      `http://localhost:5000/filter/onedrive/${driveid}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    setDinfo(response.data);
  };
  const apply = async () => {
    let applieddrive: any = {
      applieddrive: {
        drive_id: driveid,
        roll_no: `${AuthData.user.userData.user.roll_no}`,
      },
    };
    const response = await axios.post(
      `http://localhost:5000/add/student/applieddrive`,
      applieddrive,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  };
  useEffect(() => {
    fetchStudents();
  }, [dinfo]);
  return (
    <div className="w-full sm:w-11/12 mx-auto py-5 flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
      <h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
        {cname} Drive Details
      </h3>
      {dinfo == null || dinfo == undefined ? (
        <></>
      ) : (
        <>
          <div className="sm:w-[80%] px-5 sm:px-0 mx-auto flex justify-between flex-col gap-2">
            <div className="w-full flex justify-between">
              <h2 className="text-slate-700 font-medium">Enter Role</h2>
              <h2 className=" p-1 w-1/2">{dinfo.role}</h2>
            </div>
            <div className="w-full flex justify-between">
              <h2 className="text-slate-700 font-medium">Enter Role Package</h2>
              <h2 className="-md p-1 w-1/2">{dinfo.package}</h2>
            </div>
            <div className="w-full flex justify-between">
              <h2 className="text-slate-700 font-medium">Enter Job Location</h2>
              <h2 className=" p-1 w-1/2">{dinfo.job_location}</h2>
            </div>
            <div className="w-full flex justify-between">
              <h2 className="text-slate-700 font-medium">Role Description</h2>
              <h2 className=" p-1 w-1/2">{dinfo.role_desc}</h2>
            </div>
            <div className="w-full flex justify-between">
              <h2 className="text-slate-700 font-medium">CGPA</h2>
              <h2 className=" p-1 w-1/2">{dinfo.cgpa}</h2>
            </div>
            <div className="w-full flex justify-between">
              <h2 className="text-slate-700 font-medium">BE percent</h2>
              <h2 className=" p-1 w-1/2">{dinfo.be_percent}</h2>
            </div>
            <div className="w-full flex justify-between">
              <h2 className="text-slate-700 font-medium">Tenth Percent</h2>
              <h2 className=" p-1 w-1/2">{dinfo.tenth_percent}</h2>
            </div>
            <div className="w-full flex justify-between">
              <h2 className="text-slate-700 font-medium">Twelveth Percent</h2>
              <h2 className=" p-1 w-1/2">{dinfo.twelveth_percent}</h2>
            </div>
            <div className="w-full flex justify-between">
              <h2 className="text-slate-700 font-medium">Gap</h2>
              <h2 className=" p-1 w-1/2">{dinfo.gap}</h2>
            </div>
            <div className="w-full flex justify-between">
              <h2 className="text-slate-700 font-medium">Live KT</h2>
              <h2 className=" p-1 w-1/2">{dinfo.livekt}</h2>
            </div>
            <div className="w-full flex justify-between">
              <h2 className="text-slate-700 font-medium">Dead KT</h2>
              <h2 className=" p-1 w-1/2">{dinfo.deadkt}</h2>
            </div>
          </div>
          <button
            className="p-2 bg-accent text-white mx-auto mt-5 mb-5 px-8 rounded-lg hover:scale-105 transition-all"
            onClick={(e) => {
              apply();
            }}
          >
            Apply
          </button>
        </>
      )}
    </div>
  );
};

export default DriveInfo;
