// "use client";
import Comment from "./Comment";

const Thread = ({ thread, auth }: any) => {
  console.log(thread);
  return (
    <div className="w-full flex flex-col  items-center drop-shadow-2xl rounded-xl overflow-hidden bg-white mt-5">
      {thread.length > 0 && (
		  thread.map((comment: any, index: number) => (
			<div key={index} className="w-full">
			  <Comment  post={comment} auth={auth} />
			</div>
		  ))
	  )
		  }
    </div>
  );
};

export default Thread;
