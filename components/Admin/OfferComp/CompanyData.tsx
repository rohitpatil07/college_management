"use client";
import React, { useState, useEffect } from "react";
// import { updatePersonalData } from "../../routes/routes.js";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";

const CompanyData = ({ openCompanyData, company_name }: any) => {
    const AuthData: any = useAuth();
    const [stu_array, setStu_array] = useState<any>([]);
    const getOfferLetter = async(offer_id : string)=>{
        const response = await axios.get(
            `http://localhost:5000/image/offerdownload/${offer_id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${AuthData.user.token}`,
                },
            }
        );
        console.log(response);
    }
    const getStudentData = async () => {
        const response = await axios.get(
            `http://localhost:5000/filter/admin/alloffers/${company_name}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${AuthData.user.token}`,
                },
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
        <div>
            {openCompanyData ?
                <div className='w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50'>
                    <div className='bg-white border-solid border-2 border-neutral-200 rounded-lg px-4 mx-auto sm:mx-0 w-11/12 sm:w-10/12'>
                        <div className='border-b-2 border-gray-900 py-2 flex flex-row justify-between'>
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{company_name}</h3>
                            <form>
                            <button onClick={() => { console.log(stu_array) }} className="w-fit h-fit rounded-full text-black hover:bg-red-500 hover:text-white">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </button>
                            </form>
                        </div>
                        <div className='p-3 flex flex-col max-h-52 overflow-y-scroll overflow-auto'>
                            {stu_array ?
                                <table className='table-fixed border-collapse border-spacing-x-4 border-spacing-y-2 mt-3'>
                                    <thead>
                                        <tr className='text-lg font-medium text-gray-900'>
                                            <th className='border-b-2 border-slate-600 '>Roll No</th>
                                            <th className='border-b-2 border-slate-600'>Name</th>
                                            <th className='border-b-2 border-slate-600'>Email</th>
                                            <th className='border-b-2 border-slate-600'>Package</th>
                                            <th className='border-b-2 border-slate-600'>Offer Count</th>
                                            <th className='border-b-2 border-slate-600'>Offer Letter</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stu_array.map(({ roll_no, first_name, last_name, email, offer_id, offer_letter, packages, total_offers }: any, i: number) => (
                                            <tr key={offer_id} className='cursor-pointer border-b border-slate-400 text-sm py-2'>
                                                <td className='pr-1 sm:pr-2'>{roll_no}</td>
                                                <td className='pl-1 sm:pl-2'>{first_name} {last_name}</td>
                                                <td className='pl-1 sm:pl-2'>{email}</td>
                                                <td className='pl-1 sm:pl-2'>{packages}</td>
                                                <td className='pl-1 sm:pl-2'>{total_offers}</td>
                                                {
                                                    offer_letter ? <td className='pl-1 sm:pl-2'><button className="my-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={() => { getOfferLetter(offer_id) }}>
                                                        Download
                                                    </button></td> : <td className='pl-1 sm:pl-2 my-2'><h3 className="my-2">Not Uploaded</h3></td>
                                                }
                                            </tr>
                                        ))}
                                    </tbody>
                                </table> :
                                <></>
                            }
                        </div>
                        <div className='flex justify-end items-center w-100 border-t text-white p-3'>
                        </div>
                    </div>
                </div>
                : <></>}
        </div>
    )
}

export default CompanyData
