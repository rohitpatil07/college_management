// "use client";
import Comment from "./Comment";


const Thread =  ({thread , auth} : any) => {
  return (
    <div className="w-full mx-auto flex flex-col items-center drop-shadow-2xl rounded-xl overflow-hidden bg-white mt-5">
        {
            thread.map((comment:any,index:Number) => (
                <Comment key={index} post={comment} auth={auth}/>
            ))
        }
    </div>
  )
}

export default Thread