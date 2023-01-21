"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const LmsAdminLookUp = () => {
  const router = useRouter();
  const AuthData: any = useAuth();
  const [showFilters, setShowFilters] = useState(false);
  const [allFaculty, setAllFaculty] = useState([]);
  const serial_no = [0, 1, 2, 3, 4, 5, 6];
  const serial_text = ["All Faculties", "Faculty By Dept", "Faculty By Mail"];
  const [selected_serial_no, setselected_serial_no] = useState(serial_no[0]);
  let variable = "";
  const modal_text = ["department", "Email"];
  const [modal_number, setmodal_number] = useState(0);
  const [modal, setmodal] = useState(false);
  const [modal_current_input, setmodal_current_input] = useState("");
  const [current_text, setcurrent_text] = useState(serial_text[0]);
  const on_serial_click = (i: number) => {
    console.log(i);
    setcurrent_text(serial_text[i]);
    setselected_serial_no(serial_no[i]);
    console.log("h", selected_serial_no);
    if (i == 1) {
      setmodal_number(0);
      setmodal(true);
    }
    if (i == 2) {
      setmodal_number(1);
      setmodal(true);
    }
    if (i == 0) {
      get_faculty();
    }
  };
  const get_faculty = async () => {
    console.log(selected_serial_no);
    if (selected_serial_no == 0) {
      const response = await axios.get(
        "http://localhost:5000/lms/filter/allfaculties",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthData.user.token}`,
          },
        }
      );

      console.log(response.data);
      setAllFaculty(response.data);
    }
    if (selected_serial_no == 1) {
      if (modal_current_input == "") {
        window.alert("Enter Text");
      } else {
        console.log(modal_current_input, selected_serial_no);
        const response = await axios.get(
          `http://localhost:5000/lms/filter/faculty/${modal_current_input}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthData.user.token}`,
            },
          }
        );
        setAllFaculty(response.data);
      }
    }
    if (selected_serial_no == 2) {
      if (modal_current_input == "") {
        window.alert("Enter Text");
      } else {
        console.log(modal_current_input, selected_serial_no);
        const response = await axios.get(
          `http://localhost:5000/lms/filter/mailfaculty/${modal_current_input}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${AuthData.user.token}`,
            },
          }
        );
        setAllFaculty(response.data);
      }
    }
  };
  useEffect(() => {
    get_faculty();
  }, []);
  return (
    <div className="w-full flex justify-center items-center align-middle">
      <div className="flex bg-slate-100 sm:bg-white w-full sm:w-11/12 mt-5 flex-col pt-8 items-center sm:rounded-2xl sm:drop-shadow-lg">
        <div className="w-11/12 mx-auto flex flex-col  justify-around container py-3 text-slate-500 font-medium">
          <Link
            href="/lms_admin/lookup"
            className="flex flex-row items-center pb-2 mb-1 border-b border-slate-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                clipRule="evenodd"
              />
            </svg>
            Home / LookUp
          </Link>
        </div>
        <h3 className="text-xl sm:text-2xl font-medium text-gray-900">
          LMS LookUp
        </h3>
        <div className="border-t-4 my-2 py-3 w-11/12 flex flex-row flex-wrap items-end justify-end ">
          <div className="relative text-left inline-block w-full md:w-6/12">
            <div>
              <button
                onClick={() => {
                  setShowFilters(!showFilters);
                }}
                className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-accent text-white hover:scale-105 px-4 py-2 text-xs sm:text-sm font-medium shadow-sm focus:outline-none"
              >
                {current_text}
                {showFilters ? (
                  ""
                ) : (
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
              </button>
            </div>
            {showFilters ? (
              <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {serial_text.map((value: string, x: number) => (
                    <button
                      key={x}
                      onClick={() => {
                        on_serial_click(x);
                        setShowFilters(!showFilters);
                      }}
                      className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
  
        </div>
        <div>
              <>
                {allFaculty.map(({college_name
,department
,photo,secondary_mail
,phone_number
,middle_name
,linkedin
,last_name
,gender
,first_name
,email}: any,i: number) => (
                  <div>{first_name}</div>
                ))}
              </>
          </div>
      </div>

      {modal ? (
        <div className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white border-solid border-2 border-neutral-200 rounded-lg px-4 mx-auto sm:mx-0 w-11/12 sm:w-5/12">
            <div className="border-b-2 border-gray-900 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Search
              </h3>
            </div>
            <div className="mb-8 mt-2 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
              <label>{modal_text[modal_number]}</label>
              <input
                className="rounded-md border border-gray-700 py-1 px-1 w-7/12"
                value={modal_current_input}
                onChange={(e) => {
                  setmodal_current_input(e.target.value);
                }}
                type="text"
              ></input>
            </div>
            <div className="flex justify-end items-center w-100 border-t text-white p-3">
              <button
                onClick={() => {
                  get_faculty();
                  setmodal(false);
                }}
                className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 mr-2"
              >
                Search
              </button>
              <button
                onClick={() => {
                  setmodal(false);
                }}
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default LmsAdminLookUp;
