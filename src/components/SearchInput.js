'use client'
import React, { useState } from 'react';
import { useEffect } from 'react';

const MagnifierIcon = () => (
  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M11.1923 13.9005C11.7659 13.5673 12.5145 13.6136 12.9582 14.1067L17.9039 19.6019C18.2239 19.9574 18.7241 20.0895 19.1778 19.9383C19.5369 19.8186 19.8186 19.5369 19.9383 19.1778C20.0895 18.7241 19.9574 18.2239 19.6019 17.9039L14.1067 12.9582C13.6136 12.5145 13.5673 11.7659 13.9005 11.1923C15.557 8.34048 15.1642 4.62495 12.722 2.18275C9.81166 -0.727583 5.09308 -0.727583 2.18275 2.18275C-0.727583 5.09308 -0.727583 9.81166 2.18275 12.722C4.62495 15.1642 8.34047 15.557 11.1923 13.9005ZM11.8437 11.8437C9.41844 14.269 5.48629 14.269 3.06102 11.8437C0.63574 9.41844 0.63574 5.48629 3.06102 3.06102C5.48629 0.635742 9.41844 0.635743 11.8437 3.06102C14.269 5.48629 14.269 9.41844 11.8437 11.8437Z" fill="#8E00FF"/>
  </svg>
);

const DeleteIcon = () => (
  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.76091 6.52178C5.34067 6.10154 4.65933 6.10154 4.23909 6.52178L0.918495 9.84241C0.708376 10.0525 0.367707 10.0525 0.157589 9.84241C-0.0525297 9.63229 -0.0525295 9.29162 0.157589 9.0815L3.47819 5.76087C3.89843 5.34063 3.89843 4.65929 3.47819 4.23905L0.15767 0.918501C-0.0524478 0.708381 -0.0524477 0.36771 0.15767 0.15759C0.367789 -0.05253 0.708457 -0.0525299 0.918576 0.15759L4.23909 3.47814C4.65933 3.89838 5.34067 3.89838 5.76091 3.47814L9.08142 0.15759C9.29154 -0.0525299 9.63221 -0.0525299 9.84233 0.15759C10.0524 0.36771 10.0524 0.708381 9.84233 0.918501L6.52181 4.23905C6.10157 4.65929 6.10157 5.34063 6.52181 5.76087L9.84241 9.0815C10.0525 9.29162 10.0525 9.63229 9.84241 9.84241C9.63229 10.0525 9.29162 10.0525 9.0815 9.84241L5.76091 6.52178Z" fill="#8E00FF"/>
  </svg>
);

const SearchInput = ({ placeholder, onDelayedChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [typingTimeout, setTypingTimeout] = useState(null);

  const handleInputChange = event => {
    const value = event.target.value;
    setInputValue(value);

    clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      onDelayedChange(value);
    }, 600);

    setTypingTimeout(timeout);
  };

  const handleClearInput = () => {
    setInputValue('');
    clearTimeout(typingTimeout);
    onDelayedChange('');
  };

  return (
    <div className="relative h-14 w-full bg-whiteT1 ring-1 ring-whiteT2 ring-inset rounded-2xl text-sm">
      <MagnifierIcon />
      <input
        type="search"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        className="pl-10 pr-12 w-full py-2 bg-transparent rounded-2xl h-full appearance-none text-gray-700 focus:outline-none focus:shadow-outline"
        style={{appearance: 'none', WebkitAppearance: 'none', MozAppearance: 'none'}}
      />
      {inputValue && (
        <button onClick={handleClearInput} className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};

export default SearchInput;
