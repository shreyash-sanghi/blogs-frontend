import { Bold, Italic, Link } from "lucide-react";

const EditorToolbar = () => {
  const applyStyle = (style, value = null) => {
    document.execCommand(style, false, value);
  };
  return (
    <div className="flex gap-2 mb-4">
      <button
        type="button"
        className="p-2 rounded bg-gray-200 hover:bg-gray-300"
        onClick={() => applyStyle("bold")}
      >
        <Bold size={18} />
      </button>
      <button
         type="button"
        className="p-2 rounded bg-gray-200 hover:bg-gray-300"
        onClick={() => applyStyle("italic")}
      >
        <Italic size={18} />
      </button>
      <button
        type="button"
        className="p-2 rounded bg-gray-200 hover:bg-gray-300"
        onClick={() => {
          const url = prompt("Enter the URL");
          if (url) {
            applyStyle("createLink", url);
            applyStyle("underline");
          }
        }}
      >
        <Link size={18} />
      </button>
    </div>
  );
};

export default EditorToolbar;
