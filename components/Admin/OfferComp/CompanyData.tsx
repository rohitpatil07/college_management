"use client";
import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";

const CompanyData = ({ children, company_name }: any) => {
    const AuthData: any = useAuth();
    const server=process.env.NEXT_PUBLIC_SERVER_URL;
    const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
    const [stu_array, setStu_array] = useState<any>([]);
    const getOfferLetter = async(offer_id : string)=>{
        const response = await axios.get(
            `${server}/image/offerdownload/${offer_id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    
                },
            }
        );
        console.log(response);
    }
    const getStudentData = async () => {
        const response = await axios.get(
            `${server}/filter/admin/alloffers/${company_name}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    
                },
                withCredentials: true,
            }
        );
        for (var i = 0; i < response.data.length; i++) {
            for (var j = 0; j < response.data[i].offers.length; j++) {
                if (response.data[i].offers[j].company_name == company_name) {
                    response.data[i]['company_name'] = response.data[i].offers[j]['company_name']
                    response.data[i]['package'] = response.data[i].offers[j]['package']
                    response.data[i]['offer_id'] = response.data[i].offers[j]['offer_id']
                    response.data[i]['offer_letter'] = response.data[i].offers[j]['offer_letter']
                }
            }
            response.data[i]['packages'] = response.data[i]['package']
            response.data[i]['total_offers'] = response.data[i]['_count']['offers']
            delete (response.data[i]._count);
            delete (response.data[i].offers);
        }
        console.log(response);
        setStu_array(response.data);
    };
    useEffect(() => {
        if (company_name) {
            getStudentData();
        }
    }, [company_name]);
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
                          {company_name}
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
                         <div className='p-3 flex flex-col max-h-52 overflow-y-scroll overflow-auto'>
                            {stu_array ?
                                <table className="w-full table-auto border-separate border-spacing-2 border-slate-500 bg-red">
                                    <thead>
                                        <tr>
                                            <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">Roll No</th>
                                            <th  className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">Name</th>
                                            <th  className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">Email</th>
                                            <th  className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">Package</th>
                                            <th  className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">Offer Count</th>
                                            <th  className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">Offer Letter</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stu_array.map(({ roll_no, first_name, last_name, email, offer_id, offer_letter, packages, total_offers }: any, i: number) => (
                                            <tr key={offer_id}>
                                                <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">{roll_no}</td>
                                                <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">{first_name} {last_name}</td>
                                                <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">{email}</td>
                                                <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">{packages}</td>
                                                <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">{total_offers}</td>
                                                {
                                                    offer_letter ? <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600"><button className="my-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={() => { getOfferLetter(offer_id) }}>
                                                        Download
                                                    </button></td> : <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600"><h3 className="my-2">Not Uploaded</h3></td>
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table> :
                                <></>
                            }
                        </div>
                        </div>
                        </div>
                        </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
    )
}

export default CompanyData
