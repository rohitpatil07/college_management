"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Avatar from "../../public/avatar.png";
import axios from "axios";
import Logo from "../../public/logo.png";
import Image from "next/image";
import AcademicTable from "./AcademicTable";
import Dot from "../../public/primitive.svg";

function NextResume() {
  const AuthData: any = useAuth();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [link, setLink] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(0);
  const [department, setDepartment] = useState("");
  const [extra, setExtra]: any = useState(null);
  const [proj, setProj]: any = useState(null);
  const [intern, setIntern]: any = useState(null);
  const [rdata, setRdata]: any = useState("");
  const [base, setBase] = useState("");
  const fetchData = async () => {
    const response = await axios.get(
      `${server}/filter/student/${AuthData.user.userData.user.roll_no}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    setFname(response.data.first_name);
    setLname(response.data.last_name);
    setLink(response.data.linkedin);
    setEmail(response.data.email);
    setDepartment(response.data.department);
    setPhone(response.data.phone_number);
    setExtra(response.data.extra_curricular);
    setProj(response.data.projects);
    setIntern(response.data.work_experience);
    setRdata(response.data.resume_data);
    setBase(response.data.photo);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(extra);
  const download = async () => {
    const response = await axios
      .get(`${server}/download/resume/${AuthData.user.userData.user.roll_no}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
        responseType: "blob",
      })
      .then((response) => {
        const blob = response.data;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${AuthData.user.userData.user.roll_no}.pdf`;
        a.click();
      });
  };
  return (
    <>
      <div className="w-[794px] h-[1123px] mx-auto my-5 rounded-lg shadow-lg p-0 bg-white relative">
        <div className="bg-accent flex  w-full rounded-t-lg items-center py-2 px-5">
          <div className="text-white flex float-left flex-col font-semibold">
            <p>
              Name: {fname} {lname}
            </p>
            <p>Department: {department}</p>
            <p>Mobile: {phone}</p>
            <p>Email: {email}</p>
            <p>Linkedin: {link}</p>
          </div>
          {base == undefined ? (
            <Image
              src={Avatar}
              className="translate-y-10 translate-x-12 mx-auto z-10 w-[50px] h-[50px] rounded-full bg-white"
              alt="Profile"
            />
          ) : (
            <Image
              src={`data:image/jpeg; base64, ${base}`}
              className="translate-y-10 mx-12 z-10 w-[100px] h-[100px] rounded-full bg-white"
              alt="Profile"
              width={100}
              height={100}
            />
          )}
          <Image
            src={Logo}
            className="right-5 absolute w-[200px] h-[120px] bg-white rounded-lg p-2"
            alt="logo"
          />
        </div>
        <div className="h-[15px] bg-black"></div>
        <div className="flex w-full p-5 items-end">
          <h3 className="text-accent font-bold text-xl w-1/4">
            Career Objective :
          </h3>
          {rdata == null || rdata == undefined ? (
            <></>
          ) : (
            <p className="w-3/4 text-justify">{rdata.career_obj}</p>
          )}
        </div>
        <div className="px-5 grid grid-cols-[320px_25px_400px]">
          <div className="mr-2">
            <div>
              <h3 className="text-white bg-accent px-2 font-bold text-lg">
                Academic Background
              </h3>
              <p className="text-justify py-5">
                <AcademicTable></AcademicTable>
              </p>
            </div>
            <div>
              {rdata == undefined || rdata == null || rdata.acad_achievement_one==null || rdata.acad_achievement_one ==undefined ? (
                <></>
              ) : (
                <>
                  <h3 className="mt-2 text-white bg-accent px-2 font-bold text-lg">
                    Academic Achievements
                  </h3>
                  <ul style={{ listStyleType: 'disc' }} >
                    <li>{rdata.acad_achievement_one}</li>
                    <li>{rdata.acad_achievement_two}</li>
                    <li>{rdata.acad_achievement_three}</li>
                  </ul>
                </>
              )}
            </div>
            <div>
              { (rdata.pref_language==null || rdata.technologies==null || rdata.hobbies==null)? (
                <>
                </>
              ) : (
                <>
                  <h3 className="mt-5 text-white bg-accent px-2 font-bold text-lg">
                    Additional Information
                  </h3>
                  <ul style={{ listStyleType: 'disc' }} >
                    <li>Preffered Language: {rdata.pref_language}</li>
                    <li>Tech Stack:{rdata.technologies}</li>
                    <li>Hobbies:{rdata.hobbies}</li>
                  </ul>
                </>
              )}
            </div>
            <div>
              {extra == null || extra == undefined || extra.length == 0 ? (
                <></>
              ) : (
                <>
                  <div>
                  <h3 className="mt-5 text-white bg-accent px-2 font-bold text-lg">
                      Extra Curricular Achievements 
                    </h3>
                  </div>
                  <div>
                    {extra.map(
                      ({ description, activity_month, activity_year }: any) => (
                        <ul style={{ listStyleType: 'disc' }} key={description}>
                          <li>
                          <p>Activity Description:{description}</p>  
                          <p>Activity Duration: {activity_month} {activity_year}</p>
                          </li>
                        </ul>
                      )
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="w-[5px] h-[780px] bg-accent mx-auto"></div>
          <div className="ml-2">
            <div>
              {rdata == undefined || rdata == null || rdata.certificate_one == null? (
                <> </>
              ) : (
                <>
                  <h3 className="text-accent font-bold text-lg">
                    <span
                      className="absolute left-[349px] text-black z-30
                                "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="8"
                        height="16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"
                        />
                      </svg>
                    </span>{" "}
                    Certifications ▶▶▶
                  </h3>
                  <ul style={{ listStyleType: 'disc' }}>
                    <li>
                      <p>Certificate Title: {rdata.certificate_one}</p>
                      <p>Certificate Completion Date:{rdata.certificate_one_completion_date}</p>
                    </li>
                    <li>
                      <p>Certificate Title: {rdata.certificate_two}</p>
                      <p>Certificate Completion Date:{rdata.certificate_two_completion_date}</p>
                    </li>
                    <li>
                    <p>Certificate Title: {rdata.certificate_three}</p>
                      <p>Certificate Completion Date:{rdata.certificate_three_completion_date}</p>
                    </li>
                  </ul>
                </>
              )}
            </div>
            <div>
              <div>
                {proj == null || proj == undefined || proj.length == 0 ? (
                  <></>
                ) : (
                  <div>
                    <h3 className="text-accent font-bold text-lg">
                      <span
                        className="absolute left-[349px] text-black z-30
                                "
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="8"
                          height="16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"
                          />
                        </svg>
                      </span>{" "}
                      Projects and Internships ▶▶▶
                    </h3>
                    <h3 className="text-accent font-bold text-md">Projects</h3>
                    {proj.map(({ proj_name, proj_desc, role }: any) => (
                      <ul style={{ listStyleType: 'disc' }} key={proj_name}>
                        <li>
                          <p>Project Title: {proj_name}</p> 
                          <p>Project Description: {proj_desc}</p> 
                          <p>Role: {role}</p>
                        </li>
                      </ul>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-accent font-bold text-md">Internships</h3>
                <div>
                  {intern == null ||
                  intern == undefined ||
                  intern.length == 0 ? (
                    <></>
                  ) : (
                    <div>
                      {intern.map(
                        ({
                          company_name,
                          description,
                          start_month,
                          end_month,
                          year,
                        }: any) => (
                          <ul style={{ listStyleType: 'disc' }} key={description}>
                            <li>
                              <p>Company Name:{company_name}</p>
                              <p>Description: {description}</p>
                              <p>Duration:{start_month}-  {end_month} {year}</p>
                            </li>
                          </ul>
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

           
            {/* <div>
							<h3 className="text-accent font-bold text-lg">
								<span
									className="absolute left-[345px] text-black z-30
                                "
								>
									<svg xmlns="http://www.w3.org/2000/svg" width="8" height="16"><path fill-rule="evenodd" d="M0 8c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4z"/></svg>
								</span>{" "}
								Position Of Responsibility ▶▶▶
							</h3>
							<p className="text-justify py-3">
								Tempor sint ipsum minim eiusmod nulla laboris velit id dolore.
								Laboris nulla eiusmod Lorem dolore veniam cillum. Excepteur
								incididunt reprehenderit quis sit tempor cillum adipisicing duis
								et.
							</p>
						</div> */}
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
            stroke-width="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>
          Download / Print Resume
        </button>
      </div>
    </>
  );
}

export default NextResume;
