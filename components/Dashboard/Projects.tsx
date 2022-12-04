'use client';
import React,{useEffect,useState}from 'react';
import axios from "axios";
import api from "../../contexts/adapter"
import { useAuth } from "../../contexts/AuthContext";
const Projects = () => {
  const AuthData : any = useAuth();
  const[projectInfo,setprojectInfo]:any=useState([]);
  const getProfileData=async()=>{
    const response = await axios.get(`http://localhost:5000/filter/student/${AuthData.user.userData.user.roll_no}`, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AuthData.user.token}`
      },
    });
  setprojectInfo(response.data['projects']);
}
useEffect(() => {
  getProfileData();
}, [projectInfo]);
    const[Projects,setProjects]=useState([{
       proj_name:'',
       tech_stack:'',
       role:'',
       proj_desc:'',
    }])
    function addProjects(i:number){
        var addExperience=[...Projects];
        if(i<3){
            addExperience[i]={
                proj_name:'',
                tech_stack:'',
                role:'',
                proj_desc:'',
             }
        }
        setProjects(addExperience);
    }
    function removeExperience(i:number){   
        var removeExp = [...Projects];
        removeExp.splice(i,1);
        setProjects(removeExp);
    }
    const UpdateData = (key:string,val: string, i: number) => {
        var newInfo = [...Projects];
        for (let z = 0; z < newInfo.length; z++) {
          if (z == i) {
            var info:any = newInfo[z];
            info[key]=val;
            newInfo[z]=info;
            // console.log(key,val,i);
            // console.log(info);
          }
        }
        // console.log(newInfo);
        setProjects(newInfo);
      }
    const save=async (r:number)=>{
      // console.log(r);
      var projing_id = `${AuthData.user.userData.user.roll_no}` + `${projectInfo.length+1}`;
      let k:any = Projects[r];
      let project: any = {
        proj_id: projing_id,
        roll_no:`${AuthData.user.userData.user.roll_no}`,
      };
      for(let keys in k){
        project[keys]=k[keys];
      }
      // console.log(project);
      const response = await axios.post("http://localhost:5000/add/student/project", {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthData.user.token}`
    },
    project,
  }); 
  // console.log(response);
    if(response.status==200){
      window.alert("Updated Successfully")
    }
    else{
      window.alert("failed");
    }
    }
  return (
    <div className="w-full sm:w-11/12 mx-auto  flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
     <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 mt-4">
        proj Experience
      </h3>

      {projectInfo.map(({proj_id,proj_name,tech_stack,role,proj_desc}:any)=>
      <div className='flex flex-col text-black mx-auto mb-3 w-11/12 p-2 bg-white border-2 border-neutral-300 rounded-md' key={proj_id}>
      <div className='flex flex-col-reverse sm:flex-row items-center justify-between'>
      <h2 className='text-xl font-semibold text-center'>{proj_name}</h2>
      </div>
      <h2 className='text-base text-center sm:text-left mb-2 mt-1'>{tech_stack}</h2>
      <h2 className='text-base font-semibold text-center sm:text-left mb-2 mt-2'>{role}</h2>
      <p className='text-sm text-justify mb-3'>{proj_desc}</p>
      <div className='flex flex-col md:flex-row items-center justify-between'>
      
      </div>
     </div>
     )}
      {
        Projects.map(({proj_name,tech_stack,role,proj_desc}:any,x:number)=>(
            <div className='flex flex-col items-center mx-auto mb-3 w-11/12 p-2 bg-white border-2 border-neutral-300 rounded-md' key={x}>
               <div className='w-11/12'>
               <div className='flex flex-row items-center justify-between w-full text-black'>
               <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>proj Experience {x+1}</h2>
               <button onClick={()=>{removeExperience(x)}}>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
               </button>
               </div>
               <h2 className='text-left mb-5 text-sm sm:text-base text-slate-700 font-medium'>
            Project Name
        </h2>
        <input type='text' value={proj_name} onChange={(e)=>{UpdateData('proj_name',e.target.value,x)}} className='mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1'></input>
                </div>
                <div className='w-11/12'>
        <h2 className='text-left mb-5 text-sm sm:text-base text-slate-700 font-medium'>
            tech Stack
        </h2>
        <input type='text' value={tech_stack} onChange={(e)=>{UpdateData('tech_stack',e.target.value,x)}} className='mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1'></input>
        </div>
        <div className='w-11/12'>
        <h2 className='text-left mb-5 text-sm sm:text-base text-slate-700 font-medium'>
            Role
        </h2>
        <input type='text' value={role} onChange={(e)=>{UpdateData('role',e.target.value,x)}} className='mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1'></input>    
        </div>
        <div className='w-11/12'>
        <h2 className='text-left mb-5 text-sm sm:text-base text-slate-700 font-medium'>
            Description
        </h2>
        <textarea value={proj_desc} onChange={(e)=>{UpdateData('proj_desc',e.target.value,x)}} className='mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1' name="txtname" rows={4}></textarea>
        </div>
            <button onClick={()=>{save(x)}} className='p-2 w-11/12 mx-auto px-5 rounded-md mb-7 mt-5' style={{ backgroundColor: '#c9243f', color: 'white' }}>Save</button>
            </div>
        ))
      }
      {Projects.length < 3-projectInfo.length ? (<button className='p-2 w-11/12 sm:w-5/12 mx-auto px-5 rounded-md mb-7' style={{ backgroundColor: '#c9243f', color: 'white' }} onClick={()=>{addProjects(Projects.length)}}>Add proj Experience</button>):''}
      </div>
  );
}

export default Projects;
