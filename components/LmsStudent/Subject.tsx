"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import "chart.js/auto";
import { Chart, ArcElement } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
Chart.register(ArcElement);
const Subject = ({ subject_id, subject_name, email, fac_data }: any) => {
  const router = useRouter();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const AuthData: any = useAuth();
  const [modules, setModules]: any = useState(null);
  const [facdata, setfacdata]: any = useState(null);
  const [subjectInfo, setSubjectInfo]: any = useState(null);
  const get_module = async () => {
    const response = await axios.get(
      `${server}/lms/filter/allmodules/${subject_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    setModules(response.data);
  };
  const current_subject = async () => {
    const response = await axios.get(
      `${server}/lms/filter/subject/${subject_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    console.log(response.data.faculty);
    setfacdata(response.data.faculty);
    setSubjectInfo(response.data);
  };
  const [presenties, setpresenties] = useState(0);
  const [absenties, setabsenties] = useState(0);
  const attendance = async () => {
    const response = await axios({
      method: "post",
      url: `${server}/lms/filter/student/attendence`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthData.user.token}`,
      },
      data: {
        subject_id: parseInt(subject_id),
        roll_no: `${AuthData.user.userData.user.roll_no}`,
      },
    });
    console.log(response.data["present"].length);
    setpresenties(response.data["present"].length);
    setabsenties(response.data["absent"].length);
  };

  const optionssss = {
    responsive: true,

    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Attendence",
      },
    },
  };
  const datasss = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [presenties, absenties],
        backgroundColor: ["rgba(21, 128, 61,0.5)", "rgba(201, 36, 63,0.5)"],
        borderColor: ["rgba(21, 128, 61,1)", "rgba(201, 36, 63,1)"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    get_module();
    current_subject();
    attendance();
  }, []);
  return (
    <div className="w-full flex justify-center items-center align-middle">
      <div className="flex bg-white w-11/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
        {subjectInfo ? (
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            {subjectInfo.subject_name}
          </h3>
        ) : (
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            Getting Info
          </h3>
        )}
        <div className="w-10/12 m-auto md:w-[40%] min-h-[400px]">
          <Doughnut data={datasss} options={optionssss} />
        </div>
        {facdata == null ? (
          <></>
        ) : (
          <>
            <div className="px-4 py-6 text-sm w-11/12  flex flex-wrap cursor-pointer mt-2 mb-2 border-solid border-2 border-neutral-200 shadow-xl drop-shadow-xl rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
              Faculty-Name:{facdata.first_name} {facdata.last_name} 
            </div>
            <div className="px-4 py-6 text-sm w-11/12  flex flex-wrap cursor-pointer mt-2 mb-2 border-solid border-2 border-neutral-200 shadow-xl drop-shadow-xl rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                />
              </svg>
              <p className="text-sm">Contact-Info:</p>
              <p className="text-sm">Phone:{facdata.phone_number} Email:{facdata.email} Designation: {facdata.designation}</p>
            </div>
          </>
        )}
        <Link
          href={{
            pathname: "lms/assign",
            query: {
              subject_id: subject_id,
              subject_name: subject_name,
            },
          }}
          className="px-4 py-6 text-sm w-11/12 flex flex-wrap cursor-pointer mt-2 mb-2 border-solid border-2 border-neutral-200 shadow-xl drop-shadow-xl rounded-xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
            />
          </svg>
          Assignment
        </Link>
        {modules ? (
          <div className="flex flex-col md:flex-row flex-wrap justify-evenly items-center w-full mb-5">
            {modules.map(
              (
                { subject_id, module_name, module_number, module_id }: any,
                i: number
              ) => (
                <div
                  key={module_number}
                  className="flex flex-col items-center w-10/12 scale-90 sm:w-3/5 md:w-2/5 shadow-2xl drop-shadow-2xl rounded-xl overflow-hidden bg-white"
                >
                  <img
                    src={`/subjects/subject${i + 1}.jpg`}
                    alt={module_name}
                    className="w-full min-h-[10rem] object-cover rounded-xl"
                  />
                  <div className="text-lg sm:text-xl font-medium text-gray-900 my-4 text-center">
                    {module_number}. {module_name}
                  </div>
                  <Link
                    href={{
                      pathname: "/lms/modules",
                      query: {
                        module_id: module_id,
                        module_name: module_name,
                        subject_id: subject_id,
                        subject_name: subject_name,
                        module_number: module_number,
                        email: email,
                      },
                    }}
                    className="mb-5 w-fit mx-auto px-16 py-2 rounded-full bg-accent text-white hover:scale-105 transition-all"
                  >
                    Open
                  </Link>
                </div>
              )
            )}
          </div>
        ) : (
          <>
            <Loading loadState="loading" />
          </>
        )}
      </div>
    </div>
  );
};

export default Subject;
