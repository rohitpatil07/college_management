"use client";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import Swal from "sweetalert2";
import api from "../../contexts/adapter";

const ResumeInfo = () => {
  const AuthData: any = useAuth();
  const [resumeData, setResumeData]: any = useState();
  const [updloading, setUpdateLoading] = useState(false);
  const server = process.env.NEXT_PUBLIC_SERVER_URL;

  const formatMonth = (dateStr: string) => {
    const monthMap: Record<string, string> = {
      "01": "January", "02": "February", "03": "March", "04": "April",
      "05": "May", "06": "June", "07": "July", "08": "August",
      "09": "September", "10": "October", "11": "November", "12": "December",
    };
    if (!dateStr || dateStr.length !== 7) return "";
    const [year, month] = dateStr.split("-");
    return `${monthMap[month]} ${year}`;
  };

  const parseToInputMonth = (val: string) => {
    if (!val) return "";
    const parts = val.split(" ");
    const year = parts[1];
    const monthShort = parts[0].slice(0, 3);
    const monthNumMap: Record<string, string> = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
      Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12"
    };
    return `${year}-${monthNumMap[monthShort] || "01"}`;
  };

  const getProfileData = async () => {
    try {
      const response = await axios.get(
        `${server}/filter/student/${AuthData.user.userData.user.roll_no}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.resume_data != null) {
        const data = { ...response.data.resume_data };
        data.certificate_one_completion_date = parseToInputMonth(data.certificate_one_completion_date);
        data.certificate_two_completion_date = parseToInputMonth(data.certificate_two_completion_date);
        data.certificate_three_completion_date = parseToInputMonth(data.certificate_three_completion_date);
        setResumeData(data);
      } else {
        setResumeData({
          roll_no: `${AuthData.user.userData.user.roll_no}`,
          hobbies: "",
          pref_language: "",
          technologies: "",
          publications: "",
          career_obj: "",
          certificate_one: "",
          certificate_one_completion_date: "",
          certificate_two: "",
          certificate_two_completion_date: "",
          certificate_three: "",
          certificate_three_completion_date: "",
          acad_achievement_one: "",
          acad_achievement_two: "",
          acad_achievement_three: "",
        });
      }
    } catch (error) {
      console.error("Error fetching resume data:", error);
    }
  };

  const updateChange = (val: string, key: string) => {
    setResumeData((prev: any) => ({
      ...prev,
      [key]: val,
    }));
  };

  const save = async () => {
  setUpdateLoading(true);

  const resumeToSend = {
    ...resumeData,
    certificate_one_completion_date: formatMonth(resumeData.certificate_one_completion_date),
    certificate_two_completion_date: formatMonth(resumeData.certificate_two_completion_date),
    certificate_three_completion_date: formatMonth(resumeData.certificate_three_completion_date),
  };

  // Optional: Interceptor to log what's being sent
  axios.interceptors.request.use((config) => {
    console.log("Making request to:", config.url);
    console.log("withCredentials:", config.withCredentials);
    return config;
  });

  try {
    const response = await api.post(
  `${server}/add/student/resumedata`,
  { resume: resumeToSend }
);

    setUpdateLoading(false);
    getProfileData();

    if (response.status === 200) {
      Swal.fire({
        icon: "success",
        title: "Update Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      throw new Error("Unexpected response");
    }
  } catch (error) {
    console.error("❌ Error saving resume data:", error);

    setUpdateLoading(false);

    Swal.fire({
      icon: "error",
      title: "Update Failed",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <div className="w-full sm:w-11/12 mx-auto flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 my-3">
        Additional Info
      </h3>
      {resumeData ? (
        <div className="w-full border-b-2 border-b-gray-300 py-2 px-5 flex flex-wrap justify-around">
          <div className="mb-3 xl:w-96">
            <input
              type="text"
              className="form-control block w-full px-3 py-1.5 border border-gray-500 rounded"
              placeholder="Hobbies"
              value={resumeData.hobbies}
              onChange={(e) => updateChange(e.target.value, "hobbies")}
            />
          </div>
          <div className="mb-3 xl:w-96">
            <input
              type="text"
              placeholder="Preferred Language"
              className="form-control block w-full px-3 py-1.5 border border-gray-500 rounded"
              value={resumeData.pref_language}
              onChange={(e) => updateChange(e.target.value, "pref_language")}
            />
          </div>
          <div className="mb-3 xl:w-96">
            <input
              type="text"
              placeholder="Technologies"
              className="form-control block w-full px-3 py-1.5 border border-gray-500 rounded"
              value={resumeData.technologies}
              onChange={(e) => updateChange(e.target.value, "technologies")}
            />
          </div>
          <div className="mb-3 xl:w-96">
            <input
              type="text"
              placeholder="Publications"
              className="form-control block w-full px-3 py-1.5 border border-gray-500 rounded"
              value={resumeData.publications}
              onChange={(e) => updateChange(e.target.value, "publications")}
            />
          </div>
          <div className="mb-3 w-10/12">
            <input
              type="text"
              placeholder="Career Objective"
              className="form-control block w-full px-3 py-1.5 border border-gray-500 rounded"
              value={resumeData.career_obj}
              onChange={(e) => updateChange(e.target.value, "career_obj")}
            />
          </div>

          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-wrap justify-around w-full border-b-2 border-b-gray-300">
              <div className="mb-3 xl:w-96">
                <label className="form-label inline-block mb-2 text-gray-700">
                  Certificate {i} Name
                </label>
                <input
                  type="text"
                  className="form-control block w-full px-3 py-1.5 border border-gray-500 rounded"
                  value={resumeData[`certificate_${["one", "two", "three"][i - 1]}`]}
                  onChange={(e) =>
                    updateChange(e.target.value, `certificate_${["one", "two", "three"][i - 1]}`)
                  }
                />
              </div>
              <div className="mb-3 xl:w-96">
                <label className="form-label inline-block mb-2 text-gray-700">
                  Completion Date
                </label>
                <input
                  type="month"
                  className="form-control block w-full px-3 py-1.5 border border-gray-500 rounded"
                  value={resumeData[`certificate_${["one", "two", "three"][i - 1]}_completion_date`]}
                  onChange={(e) =>
                    updateChange(e.target.value, `certificate_${["one", "two", "three"][i - 1]}_completion_date`)
                  }
                />
              </div>
            </div>
          ))}

          <div className="w-full border-b-2 border-b-gray-300 py-2 px-8 flex flex-col flex-wrap justify-around">
            <h5 className="font-medium leading-tight text-xl mt-0 mb-2 px-3">
              Academic Achievements
            </h5>
            {["acad_achievement_one", "acad_achievement_two", "acad_achievement_three"].map((key, index) => (
              <div className="mb-3 xl:w-6/12" key={key}>
                <input
                  type="text"
                  placeholder={`Achievement ${index + 1}`}
                  value={resumeData[key]}
                  onChange={(e) => updateChange(e.target.value, key)}
                  className="form-control block w-full px-3 py-1.5 border border-gray-500 rounded"
                />
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center items-center">
            {updloading ? (
              <button
                disabled
                className="flex items-center justify-center p-2 w-fit mx-auto px-8 py-2 rounded-md bg-gray-400 text-white"
              >
                Save
                <ClipLoader className="ml-2" size={20} color="#d63636" />
              </button>
            ) : (
              <button
                onClick={save}
                className="p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
              >
                Save
              </button>
            )}
          </div>
        </div>
      ) : (
        <Loading loadState="loading" />
      )}
    </div>
  );
};

export default ResumeInfo;
