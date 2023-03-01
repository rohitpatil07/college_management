"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

const Home = () => {
  const link =
    "https://www.jobstreet.com.sg/career-resources/wp-content/uploads/sites/3/2017/02/pexels-photo-93019.jpeg";
  return (
    <div className="w-full h-full flex justify-center items-center align-middle flex-col">
      <div className="flex bg-white w-10/12 h-[300px] sm:h-[300px] md:h-[600px] mt-5 flex-col items-center rounded-2xl drop-shadow-lg">
        {/* <div className="relative overflow-hidden rounded-lg shadow-lg w-full h-full">
          <div
            className="absolute top-0 left-0 h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${link})`,
            }}
          >
            <div className="relative top-0 left-0 flex h-full w-full flex-col justify-between bg-black bg-opacity-75 p-8">
              <div className="mb-4 flex items-center">
                <img
                  className="mr-4 h-8 md:h-16 w-8 md:w-16"
                  src="https://static.vecteezy.com/system/resources/previews/000/664/513/original/landing-page-template-design-vector.jpg"
                  alt="Company Logo"
                />
                <div className="text-white">
                  <div className="mb-1 md:mb-2 text-2xl md:text-4xl font-bold">
                    Company Name
                  </div>
                  <div className="text-sm md:text-lg text-base text-gray-300 ">
                    Motto: Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                  </div>
                </div>
              </div>
              <p className="mb-2 md:mb-4 text-xs md:text-sm text-base text-gray-300 text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tincidunt, erat in malesuada aliquam, est erat faucibus purus,
                eget viverra nulla sem vitae neque.
              </p>
              <a
                className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-600"
                href="#"
              >
                Visit Our Website
              </a>
            </div>
          </div>
        </div> */}
        <div className="relative overflow-hidden rounded-lg shadow-lg w-full h-full">
          <div
            className="absolute top-0 left-0 h-full w-full bg-cover bg-center rounded-lg"
            style={{
              backgroundImage: `url(${link})`,
            }}
          ></div>
          <div className="relative py-5 top-0 left-0 flex h-full w-full flex-col justify-center rounded-lg bg-white bg-opacity-60">
            <div className="mb-4 text-center">
              <img
                className="mx-auto md:mb-2 h-8 md:h-16 w-8 md:w-16"
                src="https://static.vecteezy.com/system/resources/previews/000/664/513/original/landing-page-template-design-vector.jpg"
                alt="Company Logo"
              />
              <h1 className="mb-1 md:mb-2 text-2xl md:text-4xl font-bold tracking-wider text-gray-800">
                Company Name
              </h1>
              <h2 className="mb-2 md:mb-4 text-md md:text-xl font-medium tracking-widest text-gray-700">
                Motto: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </h2>
              <p className="text-xs md:text-sm mb-2 md:mb-4 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                tincidunt, erat in malesuada aliquam, est erat faucibus purus,
                eget viverra nulla sem vitae neque.
              </p>
              <a
                className="rounded bg-gray-800 py-2 px-4 font-bold text-white hover:bg-gray-900"
                href="#"
              >
                Visit Our Website
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
