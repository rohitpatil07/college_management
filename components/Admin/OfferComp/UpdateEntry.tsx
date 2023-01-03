'use client'
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import Swal from 'sweetalert2';
const UpdateEntry = () => {
  const AuthData: any = useAuth();
  const [newInfo, setNewInfo] = useState({offers:[]});
  const [stu_info, setStu_info] = useState<any>([]);
  const [roll_no, setRoll_no] = useState('');
  const [disabling, setDisabling] = useState(true);
  const getOfferLetter = async (offer_id: string) => {
    const response = await axios.get(
      `http://localhost:5000/image/offerdownload/${offer_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
  }
  const get_info = async () => {
    if(roll_no == ''){
      Swal.fire({
        icon: 'error',
        title: 'Invalid Roll No',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
    const response = await axios.get(
      `http://localhost:5000/filter/student/offer/${roll_no}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    )
    for (let i = 0; i < response.data.offers.length; i++) {
      response.data.offers[i]['update'] = false;
      response.data.offers[i]['packages'] = response.data.offers[i]['package'];
    }
    setStu_info(response.data.offers);
    newInfo['offers'] = response.data.offers;
  }
  }
  const updateInfo = (val: any, entity: any, i: number) => {
    let updtInfo = [...stu_info];
    updtInfo[i][entity] = val;
    setStu_info(updtInfo);
    if(newInfo['offers'][i][entity]==val){
      setDisabling(true);
    }
    else{
      setDisabling(false);
    }
  }
  const updateState = (i: number) => {
    let updtInfo = [...stu_info];
    updtInfo[i]['update'] = !updtInfo[i]['update'];
    setStu_info(updtInfo);
  }
  const submit = async(i:number) => {
    let data = stu_info[i];
    let body={
      offer_id: stu_info[i].offer_id,
      update:{
        company_name: stu_info[i].company_name
      },
    };
    const response = await axios.post("http://localhost:5000/add/admin/student/updateoffer", body ,{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${AuthData.user.token}`,
			},
		});
    if(response.status==200){
      Swal.fire({
        icon: 'success',
        title: 'Successfully Updated Data',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error Uploading Data',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  return (
    <div className='w-full mt-5 border-t-2 pt-3'>
      <div className='border-b-2 border-gray-900 py-2'>
        <div className='flex flex-row flex-wrap'>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mr-1">Get Offers Details Of Student : </h3>
          <label className='relative cursor-pointer mb-2'>
            <input type="text" placeholder='Roll No'
              value={roll_no}
              onChange={(e) => {
                setRoll_no(e.target.value);
              }}
              className='h-8 px-2 text-sm text-black bg-white border-gray-500 border-2 rounded-md border-opacity-50 outline-none focus:border-red-600 placeholder-gray-700 placeholder-opacity-0 transition-duration-200' />
            <span className='text-sm text-opacity-80 text-black bg-white absolute left-5 top-1 px-1 transition duration-200 input-text'>Roll No*</span>
          </label>
        </div>
        <div className='w-full flex flex-row flex-wrap justify-between'>
          <button onClick={get_info} className="px-3 py-1 rounded bg-green-600 sm:text-xl text-white hover:bg-green-700 mb-3">Get Data</button>
          <button onClick={get_info} className="px-3 py-1 rounded bg-red-600 sm:text-xl text-white hover:bg-red-700 mb-3">Clear</button>

        </div>
      </div>
      <div className='p-3 flex flex-col justify-between'>

        <div className="overflow-auto border-solid border-2 border-neutral-200 rounded-lg drop-shadow-xl flex flex-col px-2 py-1">

          {stu_info.length > 0 ?
            <table className='table-fixed border-separate border-spacing-x-4 border-spacing-y-2 mt-3'>
              <thead>
                <tr className='text-lg font-semibold text-gray-900'>
                  <th className='border-b-2 border-slate-600 pr-1 sm:pr-2'>Company</th>
                  <th className='border-b-2 border-slate-600 pl-1 sm:pl-2'>Package</th>
                  <th className='border-b-2 border-slate-600 pr-1 sm:pr-2'>Offer Letter</th>
                  <th className='border-b-2 border-slate-600 pr-1 sm:pr-2'>Edit</th>
                </tr>
              </thead>
              <tbody>
                {stu_info.map(({ company_name, packages, offer_letter, offer_id, update }: any, i: number) => (
                  <tr key={i} className='cursor-pointer border-b border-slate-400'>
                    {
                      update ? <td className='pr-1 sm:pr-2'>
                        <label className='relative cursor-pointer mb-4'>
                          <input type="text" placeholder='Company Name'
                            value={company_name}
                            onChange={(e) => {
                              updateInfo(e.target.value, 'company_name', i);
                            }}
                            className='h-8 px-2 text-sm text-black bg-white border-gray-500 border-2 rounded-md border-opacity-50 outline-none focus:border-red-600 placeholder-gray-700 placeholder-opacity-0 transition-duration-200' />
                          <span className='text-sm text-opacity-80 text-black bg-white absolute left-5 top-0 px-1 transition duration-200 input-text'>Company Name</span>
                        </label>
                      </td>
                        :
                        <td className='pr-1 sm:pr-2'>{company_name}</td>
                    }


                    {
                      update ? <td className='pr-1 sm:pr-2'>
                        <label className='relative cursor-pointer mb-4'>
                          <input type="number" placeholder='Package'
                            value={packages}
                            onChange={(e) => {
                              updateInfo(e.target.value, 'packages', i);
                            }}
                            className='h-8 px-2 text-sm text-black bg-white border-gray-500 border-2 rounded-md border-opacity-50 outline-none focus:border-red-600 placeholder-gray-700 placeholder-opacity-0 transition-duration-200' />
                          <span className='text-sm text-opacity-80 text-black bg-white absolute left-5 top-0 px-1 transition duration-200 input-text'>Package</span>
                        </label>
                      </td>
                        :
                        <td className='pr-1 sm:pr-2'>{packages}</td>
                    }
                    {
                      offer_letter ? <td className='pl-1 sm:pl-2'><button className="flex flex-row items-center my-2 px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700" onClick={() => { getOfferLetter(offer_id) }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                        Download
                      </button></td> : <td className='pl-1 sm:pl-2 my-2'><h3 className="my-2">Not Uploaded</h3></td>
                    }
                    {
                      update ? <td className='pl-1 sm:pl-2 flex flex-row '>
                       {
                        disabling ? <button disabled className="items-center my-2 px-3 py-1 rounded bg-gray-400 text-white" >
                        Update
                      </button> 
                        :
                        <button onClick={()=>submit(i)} className="items-center my-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700" >
                        Update
                      </button> 
                       }
                        <button onClick={() => { updateState(i) }} className=" my-2 ml-1 rounded-full px-1 bg-red-600 text-white hover:bg-red-700" >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      </td> :
                        <td className='pl-1 sm:pl-2'><button onClick={() => { updateState(i) }} className="flex flex-row items-center my-2 px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700" >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                          </svg>
                          Edit
                        </button></td>
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
  )
}

export default UpdateEntry;

{/* <label className='relative cursor-pointer mb-4'>
<input type="text" placeholder='Company Name' 
value={newInfo['company_name']} 
onChange={(e) => {
  updateInfo(e.target.value, 'company_name');
}}
className='h-7 w-full  px-2 text-sm text-black bg-white border-gray-500 border-2 rounded-md border-opacity-50 outline-none focus:border-red-600 placeholder-gray-700 placeholder-opacity-0 transition-duration-200'/>
<span className='text-sm text-opacity-80 text-black bg-white absolute left-5 top-1 px-1 transition duration-200 input-text'>Company Name</span>
</label>
*/}