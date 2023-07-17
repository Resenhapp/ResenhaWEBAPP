'use client'
import React, { useState } from 'react';

const PasswordField = ({ placeholder, showIcon, value, action }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative h-14 ring-1 ring-whiteT2 bg-whiteT1 rounded-2xl flex items-center">
      {showIcon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M2.94388 5.67078C2.95577 2.95268 5.16757 0.759629 7.88469 0.770641C10.6017 0.771533 12.8048 2.97514 12.8048 5.69239V7.0927C14.4356 7.67827 15.6023 9.23802 15.6023 11.0712V15.0028C15.6023 17.3375 13.7099 19.2288 11.3763 19.2288H4.37202C2.03843 19.2288 0.146019 17.3375 0.146019 15.0028V11.0712C0.146019 9.23788 1.31285 7.67803 2.94387 7.09257L2.94388 5.67078ZM4.44387 6.8452H11.3048V5.69239C11.3048 3.80302 9.77241 2.27064 7.88304 2.27064H7.87975C5.99097 2.26237 4.45298 3.78614 4.44387 5.67578V6.8452ZM4.37202 8.3452C2.8666 8.3452 1.64602 9.56512 1.64602 11.0712V15.0028C1.64602 16.5089 2.8666 17.7288 4.37202 17.7288H11.3763C12.8817 17.7288 14.1023 16.5089 14.1023 15.0028V11.0712C14.1023 9.56512 12.8817 8.3452 11.3763 8.3452H4.37202ZM7.87433 11.2691C8.28854 11.2691 8.62433 11.6049 8.62433 12.0191V14.0551C8.62433 14.4693 8.28854 14.8051 7.87433 14.8051C7.46012 14.8051 7.12433 14.4693 7.12433 14.0551V12.0191C7.12433 11.6049 7.46012 11.2691 7.87433 11.2691Z" fill="#961CFF" />
          </svg>
        </div>
      )}
      <input
        type={showPassword ? 'text' : 'password'}
        className={`pl-3 pr-2 block w-full bg-transparent sm:text-sm rounded-xl ml-7 outline-none text-blackT1 placeholder-purpleT5 ${showIcon ? 'pl-10' : ''
          }`}
        placeholder={placeholder}
        value={value}
        onChange={action}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 px-3 flex items-center focus:outline-none"
        onClick={handleTogglePassword}
      >
        {showPassword ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.0955 17.9607C11.3879 17.9865 11.6893 18 12 18C16.9091 18 21 12 21 12C21 12 20.3304 11.0179 19.2079 9.84836L11.0955 17.9607Z" fill="#8500FF" />
            <path fillRule="evenodd" clipRule="evenodd" d="M14.5051 6.49485C13.7076 6.18695 12.8665 6 12 6C5.45455 6 3 12 3 12C3 12 3.75006 13.8335 5.52661 15.4734L9 12C9 10.3431 10.3431 9 12 9L14.5051 6.49485Z" fill="#8500FF" />
            <rect x="5.1" y="18.435" width="19" height="2" transform="rotate(-45 5.1 18.435)" fill="#8500FF" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M11.0955 17.9607C11.3879 17.9865 11.6893 18 12 18C16.9091 18 21 12 21 12C21 12 20.3304 11.0179 19.2079 9.84836L11.0955 17.9607Z" fill="#8500FF" />
            <path fillRule="evenodd" clipRule="evenodd" d="M12 6C5.45455 6 3 12 3 12C3 12 5.45455 18 12 18C16.9091 18 21 12 21 12C21 12 16.9091 6 12 6ZM9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12Z" fill="#8500FF" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default PasswordField;
