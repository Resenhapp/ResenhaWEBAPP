import React, { useEffect, useState } from 'react';

const WithdrawError = ({ errorContent }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); 

    return () => clearTimeout(timer); // Clear the timer when component is unmounted or re-rendered
  }, []); // Empty array means this effect runs once when component mounts

  return (
    isVisible && (
      <div
        className={`w-full bg-redT1 my-4 ring-1 ring-inset rounded-2xl flex flex-row justify-center items-center content-center gap-2 ring-redT4 p-4 transition duration-3000 opacity-100 ${isVisible ? '' : 'opacity-0'}`}
      >
        <svg width="15" height="15" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.5 5.5C11.9477 5.5 11.5 5.94771 11.5 6.5V13.5C11.5 14.0523 11.9477 14.5 12.5 14.5C13.0523 14.5 13.5 14.0523 13.5 13.5V6.5C13.5 5.94771 13.0523 5.5 12.5 5.5Z" fill="#F1F1F1" />
          <path d="M12.5 16.5C11.9477 16.5 11.5 16.9477 11.5 17.5C11.5 18.0523 11.9477 18.5 12.5 18.5C13.0523 18.5 13.5 18.0523 13.5 17.5C13.5 16.9477 13.0523 16.5 12.5 16.5Z" fill="#F1F1F1" />
          <path fill-rule="evenodd" clip-rule="evenodd" d="M25 12.5C25 19.4036 19.4036 25 12.5 25C5.59644 25 0 19.4036 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4036 0 25 5.59644 25 12.5ZM23 12.5C23 18.299 18.299 23 12.5 23C6.70101 23 2 18.299 2 12.5C2 6.701 6.70101 2 12.5 2C18.299 2 23 6.701 23 12.5Z" fill="#F1F1F1" />
        </svg>
        <h1 className=' text-sm'>{errorContent}</h1>
      </div>
    )
  )
}

export default WithdrawError;
