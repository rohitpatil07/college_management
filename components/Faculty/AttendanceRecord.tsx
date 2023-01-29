"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";

const AttendanceRecord = () => {
  const router = useRouter();
  const AuthData: any = useAuth();
  const [student, setstudent]: any = useState(null);
  const searchParams: any = useSearchParams();
  const subjectid = parseInt(searchParams.get("subject_id"));
  const subject_name = searchParams.get("subject_name");
  const [loading, setLoading] = useState(false);
  const get_students = async () => {
    const response = await axios.get(
      `http://localhost:5000/lms/filter/subject/getstudents/${subjectid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    setstudent(response.data);
  };
  const [attendance, setattendance]:any = useState([]);
  const handleAttendance=(roll_no: string,i:number)=>{
    let attendance_array = attendance
    let count=0;
    let index=0;
    for(let j=0;j<attendance_array.length;j++){
      if(attendance_array[j]==roll_no){
        count+=1;
        index=attendance_array.indexOf(roll_no);
      }
    }
    if(count>0){
      attendance_array.splice(index,1);
    }
    else{
      attendance_array.push(roll_no);
    }
    setattendance(attendance_array);
  }
  const save_attendance=async()=>{
    setLoading(true);
    let absent = [];
    for(let i=0;i<student.length;i++){
      let count = 0;
      for(let j=0;j<attendance.length;j++){
        if(student[i]['roll_no']==attendance[j]){
          count+=1;
        }
      }
      if(count==0){
          absent.push(student[i]['roll_no'])
        }
    }
    let attend = {
      subject_id: subjectid,
      absent: JSON.stringify(absent),
      present: JSON.stringify(attendance),
    }
    console.log(attend);
const response = await axios({
        method: "post",
        url: "http://localhost:5000/lms/form/take/attendance",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
        data: {
          attendence : attend
        },
      });
      console.log(response);
      if(response.status==200 && response.data){
        Swal.fire({
        icon: "success",
        title:
          "Attendance Recoreded",
        showConfirmButton: false,
        timer: 3000,
      });
      }
      setLoading(false);
  }
  useEffect(() => {
    get_students();
  }, []);
  return (
    <div className="w-full flex justify-center items-center align-middle">
      <div className="flex bg-white w-11/12 mt-5 flex-col pt-8 items-center rounded-2xl drop-shadow-lg">
        <h3 className="text-xl sm:text-2xl mb-5 font-bold text-gray-900">
          Students enrolled for {subject_name}
        </h3>
        {student == null ? (
          <></>
        ) : student.length == 0 ? (
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
            No Students enrolled
          </h3>
        ) : (
          <div className="w-full px-2">
            <table className="w-full table-auto border-separate border-spacing-2 border-slate-500 bg-red">
              <thead>
                <tr>
                   <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Is Present ?
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Roll No
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Name
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Email
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Ph_No.
                  </th>
                  <th className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                    Gender
                  </th>
                </tr>
              </thead>
              <tbody>
                {student.map(
                  ({
                    roll_no,
                    email,
                    phone_number,
                    first_name,
                    middle_name,
                    last_name,
                    gender,
                  }: any,i:number) => (
                    <tr key={roll_no}>
                      <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                      <input onClick={()=>{handleAttendance(roll_no,i)}} className='ml-1 cursor-pointer checked:bg-green-500' type='checkbox'/>
                      </td>
                      <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                        {roll_no}
                      </td>
                      <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 ">
                        {first_name} {middle_name} {last_name}
                      </td>
                      <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 ">
                        {email}
                      </td>
                      <td className="border-l-2 border-l-slate-600 pl-2 border-b-2 border-b-slate-600 ">
                        {phone_number}
                      </td>
                      <td className="border-l-2 border-b-2 border-b-slate-600 border-l-slate-600">
                        {gender}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
       {
        loading ? 
         <button className='bg-gray-300 text-white px-2 py-1 my-2 rounded-md'>Saving</button>
        :  <button className='bg-accent text-white px-2 py-1 hover:scale-105 cursor-pointer transition-all my-2 rounded-md' onClick={()=>{save_attendance()}}>Save</button>
       }
      </div>
      
    </div>
  );
};

export default AttendanceRecord;
