'use client';
import React,{useEffect,useState}from 'react';
import axios from "axios";
import api from "../../contexts/adapter"
import { useAuth } from "../../contexts/AuthContext";
import work from './work.json';
const WorkExperience = () => {
  const AuthData : any = useAuth();
  const[workExps,setworkExps]:any=useState([]);
  const getProfileData=async()=>{
    const response = await axios.get(`http://localhost:5000/filter/student/${AuthData.user.userData.user.roll_no}`, {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AuthData.user.token}`
      },
    });
  setworkExps(response.data['work_experience']);
}
useEffect(() => {
  getProfileData();
}, [workExps]);
    const[WorkExperience,setWorkExperience]=useState([{
       company_name:'',
       location:'',
       role:'',
       description:'',
       start_month:null,
       end_month:null,
       year:null 
    }])
    function addWorkExperience(i:number){
        var addExperience=[...WorkExperience];
        if(i<3){
            addExperience[i]={
                company_name:'',
                location:'',
                role:'',
                description:'',
                start_month:null,
                end_month:null,
                year:null
             }
        }
        setWorkExperience(addExperience);
    }
    function removeExperience(i:number){   
        var removeExp = [...WorkExperience];
        removeExp.splice(i,1);
        setWorkExperience(removeExp);
    }
    const UpdateData = (key:string,val: string, i: number) => {
        var newInfo = [...WorkExperience];
        for (let z = 0; z < newInfo.length; z++) {
          if (z == i) {
            var info:any = newInfo[z];
            info[key]=val;
            newInfo[z]=info;
            console.log(key,val,i);
            console.log(info);
          }
        }
        console.log(newInfo);
        setWorkExperience(newInfo);
      }
    const save=async (r:number)=>{
      console.log(r);
      var working_id = `${AuthData.user.userData.user.roll_no}` + `${r+1}`;
      let k:any = WorkExperience[r];
      let work: any = {
        work_id: working_id,
        roll_no:`${AuthData.user.userData.user.roll_no}`,
      };
      for(let keys in k){
        work[keys]=k[keys];
      }
      console.log(work);
      const response = await axios.post("http://localhost:5000/add/student/workexperience", {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${AuthData.user.token}`
    },
    work,
  }); 
  console.log(response);
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
        Work Experience
      </h3>

      {workExps.map(({work_id,company_name,location,role,description,start_month,end_month}:any)=>
      <div className='flex flex-col text-black mx-auto mb-3 w-11/12 p-2 bg-white border-2 border-neutral-300 rounded-md' key={work_id}>
        <div className='flex items-end w-full flex-col'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
        </div>
      <div className='flex flex-col-reverse sm:flex-row items-center justify-between'>
      <h2 className='text-xl font-semibold text-center'>{company_name}</h2>
      <h2 className='text-sm'>{start_month} - {end_month}</h2>
      </div>
      <h2 className='text-base text-center sm:text-left mb-2 mt-1'>{location}</h2>
      <h2 className='text-base font-semibold text-center sm:text-left mb-2 mt-2'>{role}</h2>
      <p className='text-sm text-justify mb-3'>{description}</p>
      <div className='flex flex-col md:flex-row items-center justify-between'>
      
      </div>
     </div>
     )}
      {
        WorkExperience.map(({company_name,location,role,description,start_month,end_month,year}:any,x:number)=>(
            <div className='flex flex-col items-center mx-auto mb-3 w-11/12 p-2 bg-white border-2 border-neutral-300 rounded-md' key={x}>
               <div className='w-11/12'>
               <div className='flex flex-row items-center justify-between w-full text-black'>
               <h2 className='text-xl sm:text-2xl font-bold text-gray-900'>Work Experience {x+1}</h2>
               <button onClick={()=>{removeExperience(x)}}>
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>
               </button>
               </div>
               <h2 className='text-left mb-5 text-sm sm:text-base text-slate-700 font-medium'>
            Company Name
        </h2>
        <input type='text' value={company_name} onChange={(e)=>{UpdateData('company_name',e.target.value,x)}} className='mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1'></input>
                </div>
                <div className='w-11/12'>
        <h2 className='text-left mb-5 text-sm sm:text-base text-slate-700 font-medium'>
            Location
        </h2>
        <input type='text' value={location} onChange={(e)=>{UpdateData('location',e.target.value,x)}} className='mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1'></input>
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
        <textarea value={description} onChange={(e)=>{UpdateData('description',e.target.value,x)}} className='mb-5 mx-auto w-full bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1' name="txtname" rows={4}></textarea>
        </div>
          <div className='w-11/12'>
          <div className='flex mx-auto flex-col sm:flex-row w-full justify=around'>
            <h2 className='text-sm sm:text-base text-slate-700 font-medium'>Start Month</h2>
            <input type='month' value={start_month} onChange={(e)=>{UpdateData('start_month',e.target.value,x)}} className=' mx-auto w-full md:w-4/12 bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1'></input>
            <h2 className='text-sm sm:text-base text-slate-700 font-medium'>End Month</h2>
            <input type='month' value={end_month} onChange={(e)=>{UpdateData('end_month',e.target.value,x)}} className=' mx-auto w-full  md:w-4/12 bg-white border-gray-300 border-solid border-2 rounded-mg text-black py-1 px-1'></input>
            </div>
            </div>
            <button onClick={()=>{save(x)}} className='p-2 w-11/12 mx-auto px-5 rounded-md mb-7 mt-5' style={{ backgroundColor: '#c9243f', color: 'white' }}>Save</button>
            </div>
        ))
      }
      {WorkExperience.length < 3-workExps.length ? (<button className='p-2 w-11/12 sm:w-5/12 mx-auto px-5 rounded-md mb-7' style={{ backgroundColor: '#c9243f', color: 'white' }} onClick={()=>{addWorkExperience(WorkExperience.length)}}>Add Work Experience</button>):''}
      </div>
  );
}

export default WorkExperience;
