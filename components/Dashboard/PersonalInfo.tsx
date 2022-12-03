"use client";
import { METHODS } from "http";
import React from "react";
import {updatePersonalData} from "../../routes/routes.js"
import axios from "axios";

const PersonalInfo = () => {
  const [personalInfo, setPersonalInfo] = React.useState([
    { value: "", label: "First Name", id: "first_name", type: "text" },
    { value: "", label: "Middle Name", id: "middle_name", type: "text" },
    { value: "", label: "Last Name", id: "last_name", type: "text" },
    { value: "", label: "Email Address", id: "email", type: "email" },
    { value: null, label: "Phone Number", id: "phone_number", type: "number" },
    { value: "", label: "Gender", id: "gender", type: "radio" },
    { value: "", label: "Github", id: "github", type: "text" },
    { value: "", label: "LinkedIn", id: "linkedin", type: "text" },
    { value: "", label: "LeetCode", id: "leetcode", type: "text" },
    { value: "", label: "Hacker Rank", id: "hackerrank", type: "text" },
    { value: "", label: "Department", id: "department", type: "text" },
    { value: "", label: "Batch", id: "batch", type: "text" },
    { value: "", label: "College Email", id: "college_mail", type: "email" },
    { value: "", label: "College Name", id: "college_name", type: "text" },
  ]);

  
  const UpdateData = (val: string, i: string) => {
    var newInfo = [...personalInfo];
    for (let z = 0; z < newInfo.length; z++) {
      if (newInfo[z].id == i) {
        newInfo[z].value = val;
      }
    }
    console.log(newInfo);
    setPersonalInfo(newInfo);
  };
  const [previewsource, setPreviewSource] = React.useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );
  const handlePhotoInputs = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    previewFile(file);
  };
  const previewFile = (file: any) => {
    const reader: any = new FileReader();
    reader.readAsDataURL(file);
    console.log(reader);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      personalInfo.push({
        value: reader.result,
        label: "Photo",
        id: "photo",
        type: "Base64EncodedImage",
      });
    };
  };

  const save = async () => {
    let data: any = {};
    for (let i = 0; i < personalInfo.length; i++) {
      data[personalInfo[i].id] = personalInfo[i].value;
    }
    // ?.replace(/'/g, '"')

    for (const property in data) {
      console.log(`${property}: ${data[property]}`);
    }

    // console.log(updatePersonalData);
    data["roll_no"] = "19IT1024";
    // data["batch"] = Number(data[11])
    

    const response = await axios.post(updatePersonalData,{
      roll_no: '19IT1024',
      github: 'hello'
    },  
    {
      headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE2Njk5OTE0NjJ9.xyhbPKetvfSxuwSBHYSocPsGOSOYOg1hIYHnWhow4lc",
        "Content": "applcation/json"
      }
    }
    )



    //impment save function
    console.log(response);
  };
  return (
    <div className="w-full sm:w-11/12 mx-auto  flex flex-col items-center justify-around bg-slate-200 sm:bg-white container rounded-lg">
      <br />
      <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
        Personal Info
      </h3>
      <br />
      <div className="w-[100px] h-[100px] relative rounded-full text-black">
        <img className="rounded-full" src={previewsource} alt="profilePic" />
        <div className="text-slate-500 text-center absolute bg-white rounded-full bottom-[-10%] right-[32%] border-gray-300 border-solid border-2 w-8 h-8 overflow-hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 absolute top-[10%] left-1 cursor-pointer"
          >
            <path
              fillRule="evenodd"
              d="M1 8a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 018.07 3h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0016.07 6H17a2 2 0 012 2v7a2 2 0 01-2 2H3a2 2 0 01-2-2V8zm13.5 3a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM10 14a3 3 0 100-6 3 3 0 000 6z"
              clipRule="evenodd"
            />
          </svg>
          <input
            className="absolute cursor-pointer top-0 scale-110 opacity-0"
            type="file"
            onChange={handlePhotoInputs}
          />
        </div>
      </div>
      <br />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minMax(14rem,20rem))",
          gridGap: "17px 35px",
          justifyContent: "center",
        }}
        className='w-full px-4'
      >
        {personalInfo.map(({ value, label, id, type }: any) => (
          <>
            {id == "gender" ? (
              <div className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                Gender
                <div className="flex flex-row justify-around items-center w-8/12">
                  <div>
                    <input
                      className="bg-white"
                      type="radio"
                      id="gender"
                      name="gender"
                      value="M"
                      onChange={(e) => {
                        UpdateData(e.target.value, id);
                      }}
                    />
                    &nbsp;
                    <label>Male</label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="gender"
                      name="gender"
                      value="F"
                      onChange={(e) => {
                        UpdateData(e.target.value, id);
                      }}
                    />
                    &nbsp;
                    <label>Female</label>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-row justify-between items-center text-sm sm:text-base text-slate-700 font-medium"
                key={id}
              >
                <label>{label}</label>
                <input
                  value={value}
                  className=" border rounded-mg py-1 px-1"
                  type={type}
                  id={id}
                  name={id}
                  onChange={(e) => {
                    UpdateData(e.target.value, id);
                  }}
                ></input>
              </div>
            )}
          </>
        ))}
      </div>
      <br />
      <div className="w-full flex justify-center items-center">
        <button
          className="p-2 w-fit mx-auto px-5 rounded-mg"
          style={{ backgroundColor: "#c9243f", color: "white" }}
          onClick={save}
        >
          Save
        </button>
      </div>
      <br />
    </div>
  );
};

export default PersonalInfo;
