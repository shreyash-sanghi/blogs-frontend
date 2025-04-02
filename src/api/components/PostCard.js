import { useEffect, useRef, useState } from "react";
import CommentList from "./CommentList.js";
import {createNewComment,deleteComment,updateComment,} from "../comment.apicall.js";
import StatusCodeUtility from "../../utils/statusCode.Utility.js";
import { toast } from "react-toastify";

import { Edit3, Trash2, Fullscreen, User } from "lucide-react";
import { deletePost } from "../post.apicall.js";
import Toolbar from "./EditorToolbar.js";


const PostToolBar = ({
  showEditIcon,
  showdeleteIcon,
  onEdit,
  onDelete,
  onView,
  showViewIcon
}) => {
  return (
    <>
      {showEditIcon && (
        <Edit3
          className="cursor-pointer hover:text-blue-600"
          size={20}
          onClick={() => onEdit(true)}
          title="Edit Post"
        />
      )}
      {showdeleteIcon && (
        <Trash2
          className="cursor-pointer hover:text-red-600"
          size={20}
          onClick={() => onDelete()}
          title="Delete Post"
        />
      )}
      {showViewIcon && <Fullscreen
        className="cursor-pointer hover:text-red-600"
        size={20}
        onClick={() => onView()}
        title="Delete Post"
      />}
    </>
  );
};

const PostCard = ({
  post,
  showmore,
  allcomments,
  showdeleteIcon,
}) => {

  const [comments, setComments] = useState(post.comments || []);
  const [showModal, setShowModal] = useState(false);

  const redirectService = (modulename) => {
    window.location.href = modulename;
  };

  const handleNewComment = (newCommentinnerHTML, commentText) => {
    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    const data = { content: newCommentinnerHTML, commentText, postId:post._id };

    handleCreateCommentAPi(data);
  };


  const handleDeleteComment = (commentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (confirmDelete) handleDeleteCommentAPiHandler(commentId);
  };


  const handleSaveEdit = (_id, updatedComment, commentText) => {
    handleUpdateCommentAPiHandler(_id, { content: updatedComment , commentText});
  };

  const deletePosthandler = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      handleDeletePostAPi(postId);
    }
  };


  const handleCreateCommentAPi = async (data) => {
    try {
      const response = await createNewComment(data);
      if (response.status === StatusCodeUtility.Created) {
        toast.success(response.data.message || "Comment added successfully");
        setComments([response.data.data,...comments]);

      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {

      toast.error(error.response.data.message, "Something went wrong");
    }
  };

  const handleUpdateCommentAPiHandler = async (id, data) => {
    try {
      const response = await updateComment(id, data);
      if (response.status === StatusCodeUtility.Success) {
        toast.success(response.data.message || "Comment updated successfully");

        const updatedComments = comments.map((comment) =>
          comment._id === id ? { ...comment, comment: data.content } : comment
        );
        setComments(updatedComments);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Failed to update comment");
    }
  };

  const handleDeleteCommentAPiHandler = async (id) => {
    try {
      const response = await deleteComment(id);
      if (response.status === StatusCodeUtility.Success) {
        toast.success(response.data.message || "Comment deleted successfully");
        const updatedComments = comments.filter(
          (comment) => comment._id !== id
        );
        setComments(updatedComments);
      }
    } catch (error) {
      toast.error(error.response.data.message || "Failed to delete comment");
    }
  };

  const handleDeletePostAPi = async (id) => {
    try {
      const response = await deletePost(id);
      if (response.status === StatusCodeUtility.Success) {
        toast.success(response.data.message || "Post deleted successfully");
        redirectService("/")
      }
      toast.error(response.data.message || "Failed to delete post");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete post");
    }
  };


  const visibleComments = allcomments ? comments : comments.slice(0, 1);

  return (
<div className="border rounded-md shadow-md bg-white ">
  <div className="relative bg-purple-300 p-4 flex flex-col justify-between items-start">
    <div className="w-full flex justify-between">
      <div className="mb-3 flex items-center">
        <User className="border h-10 w-10 rounded-full text-white bg-purple-700" aria-label="user icon" />
        <span className="ml-2 font-mono">{post.email?(<>{post.email}</>):(<>post@gmail.com</>)}</span>
      </div>
      <div className="flex space-x-4 text-gray-600 items-center">
        <PostToolBar
          showdeleteIcon={showdeleteIcon}
          post={post}
          onDelete={() => deletePosthandler(post._id)}
          onEdit={setShowModal}
        />
      </div>
    </div>

    <div className="relative w-full pb-2">
      <h2 className="text-xl font-medium">{post.title}</h2>
      <div className="mb-4 mt-2 text-gray-800" dangerouslySetInnerHTML={{ __html: post.innerHTML }} />
      <p className="absolute text-gray-600 text-xs left-0">Posted on: {new Date(post.createdAt).toLocaleString()}</p>
    </div>
  </div>

  <div className=" pt-2">
    <CommentList
      comments={visibleComments}
      handleSaveEdit={handleSaveEdit}
      handleDeleteComment={handleDeleteComment}
      handleNewComment={handleNewComment}
    />
    {showmore && comments.length > 0 && (
      <button
        onClick={() => window.location.href = `/post/${post._id}`}
        className=" p-4 text-blue-600 underline text-sm"
      >
        Show More
      </button>
    )}
  </div>
</div>

  );
};

const Modal = ({ showModal, setShowModal, post, handleUpdatePost }) => {
  const [title, setTitle] = useState(post.title || "");
  const [content, setContent] = useState(post.innerHTML || "");
  const [description, setDescription] = useState(post.description || "");
  const ref = useRef(null);

  const saveCursorPosition = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      return selection.getRangeAt(0);
    }
    return null;
  };

  const restoreCursorPosition = (range) => {
    if (range) {
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };

  useEffect(() => {
    const range = saveCursorPosition();
    if (ref.current) {
      ref.current.innerHTML = post.innerHTML;
    }
    restoreCursorPosition(range);
  }, [post]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const applyStyle = (style, value = null) => {
    document.execCommand(style, false, value);
  };

  const handleSubmit = () => {
    const updatedPost = {
      title,
      innerHTML: content,
      description: description,
      id: post._id,
    };

    handleUpdatePost(updatedPost);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center transition-opacity ${
        showModal ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white p-8 rounded-md w-3/4 md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Edit Post</h2>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={handleTitleChange}
          className="w-full p-2 border rounded-md text-lg font-semibold mb-4"
        />
        <div className="border rounded-md shadow-sm p-4 bg-white mb-4">
          <Toolbar applyStyle={applyStyle} />
          <div
            id="editable"
            ref={ref}
            contentEditable
            onInput={(e) => {
              setContent(e.target.innerHTML);
              setDescription(e.target.innerText);
            }}
            className="min-h-[200px] mt-4 focus:outline-none p-2 border rounded-md bg-white"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-300 text-black px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};





export default PostCard;
