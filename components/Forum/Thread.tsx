import Post from './Post';
const Thread = ({forumMessages,auth}:any) => {
  return (
    <>
    {forumMessages.map((post:any,index:number) => (
        <Post key={index} post={post} auth={auth} />  
        )
      )}
    </>
  );
}

export default Thread;
