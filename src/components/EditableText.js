import { useState } from "react";
import "./Styles/EditableText.css";

export default function EditableText({ data, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(data.key);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setText(e.target.value);
    data.key = e.target.value;
  };

  const handleBlur = () => {
    setIsEditing(false);
    data.key = text;
  };

  return (
    <span onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
        />
      ) : (
        <span className="textPointer">{data.key}</span>
      )}
      &nbsp;
    </span>
  );
}
