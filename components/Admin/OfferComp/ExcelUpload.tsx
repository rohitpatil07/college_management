"use client"
import React,{useState} from 'react'
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
const ExcelUpload = ({ showForm }: any) => {
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
    const create=()=>{
        const workbook = XLSX.read(excelFile, { type: 'buffer' });
		const worksheetName = workbook.SheetNames[0];
		const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
        console.log(data);
    }
  return (
    <div>
    {showForm ?
        <div className='w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50'>
            <div className='bg-white border-solid border-2 border-neutral-200 rounded-lg px-4 mx-auto sm:mx-0 w-11/12 sm:w-10/12'>
                <div className='border-b-2 border-gray-900 py-2'>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900">Update Multiple Offers</h3>
                </div>
                <div className='p-3 flex flex-col'>
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
        </div>
        : <></>}
</div>
  )
}

export default ExcelUpload
