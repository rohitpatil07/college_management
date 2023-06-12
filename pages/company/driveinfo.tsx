import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";

const DriveInfo = () => {
  const router = useRouter();
  const { query } = router;
  const [stu, setStu]: any = useState(null);
  const searchParams: any = new URLSearchParams(window.location.search);
  const driveid = parseInt(searchParams.get("driveid"));
  const drivename3 = searchParams.get("drivename");
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const AuthData: any = useAuth();
  const beautifulLabels: any = {
    roll_no: "Roll No",
    first_name: "First Name",
    middle_name: "Middle Name",
    last_name: "Last Name",
    email: "Email",
    phone_number: "Phone Number",
    department: "Department",
    semester: "Semester",
    resume: "Resume",
  };
  const fetchStudents = async () => {
    const response = await axios.get(
      `${server}/filter/company/appliedstudents/${driveid}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response.data.students);
    for (let i = 0; i < response.data.students.length; i++) {
      response.data.students[i]["resume"] = "resume";
    }
    setStu(response.data.students);
  };
  const download = async (roll: any) => {
    const response = await axios
      .get(`${server}/download/resume/${stu[roll]["roll_no"]}`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: false,
        responseType: "blob",
      })
      .then((response) => {
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${stu[roll]["roll_no"]}.pdf`;
        a.click();
      });
  };
  const downloadZip = async () => {
    const rolls = [];
    for (let i = 0; i < stu.length; i++) {
      rolls.push(stu[i].roll_no);
    }
    const resp = await axios({
      method: "post",
      url: `${server}/download/zip`,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      responseType: "blob",
      data: {
        data: rolls, // This is the body part
      },
    }).then((response) => {
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Resume_students.zip`;
      a.click();
    });
  };
  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <div className="w-full flex justify-center items-center align-middle flex-col">
      <div className="flex bg-white w-10/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
        <h3 className="text-xl sm:text-2xl font-medium text-gray-900">
          Candidates Registered For {drivename3}
        </h3>
        {stu == null || stu == undefined ? (
          <></>
        ) : stu.length == 0 ? (
          <>
            <h3 className="text-base sm:text-xl my-5 font-medium text-gray-700">
              No Candidates Registered
            </h3>
          </>
        ) : (
          <div className="w-full flex flex-col">
            <button
              onClick={downloadZip}
              className="px-1 py-2 my-5 w-fit mr-3 ml-auto rounded-md bg-emerald-500 text-white"
            >
              Download All resume
            </button>
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
                  {stu.map((row: any, index: number) => (
                    <div key={index} className="table-row">
                      {Object.keys(row).map((item, i) => (
                        <div key={i} className="table-cell border-2 px-4 py-2">
                          {row[item] == "resume" ? (
                            <button
                              onClick={() => download(index)}
                              className="w-fit px-1 py-2 mx-auto rounded-md bg-emerald-500 text-white"
                            >
                              Resume
                            </button>
                          ) : (
                            <>{row[item]}</>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriveInfo;
