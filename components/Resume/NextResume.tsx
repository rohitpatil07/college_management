import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../../public/avatar.png";
import ResumeWaterMark from "../../public/resumeWatermark.png";
import axios from "axios";
import Logo from "../../public/logo.png";
import Image from "next/image";
import AcademicTable from "./AcademicTable";
function NextResume() {
  const AuthData: any = useAuth();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [userData, setUserData]: any = useState(null);
  const [resumeData, setResumeData]: any = useState(null);
  const [profilePhoto, setProfilePhoto] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${server}/filter/student/${AuthData.user.userData.user.roll_no}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setUserData(response.data);
      setResumeData(response.data.resume_data);
      setProfilePhoto(response.data.photo);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const isProfileComplete = (data: any, resume: any) => {
    if (!data || !resume) return false;
    const requiredFields = [
      "first_name",
      "last_name",
      "gender",
      "email",
      "phone_number",
      "github",
      "linkedin",
      "resume_data",
    ];
    const resumeFields = [
      "career_obj",
      "pref_language",
      "technologies",
      "hobbies",
      "certificate_one",
      "certificate_one_completion_date",
    ];
    return (
      requiredFields.every((field) => data[field] && data[field] !== "") &&
      resumeFields.every((field) => resume[field] && resume[field] !== "")
    );
  };
  const download = async () => {
    try {
      const response = await axios.get(
        `${server}/download/resume/${AuthData.user.userData.user.roll_no}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          responseType: "blob",
        }
      );
      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${AuthData.user.userData.user.roll_no}.pdf`;
      a.click();
    } catch (error) {
      console.error("Error downloading resume:", error);
    }
  };
  const {
    first_name: fname,
    last_name: lname,
    gender,
    email,
    phone_number: phone,
    github,
    linkedin: link,
    leetcode,
    hackerrank: hack,
    projects: proj = [],
    work_experience: intern = [],
    extra_curricular: extra = [],
  } = userData || {};
  const rdata = resumeData;
  const base = profilePhoto;
  return (
    <>
      {userData && resumeData && isProfileComplete(userData, resumeData) ? (
        <>
          <div className="w-[794px] h-[1123px] mx-auto my-5 rounded-lg shadow-lg p-0 bg-white relative">
            <div className="bg-accent flex w-full rounded-t-lg items-center py-2 px-5 relative">
              <div className="text-white flex float-left flex-col font-semibold text-sm">
                <p>Name: {fname} {lname}</p>
                <p>Gender: {gender}</p>
                <p>Email: {email}</p>
                <p>Mobile: {phone}</p>
                <p>Github: {github}</p>
                <p>Linkedin: {link}</p>
                <p>Hackerrank: {hack}</p>
                <p>Leetcode: {leetcode}</p>
              </div>
              {base ? (
                <img
                  src={`data:image/jpeg;base64, ${base}`}
                  className="absolute left-1/2 -translate-x-1/2 translate-y-[60%] z-10 w-[100px] h-[100px] rounded-full bg-white"
                  alt="Profile"
                  width={100}
                  height={100}
                />
              ) : (
                <Image
                  src={Avatar}
                  className="absolute left-1/2 -translate-x-1/2 translate-y-[60%] z-10 w-[50px] h-[50px] rounded-full bg-white"
                  alt="Profile"
                />
              )}
              <div className="absolute right-5 w-[250px] h-[120px] rounded-lg bg-white flex align-middle">
                <Image src={Logo} alt="logo" />
              </div>
            </div>
            <div className="h-[5px] bg-black"></div>
            <div className="flex w-full p-5 items-start">
              <h3 className="text-accent font-bold text-lg w-1/4">
                Career Objective:
              </h3>
              <p className="w-3/4 text-justify">{rdata?.career_obj}</p>
            </div>
            <div className="px-5 grid grid-cols-[320px_25px_400px]">
              <div className="mr-2">
                <div>
                  <h3 className="text-white bg-accent px-2 font-bold text-lg">
                    Academic Background
                  </h3>
                  <p className="text-justify py-4">
                    <AcademicTable />
                  </p>
                </div>
                {rdata?.acad_achievement_one && (
                  <>
                    <h3 className="mt-2 text-white bg-accent px-2 font-bold text-lg">
                      Academic Achievements
                    </h3>
                    <ul className="pl-4 text-sm mt-1" style={{ listStyleType: "disc" }}>
                      <li>{rdata.acad_achievement_one}</li>
                      <li>{rdata.acad_achievement_two}</li>
                      <li>{rdata.acad_achievement_three}</li>
                    </ul>
                  </>
                )}
                {(rdata?.pref_language || rdata?.technologies || rdata?.hobbies) && (
                  <>
                    <h3 className="mt-3 text-white bg-accent px-2 font-bold text-lg">
                      Additional Information
                    </h3>
                    <ul className="pl-4 text-sm mt-1" style={{ listStyleType: "disc" }}>
                      <li>Preferred Language: {rdata.pref_language}</li>
                      <li>Tech Stack: {rdata.technologies}</li>
                      <li>Hobbies: {rdata.hobbies}</li>
                    </ul>
                  </>
                )}
                {extra.length > 0 && (
                  <>
                    <h3 className="mt-3 text-white bg-accent px-2 font-bold text-lg">
                      Extra Curricular Achievements
                    </h3>
                    {extra.map(({ description, activity_month, activity_year }: any) => (
                      <ul
                        className="pl-4 text-sm mt-1"
                        style={{ listStyleType: "disc" }}
                        key={description}
                      >
                        <li>
                          <p>Activity Description: {description}</p>
                          <p>Activity Duration: {activity_month} {activity_year}</p>
                        </li>
                      </ul>
                    ))}
                  </>
                )}
                {rdata?.certificate_one && (
                  <>
                    <h3 className="mt-3 text-white bg-accent px-2 font-bold text-lg">
                      Certifications
                    </h3>
                    <ul className="pl-4 text-sm mt-1" style={{ listStyleType: "disc" }}>
                      <li>Certificate of {rdata.certificate_one} completed in {rdata.certificate_one_completion_date}</li>
                      <li>Certificate of {rdata.certificate_two} completed in {rdata.certificate_two_completion_date}</li>
                      <li>Certificate of {rdata.certificate_three} completed in {rdata.certificate_three_completion_date}</li>
                    </ul>
                  </>
                )}
              </div>
              <div className="w-[4px] h-[780px] bg-accent mx-auto"></div>

              {/* RIGHT SIDE */}
              <div className="ml-2 relative">
                <div className="absolute top-1/4 opacity-10 pointer-events-none text-white bg-transparent text-xl transform z-50">
                  <Image src={ResumeWaterMark} alt="Resume WaterMark" />
                </div>
                {proj.length > 0 && (
                  <>
                    <h3 className="text-accent font-bold text-lg">
                      Projects and Internships ▶▶▶
                    </h3>
                    <h3 className="text-accent font-bold text-md">Projects</h3>
                    {proj.map(({ proj_name, proj_desc }: any) => (
                      <ul className="pl-4" style={{ listStyleType: "disc" }} key={proj_name}>
                        <li>
                          <p className="font-medium">{proj_name}</p>
                          <p className="text-justify text-sm">{proj_desc}</p>
                        </li>
                      </ul>
                    ))}
                  </>
                )}
                {intern.length > 0 && (
                  <>
                    <h3 className="text-accent font-bold text-md mt-4">Internships</h3>
                    {intern.map(({ company_name, description, start_month, end_month, year }: any) => (
                      <ul className="pl-4" style={{ listStyleType: "disc" }} key={description}>
                        <li>
                          <p className="font-medium">{company_name}</p>
                          <p className="text-sm text-justify">{description}</p>
                          <p className="text-sm text-gray-600 text-right">
                            {start_month} - {end_month} {year}
                          </p>
                        </li>
                      </ul>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between my-5">
            <button
              onClick={download}
              className="bg-accent text-center mx-auto text-white px-2 py-2 rounded-xl font-semibold flex gap-2 items-center justify-center flex-wrap"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                />
              </svg>
              Download / Print Resume
            </button>
          </div>
        </>
      ) : (
        <div className="text-center p-10">
          <p className="text-red-600 text-lg font-bold">
            Please complete your profile before generating the resume.
          </p>
        </div>
      )}
    </>
  );
}

export default NextResume;
