"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loading from "../Loaders/Loading";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";

const EnrolledStudents = ({ deadline }: any) => {
  const router = useRouter();
  const AuthData: any = useAuth();
  const [readingmaterial, setreadingmaterial]: any = useState(null);
  const [material, setmaterial] = useState();
  const [materialname, setmaterialname]: any = useState("");
  const [fileType, setfileType]: any = useState();
  const [addmaterial, setAddMaterial] = useState(false);
  const searchParams: any = useSearchParams();
  const subjectid = parseInt(searchParams.get("subject_id"));
  const subject_name=searchParams.get("subject_name");

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
    console.log(response)
    setreadingmaterial(response.data)

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
        {readingmaterial==null?
        <>
        </>:
            readingmaterial.length == 0 ? 
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                No Students enrolled
              </h3>
             : 
              <div className="w-full px-2">
               <div className='flex flex-wrap items-center justify-between border-b-2 border-b-gray-500 my-1'>
                      </div>
                {readingmaterial.map(
                  ({
                    roll_no,
                    email,
                    phone_number,
                    first_name,
                    middle_name,
                    last_name,
                    gender,
                  }: any) => (
                    <div
                      key={roll_no}
                      className="px-2 py-4 text-sm w-full flex flex-wrap justify-between items-center mt-2 mb-2 border-solid border-2 border-neutral-200 shadow-xl drop-shadow-xl rounded-xl"
                    >
                        <p>Name: {first_name} {middle_name} {last_name}</p>
                        <p>Roll No: {roll_no}</p>
                        <p>Email: {email}</p>
                        <p>Phone: {phone_number}</p>
                        <p>Gender: {gender}</p>
                   
                
              </div>
                  ))}
      </div>
}
    </div>
    </div>
  );
};

export default  EnrolledStudents;
