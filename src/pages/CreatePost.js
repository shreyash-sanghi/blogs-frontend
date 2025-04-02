import { useState } from "react";
import Toolbar from "../api/components/EditorToolbar";
import Editor from "../api/components/Editor";
import { createPost } from "../api/post.apicall";
import StatusCodeUtility from "../utils/statusCode.Utility";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [innerHTMLs, setInnerHTMLs] = useState({
    title:"",
    content:"",
    description:""
  })


  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setInnerHTMLs({
      ...innerHTMLs,
      title: e.target.value
    })
  };

  const handleContentChange = (e) => {

    setContent(e.target.value);
    setInnerHTMLs({
      ...innerHTMLs,
      content: e.target.innerHTML,
      description: e.target.innerText
    })
  };

  const applyStyle = (style, value = null) => {
    document.execCommand(style, false, value);
  };

  const handleSubmit = () => {
    const post = {
        title : innerHTMLs.title, 
        description: innerHTMLs.description,
        innerHTML:innerHTMLs.content
    }

    handleCreatePost(post)
  };


  const handleCreatePost = async(data) =>{
    try {
        const response = await createPost(data)
         if(response.status === StatusCodeUtility.Created){
          toast.success(response.data.message || "post created successfully")
          window.location.href = "/"
         }
         else{
          toast.error(response.data.message || "something went wrong")
         }
        
    } catch (error) {
         toast.error(error.response.message|| error.response.data.message|| error.message || "something went wrong")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto mt-8 w-1/2">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Post Title"
            value={title}
            onChange={handleTitleChange}
            className="w-full p-2 border rounded-md text-lg font-semibold"
          />
          <div className="border rounded-md shadow-sm p-4 bg-white">
            <Toolbar applyStyle={applyStyle} />
            <Editor onContentChange={handleContentChange} content={content} />
          </div>
          <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
            Create Post
          </button>
        </form>
      </main>
      <ToastContainer/>
    </div>
  );
};

export default CreatePost;
