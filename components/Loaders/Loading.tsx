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
                : <>
                    <div className='hidden sm:block'>
                        <PulseLoader color="#d63636" />
                    </div>
                    <div className='block sm:hidden'>
                        <PulseLoader color="#d63636" size={5} />
                    </div>
                    </>
            }
        </div>
    )
}

export default Loading