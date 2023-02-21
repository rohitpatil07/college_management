"use client";
import React, { useState } from "react";
import welcomeCompany from "../../public/welcomeCompany.png";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";

function WelcomeModal() {
  const AuthData: any = useAuth();
  const [showLightBox, setShowLightBox] = useState(false);
  return (
    <div className="fixed inset-0 z-50 w-full h-full">
      <div className="relative bg-gray-800 blur-bg-2 w-full h-full bg-opacity-50">
        <div className="absolute bg-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md w-4/5 sm:w-fit h-fit drop-shadow-xl p-4 sm:p-10 overflow-hidden">
          <div className="flex w-full h-full gap-5 scale-90 sm:scale-100">
            <div className="flex flex-col justify-between h-full w-full lg:w-3/5">
              <div>
                <h1 className="font-semibold text-2xl lg:text-3xl">Welcome</h1>
                <h1 className="font-bold text-accent text-5xl lg:text-6xl flex-wrap">
                  {AuthData &&
                  `${AuthData.user.userData.user.role}` == "student"
                    ? `${AuthData.user.userData.user.first_name} ${AuthData.user.userData.user.last_name}`
                    : `${AuthData.user.userData.user.role}` == "admin"
                    ? `${AuthData.user.userData.user.role}`
                    : `${AuthData.user.userData.user.role}` == "company"
                    ? `${AuthData.user.userData.user.company_name}`
                    : `${AuthData.user.userData.user.role}` == "faculty"
                    ? `${AuthData.user.userData.user.first_name} ${AuthData.user.userData.user.last_name}`
                    : `${AuthData.user.userData.user.role}` == "lms_admin"
                    ? "LMS Admin"
                    : ""}
                </h1>
              </div>
              <p className="flex flex-wrap text-gray-600 font-medium my-5 text-justify">
                To access the various features of our platform, please use the
                links provided in the sidebar on the left-hand side of the
                dashboard.
              </p>
              {AuthData &&
              `${AuthData.user.userData.user.role}` == "student" ? (
                <Link
                  href="/tpc/editProfile/personalInfo"
                  className="bg-accent text-white px-6 py-3 w-fit rounded-md hover:scale-110 transition-all"
                >
                  Get Started
                </Link>
              ) : `${AuthData.user.userData.user.role}` == "admin" ? (
                <Link
                  href="/admin/lookup"
                  className="bg-accent text-white px-6 py-3 w-fit rounded-md hover:scale-110 transition-all"
                >
                  Get Started
                </Link>
              ) : `${AuthData.user.userData.user.role}` == "company" ? (
                <Link
                  href="/company/createdrive"
                  className="bg-accent text-white px-6 py-3 w-fit rounded-md hover:scale-110 transition-all"
                >
                  Get Started
                </Link>
              ) : `${AuthData.user.userData.user.role}` == "faculty" ? (
                `${AuthData.user.userData.user.first_name} ${AuthData.user.userData.user.last_name}`
              ) : `${AuthData.user.userData.user.role}` == "lms_admin" ? (
                <Link
                  href="/lms_admin/lookup"
                  className="bg-accent text-white px-6 py-3 w-fit rounded-md hover:scale-110 transition-all"
                >
                  Get Started
                </Link>
              ) : (
                ""
              )}
            </div>

            <div className="hidden lg:flex lg:flex-col items-end h-full lg:w-2/5 hover:scale-105 transition-all mt-auto">
              {showLightBox && (
                <div className="w-full bg-gray-200 text-sm text-center my-2 py-2 rounded-md">
                  Illustration by{" "}
                  <a href="https://icons8.com/illustrations/author/zD2oqC8lLBBA">
                    Icons 8
                  </a>{" "}
                  from <a href="https://icons8.com/illustrations">Ouch!</a>
                </div>
              )}
              <Image
                src={welcomeCompany}
                alt="welcome illustration"
                onClick={() => {
                  setShowLightBox(true);
                  const timeOutID = setTimeout(() => {
                    setShowLightBox(false);
                  }, 3000);
                  return () => clearTimeout(timeOutID);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeModal;
