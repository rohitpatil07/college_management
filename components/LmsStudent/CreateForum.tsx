"use client";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import api from "../../contexts/adapter";
import { useAuth } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const CreateForum = ({
  module_id,
  subject_id,
  module_name,
  module_number,
  subject_name,
  email,
}: any) => {
  const mail = email;
  const AuthData: any = useAuth();
  const [flag, setflag] = useState(0);
  const searchParams: any = useSearchParams();
  const moduleid = parseInt(searchParams.get("module_id"));
  const [forums, setForums]: any = useState([]);
  const [newForum, setNewForum] = useState({
    topic: "",
    description: "",
  });
  const handleFormFieldChange = (fieldName: any, e: any) => {
    setNewForum({ ...newForum, [fieldName]: e.target.value });
  };
  const [showuserForums, setShowUserForums] = useState(true);
  const [showForumType, setShowForumType] = useState(false);
  const [selectedText, setSelectedText] = useState("Your Forums");
  const [userForum, setUserForum]: any = useState([]);
  const forum = {
    module_id: moduleid,
    roll_no: `${AuthData.user.userData.user.roll_no}`,
    email: email,
    topic: newForum.topic,
    description: newForum.description,
  };
  const get_forums = async () => {
    const responses = await axios.get(
      `http://localhost:5000/lms/filter/getallForums/${moduleid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AuthData.user.token}`,
        },
      }
    );
    console.log(responses.data);
    let user_forum: any = [];
    let all_forum: any = [];
    for (let i = 0; i < responses.data.length; i++) {
      if (
        responses.data[i]["roll_no"] == `${AuthData.user.userData.user.roll_no}`
      ) {
        user_forum.push(responses.data[i]);
      } else {
        all_forum.push(responses.data[i]);
      }
    }
    setUserForum(user_forum);
    setForums(all_forum);
  };
  const [deleteLoading, setdeleteLoading] = useState(false);
  const delete_forums = async (id: number) => {
    setdeleteLoading(true);
    const responses = await axios.get(
      `http://localhost:5000/lms/delete/deleteforum/${id}`,
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
  const save = async () => {
    setflag(1);
    const response = await axios({
      method: "post",
      url: "http://localhost:5000/lms/form/upsertForum",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AuthData.user.token}`,
      },
      data: {
        forum: forum,
      },
    });
    console.log(response.data);
    if (
      (response.status == 200 && response.data.forum_id != undefined) ||
      response.data.forum_id != null
    ) {
      setflag(0);
      Swal.fire({
        icon: "success",
        title: " Forum Created Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setflag(0);
      Swal.fire({
        icon: "error",
        title: "Forum Creation  Failed..Please Try Again",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    setShowCreateForm(false);
  };
  const [showCreateForm, setShowCreateForm] = useState(false);
  useEffect(() => {
    get_forums();
  }, [forums]);
  return (
    <>
      <div className="w-full bg-slate-100 sm:bg-white sm:w-11/12 mx-auto flex flex-col items-center justify-around bg-white container sm:rounded-xl sm:drop-shadow-xl">
        <h3 className="text-xl sm:text-2xl font-medium text-gray-900 my-8">
          Forums
        </h3>
        <div className="flex flex-col gap-5 w-full">
          <div className="w-full flex flex-row items-center justify-between">
            <button
              onClick={() => {
                setShowCreateForm(true);
              }}
              className="ml-2 bg-accent text-white px-2 py-1 hover:scale-105 transition-all flex itmes-center mr-2 rounded-md"
            >
              Create New Forum
            </button>
            <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
              <div className="relative text-left inline-block mr-2">
                <div>
                  <button
                    onClick={() => {
                      setShowForumType(!showForumType);
                    }}
                    className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                  >
                    {selectedText}
                    {showForumType ? (
                      ""
                    ) : (
                      <svg
                        className="-mr-1 ml-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {showForumType ? (
                  <div className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setShowForumType(!showForumType);
                          setSelectedText("Your Forums");
                          setShowUserForums(true);
                        }}
                        className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                      >
                        Your Forums
                      </button>
                      <button
                        onClick={() => {
                          setShowForumType(!showForumType);
                          setSelectedText("All Forums");
                          setShowUserForums(false);
                        }}
                        className="text-gray-700 block px-4 py-2 text-xs sm:text-sm hover:text-accent hover:bg-gray-200 w-full text-left"
                      >
                        All Forums
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          {showuserForums ? (
            <>
              {userForum != null || userForum.length != 0 ? (
                <div className="flex flex-wrap px-2 ">
                  {userForum.map(
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
                        <div className="w-full my-2 flex items-center ml-auto">
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
                        {deleteLoading ? (
                          <div className="w-full items-center  mb-2 ">
                            <h2 className="text-xs ml-auto text-red-700">
                              Deleting
                            </h2>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="flex flex-col justify-between w-full">
                          <div className="flex flex-col-reverse sm:flex-row justify-between w-full border-b-2 border-b-gray-300 pb-2 my-2">
                            <h2 className="text-xl font-medium text-center">
                              {topic}
                            </h2>
                            <h2 className="text-xs text-right">
                              {createdAt.slice(0, createdAt.indexOf("T"))}
                            </h2>
                          </div>
                          <h2 className="text-lg">
                            <span className="font-medium underline underline-offset-2">
                              Description:
                            </span>
                            <span className="font-light text-sm">
                              {" "}
                              {description}
                            </span>
                          </h2>
                        </div>
                        <div className="mt-3 mb-2 flex flex-col-reverse sm:flex-row justify-between w-full">
                          <Link
                            href={{
                              pathname: "lms/stuviewForum",
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
                                email: mail,
                              },
                            }}
                            className="px-2 py-1 text-sm bg-white text-slate-500 font-semibold border-2 border-slate-500 rounded-md cursor-pointer hover:bg-slate-500 hover:text-white hover:scale-105 transition-all"
                          >
                            View Discussions
                          </Link>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                "No Forum Created"
              )}
            </>
          ) : (
            <>
              {forums != null || forums.length != 0 ? (
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
                            <h2 className="text-xl font-medium text-center">
                              {topic}
                            </h2>
                            <h2 className="text-xs text-right">
                              {createdAt.slice(0, createdAt.indexOf("T"))}
                            </h2>
                          </div>
                          <h2 className="text-lg">
                            <span className="font-medium underline underline-offset-2">
                              Description:
                            </span>
                            <span className="font-light text-sm">
                              {" "}
                              {description}
                            </span>
                          </h2>
                        </div>
                        <div className="mt-3 mb-2 flex flex-col-reverse sm:flex-row justify-between w-full">
                          <Link
                            href={{
                              pathname: "lms/stuviewForum",
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
                                email: mail,
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
              ) : (
                <h2>No Forums Are There</h2>
              )}
            </>
          )}
        </div>
      </div>
      {showCreateForm ? (
        <div className="w-screen h-screen fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white border-solid border-2 border-neutral-200 rounded-lg px-4 mx-auto sm:mx-0 w-11/12 sm:w-5/12">
            <div className="flex flex-row items-center justify-between border-b-2 border-gray-900 py-2">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
                Create
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
                onClick={() => {
                  setShowCreateForm(false);
                }}
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="w-full mt-4 px-10 sm:px-20">
              <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                <label>Topic</label>
                <input
                  className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
                  type="text"
                  onChange={(e) => {
                    handleFormFieldChange("topic", e);
                  }}
                ></input>
              </div>
              <div className="mb-8 flex flex-row gap-2 justify-between items-center text-sm sm:text-base text-slate-700 font-medium">
                <label>Forum Description</label>
                <input
                  maxLength={200}
                  className="rounded-md border border-gray-300 py-1 px-1 w-7/12"
                  type="text"
                  onChange={(e) => {
                    handleFormFieldChange("description", e);
                  }}
                ></input>
              </div>
              <div className="my-6 w-full flex justify-center items-center">
                {flag == 1 ? (
                  <button
                    disabled
                    className="flex items-center justify-center p-2 w-fit mx-auto px-8 py-2 rounded-md bg-gray-400 text-white"
                  >
                    Creating
                  </button>
                ) : (
                  <div className="flex flex-col">
                    <button
                      className="p-2 w-fit mx-auto px-8 py-2 rounded-md bg-accent text-white hover:scale-105 transition-all"
                      onClick={() => {
                        save();
                      }}
                    >
                      Create
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default CreateForum;
