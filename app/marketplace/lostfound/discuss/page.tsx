"use client";
import Thread from '../../Thread';
import React, { useState , useEffect } from 'react'
import axios from "axios";
import { useAuth } from '../../../../contexts/AuthContext';

const Discuss = () => {

  const item_image = null;
  const item_name = "Item Name";
  const story = "Story";

  const [thread,setThread] = useState([]);
    const AuthData : any = useAuth();

    const getThread = async () => {
		try {
			const response = await axios.post(
				"http://localhost:5000/market/lost_items/lostitemthread",{
                    "item_id":1
                },
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${AuthData.user.token}`,
					},
				}
			);
            console.log(response.data);
			setThread(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getThread();
	}, []);


  return (
    <div className='px-5 py-3 w-full'>
         {/* item info */}
         <div
            className="flex flex-col items-center w-[60%] drop-shadow-2xl rounded-xl overflow-hidden bg-white mx-auto"
        >
            {item_image != null ? (
                <>
                    <img
                        src={item_image}
                        alt={item_name}
                        // onClick={() => {
                        //     setShowImagePreview(true);
                        //     setCurrentImage(item_image);
                        // }}
                        className="w-full h-[10rem] object-cover rounded-xl cursor-pointer"
                    />
                </>
            ) : (
                <div className="w-full h-[10rem] object-cover rounded-xl flex items-center justify-center bg-gray-300">
                    {" "}
                    <p>No image uploaded</p>
                </div>
            )}
            <div className="text-lg sm:text-xl font-medium text-gray-900 my-4 whitespace-nowrap overflow-hidden text-ellipsis">
                {item_name}
            </div>
            <div className="text-gray-600 text-[0.75rem] text-justify mx-5 mb-5 h-12 text-ellipsis">
                {story != null ? story : "No description provided"}
            </div>
        </div>


        <div className='w-full px-5'>
            <Thread thread={thread} auth={AuthData}/>
        </div>

    </div>
  )
}

export default Discuss