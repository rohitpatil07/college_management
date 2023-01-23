"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
const Module = ({module_id,subject_id,module_name,module_number}: any) => {
  const router = useRouter();
  const AuthData: any = useAuth();
  const [readingmaterial, setreadingmaterial]:any = useState(null);
  const [material, setmaterial] = useState();
  const [materialname, setmaterialname]: any = useState('');
  const [fileType, setfileType]: any = useState();
  const [addmaterial, setAddMaterial] = useState(false);
  const get_material = async () => {
      const response = await axios.get(
        `http://localhost:5000/lms/filter/readmat/module/${module_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthData.user.token}`,
          },
        }
      );
      setreadingmaterial(response.data);
    }


    const fileChange=(file: any)=>{
    const reader: any = new FileReader();
		reader.readAsDataURL(file.target.files[0]);
    if(file.target.files[0].type=='application/vnd.openxmlformats-officedocument.presentationml.presentation'){
      setfileType('pptx');
      reader.onloadend = () => {
        setmaterial(reader.result.slice(reader.result.indexOf(',')+1));
      };
    }
    else if(file.target.files[0].type=='application/pdf'){
      setfileType('pdf');
      reader.onloadend = () => {
        setmaterial(reader.result.slice(reader.result.indexOf(',')+1));
      };
    }
    else if(file.target.files[0].type=='application/vnd.openxmlformats-officedocument.wordprocessingml.document'){
      setfileType('docx');
      reader.onloadend = () => {
        setmaterial(reader.result.slice(reader.result.indexOf(',')+1));
      };
    }
    else if(file.target.files[0].type=='image/jpeg'){
      setfileType('jpeg');
      reader.onloadend = () => {
        setmaterial(reader.result.slice(reader.result.indexOf(',')+1));
      };
    }
    else {
      Swal.fire({
        icon: "warning",
        title: "Please Enter File Formats Of Pdf, Ppt, Docs, Jpeg",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    }
    const post_material=async()=>{
      const uploadmaterial={
        module_id: parseInt(module_id),
        file_type: fileType,
        file: material,
        file_name: materialname
      }
      const response = await axios({
        method: 'post',
        url: "http://localhost:5000/lms/form/addreadmat",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AuthData.user.token}`
        }, 
        data: {
          reading: uploadmaterial, // This is the body part
        }
        });
        console.log(response);
        console.log(response.data)
        if (response.status == 200) {
          Swal.fire({
            icon: "success",
            title: "Reading Material Added",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed To Add Reading Material",
            showConfirmButton: false,
            timer: 1500,
          });
        }
    }

    const downloadMat=async({reading_material_id,file_name,file_type}: any)=>{
      const response = await axios.get(`http://localhost:5000/lms/download/getmaterial/${reading_material_id}`, {
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${AuthData.user.token}`
			},
			responseType: 'blob'
		  }).then((response) =>  {
			const blob=response.data
			const url = window.URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			a.download = `${file_name}.${file_type}`;
			a.click();
		  });
      console.log(response)
    }
  
    useEffect(() => {
      get_material()
    }, [readingmaterial]);
  return (
    <div className="w-full flex justify-center items-center align-middle">
        <div className="flex bg-white w-11/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
        <div className='flex flex-row flex-wrap w-11/12 mb-2'>
            <div className='flex flex-row w-full md:w-8/12 flex-wrap justify-between ml-auto'>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
               Module {module_number}: {module_name}
              </h3>
              <button onClick={() => { setAddMaterial(!addmaterial) }} className="flex items-center p-2 w-fit px-4 py-2 rounded-lg bg-accent text-white hover:scale-105 transition-all ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add Material
              </button>
              <Link  href={{
                pathname:"/faculty/viewForum",
                query:
                {
                  module_id:module_id,
                }
              }} className="flex items-center p-2 w-fit px-4 py-2 rounded-lg bg-accent text-white hover:scale-105 transition-all ml-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Forums
              </Link>
            </div>
          </div>
          {readingmaterial ? <>
          {
        readingmaterial.length==0 ?  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">No Reading Material Uploaded</h3>
        :<>
        {readingmaterial.map(({file_name,file_type,reading_material_id}: any)=>(
           <div key={reading_material_id} className='px-4 py-6 text-sm w-11/12 flex flex-wrap items-center mt-2 mb-2 border-solid border-2 border-neutral-200 shadow-xl drop-shadow-xl rounded-xl'>
         {file_type =='pptx' ? 
        <svg onClick={()=>{downloadMat({reading_material_id,file_name,file_type})}} className="w-8 h-8 mr-1 cursor-pointer" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 128 128" viewBox="0 0 128 128"><path fill="#ff5a29" d="M75.984 72.422c0 3.688-1.152 6.508-3.457 8.461s-5.582 2.93-9.832 2.93h-3.117V96h-7.266V61.734h10.945c4.156 0 7.316.895 9.48 2.684s3.247 4.457 3.247 8.004zm-16.406 5.437h2.391c2.234 0 3.906-.441 5.016-1.324s1.664-2.168 1.664-3.855c0-1.703-.465-2.961-1.395-3.773s-2.387-1.219-4.371-1.219h-3.305v10.171zM104 80c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm10.882 16.988-.113.176-8.232 11.438c-.548.866-1.508 1.398-2.537 1.398s-1.989-.532-2.536-1.397l-8.346-11.614a3.01 3.01 0 0 1 .01-2.994 3.01 3.01 0 0 1 2.596-1.494H100V86c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v6.5h4.276c1.065 0 2.061.572 2.596 1.494a3.01 3.01 0 0 1 .01 2.994z"/><path fill="#ff9a30" d="m84 125.95-.05.05H84zM114 77v-.05l-.05.05z"/><path fill="#ff5a29" d="M111.071 44.243 71.757 4.929A9.936 9.936 0 0 0 64.687 2H24c-5.514 0-10 4.486-10 10v104c0 5.514 4.486 10 10 10h59.95l-4-4H24c-3.309 0-6-2.691-6-6V12c0-3.309 2.691-6 6-6h40.687c1.603 0 3.109.624 4.242 1.757l39.314 39.314A6.044 6.044 0 0 1 110 51.313V72.95l4 4V51.313c0-2.67-1.04-5.181-2.929-7.07z"/><path fill="#fff" d="m113.95 77 .05-.05-4-4"/></svg>
        : 
        file_type == 'pdf' ? 
        <svg onClick={()=>{downloadMat({reading_material_id,file_name,file_type})}} className="w-8 h-8 mr-1 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#ff402f" d="M95.21 80.32c-.07-.51-.48-1.15-.92-1.58-1.26-1.24-4.03-1.89-8.25-1.95-2.86-.03-6.3.22-9.92.73-1.62-.93-3.29-1.95-4.6-3.18-3.53-3.29-6.47-7.86-8.31-12.89.12-.47.22-.88.32-1.3 0 0 1.98-11.28 1.46-15.1-.07-.52-.12-.67-.26-1.08l-.17-.44c-.54-1.25-1.6-2.57-3.26-2.5l-.98-.03h-.02c-1.86 0-3.36.95-3.76 2.36-1.2 4.44.04 11.09 2.29 19.69l-.58 1.4c-1.61 3.94-3.63 7.9-5.41 11.39l-.23.45c-1.88 3.67-3.58 6.79-5.13 9.43l-1.59.84c-.12.06-2.85 1.51-3.49 1.89-5.43 3.25-9.03 6.93-9.63 9.85-.19.94-.05 2.13.92 2.68l1.54.78c.67.33 1.38.5 2.1.5 3.87 0 8.36-4.82 14.55-15.62 7.14-2.32 15.28-4.26 22.41-5.32 5.43 3.05 12.11 5.18 16.33 5.18.75 0 1.4-.07 1.92-.21.81-.22 1.49-.68 1.91-1.3.82-1.23.98-2.93.76-4.67zM36.49 99.33c.7-1.93 3.5-5.75 7.63-9.13.26-.21.9-.81 1.48-1.37-4.32 6.89-7.21 9.63-9.11 10.5zM60.95 43c1.24 0 1.95 3.13 2.01 6.07.06 2.94-.63 5-1.48 6.53-.71-2.26-1.05-5.82-1.05-8.15 0 0-.05-4.45.52-4.45zm-7.3 40.14c.87-1.55 1.77-3.19 2.69-4.92 2.25-4.25 3.67-7.57 4.72-10.3 2.1 3.82 4.72 7.07 7.79 9.67.39.32.8.65 1.22.98-6.25 1.23-11.66 2.74-16.42 4.57zm39.43-.35c-.38.23-1.47.37-2.17.37-2.26 0-5.07-1.03-9-2.72 1.51-.11 2.9-.17 4.14-.17 2.27 0 2.94-.01 5.17.56 2.22.57 2.25 1.72 1.86 1.96z"/><path fill="#ff402f" d="M104 80c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm10.882 16.988-.113.176-8.232 11.438c-.548.866-1.508 1.398-2.537 1.398s-1.989-.532-2.536-1.397l-8.346-11.614a3.01 3.01 0 0 1 .01-2.994 3.01 3.01 0 0 1 2.596-1.494H100V86c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v6.5h4.276c1.065 0 2.061.572 2.596 1.494a3.01 3.01 0 0 1 .01 2.994z"/><path fill="#ff9a30" d="m84 125.95-.05.05H84zM114 77v-.05l-.05.05z"/><path fill="#ff402f" d="M111.071 44.243 71.757 4.929A9.936 9.936 0 0 0 64.687 2H24c-5.514 0-10 4.486-10 10v104c0 5.514 4.486 10 10 10h59.95l-4-4H24c-3.309 0-6-2.691-6-6V12c0-3.309 2.691-6 6-6h40.687c1.603 0 3.109.624 4.242 1.757l39.314 39.314A6.044 6.044 0 0 1 110 51.313V72.95l4 4V51.313c0-2.67-1.04-5.181-2.929-7.07z"/><path fill="#fff" d="m113.95 77 .05-.05-4-4"/></svg>
        :
        file_type == 'docx' ? 
        <svg onClick={()=>{downloadMat({reading_material_id,file_name,file_type})}} className="w-8 h-8 mr-1 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#1d409d" d="M78.688 96h-8.273l-4.641-18c-.172-.641-.465-1.965-.879-3.973s-.652-3.355-.715-4.043c-.094.844-.328 2.199-.703 4.066s-.664 3.199-.867 3.996L57.992 96h-8.25L41 61.734h7.148l4.383 18.703c.766 3.453 1.32 6.445 1.664 8.977.094-.891.309-2.27.645-4.137s.652-3.316.949-4.348l4.992-19.195h6.867l4.992 19.195c.219.859.492 2.172.82 3.938s.578 3.281.75 4.547c.156-1.219.406-2.738.75-4.559s.656-3.293.938-4.418l4.359-18.703h7.148L78.688 96zM104 80c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zm10.882 16.988-.113.176-8.232 11.438c-.548.866-1.508 1.398-2.537 1.398s-1.989-.532-2.536-1.397l-8.346-11.614a3.01 3.01 0 0 1 .01-2.994 3.01 3.01 0 0 1 2.596-1.494H100V86c0-1.654 1.346-3 3-3h2c1.654 0 3 1.346 3 3v6.5h4.276c1.065 0 2.061.572 2.596 1.494a3.01 3.01 0 0 1 .01 2.994z"/><path fill="#ff9a30" d="m84 125.95-.05.05H84zM114 77v-.05l-.05.05z"/><path fill="#1d409d" d="M111.071 44.243 71.757 4.929A9.936 9.936 0 0 0 64.687 2H24c-5.514 0-10 4.486-10 10v104c0 5.514 4.486 10 10 10h59.95l-4-4H24c-3.309 0-6-2.691-6-6V12c0-3.309 2.691-6 6-6h40.687c1.603 0 3.109.624 4.242 1.757l39.314 39.314A6.044 6.044 0 0 1 110 51.313V72.95l4 4V51.313c0-2.67-1.04-5.181-2.929-7.07z"/><path fill="#fff" d="m113.95 77 .05-.05-4-4"/></svg>
        :
        file_type == 'jpeg' ?
        <svg onClick={()=>{downloadMat({reading_material_id,file_name,file_type})}} className="w-8 h-8 mr-1 cursor-pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><path fill="#61bee2" d="M104 126H24c-5.5 0-10-4.5-10-10V12c0-5.5 4.5-10 10-10h40.7c2.7 0 5.2 1 7.1 2.9l39.3 39.3c1.9 1.9 2.9 4.4 2.9 7.1V116c0 5.5-4.5 10-10 10zM24 6c-3.3 0-6 2.7-6 6v104c0 3.3 2.7 6 6 6h80c3.3 0 6-2.7 6-6V51.3c0-1.6-.6-3.1-1.8-4.2L68.9 7.8C67.8 6.6 66.3 6 64.7 6H24z"/><path fill="#61bee2" d="M45.2 91.5c-.7 0-1.5-.2-2.1-.6-1.2-.7-1.9-2-1.9-3.4V50c0-1.4.7-2.7 1.9-3.4 1.2-.7 2.7-.8 3.9-.1l37.5 19.6c1.4.7 2.2 2.1 2.1 3.6 0 1.5-.9 2.9-2.3 3.5L47 91.1c-.6.3-1.2.4-1.8.4zm0-41.5v37.5l37.5-17.9L45.2 50z"/></svg>
        : '' 
        }
           {file_name}
         </div>
        ))}
        </>
      } 
      </>
      : 
      <><Loading loadState='loading'/></>
      }
        </div>
        

        {addmaterial ?
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

              <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className='w-full'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => { setAddMaterial(!addmaterial) }} className="cursor-pointer w-6 h-6 text-red-600 ml-auto">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="text-center my-3">
                    <h3 className="text-lg font-medium leading-6 text-gray-900" id="modal-title">Add Material</h3>
                    <div className="mt-2 mx-5">
                      <div
                        className="mt-8 mb-4 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium"
                      >
                        <label>Material Name</label>
                        <input
                          className=" border rounded-mg py-1 px-1 w-7/12"
                          type='text'
                          value={materialname}
                          onChange={(e)=>{setmaterialname(e.target.value)}}
                        ></input>
                      </div>
                      <div
                        className="mt-8 mb-4 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium"
                      >
                        <label>Upload File</label>
                        <input
                          className="block border rounded-mg  w-7/12
                          py-1.5 px-2"
                          type='file'
                          onChange={(e)=>{fileChange(e)}}
                        ></input>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-gray-50 px-4 py-3 flex items-center justify-center">
                  <button onClick={
                    post_material
                    } className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Add</button>
                </div>
              </div>
            </div>
          </div>
        </div> : ''
      }

      
    </div>
  );
}

export default Module;
