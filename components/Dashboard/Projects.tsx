'use client';
import React, { useEffect, useState } from 'react';
import axios from "axios";
import api from "../../contexts/adapter"
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import ClipLoader from "react-spinners/ClipLoader";
import Loading from "../Loaders/Loading";
const Projects = () => {
  const AuthData: any = useAuth();
  const [projectInfo, setprojectInfo]: any = useState([]);
  const [updloading, setUpdateLoading] = useState(false);
  const [loadState, setLoadState] = useState("loading");
  const [loading, setLoading] = useState(true);
  const [Projects, setProjects] = useState([{
    id: 1,
    proj_name: '',
    tech_stack: '',
    role: '',
    proj_desc: '',
    disabling: true,
  }])
  const getProfileData = async () => {
    const response = await axios.get(`http://localhost:5000/filter/student/${AuthData.user.userData.user.roll_no}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthData.user.token}`
      },
    });
    for (let i = 0; i < response.data['projects'].length; i++) {
      response.data['projects'][i]['editing'] = false;
    }
    setprojectInfo(response.data['projects']);
    Projects[0]['id'] = response.data['projects'].length + 1;
    setLoading(false);
  }
  useEffect(() => {
    getProfileData();
  }, []);
  function addProjects(i: number) {
    var addExperience = [...Projects];
    if (i < 3) {
      addExperience[i] = {
        id: Projects.length + projectInfo.length + 1,
        proj_name: '',
        tech_stack: '',
        role: '',
        proj_desc: '',
        disabling: true,
      }
    }
    setProjects(addExperience);
  }
  function removeExperience(i: number) {
    var removeExp = [...Projects];
    for (let j = 0; j < removeExp.length; j++) {
      if (j > i) {
        if (j - i == 2) {
          removeExp[removeExp.length - 1]['id'] = 2;
        }
        else {
          removeExp[j]['id'] = removeExp[j - 1]['id'];
        }
      }
    }
    removeExp.splice(i, 1);
    setProjects(removeExp);
  }
  const UpdateData = (key: string, val: string, i: number) => {
    var newInfo = [...Projects];
    var info: any = newInfo[i];
    info[key] = val;
    let upvote = 0;
    if (key == 'proj_desc' && val != '') {
      upvote = 0;
    }
    else {
      for (let keys in info) {
        if (info[keys] == '') {
          upvote += 1;
        }
      }
    }
    if (upvote > 0) {
      info['disabling'] = true;
    }
    else {
      info['disabling'] = false;
    }
    newInfo[i] = info;
    setProjects(newInfo);
  }

  const save = async (r: number) => {
    setUpdateLoading(true);
    var project_id = `${AuthData.user.userData.user.roll_no}` + `${projectInfo.length + 1}`;
    let k: any = Projects[r];
    let project: any = {
      proj_id: project_id,
      roll_no: `${AuthData.user.userData.user.roll_no}`,
    };
    delete (k.id);
    delete (k.disabling);
    for (let keys in k) {
      project[keys] = k[keys];
    }
    const body = { project: project };
    const response = await axios.post("http://localhost:5000/add/student/workexperience", body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthData.user.token}`
      },

    });
    setUpdateLoading(false);
    if (response.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Done",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    getProfileData()
  }



  const changeEditing = (id: string) => {
    console.log(id);
    let proj = [...projectInfo]
    for (let i = 0; i < proj.length; i++) {
      if (proj[i]['proj_id'] == id) {
        proj[i]['editing'] = !proj[i]['editting'];
      }
    }
    setprojectInfo(proj);
  }

  const UpdateExistingData = (key: string, val: string, i: number) => {
    var newInfo = [...projectInfo];
    newInfo[i][key] = val;
    setprojectInfo(newInfo);
  }



  const saveExistingData = async (r: number) => {
    setUpdateLoading(true);
    let k: any = projectInfo[r];
    let project: any = {
      proj_id: k['proj_id'],
      roll_no: `${AuthData.user.userData.user.roll_no}`,
    };
    for (let keys in k) {
      project[keys] = k[keys];
    }
    delete (project.editing);
    const body = { project: project };
    const response = await axios.post("http://localhost:5000/add/student/project", body, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthData.user.token}`
      },

    });

    setUpdateLoading(false);
    if (response.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Update Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    getProfileData()
  }
  return (
    <div className="w-full sm:w-11/12 mx-auto  flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-4">
        Projects
      </h3>
      {loading ?
        <Loading loadState={loadState} />
        :
        <>
          {projectInfo.map(({ proj_id, proj_name, tech_stack, role, proj_desc, editing }: any, x: number) =>
            <div className='flex flex-col drop-shadow-xl text-black mx-auto my-5 py-1 px-3 w-11/12 bg-white border-2 border-neutral-300 rounded-lg' key={proj_id}>
              {
                editing ?
                  <div className='w-full flex flex-row mx-auto items-center justify-end my-2 border-b-gray-300 border-b-4 pb-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => { changeEditing(proj_id) }} className="w-4 h-4 sm:w-6 sm:h-6 ml-auto hover:scale-75 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  :
                  <div className='w-full flex flex-row mx-auto items-center justify-end my-2 border-b-gray-300 border-b-4 pb-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => { changeEditing(proj_id) }} className="w-4 h-4 sm:w-6 sm:h-6 mr-2 hover:scale-75 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6 hover:scale-75 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

                  </div>
              }
              <div className='flex flex-col-reverse sm:flex-wrap sm:flex-row items-center justify-between'>
                {
                  editing ? <input type='text' onChange={(e) => { UpdateExistingData('proj_name', e.target.value, x) }} value={proj_name} placeholder='Company Name' className='my-2 mr-2 bg-white border-gray-300 border-solid border-2 rounded-mg text-black p-1' />
                    : <h2 className='text-xl font-semibold text-center'>{proj_name}</h2>
                }
              </div>
              {
                editing ? <input type='text' onChange={(e) => { UpdateExistingData('tech_stack', e.target.value, x) }} value={tech_stack} placeholder='Tech Stack' className='my-2 bg-white border-gray-300 border-solid border-2 rounded-lg text-black p-2' />
                  : <h2 className='text-base text-center sm:text-left mb-2 mt-1'>{tech_stack}</h2>
              }
              {
                editing ? <input type='text' onChange={(e) => { UpdateExistingData('role', e.target.value, x) }} value={role} placeholder='Role' className='my-2 bg-white border-gray-300 border-solid border-2 rounded-lg text-black p-21' />
                  : <h2 className='text-base font-semibold text-center sm:text-left mb-2 mt-2'>{role}</h2>
              }
              {
                editing ? <textarea value={proj_desc} onChange={(e) => { UpdateExistingData('proj_desc', e.target.value, x) }} placeholder='Project description' className='my-2 bg-white border-gray-300 border-solid border-2 rounded-lg text-black p-21' rows={4}></textarea>
                  : <p className='text-sm text-justify mb-3'>{proj_desc}</p>
              }
              {editing ?
                <button onClick={() => { saveExistingData(x) }} className="mt-2 mb-2 p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all">Update
                  {updloading ? (
                    <>
                      <ClipLoader className='ml-2' size={20} color="white" />
                    </>
                  ) : (
                    <></>
                  )}
                </button> : <></>
              }
            </div>
          )}
          {projectInfo.length < 3 ? (
            <>
              {
                Projects.map(({ proj_name, tech_stack, role, proj_desc, disabling, id }: any, x: number) => (
                  <div className='flex flex-col items-center mx-auto mb-3 w-11/12 p-2 bg-white border-2 border-neutral-300 drop-shadow-xl rounded-lg' key={id}>
                    <div className='w-11/12'>
                      <div className='flex flex-row items-center justify-between w-full text-black mb-2 border-b-gray-300 border-b-4 pb-2'>
                        <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>Work Experience {id}</h2>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={() => { removeExperience(x) }} className="w-4 h-4 sm:w-6 sm:h-6 mr-2 hover:scale-75 cursor-pointer">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                      </div>
                      <input placeholder='Project Name' type='text' value={proj_name} onChange={(e) => { UpdateData('proj_name', e.target.value, x) }} className='mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-lg text-black py-2 px-2'></input>
                    </div>
                    <div className='w-11/12'>
                      <input placeholder='Tech Stack Used eg. Python ,Node ,NextJS, etc.' type='text' value={tech_stack} onChange={(e) => { UpdateData('tech_stack', e.target.value, x) }} className='mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-lg text-black py-2 px-2'></input>
                    </div>
                    <div className='w-11/12'>
                      <input placeholder='Role' type='text' value={role} onChange={(e) => { UpdateData('role', e.target.value, x) }} className='mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-lg text-black py-2 px-2'></input>
                    </div>
                    <div className='w-11/12'>
                      <textarea placeholder='Description - share your experience and tech stacks learned' value={proj_desc} onChange={(e) => { UpdateData('proj_desc', e.target.value, x) }} className='mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-lg text-black py-2 px-2' name="txtname" rows={4}></textarea>
                    </div>
                    {disabling ? <button
                      disabled
                      className="flex items-center justify-center p-2 w-fit mx-auto px-8 py-2 rounded-md bg-gray-400 text-white"
                    >
                      Save
                    </button>
                      :
                      <button onClick={() => { save(x) }} className="mt-2 mb-2 p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all">Save
                        {updloading ? (
                          <>
                            <ClipLoader className='ml-2' size={20} color="white" />
                          </>
                        ) : (
                          <></>
                        )}
                      </button>
                    }
                  </div>
                ))
              }
            </>
          ) : ''}
          {Projects.length < (3 - projectInfo.length) ? (<button className='p-2 w-11/12 sm:w-5/12 mx-auto px-5 rounded-md mb-7' style={{ backgroundColor: '#c9243f', color: 'white' }} onClick={() => { addProjects(Projects.length) }}>Add More Projects</button>) : ''}
        </>
      }
    </div>
  );
}

export default Projects;
