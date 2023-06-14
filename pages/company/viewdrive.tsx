import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";

const ViewDrive = () => {
  const AuthData: any = useAuth();
  const [drive, setDrive]: any = useState(null);
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const deleteDrive = async (driveid: Number) => {
    typeof driveid;
    const response = await axios.get(`${server}/delete/drive/${driveid}`, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (response.status == 200 && response.data.message == "Drive deleted") {
      Swal.fire({
        icon: "success",
        title: "Drive Deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Drive Deletion Failed..Please Try Again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const fetchDrive = async () => {
    const response = await axios.get(
      `${server}/filter/company/drive/${AuthData.user.userData.user.company_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    for (let i = 0; i < response.data.length; i++) {
      response.data[i]["pack"] = response.data[i]["package"];
    }
    setDrive(response.data);
  };
  useEffect(() => {
    fetchDrive();
  }, [drive]);

  return (
    <div className="w-full flex justify-center items-center align-middle flex-col">
      <div className="flex bg-white w-10/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
          View Drives
        </h3>
        {drive == null ? (
          <></>
        ) : drive.length == 0 ? (
          <>
            <h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
              No Drives Created Yet
            </h3>
          </>
        ) : (
          <div className="flex flex-col w-full mt-3">
            {drive.map(
              ({
                drive_id,
                role,
                role_desc,
                job_location,
                tenth_percent,
                twelveth_percent,
                pack,
                cgpa,
                be_percent,
                gap,
                livekt,
                deadkt,
              }: any) => (
                <div
                  key={drive_id}
                  className="flex flex-col mx-auto mb-3 w-11/12 px-2 py-3 bg-white border-2 border-neutral-300 rounded-lg drop-shadow-xl"
                >
                  <div className="flex flex-col py-1 w-full border-b-2 border-b-slate-500">
                    <h2 className="underline underline-offset-2 text-xl font-semibold">
                      {role}
                    </h2>
                    <h2 className="text-base font-semibold text-center sm:text-left mb-1 mt-1">
                      {role_desc}
                    </h2>
                  </div>
                  <h2 className="text-base font-medium text-center sm:text-left mb-1 mt-1">
                    Location: {job_location}
                  </h2>
                  <h2 className="underline underline-offset-2 text-base font-semibold text-center sm:text-left mb-1 mt-2">
                    Criteria -
                  </h2>
                  <h2 className="text-sm font-medium text-center sm:text-left mb-1 mt-1">
                    Tenth-percent: {tenth_percent}
                  </h2>
                  <h2 className="text-sm font-medium text-center sm:text-left mb-1 mt-1">
                    Twelveth-percent: {twelveth_percent}
                  </h2>
                  <h2 className="text-sm font-medium text-center sm:text-left mb-1 mt-1">
                    CTC: {pack}
                  </h2>
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <Link
                      href={{
                        pathname: "/company/driveinfo",
                        query: {
                          driveid: drive_id,
                          drivename: role,
                        },
                      }}
                      className="hover:scale-105 transition-all p-1 mb-3 md:mb-0 text-sm w-48 bg-white text-slate-900 font-semibold border-2 border-slate-900 rounded-md"
                    >
                      Check Here For More Info
                    </Link>
                    <Link
                      href={{
                        pathname: "/company/updatedrive",
                        query: {
                          driveid: drive_id,
                          role: role,
                          role_desc: role_desc,
                          job_location: job_location,
                          tenth: tenth_percent,
                          twelve: twelveth_percent,
                          cgpa: cgpa,
                          gap: gap,
                          live: livekt,
                          be: be_percent,
                          dead: deadkt,
                          package: pack,
                        },
                      }}
                      className="p-1 mb-3 md:mb-0 ml-0 md:ml-2 w-48 md:w-fit px-10 rounded-md bg-green-700 hover:bg-green-900 text-white hover:scale-105 transition-all"
                    >
                      Update Drive
                    </Link>
                    <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                      {/* <button
								className="p-1 w-48 mb-3 md:mb-0 md:ml-2 md:w-fit mx-auto px-10 rounded-md"
								style={{ backgroundColor: "#c9243f", color: "white" }}
							>
								Decline */}
                      {/* </button> */}
                      <button
                        onClick={() => {
                          deleteDrive(drive_id);
                        }}
                        className="p-1 mb-3 md:mb-0 ml-0 md:ml-2 w-48 md:w-fit mx-auto px-10 rounded-md bg-red-700 hover:bg-red-900 text-white hover:scale-105 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDrive;
