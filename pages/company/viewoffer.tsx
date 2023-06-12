import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";

const ViewDrive = () => {
  const AuthData: any = useAuth();
  const [drive, setDrive]: any = useState(null);
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const beautifulLabels: any = {
    roll_no: "Roll No",
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    drive_name: "Drive",
  };
  const fetchDrive = async () => {
    const response = await axios.get(
      `${server}/filter/admin/alloffers/${AuthData.user.userData.user.company_name}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    for (let i = 0; i < response.data.length; i++) {
      for (let j = 0; j < response.data[i]["offers"].length; j++) {
        if (
          response.data[i]["offers"][j]["company_name"] ==
          `${AuthData.user.userData.user.company_name}`
        ) {
          response.data[i]["drive_name"] =
            response.data[i]["offers"][j]["role"];
        }
      }
      delete response.data[i]["_count"];
      delete response.data[i]["offers"];
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
          View Offers
        </h3>
        {drive == null ? (
          <></>
        ) : drive.length == 0 ? (
          <>
            <h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
              No Offers Uploaded
            </h3>
          </>
        ) : (
          <div className="w-full p-5 overflow-x-auto">
            <div className="table w-full text-sm text-center">
              <div className="table-header-group">
                <div className="table-row">
                  {Object.keys(beautifulLabels).map((item, index: number) => (
                    <div
                      key={index}
                      className="table-cell border-2 px-4 py-2 font-medium"
                    >
                      {beautifulLabels[item]}
                    </div>
                  ))}
                </div>
              </div>
              <div className="table-row-group">
                {drive.map((row: any, index: number) => (
                  <div key={index} className="table-row">
                    {Object.keys(row).map((item, i) => (
                      <div key={i} className="table-cell border-2 px-4 py-2">
                        {row[item]}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewDrive;
