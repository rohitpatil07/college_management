"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../../contexts/adapter";
import { useAuth } from "../../contexts/AuthContext";
import ExcelUpload from "./OfferComp/ExcelUpload";
import CreateNew from "./OfferComp/CreateNew";
import UpdateEntry from "./OfferComp/UpdateEntry";
import CompanyData from "./OfferComp/CompanyData";
const UploadOffers = () => {
    const [showForm, setShowForm] = useState(false);
    const [createForm, setCreateForm] = useState(false);
    const [updateForm, setUpdateForm] = useState(false);
    const [companyName, setCompanyName] = useState('');
    const [openCompanyData, setCompanyData] = useState(false);
    const AuthData: any = useAuth();
    const [countCompanyWise, setCountCompanyWise] = useState([]);
    const server=process.env.NEXT_PUBLIC_SERVER_URL;
    const getStudentCompanyWise = async () => {
        const response = await axios.get(
            `${server}/filter/studentsplacedcompanywise`,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${AuthData.user.token}`,
                },
            }
        )
        console.log(response.data);
        setCountCompanyWise(response.data.studentsPlacedCompanyWise)
    }
    useEffect(() => {
        getStudentCompanyWise()
    }, []);
    return (
        <div className="w-full flex justify-center items-center align-middle">
            <div className="flex bg-white w-full sm:w-10/12 mt-5 flex-col px-10 md:px-20 pt-8 items-center rounded-2xl drop-shadow-lg">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                    Manage Offers
                </h3>
                <p className="text-slate-400 text-sm">
					Add, Update And Manage Offers
				</p>
               {countCompanyWise.length>0 ? 
                <table  className="w-10/12 table-auto border-separate border-spacing-2 border-slate-500 bg-red">
                    <thead>
                        <tr>
                            <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">Company</th>
                            <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">Placed Students</th>
                        </tr>
                    </thead>
                    <tbody>
                        {countCompanyWise.map(({ placed_company, count }: any, i: number) => (
                            <tr key={i}>
                               
                                    <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                                         <CompanyData company_name={placed_company}>
<span className='cursor-pointer'>{placed_company}</span>
                                         </CompanyData>
                                        </td>
                                    
                                        <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                                            <CompanyData className='cursor-pointer' company_name={placed_company}>
                                                <span className='cursor-pointer'>{count}</span>
                                                </CompanyData>
                                            </td>
                                    
                            </tr>
                        ))}
                    </tbody>
                </table> :
                    <></>
                }
           
                <UpdateEntry/>
                 <div className='w-full flex flex-col flex-wrap sm:flex-row justify-between items-center mt-3'>
                <CreateNew>
                    <button className="px-3 py-1 rounded bg-blue-600 sm:text-xl text-white hover:bg-blue-700 mb-3">Add Individual Offer</button>
                </CreateNew>
                  <ExcelUpload>
                  <button className="px-3 py-1 rounded bg-blue-600 sm:text-xl text-white hover:bg-blue-700 mb-3">Upload Excel</button>
            </ExcelUpload>
            </div>
            </div>
        </div>
    )
}

export default UploadOffers