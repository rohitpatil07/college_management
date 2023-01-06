"use client";
import React, { useState, useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import api from "../../contexts/adapter";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import Swal from "sweetalert2";
const ResumeInfo = () => {
  const AuthData: any = useAuth();
  const [resumeData, setResumeData]: any = useState();
  const [updloading, setUpdateLoading] = useState(false);
  const getProfileData = async () => {
    const response = await axios.get(
      `http://localhost:5000/filter/student/${AuthData.user.userData.user.roll_no}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    if (response.data.resume_data != null) {
      // console.log("Hi");
      let month: any = {
        Jan: "-01",
        Feb: "-02",
        Mar: "-03",
        Apr: "-04",
        May: "-05",
        Jun: "-06",
        Jul: "-07",
        Aug: "-08",
        Sep: "-09",
        Oct: "-10",
        Nov: "-11",
        Dec: "-12",
      };
      if (response.data.resume_data.certificate_one_completion_date != null) {
        let final_part =
          response.data.resume_data.certificate_one_completion_date.slice(
            response.data.resume_data.certificate_one_completion_date.length -
              4,
            response.data.resume_data.certificate_one_completion_date.length
          ) +
          month[
            response.data.resume_data.certificate_one_completion_date.slice(
              0,
              3
            )
          ];
        response.data.resume_data.certificate_one_completion_date = final_part;
      }
      if (response.data.resume_data.certificate_two_completion_date != null) {
        let final_part =
          response.data.resume_data.certificate_two_completion_date.slice(
            response.data.resume_data.certificate_two_completion_date.length -
              4,
            response.data.resume_data.certificate_two_completion_date.length
          ) +
          month[
            response.data.resume_data.certificate_two_completion_date.slice(
              0,
              3
            )
          ];
        response.data.resume_data.certificate_two_completion_date = final_part;
      }
      if (response.data.resume_data.certificate_three_completion_date != null) {
        let final_part =
          response.data.resume_data.certificate_three_completion_date.slice(
            response.data.resume_data.certificate_three_completion_date.length -
              4,
            response.data.resume_data.certificate_three_completion_date.length
          ) +
          month[
            response.data.resume_data.certificate_three_completion_date.slice(
              0,
              3
            )
          ];
        response.data.resume_data.certificate_three_completion_date =
          final_part;
      }
      setResumeData(response.data.resume_data);
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
  };
  const updateChange = (val: string, key: string) => {
    var newChange = { ...resumeData };
    newChange[key] = val;
    setResumeData(newChange);
  };


  const save=async()=>{
    setUpdateLoading(true);
    let month: any = {
        1 : "January",
        2 : "February",
        3 : "March",
        4 : "April",
        5 : "May",
        6 : "June",
        7 : "July",
        8 : "August",
        9 : "September",
        10 : "October",
       11 : "November",
        12 : "December"
      };
      if(resumeData.certificate_one_completion_date!=null){
        let length = resumeData.certificate_one_completion_date.length;
        let data = resumeData.certificate_one_completion_date.slice(length-2,length-1);
        let data_2 = resumeData.certificate_one_completion_date.slice(length-1,length);
        let part_1 ;
        let part_2 =  resumeData.certificate_one_completion_date.slice(0,4);
        if(data==1){
          part_1 = month[resumeData.certificate_one_completion_date.slice(length-2,length)];
        }
        else{
          part_1 =  month[resumeData.certificate_one_completion_date.slice(length-1,length)]
        }
        let part_3 = part_1 +' '+ part_2;
        resumeData.certificate_one_completion_date=part_3;
      }
      if(resumeData.certificate_two_completion_date!=null){
        let length = resumeData.certificate_two_completion_date.length;
        let data = resumeData.certificate_two_completion_date.slice(length-2,length-1);
        let data_2 = resumeData.certificate_two_completion_date.slice(length-1,length);
        let part_1 ;
        let part_2 =  resumeData.certificate_two_completion_date.slice(0,4);
        if(data==1){
          part_1 = month[resumeData.certificate_two_completion_date.slice(length-2,length)];
        }
        else{
          part_1 =  month[resumeData.certificate_two_completion_date.slice(length-1,length)]
        }
        let part_3 = part_1 +' '+ part_2;
        resumeData.certificate_two_completion_date=part_3;
      }
      if(resumeData.certificate_three_completion_date!=null){
        let length = resumeData.certificate_three_completion_date.length;
        let data = resumeData.certificate_three_completion_date.slice(length-2,length-1);
        let data_2 = resumeData.certificate_three_completion_date.slice(length-1,length);
        let part_1 ;
        let part_2 =  resumeData.certificate_three_completion_date.slice(0,4);
        if(data==1){
          part_1 = month[resumeData.certificate_three_completion_date.slice(length-2,length)];
        }
        else{
          part_1 =  month[resumeData.certificate_three_completion_date.slice(length-1,length)]
        }
        let part_3 = part_1 +' '+ part_2;
        resumeData.certificate_three_completion_date=part_3;
      }
      let body = {resume: resumeData}
      const response = await axios.post(
        "http://localhost:5000/add/student/resumedata",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthData.user.token}`,
          },
        }
      );
      // console.log(response);
      getProfileData();
      setUpdateLoading(false);
      if (response.status == 200) {
        Swal.fire({
          icon: "success",
          title: "Update Successful",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
  }


  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <div className="w-full sm:w-11/12 mx-auto  flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 my-3">
        Additional Info
      </h3>
      {resumeData ? (
        <div>
          <div className="w-full border-b-2 border-b-gray-300 py-2 px-5 flex flex-wrap justify-around">
            <div className="mb-3 xl:w-96">
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Hobbies"
                value={resumeData.hobbies}
                onChange={(e) => {
                  updateChange(e.target.value, "hobbies");
                }}
              />
              <div className="text-sm text-gray-500 mt-1">
                eg. Reading Books, Playing Guitar, etc.
              </div>
            </div>
            <div className="mb-3 xl:w-96">
              <input
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Preferred Language"
                value={resumeData.pref_language}
                onChange={(e) => {
                  updateChange(e.target.value, "pref_language");
                }}
              />
              <div className="text-sm text-gray-500 mt-1">
                eg. Javascript, Python, C++, Dart, etc.
              </div>
            </div>
            <div className="mb-3 xl:w-96">
              <input
                type="text"
                value={resumeData.technologies}
                onChange={(e) => {
                  updateChange(e.target.value, "technologies");
                }}
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Familar With Technologies"
              />
              <div className="text-sm text-gray-500 mt-1">
                eg. VSCode, GitHub, Anaconda, etc.
              </div>
            </div>
            <div className="mb-3 xl:w-96">
              <input
                type="text"
                value={resumeData.publications}
                onChange={(e) => {
                  updateChange(e.target.value, "publications");
                }}
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Publications"
              />
              <div className="text-sm text-gray-500 mt-1">
                eg. IJAISC, IISC, etc.
              </div>
            </div>
            <div className="mb-3 w-10/12">
              <input
                type="text"
                value={resumeData.career_obj}
                onChange={(e) => {
                  updateChange(e.target.value, "career_obj");
                }}
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Career Objective"
              />
            </div>
          </div>
          <div className="w-full py-2 px-8 flex flex-col flex-wrap justify-around">
            <h5 className="font-medium leading-tight text-xl mt-0 mb-2 px-3">
              Certifications
            </h5>
            <div className="flex flex-wrap justify-around border-b-2 border-b-gray-300">
              <div className="mb-3 xl:w-96">
                <label className="form-label inline-block mb-2 text-gray-700">
                  Certificate Name
                </label>
                <input
                  type="text"
                  value={resumeData.certificate_one}
                  onChange={(e) => {
                    updateChange(e.target.value, "certificate_one");
                  }}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div className="mb-3 xl:w-96">
                <label className="form-label inline-block mb-2 text-gray-700">
                  Completion Date
                </label>
                <input
                  type="month"
                  value={resumeData.certificate_one_completion_date}
                  onChange={(e) => {
                    updateChange(
                      e.target.value,
                      "certificate_one_completion_date"
                    );
                  }}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-around border-b-2 border-b-gray-300">
              <div className="mb-3 xl:w-96">
                <label className="form-label inline-block mb-2 text-gray-700">
                  Certificate Name
                </label>
                <input
                  type="text"
                  value={resumeData.certificate_two}
                  onChange={(e) => {
                    updateChange(e.target.value, "certificate_two");
                  }}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div className="mb-3 xl:w-96">
                <label className="form-label inline-block mb-2 text-gray-700">
                  Completion Date
                </label>
                <input
                  type="month"
                  value={resumeData.certificate_two_completion_date}
                  onChange={(e) => {
                    updateChange(
                      e.target.value,
                      "certificate_two_completion_date"
                    );
                  }}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-around border-b-2 border-b-gray-300">
              <div className="mb-3 xl:w-96">
                <label className="form-label inline-block mb-2 text-gray-700">
                  Certificate Name
                </label>
                <input
                  type="text"
                  value={resumeData.certificate_three}
                  onChange={(e) => {
                    updateChange(e.target.value, "certificate_three");
                  }}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
              <div className="mb-3 xl:w-96">
                <label className="form-label inline-block mb-2 text-gray-700">
                  Completion Date
                </label>
                <input
                  type="month"
                  value={resumeData.certificate_three_completion_date}
                  onChange={(e) => {
                    updateChange(
                      e.target.value,
                      "certificate_three_completion_date"
                    );
                  }}
                  className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
          <div className="w-full border-b-2 border-b-gray-300 py-2 px-8 flex flex-col flex-wrap justify-around">
            <h5 className="font-medium leading-tight text-xl mt-0 mb-2 px-3">
              Academic Achivements
            </h5>
            <div className="mb-3 xl:w-6/12">
              <input
                placeholder="One"
                value={resumeData.acad_achievement_one}
                onChange={(e) => {
                  updateChange(e.target.value, "acad_achievement_one");
                }}
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div className="mb-3 xl:w-6/12">
              <input
                placeholder="Two"
                value={resumeData.acad_achievement_two}
                onChange={(e) => {
                  updateChange(e.target.value, "acad_achievement_two");
                }}
                type="text"
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div className="mb-3 xl:w-6/12">
              <input
                placeholder="Three"
                type="text"
                value={resumeData.acad_achievement_three}
                onChange={(e) => {
                  updateChange(e.target.value, "acad_achievement_three");
                }}
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-500 rounded transition ease-in-out  m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              />
            </div>
            <div className="w-full flex justify-center items-center">
						{updloading ? (
							<button
								disabled
								className="flex items-center justify-center p-2 w-fit mx-auto px-8 py-2 rounded-md bg-gray-400 text-white"
							>
								Save
										<ClipLoader className='ml-2' size={20} color="#d63636" />
									
							</button>
						) : (
							<div className="flex flex-col">
								<button onClick={save}
									className="p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
									
								>
									Save
								</button>
							</div>
						)}
					</div>
          </div>
        </div>
      ) : (
        <><Loading loadState='loading' /></>
      )}
    </div>
  );
};

export default ResumeInfo;
