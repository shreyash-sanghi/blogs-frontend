import { Edit, Trash, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Toolbar from "./EditorToolbar.js";

const CommentList = ({
  comments,
  handleSaveEdit,
  handleDeleteComment,
  handleNewComment,
}) => {
  const [editingComment, setEditingComment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [operationType, setOperationType] = useState("createNew");

  const handleEditClick = (comment) => {
    setEditingComment(comment);
    setOperationType("editOne");
    setShowModal(true);
  };

  const handleModalSubmit = (updatedCommentinnerHTML, newComment) => {
    if (operationType === "createNew") {
      handleNewComment(updatedCommentinnerHTML, newComment);
    } else if (operationType === "editOne") {
      handleSaveEdit(editingComment._id, updatedCommentinnerHTML, newComment);
    }
    setShowModal(false);
    setOperationType("");
    setEditingComment("");
  };

  return (
    <div className="p-4 bg-white  rounded-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Comments</h3>
        <button
          className="px-3 py-1.5 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          onClick={() => {
            setOperationType("createNew");
            setShowModal(true);
          }}
        >
          + Add New
        </button>
      </div>

      <div className="space-y-3">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-sm text-center">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              onEdit={() => handleEditClick(comment)}
              onDelete={() => handleDeleteComment(comment._id)}
            />
          ))
        )}
      </div>

      {showModal && (
        <CommentModal
          comment={editingComment}
          onClose={() => {
            setShowModal(false);
            setEditingComment(null);
          }}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
};

const CommentItem = ({ comment, onEdit, onDelete }) => (
  <div className="p-3 border rounded-md bg-gray-50 shadow-sm hover:shadow-md transition mx-2 flex justify-between items-start">
    <div
      dangerouslySetInnerHTML={{ __html: comment.comment }}
      className="text-gray-800 text-sm w-4/5"
    />
    <div className="flex space-x-2">
      <button
        onClick={onEdit}
        className="p-1.5 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition"
      >
        <Edit size={16} />
      </button>
      <button
        onClick={onDelete}
        className="p-1.5 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
      >
        <Trash size={16} />
      </button>
    </div>
  </div>
);

export const CommentModal = ({ comment, onClose, onSubmit }) => {
  const [newComment, setNewComment] = useState("");
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && comment?.comment) {
      editorRef.current.innerHTML = comment.comment || "";
    }
  }, [comment]);

  const handleSubmit = () => {
    onSubmit(editorRef.current.innerHTML, newComment);
    setNewComment("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg  w-11/12 md:w-2/3 lg:w-1/2 transition-transform transform scale-95">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-semibold text-gray-800">
            {comment ? "Edit Comment" : "New Comment"}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="mt-4">
          <Toolbar applyStyle={(style, value = null) => document.execCommand(style, false, value)} />
          <div
            ref={editorRef}
            contentEditable
            onInput={(e) => setNewComment(e.target.innerText)}
            className="min-h-[200px] mt-4 p-3 border rounded-md bg-gray-50 shadow-inner focus:outline-none"
          />
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 transition text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition text-white"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentList;
