import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Link from "next/link";

const AppliedDrives = () => {
  const AuthData: any = useAuth();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [drive, setDrive]: any = useState(null);
  const fetchDrive = async () => {
    const response = await axios.get(
      `${server}/filter/student/applied/${AuthData.user.userData.user.roll_no}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response.data);
    if (
      response.data.error ==
      "Maximum offers reached so cannot sit for placement"
    ) {
      setDrive("Max");
    } else {
      setDrive(response.data);
    }
  };

  useEffect(() => {
    fetchDrive();
  }, []);
  console.log(drive);
  return (
    <div className="w-full sm:w-11/12 mx-auto py-5 flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
      <h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
        Applied Drives
      </h3>
      {drive == null ? (
        <></>
      ) : drive == "Max" ? (
        <>
          <h3 className="text-2xl sm:text-1xl mb-5 font-bold text-gray-900">
            Maximum Offers Reached or Not applied to any drive
          </h3>
        </>
      ) : drive.length == 0 ? (
        <>
          <h3 className="text-xl sm:text-1xl mb-5 font-bold text-gray-900">
            You have not applied for any drives
          </h3>
        </>
      ) : (
        <div className="flex flex-col w-full">
          {drive?.map(({ company_name, role, desc, drive_id }: any) => (
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
                    pathname: "/tpc/adriveInfo",
                    query: {
                      drive_id: drive_id,
                    },
                  }}
                  className="p-1 mb-3 md:mb-0 text-sm w-48 bg-white text-slate-900 font-semibold border-2 border-slate-900 rounded-md"
                >
                  Check Here For More Info
                </Link>
                <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                  {/* <button
								className="p-1 w-48 mb-3 md:mb-0 md:ml-2 md:w-fit mx-auto px-10 rounded-md"
								style={{ backgroundColor: "#c9243f", color: "white" }}
							>
								Decline */}
                  {/* </button> */}
                  {/* <button  className="p-1 mb-3 md:mb-0 ml-0 md:ml-2 w-48 md:w-fit mx-auto px-10 rounded-md bg-emerald-500 text-white">
								Accept
							</button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedDrives;
