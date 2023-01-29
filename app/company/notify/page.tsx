"use client";
import React  , {useState} from "react";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

function Page() {

    const AuthData : any  = useAuth();
    const server=process.env.NEXT_PUBLIC_SERVER_URL;
    const [form, setForm] = useState({
        livekt : 0,
        deadkt : 0,
        gap : 0,
        cgpa : 0,
        be_percent : 0,
        tenth_percent : 0,
        twelveth_percent : 0,
        dept : "",
        gender : "",
        offers : 0,
        package : 0,
    });

    const [message, setMessage] = useState("");
    const [subject, setSubject] = useState("");


    const handleFormFieldChange = (fieldName : any , e : any) => {
        if(fieldName != "gender" && fieldName != "dept" && fieldName != "subject"){
            setForm({...form , [fieldName]:parseFloat(e.target.value)});
        }
        else{
            setForm({...form , [fieldName]:e.target.value});
        }
    }

    const handleSubmit = async () => {

        const queries = {
            gender : {contains : form.gender},
            department: {contains : form.dept},
            gap : {lte : form.gap},
            cgpa : {gte : form.cgpa},
            livekt : {lte : form.livekt},
            deadkt : {lte : form.deadkt},
            tenth_percent : {gte : form.tenth_percent},
            twelveth_percent : {gte : form.twelveth_percent}
        }

        const response = await axios.post(`${server}/filter/notify`,
            { queries , message , subject },
            {
                headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${AuthData.user.token}`,
				},
            });
        console.log(response);

        //send data here
        console.log(form);
    }

	return (
		<div className="w-full flex flex-col justify-center items-center align-middle ">
            <div className="grid bg-white mt-5 w-[80%] grid-cols-2 px-20 pt-8 items-center rounded-2xl drop-shadow-lg gap-x-10 gap-y-4 py-[20px]">
                <div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                    <p>CGPA</p>
                    <input type="text" onChange={(e) => handleFormFieldChange("cgpa" , e)}  className="bg-white border-slate-400 border-[1px] rounded-md"/>
                </div>
                <div className="flex flex-row  justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                    <p> Live KT</p>
                    <input type="text" onChange={(e) => handleFormFieldChange("livekt" , e)}  className="bg-white border-slate-400 border-[1px] rounded-md"/>
                </div>
                <div className="flex flex-row  justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                    <p> Dead KT</p>
                    <input type="text" onChange={(e) => handleFormFieldChange("deadkt" , e)}  className="bg-white border-slate-400 border-[1px] rounded-md"/>
                </div>
                <div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                    <p>GAP</p>
                    <input type="text" onChange={(e) => handleFormFieldChange("gap" , e)}  className="bg-white border-slate-400 border-[1px] rounded-md"/>
                </div>
                <div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                    <p>Tenth Percent</p>
                    <input type="text" onChange={(e) => handleFormFieldChange("tenth_percent" , e)}  className="bg-white border-slate-400 border-[1px] rounded-md"/>
                </div>
                <div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                    <p>Twelveth Percent</p>
                    <input type="text" onChange={(e) => handleFormFieldChange("twelveth_percent" , e)}  className="bg-white border-slate-400 border-[1px] rounded-md"/>
                </div>
                <div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                    <p>Department</p>
                    <input type="text" onChange={(e) => handleFormFieldChange("dept" , e)}  className="bg-white border-slate-400 border-[1px] rounded-md"/>
                </div>
                <div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                    <p>Gender</p>
                    <select name="" id="" onChange={(e)=>{handleFormFieldChange("gender" , e)}} className="bg-white">
                        <option value="M">M</option>
                        <option value="F">F</option>
                        <option value="">N/A</option>
                    </select>
                </div>
                <div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                    <p>Offer</p>
                    <input type="text" onChange={(e) => handleFormFieldChange("offer" , e)}  className="bg-white border-slate-400 border-[1px] rounded-md"/>
                </div>
                <div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                    <p>Package</p>
                    <input type="text" onChange={(e) => handleFormFieldChange("package" , e)}  className="bg-white border-slate-400 border-[1px] rounded-md"/>
                </div>
            </div>
            <div className=" w-[80%] my-[5px] flex flex-col bg-white px-20 pt-8 items-center rounded-2xl drop-shadow-lg gap-x-10 gap-y-4 py-[20px]">
                <div className="flex w-full justify-start items-start">
                    <p>Subject :</p> &nbsp;&nbsp;
                    <textarea  onChange={(e)=>{setSubject(e.target.value)}} cols={80} rows={2} className="ml-[10px]  bg-white border-slate-400 border-[1px] rounded-md outline-none" ></textarea>
                </div>
                <div className="flex w-full justify-start items-start">
                    <p>Message :</p>
                    <textarea  onChange={(e)=>{setMessage(e.target.value)}} cols={80} rows={6} className="ml-[10px]  bg-white border-slate-400 border-[1px] rounded-md outline-none" ></textarea>
                </div>
            </div>
            <button type="submit"  onClick={handleSubmit} className="bg-[#C9243F] py-[5px] w-[100px] mt-[10px]  text-white hover:bg-green-500 rounded-md">
                    Submit
            </button>
        </div>
	);
}

export default Page;