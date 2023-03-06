import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

/**
 * @param {
 * value: string,
 * setValue: void function(string),
 * style: object,
 * placeholder: string,
 * ref: object
 * } props
 * placeholder: string
 * } props
 */

export default function ReactTextQuill(props) {
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ font: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["image", "link"],
    ],
  };

  const style =
    props.style === "criarDemanda" ? {} : { height: 100, width: 500 };

    return (
        <ReactQuill
            value={props.value}
            onChange={(e) => props.setValue(e)}
            modules={quillModules}
            style={style}
            placeholder={props.placeholder}
            ref={props.ref}
        />
    )
}
