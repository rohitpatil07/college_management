"use client"
import React, { useState,useEffect } from 'react'
import Swal from 'sweetalert2';
import axios from "axios";
import offerformat from '../../../public/offerformat.png';
import { useAuth } from "../../../contexts/AuthContext";
import * as XLSX from 'xlsx';
import Image from 'next/image';
const ExcelUpload = ({ showForm }: any) => {
    const AuthData: any = useAuth();
    const [drive, setDrive] = useState([]);
    const [excelFormat, setExcelFormat] = useState(false);
  const get_info=async()=>{
    const response = await axios.get("http://localhost:5000/filter/drive", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      });
      setDrive(response.data);
  }
  useEffect(() => {
    return () => {
      get_info()
    };
  }, );
    const fileType = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];
    const [excelFile, setExcelFile] = useState<any>();
    const uploadFile=(e: any)=>{
        let selectedFile = e.target.files[0];
			if (selectedFile && fileType.includes(selectedFile.type)) {
				let reader = new FileReader();
				reader.readAsArrayBuffer(selectedFile);
				reader.onload = (e) => {
                    if(e.target){
                        setExcelFile(e.target.result);
                    }
				}
			}
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
    }
    const create=async()=>{
        const workbook = XLSX.read(excelFile, { type: 'buffer' });
		const worksheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[worksheetName];
        const data:any = XLSX.utils.sheet_to_json(worksheet);
        if(data.length>0){
          for(let i=0;i<data.length;i++){
            data[i]['package']=data[i]['package'].toString();
          }
        }
        for(let i=0;i<data.length;i++){
          for(let j=0;j<drive.length;j++){
            if(drive[j]['company_name']==data[i]['company_name'] && drive[j]['package']==data[i]['package'] && drive[j]['role']==data[i]['role'])
            {
              data[i]['drive_id']=drive[i]['drive_id'];
              delete(data[i].role);
            }
          }
          }
          // console.log(data);

      const response = await axios.post("http://localhost:5000/add/admin/student/bulkoffers", data, {
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
    }
  return (
    <div>
    {showForm ?
        <div className='w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50'>
            <div className='bg-white border-solid border-2 border-neutral-200 rounded-lg px-4 mx-auto sm:mx-0 w-11/12 sm:w-10/12'>
                <div className='border-b-2 border-gray-900 py-2'>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Update Multiple Offers</h3>
                </div>
                <div className='p-3 flex flex-col items-start'>
                    <button onClick={()=>{setExcelFormat(!excelFormat)}} className='mb-2 px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 mr-1'>Excel Format Required</button>
                        <input type="file" onChange={uploadFile} />
                        <p className='text-red-600 text-xs'>*File format .excel</p>
                </div>
                <div className='flex justify-end items-center w-100 border-t text-white p-3'>
                    <button onClick={create} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 mr-1">
                        Upload
                    </button>
                    <form>
                    <button onClick={() => showForm = false} className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700">
                        Cancel
                    </button>
                    </form>
                    </div>
            </div>




{excelFormat ? <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

  <div className="fixed inset-0 z-10 overflow-y-auto">
    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Excel Format Required*</h3>
              <div className="mt-2">
                <Image src={offerformat} alt='format'/>
                </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button onClick={()=>{setExcelFormat(!excelFormat)}} type="button" className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
        </div>
      </div>
    </div>
  </div>
</div> :<></>}






        </div>
        : <></>}
</div>
  )
}

export default ExcelUpload
