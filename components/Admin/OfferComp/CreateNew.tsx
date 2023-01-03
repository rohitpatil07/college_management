'use client'
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import axios from "axios";
import { useAuth } from "../../../contexts/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
const CreateNew = ({ createForm }: any) => {
  const AuthData: any = useAuth();
  const [newInfo, setNewInfo] = useState<{ 'roll_no': string, 'company_name': string, 'package': number }>({ 'roll_no': '', 'company_name': '', package: 0.00 });
  const [loading, setLoading] = useState(false);
  const updateInfo = (val: any, i: string) => {
    let updtInfo = { ...newInfo };
    if (i == 'roll_no') {
      updtInfo['roll_no'] = val
    }
    else if (i == 'company_name') {
      updtInfo['company_name'] = val
    }
    else {
      updtInfo['package'] = parseFloat(val)
    }
    setNewInfo(updtInfo);
  }
  const submit = async () => {
    if (newInfo['roll_no'] == '' || newInfo['company_name'] == '' || newInfo['package'] == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Fill All The Details',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      setLoading(true);
      const body = { offer: newInfo };
      const response = await axios.post("http://localhost:5000/add/admin/student/offer", body, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      });
      if (response.status == 200) {
        Swal.fire({
          icon: 'success',
          title: 'Successfully Entered Data',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else if (response.status == 401) {
        Swal.fire({
          icon: 'warning',
          title: 'Maximum Offers Reached',
          showConfirmButton: false,
          timer: 1500
        })
      }
      else {
        Swal.fire({
          icon: 'error',
          title: 'Something Went Wrong',
          showConfirmButton: false,
          timer: 1500
        })
      }
      setLoading(false);
      setNewInfo({ 'roll_no': '', 'company_name': '', package: 0 });
    }
  }
  return (
    <div>
      {createForm ?
        <div className='w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50'>
          <div className='bg-white border-solid border-2 border-neutral-200 rounded-lg px-4 mx-auto sm:mx-0 w-11/12 sm:w-5/12'>
            <div className='border-b-2 border-gray-900 py-2'>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Insert New Offer Details</h3>
            </div>
            <div className='p-3 flex flex-col justify-between'>

              <label className='relative cursor-pointer mb-4'>
                <input type="text" placeholder='Roll No'
                  value={newInfo['roll_no']}
                  onChange={(e) => {
                    updateInfo(e.target.value, 'roll_no');
                  }}
                  className='h-7 w-full px-2 text-sm text-black bg-white border-gray-500 border-2 rounded-md border-opacity-50 outline-none focus:border-red-600 placeholder-gray-700 placeholder-opacity-0 transition-duration-200' />
                <span className='text-sm text-opacity-80 text-black bg-white absolute left-5 top-1 px-1 transition duration-200 input-text'>Roll No*</span>
              </label>
              <label className='relative cursor-pointer mb-4'>
                <input type="text" placeholder='Company Name'
                  value={newInfo['company_name']}
                  onChange={(e) => {
                    updateInfo(e.target.value, 'company_name');
                  }}
                  className='h-7 w-full  px-2 text-sm text-black bg-white border-gray-500 border-2 rounded-md border-opacity-50 outline-none focus:border-red-600 placeholder-gray-700 placeholder-opacity-0 transition-duration-200' />
                <span className='text-sm text-opacity-80 text-black bg-white absolute left-5 top-1 px-1 transition duration-200 input-text'>Company Name*</span>
              </label>
              <label className='relative cursor-pointer mb-4'>
                <input type="number" placeholder='Package'
                  value={newInfo['package']}
                  onChange={(e) => {
                    updateInfo(e.target.value, 'package');
                  }}
                  className='h-7 w-full px-2 text-sm text-black bg-white border-gray-500 border-2 rounded-md border-opacity-50 outline-none focus:border-red-600 placeholder-gray-700 placeholder-opacity-0 transition-duration-200' />
                <span className='text-sm text-opacity-80 text-black bg-white absolute left-5 top-1 px-1 transition duration-200 input-text'>Package*</span>
              </label>
            </div>
            <div className='flex justify-end items-center w-100 border-t text-white p-3'>
              {loading ?
                <button disabled className="flex flex-row items-center justify-center px-3 py-1 rounded bg-gray-400 text-white mr-1">
                  Add <ClipLoader size={15} color="#d63636" />
                </button>
                :
                <button onClick={submit} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 mr-1">
                  Add
                </button>
              }
              <form>
                <button onClick={() => createForm = false} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
        : <></>}
    </div>
  )
}

export default CreateNew