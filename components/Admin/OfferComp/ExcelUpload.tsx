"use client";
import React, { Fragment, useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import offerformat from "../../../public/offerformat.png";
import { useAuth } from "../../../contexts/AuthContext";
import { Dialog, Transition } from "@headlessui/react";
import * as XLSX from "xlsx";
import Image from "next/image";
const ExcelUpload = ({ children }: any) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const AuthData: any = useAuth();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [drive, setDrive] = useState([]);
  const [excelFormat, setExcelFormat] = useState(false);
  const get_info = async () => {
    const response = await axios.get(`${server}/filter/drive`, {
        headers: {
          "Content-Type": "application/json",
          
        },
        withCredentials: true,
      });
      setDrive(response.data);
  }
  useEffect(() => {
    return () => {
      get_info();
    };
  });
  const fileType = [
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];
  const [excelFile, setExcelFile] = useState<any>();
  const uploadFile = (e: any) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && fileType.includes(selectedFile.type)) {
      let reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => {
        if (e.target) {
          setExcelFile(e.target.result);
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
  const create = async () => {
    const workbook = XLSX.read(excelFile, { type: "buffer" });
    const worksheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[worksheetName];
    const data: any = XLSX.utils.sheet_to_json(worksheet);
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        data[i]["package"] = data[i]["package"].toString();
      }
    }
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < drive.length; j++) {
        if (
          drive[j]["company_name"] == data[i]["company_name"] &&
          drive[j]["package"] == data[i]["package"] &&
          drive[j]["role"] == data[i]["role"]
        ) {
          data[i]["drive_id"] = drive[i]["drive_id"];
          delete data[i].role;
        }
      }
    }
    // console.log(data);

    const response = await axios.post(
      `${server}/add/admin/student/bulkoffers`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          
        },
      }
    );
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
  };
  return (
    <>
      {children ? (
        <span
          onClick={() => {
            setOpen(!open);
          }}
        >
          {children}
        </span>
      ) : (
        ""
      )}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-0 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden sm:rounded-lg text-left shadow-xl transition-all my-0 h-screen sm:h-fit sm:my-8 w-screen sm:w-full sm:max-w-lg">
                  <div className="bg-white h-full px-4 pt-5 pb-4 sm:p-6 sm:pb-4 overflow-y-auto">
                    <div className="flex flex-col sm:flex-row sm:items-start">
                      <svg
                        onClick={() => setOpen(false)}
                        ref={cancelButtonRef}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="block sm:hidden absolute top-0 right-2 w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900 flex flex-row items-center justify-center sm:justify-between"
                        >
                          Upload Multiple Offers
                          <svg
                            onClick={() => setOpen(false)}
                            ref={cancelButtonRef}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="hidden sm:block w-4 h-4 sm:w-6 sm:h-6 my-2 cursor-pointer"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </Dialog.Title>
                        <div className="p-3 flex flex-col items-start">
                          <button
                            onClick={() => {
                              setExcelFormat(!excelFormat);
                            }}
                            className="mb-2 px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 mr-1"
                          >
                            Excel Format Required
                          </button>
                          <input type="file" onChange={uploadFile} />
                          <p className="text-red-600 text-xs">
                            *File format .excel
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end items-center w-100 border-t text-white p-3 bg-white">
                    <button
                      onClick={create}
                      className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 mr-1"
                    >
                      Upload
                    </button>
                  </div>
                  {excelFormat ? (
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
                                        setExcelFormat(!excelFormat);
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ExcelUpload;
