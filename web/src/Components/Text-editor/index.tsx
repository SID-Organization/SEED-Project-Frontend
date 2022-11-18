import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";

export default function TextEditor() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = {
    readonly: false,
    height: 400,
  };
  const handleUpdate = (event: any) => {
    const editorContent = event.target.innerHTML;
    setContent(editorContent);
  };

  return (
    <div
      className="
      flex
      flex-col
      justify-center
      items-center
      w-full
      h-full
      bg-gray-100   
    "
    >
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={handleUpdate}
        onChange={(newContent) => {}}
      />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
