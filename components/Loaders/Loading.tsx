import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import ClipLoader from "react-spinners/ClipLoader";
const Loading = ({loadState}:any) => {
    return (
        <div>
            {loadState == 'loading' ?
                <>
                    <div className='block sm:hidden'>
                        <ClipLoader color="#d63636" />
                    </div>
                    <div className='hidden sm:block'>
                        <ClipLoader color="#d63636" size={50} />
                    </div>
                </>
                : <div className='flex'>
                    <h3 className='text-2xl sm:text-4xl mb-5'>{loadState}</h3>
                    <div className='hidden sm:block mt-4'>
                        <PulseLoader color="#d63636" />
                    </div>
                    <div className='block sm:hidden mt-2'>
                        <PulseLoader color="#d63636" size={10} />
                    </div>
                </div>
            }
        </div>
    )
}

export default Loading