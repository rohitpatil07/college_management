"use client";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import api from "../../contexts/adapter";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { useSearchParams } from "next/router";
import Link from "next/link";

const CreateForum = ({
  module_id,
  subject_id,
  module_name,
  module_number,
  subject_name,
}: any) => {
  const AuthData: any = useAuth();
  const server = process.env.NEXT_PUBLIC_SERVER_URL;
  const [flag, setflag] = useState(0);
  const searchParams: any = useSearchParams();
  const moduleid = parseInt(searchParams.get("module_id"));
  const [forums, setForums]: any = useState(null);
  const get_forums = async () => {
    const responses = await axios.get(
      `${server}/lms/filter/getallForums/${moduleid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    console.log(responses.data);
    setForums(responses.data);
  };
  const [deleteLoading, setdeleteLoading] = useState(false);
  const delete_forums = async (id: number) => {
    setdeleteLoading(true);
    const responses = await axios.get(
      `${server}/lms/delete/deleteforum/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    console.log(responses);
    if (responses.status == 200) {
      Swal.fire({
        icon: "success",
        title: "Deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Forum Deletion Failed..Please Try Again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setdeleteLoading(false);
  };
  useEffect(() => {
    get_forums();
  }, [forums]);
  return (
    <div className="w-full bg-slate-100 sm:bg-white sm:w-11/12 mx-auto flex flex-col items-center justify-around bg-white container sm:rounded-xl sm:drop-shadow-xl">
      <h3 className="text-xl sm:text-2xl font-medium text-gray-900 my-8">
        Forums
      </h3>
      <div className="flex flex-col gap-5 w-full">
        {forums == null ? (
          <></>
        ) : forums.length == 0 ? (
          <>
            <h3 className="text-lg sm:text-xl mb-5 font-semibold text-gray-700 text-center">
              No Forums Created Yet
            </h3>
          </>
        ) : (
          <div className="flex flex-wrap px-2 ">
            {forums.map(
              ({
                forum_id,
                topic,
                createdAt,
                description,
                students,
                email,
              }: any) => (
                <div
                  key={forum_id}
                  className="md:scale-95 flex flex-col mx-auto mb-3 w-full md:w-6/12 px-2 sm:px-4 bg-white border-2 border-neutral-300 rounded-md"
                >
                  <div className="flex flex-col justify-between w-full">
                    <div className="flex flex-col-reverse sm:flex-row justify-between w-full border-b-2 border-b-gray-300 pb-2 my-2">
                      <div className="flex flex-row items-center">
                        <h2 className="text-xl font-medium text-center">
                          {topic}
                        </h2>
                        <button
                          onClick={() => delete_forums(forum_id)}
                          className="ml-auto"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 hover:w-8 hover:h-8 hover:text-red-700 transition-all"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                      <h2 className="text-xs text-right">
                        {createdAt.slice(0, createdAt.indexOf("T"))}
                      </h2>
                    </div>
                    {deleteLoading ? (
                      <div className="w-full items-center  mb-2 ">
                        <h2 className="text-xs ml-auto text-red-700">
                          Deleting
                        </h2>
                      </div>
                    ) : (
                      ""
                    )}
                    <h2 className="text-lg">
                      <span className="font-medium underline underline-offset-2">
                        Description:
                      </span>
                      <span className="font-light text-sm"> {description}</span>
                    </h2>
                  </div>
                  <div className="mt-3 mb-2 flex flex-col-reverse sm:flex-row justify-between w-full">
                    <Link
                      href={{
                        pathname: "faculty/viewDiscussion",
                        query: {
                          module_id: moduleid,
                          forum_id: forum_id,
                          module_number: module_number,
                          subject_id: subject_id,
                          subject_name: subject_name,
                          topic: topic,
                          description: description,
                          author_first_name: students["first_name"],
                          author_last_name: students["last_name"],
                          author_email: email,
                        },
                      }}
                      className="px-2 py-1 text-sm bg-white text-slate-500 font-semibold border-2 border-slate-500 rounded-md cursor-pointer hover:bg-slate-500 hover:text-white hover:scale-105 transition-all"
                    >
                      View Discussions
                    </Link>
                    <h2 className="text-sm font-medium">
                      Created By:{students["first_name"]}{" "}
                      {students["last_name"]}
                    </h2>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateForum;
