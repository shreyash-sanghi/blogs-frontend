import { useEffect, useState } from "react";
import { getAllPastPosts } from "../api/post.apicall";
import { toast} from "react-toastify";
import PostCard from "../api/components/PostCard";



const MyPastPost = ({sidebar}) => {
  const [posts, setPosts] = useState([]);
  const [Loading, setLoading] = useState(true);
   const getallPastPost = async ()=>{
    setLoading(true);
    try {
      const posts = await getAllPastPosts();
      setPosts(posts?.data?.data);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
   }
  useEffect(() => {
    getallPastPost();
  }, []);
console.log(posts);
  return (
    <div className="min-h-screen bg-gray-50">
      {Loading ? (
        <div className="text-center text-gray-500">
          <span>Loading...</span>
        </div>
      ) : (
        <main className={`mx-auto  grid grid-cols-1   gap-5 ${(!sidebar)&&"md:grid-cols-2 mt-8 p-5"}`}>
        {posts.length > 0 ? (
          posts.map((post) => (<>
               <PostCard
            key={post._id}
            post={post}
            showmore={false}
            allcomments={true}
            showdeleteIcon={true}
            showEditIcon={true}
            showViewIcon={false}
          />
</>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">No posts available</p>
        )}
      </main>
      
      )}
          </div>
  );
};

export default MyPastPost;
