const Editor = ({ onContentChange, content }) => (
    <div
      contentEditable
      onInput={onContentChange}
      className="min-h-[200px] mt-4 focus:outline-none p-2 border rounded-md bg-white"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
  
  export default Editor;
  