"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Thread from "./Thread";
const Post = ({ post, auth }: any) => {
  const [showMessages, setShowMessages] = useState(false);
  const [replies, setReplies] = useState([]);
  const handleFetch = async () => {
    const response = await axios.get(
      `http://localhost:5000/lms/filter/getreplies/${post.message_id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user.token}`,
        },
      }
    );
    setReplies(response.data);
  };
  const [showReplyForm, setshowReplyForm] = useState(false);
  const [comment, setComment] = useState("");
  const postComment = async () => {
    const comm = {
      email: `${auth.user.userData.user.email}`,
      first_name: `${auth.user.userData.user.first_name}`,
      last_name: `${auth.user.userData.user.last_name}`,
      forum_id: parseInt(post.forum_id),
      text: comment,
      reply_to: post.message_id,
      upvotes: "[]",
      downvotes: "[]",
    };
    if (comment != "") {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/lms/form/postcomment",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user.token}`,
        },
        data: {
          comment: comm,
        },
      });
      console.log(response.data);
      if (response.status == 200 && response.data) {
        setComment("");
        setshowReplyForm(false);
      }
    }
  };
  const [upvote_count, setupvote_count] = useState(0);
  const [showdarkupvote, setshowdarkupvote] = useState(false);
  const [downvote_count, setdownvote_count] = useState(0);
  const [showdarkdownvote, setshowdarkdownvote] = useState(false);
  const [updateForm, setupdateForm] = useState(false);
  const [updateText, setUpdateText] = useState("");
  const updateComment = async () => {
    if (updateText != "" && updateText != `${post.text}`) {
      const comm = {
        text: updateText,
        message_id: post.message_id,
      };
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/lms/form/updatecomment",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user.token}`,
        },
        data: {
          comment: comm,
        },
      });
      if (response.status == 200 && response.data) {
        setUpdateText("");
        setupdateForm(false);
      }
    }
  };
 const deleteComment = async () => {
      const comm = {
        text: "[deleted]",
        message_id: post.message_id,
      };
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/lms/form/updatecomment",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.user.token}`,
        },
        data: {
          comment: comm,
        },
      });
  };
  const handle_upvotes = async () => {
    let parsing = JSON.parse(post.upvotes);
    // let parsing2 = JSON.parse(post.downvotes);
    // let down = 0;
    if (parsing.length == 0) {
      parsing.push(`${auth.user.userData.user.email}`);
      setshowdarkupvote(true);
      // let count = 0;
      // let index = 0;
      // for (let j = 0; j < parsing2.length; j++) {
      //   if (parsing2[j] == `${auth.user.userData.user.email}`) {
      //     count += 1;
      //     index = parsing2.indexOf(`${auth.user.userData.user.email}`);
      //   }
      // }
      // if (count > 0) {
      //   down += 1;
      //   parsing2.splice(index, 1);
      //   setshowdarkdownvote(false);
      // }
    } else {
      let count = 0;
      let index = 0;
      for (let i = 0; i < parsing.length; i++) {
        if (parsing[i] == `${auth.user.userData.user.email}`) {
          count += 1;
          index = i;
        }
      }
      if (count > 0) {
        parsing.splice(index, 1);
        setshowdarkupvote(false);
      } else {
        parsing.push(`${auth.user.userData.user.email}`);
        setshowdarkupvote(true);
        // let count2 = 0;
        // let index2 = 0;
        // for (let j = 0; j < parsing2.length; j++) {
        //   if (parsing2[j] == `${auth.user.userData.user.email}`) {
        //     count2 += 1;
        //     index2 = parsing2.indexOf(`${auth.user.userData.user.email}`);
        //   }
        // }
        // if (count2 > 0) {
        //   down += 1;
        //   parsing2.splice(index2, 1);
        //   setshowdarkdownvote(false);
        // }
      }
    }
    let post_array = JSON.stringify(parsing);
    const response = await axios({
      method: "post",
      url: "http://localhost:5000/lms/form/upvotecomment",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user.token}`,
      },
      data: {
        message_id: post.message_id,
        upvotes: post_array,
      },
    });
    // if (down > 0) {
    //   let post_array2 = JSON.stringify(parsing2);
    //   const responses = await axios({
    //     method: "post",
    //     url: "http://localhost:5000/lms/form/downvotecomment",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${auth.user.token}`,
    //     },
    //     data: {
    //       message_id: post.message_id,
    //       downvotes: post_array2,
    //     },
    //   });
    // }
  };

  const handle_downvotes = async () => {
    let parsing = JSON.parse(post.downvotes);
    // let parsing2 = JSON.parse(post.upvotes);
    // let up = 0;
    if (parsing.length == 0) {
      parsing.push(`${auth.user.userData.user.email}`);
      setshowdarkdownvote(true);
      // let count = 0;
      // let index = 0;
      // for (let j = 0; j < parsing2.length; j++) {
      //   if (parsing2[j] == `${auth.user.userData.user.email}`) {
      //     count += 1;
      //     index = parsing2.indexOf(`${auth.user.userData.user.email}`);
      //   }
      // }
      // if (count > 0) {
      //   up += 1;
      //   parsing2.splice(index, 1);
      //   setshowdarkupvote(false);
      // }
    } else {
      let count = 0;
      let index = 0;
      for (let i = 0; i < parsing.length; i++) {
        if (parsing[i] == `${auth.user.userData.user.email}`) {
          count += 1;
          index = i;
        }
      }
      if (count > 0) {
        parsing.splice(index, 1);
        setshowdarkdownvote(false);
      } else {
        parsing.push(`${auth.user.userData.user.email}`);
        setshowdarkdownvote(true);
        // let count2 = 0;
        // let index2 = parsing2.indexOf(`${auth.user.userData.user.email}`);
        // for (let j = 0; j < parsing2.length; j++) {
        //   if (parsing2[j] == `${auth.user.userData.user.email}`) {
        //     count2 += 1;
        //     index2 = j;
        //   }
        // }
        // if (count2 > 0) {
        //   up += 1;
        //   parsing2.splice(index2, 1);
        //   setshowdarkupvote(false);
        // }
      }
    }
    let post_array = JSON.stringify(parsing);
    const response = await axios({
      method: "post",
      url: "http://localhost:5000/lms/form/downvotecomment",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.user.token}`,
      },
      data: {
        message_id: post.message_id,
        downvotes: post_array,
      },
    });
    // console.log(up);
    // if (up > 0) {
    //   let post_array2 = JSON.stringify(parsing2);
    //   console.log(post_array2);
    //   const responses = await axios({
    //     method: "post",
    //     url: "http://localhost:5000/lms/form/upvotecomment",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${auth.user.token}`,
    //     },
    //     data: {
    //       message_id: post.message_id,
    //       upvotes: post_array2,
    //     },
    //   });
    // }
  };

  const handle_votes = () => {
    let parsing = JSON.parse(post.upvotes);
    setupvote_count(parsing.length);
    let parsing2 = JSON.parse(post.downvotes);
    setdownvote_count(parsing2.length);
  };
  useEffect(() => {
    let parsing = JSON.parse(post.upvotes);
    for (let i = 0; i < parsing.length; i++) {
      if (parsing[i] == `${auth.user.userData.user.email}`) {
        setshowdarkupvote(true);
      }
    }
    let parsing2 = JSON.parse(post.downvotes);
    for (let j = 0; j < parsing2.length; j++) {
      if (parsing2[j] == `${auth.user.userData.user.email}`) {
        setshowdarkdownvote(true);
      }
    }
  }, []);
  useEffect(() => {
    handle_votes();
    handleFetch();
  }, [post]);
  return (
    <>
      {post.reply_to == 0 ? (
        <div className="w-full rounded-xl drop-shadow-xl bg-white p-2 mt-2">
          <div className="w-full flex flex-wrap p-2 items-center justify-between border-b-2 border-b-gray-300">
            <div className="flex items-center">
              <div className="rounded-full bg-accent mr-1 p-1 text-xs text-white">
                {post.first_name.slice(0, 1).toUpperCase()}
                {post.last_name.slice(0, 1).toUpperCase()}
              </div>
              <h3 className="text-md text-gray-700 mr-1">{post.first_name}{" "}{post.last_name}</h3>
            </div>
            <div className="flex items-center">
              <h3 className="mr-1">
                {post.createdAt.slice(0, post.createdAt.indexOf("T"))}
              </h3>
              {auth.user.userData.user.email == post.email && post.text!="[deleted]" ? (
                <button onClick={deleteComment}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex flex-row items-start my-2">
            {auth.user.userData.user.email == post.email ? (
              <>
                {post.text!="[deleted]"
                ?
                <>
                {updateForm ? (
                  <button
                    onClick={() => {
                      setupdateForm(false);
                      setUpdateText("");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setupdateForm(true);
                      setUpdateText(`${post.text}`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                )}
                </>
                :''
                }
              </>
            ) : (
              ""
            )}
            {updateForm ? (
              <input
                type="text"
                value={updateText}
                onChange={(e) => {
                  setUpdateText(e.target.value);
                }}
                className="w-full border border-gray-500 rounded-md p-1"
              />
            ) : (
              <h3>{post.text!="[deleted]" ? <>{post.text}</> : <span className='italic'>This comment is deleted</span>}</h3>
            )}
          </div>
          {updateForm ? (
            <button
              onClick={updateComment}
              className="border-2 p-1 rounded-md bg-green-500 text-white"
            >
              Update
            </button>
          ) : (
            ""
          )}
          <div className="flex flex-wrap items-center">
            <button
              onClick={handle_upvotes}
              className="flex items-center text-gray-500"
            >
              {showdarkupvote ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
              )}
              <span className="text-md">{upvote_count}</span>
            </button>
            <button
              onClick={handle_downvotes}
              className="flex items-center text-gray-500"
            >
              {showdarkdownvote ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                  />
                </svg>
              )}
              <span className="text-sm">{downvote_count}</span>
            </button>
          </div>
          <div className="flex flex-wrap items-center">
            <button
              onClick={() => {
                setshowReplyForm(true);
              }}
              className="border-2 p-1 rounded-md border-gray-500 text-gray-700"
            >
              Reply
            </button>
            {post.replies == 0 ? (
              <button className="border-l-2 ml-1 p-1 border-l-gray-500 text-gray-700">
                No reply
              </button>
            ) : (
              <>
                {showMessages ? (
                  <button
                    onClick={() => {
                      setShowMessages(false);
                    }}
                    className="border-l-2 ml-1 p-1 border-l-gray-500 text-gray-700"
                  >
                    Close Replies
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleFetch();
                      setShowMessages(true);
                    }}
                    className="border-l-2 ml-1 p-1 border-l-gray-500 text-gray-700"
                  >
                    View Replies
                  </button>
                )}
              </>
            )}
          </div>
          {showReplyForm ? (
            <div className="w-full border-y-2 border-y-gray-300 flex items-center p-2 mt-2">
              <input
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                type="text"
                placeholder="Enter Reply"
                className="border border-gray-500 p-2 w-11/12 rounded-lg"
              />
              <button onClick={postComment}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  setshowReplyForm(false);
                  setComment("");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          ) : (
            ""
          )}
          {showMessages && <Thread forumMessages={replies} auth={auth} />}
        </div>
      ) : (
        <div className="w-full bg-white px-5 mt-2">
          <div className="w-full flex flex-wrap p-2 items-center justify-between border-b-2 border-b-gray-300">
            <div className="flex items-center">
              <div className="rounded-full bg-accent mr-1 p-1 text-xs text-white">
                {post.first_name.slice(0, 1).toUpperCase()}
                {post.last_name.slice(0, 1).toUpperCase()}
              </div>
              <h3 className="text-sm text-gray-700 mr-1">{post.first_name}{" "}{post.last_name}</h3>
            </div>
            <div className="flex items-center">
              <h3 className="text-xs mr-1">
                {post.createdAt.slice(0, post.createdAt.indexOf("T"))}
              </h3>
              {auth.user.userData.user.email == post.email && post.text!="[deleted]" ? (
                <button onClick={deleteComment}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex flex-row items-start my-2">
            {auth.user.userData.user.email == post.email ? (
              <>
               {post.text!="[deleted]" ? 
              <>
               {updateForm ? (
                  <button
                    onClick={() => {
                      setupdateForm(false);
                      setUpdateText("");
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setupdateForm(true);
                      setUpdateText(`${post.text}`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-3 h-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </button>
                )}
              </>
              :''
              }
              </>
            ) : (
              ""
            )}
            {updateForm ? (
              <input
                type="text"
                value={updateText}
                onChange={(e) => {
                  setUpdateText(e.target.value);
                }}
                className="text-xs w-full border border-gray-500 rounded-md p-1"
              />
            ) : (
              <h3 className="text-xs">{post.text!="[deleted]" ? <>{post.text}</> : <span className='italic'>This reply is deleted</span>}</h3>
            )}
          </div>
          {updateForm ? (
            <button
              onClick={updateComment}
              className="border-2 p-1 rounded-md bg-green-500 text-white text-xs"
            >
              Update
            </button>
          ) : (
            ""
          )}
          <div className="flex flex-wrap items-center">
            <button
              onClick={handle_upvotes}
              className="flex items-center text-gray-500"
            >
              {showdarkupvote ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                  />
                </svg>
              )}
              <span className="text-sm">{upvote_count}</span>
            </button>
            <button
              onClick={handle_downvotes}
              className="flex items-center text-gray-500"
            >
              {showdarkdownvote ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
                  />
                </svg>
              )}
              <span className="text-sm">{downvote_count}</span>
            </button>
          </div>
          <div className="flex flex-wrap items-center">
            <button
              onClick={() => {
                setshowReplyForm(true);
              }}
              className="text-xs border-2 p-1 rounded-md border-gray-500 text-gray-700"
            >
              Reply
            </button>
            {post.replies == 0 ? (
              <button className="text-xs border-l-2 ml-1 p-1 border-l-gray-500 text-gray-700">
                No reply
              </button>
            ) : (
              <>
                {showMessages ? (
                  <button
                    onClick={() => {
                      setShowMessages(false);
                    }}
                    className="text-xs border-l-2 ml-1 p-1 border-l-gray-500 text-gray-700"
                  >
                    Close Replies
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleFetch();
                      setShowMessages(true);
                    }}
                    className="text-xs border-l-2 ml-1 p-1 border-l-gray-500 text-gray-700"
                  >
                    View Replies
                  </button>
                )}
              </>
            )}
          </div>
          {showReplyForm ? (
            <div className="w-full border-y-2 border-y-gray-300 flex items-center p-2 mt-2">
              <input
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                type="text"
                placeholder="Enter Reply"
                className="border border-gray-500 p-2 w-11/12 rounded-lg"
              />
              <button onClick={postComment}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
              <button
                onClick={() => {
                  setshowReplyForm(false);
                  setComment("");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </div>
          ) : (
            ""
          )}
          {showMessages && <Thread forumMessages={replies} auth={auth} />}
        </div>
      )}
    </>
  );
};

export default Post;
