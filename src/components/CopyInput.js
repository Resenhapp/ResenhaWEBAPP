'use client'
import React from 'react';
import { useRef, useEffect } from 'react';

const CopyInput = ({ placeholder, showIcon = false, Icon, value }) => {
  const inputRef = useRef();

  useEffect(() => {
    if(inputRef.current && value!==undefined){
      inputRef.current.value = value;
    }
    else if(inputRef.current && value===undefined){
      inputRef.current.value = '';
    }
  }, [value]);

  const handleCopy = () => {
    if (inputRef.current) {
      navigator.clipboard.writeText(inputRef.current.value)
        .catch(err => {
          // possibly handle the error
          console.error('Error copying text: ', err);
        });
    }
  };

  return (
    <div className="relative h-14 ring-1 ring-whiteT2 bg-whiteT1 rounded-2xl flex items-center">
      <input
        ref={inputRef}
        type="text"
        className={`pl-3 pr-[12px] block w-full bg-transparent sm:text-sm rounded-xl outline-none text-blackT1 placeholder-purpleT5 ${showIcon ? 'pr-10' : ''}`}
        placeholder={placeholder}
      />
      {showIcon && Icon && (
        <div onClick={handleCopy} className="flex pr-3 items-center justify-center">
          {Icon === 'copy' ? (
            <svg
              className="h-12 w-6 text-gray-500"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.61538 0H11.7692C12.4629 0 13.1281 0.263392 13.6186 0.732233C14.1091 1.20107 14.3846 1.83696 14.3846 2.5C15.0783 2.5 15.7435 2.76339 16.234 3.23223C16.7245 3.70107 17 4.33696 17 5V17.5C17 18.163 16.7245 18.7989 16.234 19.2678C15.7435 19.7366 15.0783 20 14.3846 20H5.23077C4.53713 20 3.87189 19.7366 3.38141 19.2678C2.89093 18.7989 2.61538 18.163 2.61538 17.5C1.92174 17.5 1.25651 17.2366 0.766028 16.7678C0.275549 16.2989 0 15.663 0 15V2.5C0 1.83696 0.275549 1.20107 0.766028 0.732233C1.25651 0.263392 1.92174 0 2.61538 0ZM2.61538 16.25V5C2.61538 4.33696 2.89093 3.70107 3.38141 3.23223C3.87189 2.76339 4.53713 2.5 5.23077 2.5H13.0769C13.0769 2.16848 12.9391 1.85054 12.6939 1.61612C12.4487 1.3817 12.1161 1.25 11.7692 1.25H2.61538C2.26856 1.25 1.93595 1.3817 1.69071 1.61612C1.44547 1.85054 1.30769 2.16848 1.30769 2.5V15C1.30769 15.3315 1.44547 15.6495 1.69071 15.8839C1.93595 16.1183 2.26856 16.25 2.61538 16.25ZM15.6923 5C15.6923 4.66848 15.5545 4.35054 15.3093 4.11612C15.0641 3.8817 14.7314 3.75 14.3846 3.75H5.23077C4.88395 3.75 4.55133 3.8817 4.30609 4.11612C4.06085 4.35054 3.92308 4.66848 3.92308 5V17.5C3.92308 17.8315 4.06085 18.1495 4.30609 18.3839C4.55133 18.6183 4.88395 18.75 5.23077 18.75H14.3846C14.7314 18.75 15.0641 18.6183 15.3093 18.3839C15.5545 18.1495 15.6923 17.8315 15.6923 17.5V5Z" fill="#8E00FF"/>
            </svg>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default CopyInput;
