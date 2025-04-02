import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePost } from '../api/post.apicall'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostCard from '../api/components/PostCard';
import AllPost from './AllPost';




const PostPage = () => {
  const { id } = useParams();
  const { post, loading, error } = usePost(id);

  return (
    <div className=" gap-5 flex md:flex-row flex-col p-3 bg-gray-50">
      <main className="md:w-[60%] ">
        {loading && <LoadingState />} 
        {error && <ErrorState message={error} />} 
        {post && !loading && !error ? (
          <PostCard
            key={post._id}
            post={post}
            showmore={false}
            allcomments={true}
            showdeleteIcon={true}
            showEditIcon={true}
            showViewIcon={false}
          />
        ) : null}
        {!loading && !error && !post && (
          <p className="text-center text-gray-500">No post available</p>
        )}
      </main>
      <div className='flex md:h-[90vh] md:overflow-y-auto flex-col md:w-[40%]'>
      <AllPost sidebar={true} />
      </div>
<ToastContainer/>
    </div>
  );
};


const usePost = (id) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPost = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getSinglePost(id);
              setPost(response.data.data);

    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return { post, loading, error };
};


const LoadingState = () => (
  <div className="text-center text-gray-500">
    <span>Loading...</span>
  </div>
);

const ErrorState = ({ message }) => (
  <div className="text-center text-red-500">
    <span>{message}</span>
  </div>
);

export default PostPage