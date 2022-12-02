import React from "react";
import PersonalInfo from "../../../../components/Dashboard/PersonalInfo";

const page = () => {
  return (
    <div className="flex flex-col w-[100vw]  md:w-[76vw] bg-slate-200 ">
      <div className="w-[100vw] md:w-[70vw] flex flex-col  justify-around md:container md:mx-auto py-3 text-slate-500 font-medium">
        <div className="flex flex-row items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
              clipRule="evenodd"
            />
          </svg>
          Home / Personal Info
        </div>
      </div>
      <PersonalInfo />
    </div>
  );
};

export default page;
