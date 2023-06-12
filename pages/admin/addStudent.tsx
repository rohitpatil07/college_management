import React, { Fragment, useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import offerformat from "../../../public/studentformat.png";
import { useAuth } from "../../contexts/AuthContext";
import { Dialog, Transition } from "@headlessui/react";
import * as XLSX from "xlsx";
import BasicTable from "../../components/Admin/Tables";
import Image from "next/image";
import ClipLoader from "react-spinners/ClipLoader";
const AddStudents = () => {
  const AuthData: any = useAuth();
  const [uploadFormat, setUploadFormat] = useState(false);
  const [updating, setUpdating] = useState(false);
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const [excelFile, setExcelFile] = useState<any>(null);
  const uploadFile = (e: any) => {
    let selectedFile = e.target.files[0];
    console.log(e);
    if (selectedFile && fileType.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        if (e.target) {
          console.log(e.target.result);
          const workbook = XLSX.read(e.target.result, { type: "buffer" });
          const worksheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[worksheetName];
          const data: any = XLSX.utils.sheet_to_json(worksheet);
          setExcelFile(data);
        }
      };
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };
  const handleSubmit = async () => {
    setUpdating(true);
    const data = excelFile;
    console.log(data);
    const response = await axios.post(
      `${server}/lms/form/create/bulkstudent`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(response);
    if (response.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Successfully Entered Data",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (response.status == 401) {
      Swal.fire({
        icon: "warning",
        title: "Maximum Offers Reached",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setUpdating(false);
  };
  return (
    <div className="w-full flex justify-center items-center align-middle">
      <div className="flex bg-white w-full sm:w-10/12 mt-5 flex-col px-10 md:px-20 pt-8 items-center rounded-2xl drop-shadow-lg">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Add Students
        </h3>
        <div className="w-full flex items-end justify-end">
          <button
            className="px-2 py-3 bg-green-400 rounded-lg text-white font-semibold text-sm hover:bg-green-500"
            onClick={() => {
              setUploadFormat(!uploadFormat);
            }}
          >
            Upload Format
          </button>
        </div>
        <label
          className={` my-5 flex justify-center w-full h-[300px] px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-500 focus:outline-none`}
        >
          <span className="flex flex-col items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-16 h-16 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <span className={`font-medium text-content text-center`}>
              Drop files to Attach, <br /> or
              <span className="text-blue-600 underline ml-2">browse</span>
              <br />
            </span>
            <span className={`font-medium text-gray-500`}>
              Supports excel file only
            </span>
          </span>
          <input
            type="file"
            name="file_upload"
            className="hidden"
            onChange={(e) => {
              uploadFile(e);
            }}
          />
        </label>
        {excelFile && (
          <div className="flex flex-col w-full items-center justify-center my-5">
            <BasicTable data={excelFile} />
            <div className="w-full flex justify-center items-center my-3">
              {updating ? (
                <button
                  disabled
                  className="flex items-center justify-center p-2 w-fit mx-auto px-8 py-2 rounded-md bg-gray-400 text-white"
                >
                  Updating
                  <ClipLoader className="ml-2" size={20} color="#d63636" />
                </button>
              ) : (
                <div className="flex flex-col">
                  <button
                    className="p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
                    onClick={handleSubmit}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="w-full"></div>
        {uploadFormat ? (
          <div
            className="h-full relative z-8"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 z-8 h-full bg-white">
              <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left p-2">
                        <div className="flex w-full justify-between">
                          <h3
                            className="text-lg font-medium leading-6 text-gray-900"
                            id="modal-title"
                          >
                            Excel Format Required*
                          </h3>
                          <button
                            onClick={() => {
                              setUploadFormat(!uploadFormat);
                            }}
                            type="button"
                            className="inline-flex w-full justify-center rounded-full border border-transparent bg-red-600 p-1 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                          >
                            X
                          </button>
                        </div>

                        <div className="mt-2">
                          <Image src={offerformat} alt="format" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default AddStudents;
