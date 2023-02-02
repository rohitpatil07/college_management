import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import Swal from "sweetalert2";

const AvailableDrives = () => {
  const AuthData: any = useAuth();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [drive, setDrive]: any = useState();
  const fetchDrive = async () => {
    const response = await axios.get(
      `${server}/filter/edrive/${AuthData.user.userData.user.roll_no}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    console.log(response.data);
    setDrive(response.data);
  };
  useEffect(() => {
    fetchDrive();
  }, []);
  const apply = async (id: any) => {
    let applieddrive: any = {
      applieddrive: {
        drive_id: id,
        roll_no: `${AuthData.user.userData.user.roll_no}`,
      },
    };
    const response = await axios.post(
      `${server}/add/student/applieddrive`,
      applieddrive,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    if (response.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Applied to Drive  Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Could Not Apply to Drive..Please Try Again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  return (
    <div className="w-full sm:w-11/12 mx-auto py-5 flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
      <h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
        Available Drives
      </h3>

      {drive == null ? (
        <></>
      ) : drive.length == 0 || Object.keys(drive).length == 0 ? (
        <>
          <h3 className="text-lg my-5 font-medium text-gray-700">
            Maximum Offers Reached or not eligible for any drive
          </h3>
        </>
      ) : (
        <div className="flex flex-col w-full">
          {drive.map(({ company_name, role, desc, drive_id }: any) => (
            <div
              key={drive_id}
              className="flex flex-col mx-auto mb-3 w-11/12 p-5 bg-white border-2 border-neutral-300 rounded-md"
            >
              <div className="flex flex-col-reverse sm:flex-row items-center justify-between">
                <h2 className="text-xl font-semibold text-center">
                  {company_name}
                </h2>
                <h2 className="text-sm">00/00/0000</h2>
              </div>
              <h2 className="text-base font-semibold text-center sm:text-left mb-2 mt-2">
                {role}
              </h2>
              <p className="text-sm text-justify mb-3">{desc}</p>
              <div className="flex flex-col md:flex-row items-center justify-between">
                <Link
                  href={{
                    pathname: "/tpc/driveinfo",
                    query: { drive_id: drive_id },
                  }}
                  className="p-1 mb-3 md:mb-0 text-sm w-48 bg-white text-slate-900 font-semibold border-2 border-slate-900 rounded-md"
                >
                  Check Here For More Info
                </Link>
                <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                  <button
                    onClick={() => {
                      apply(drive_id);
                    }}
                    className="p-1 mb-3 md:mb-0 ml-0 md:ml-2 w-48 md:w-fit mx-auto px-10 rounded-md bg-emerald-500 text-white hover:scale-105 transition-all"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AvailableDrives;
