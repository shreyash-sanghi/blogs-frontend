import { useEffect, useState } from "react";
import { getAllPosts } from "../api/post.apicall";
import { toast } from "react-toastify";
import PostCard from "../api/components/PostCard";

const AllPost = ({ sidebar }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 4; 

  const getallPost = async (page = 1) => {
    setLoading(true);
    try {
      const response = await getAllPosts(page, postsPerPage);
      setPosts(response.data.data.allPosts);
      setTotalPages(Math.ceil(response?.data?.data?.totalPosts / postsPerPage));
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getallPost(currentPage);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-gray-50">
      {loading ? (
        <div className="text-center text-gray-500">
          <span>Loading...</span>
        </div>
      ) : (
        <>
          <main className={`mx-auto grid grid-cols-1 gap-5 ${!sidebar && "md:grid-cols-2 mt-8 p-5"}`}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  showmore={true}
                  allcomments={false}
                  showdeleteIcon={false}
                  showEditIcon={false}
                  showViewIcon={true}
                />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">No posts available</p>
            )}
          </main>

          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="px-4 py-2 bg-blue-500 text-white rounded-md">
                {currentPage} / {totalPages}
              </span>
              <button
                className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllPost;
