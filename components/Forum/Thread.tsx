import Post from './Post';
const Thread = ({forumMessages,auth}:any) => {
  return (
    <>
    {forumMessages.map((post:any) => (
        <Post post={post} auth={auth} />  
        )
      )}
    </>
  );
}

export default Thread;
