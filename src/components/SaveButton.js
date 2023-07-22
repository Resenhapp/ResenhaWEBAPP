import React, { useState } from "react";
import Vector from "./Vector";

const BookmarkButton = ({ initialSavedState }) => {
  const vectorSave = 'bookmarkOutlined01';
  const vectorSaved = 'bookmarkFill01';
  
  const [isSaved, setIsSaved] = useState(initialSavedState);

  const handleSaveButton = () => {
    setIsSaved(!isSaved);
  };

  return (
    <button onClick={handleSaveButton} className='w-9 h-8 gap-2 font-thin rounded-full ring-1 ring-inset ring-whiteT1 flex justify-center items-center content-center backdrop-blur-xl bg-[#0000004D]'>
      <Vector vectorname={isSaved ? vectorSaved : vectorSave} />
    </button>
  );
};

export default BookmarkButton;
