import React from 'react';

const Dropdown = ({ placeholder = 'Escolha uma opção', action, showIcon = false, Icon, options = [] }) => {
  return (
    <div className="relative h-14 ring-2 ring-inset ring-whiteT2 bg-whiteT1 rounded-2xl flex items-center">
      {showIcon && Icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center justify-center pointer-events-none">
          {Icon === 'coin' ? (
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.34146 4.60976C8.34146 4.24606 8.6363 3.95122 9 3.95122C9.3637 3.95122 9.65854 4.24606 9.65854 4.60976V5.03822C9.947 5.08534 10.2151 5.16253 10.4629 5.26978C10.9124 5.45371 11.2629 5.7333 11.5143 6.10853C11.7733 6.4764 11.9029 6.93992 11.9029 7.49908C11.9029 7.68194 11.7546 7.83017 11.5718 7.83017H10.7482C10.5654 7.83017 10.4171 7.68194 10.4171 7.49908C10.4171 7.20479 10.3562 6.96935 10.2343 6.79277C10.12 6.60883 9.95238 6.4764 9.73143 6.39547C9.70762 6.38595 9.68332 6.37695 9.65854 6.36846V8.38068C10.0707 8.48294 10.4379 8.60478 10.76 8.74617C11.1791 8.93011 11.5029 9.1729 11.7314 9.47456C11.9676 9.77621 12.0857 10.1625 12.0857 10.6334C12.0857 11.1042 11.96 11.5199 11.7086 11.8804C11.4648 12.2336 11.1143 12.5132 10.6571 12.7192C10.3607 12.8502 10.0278 12.938 9.65854 12.9826V13.3902C9.65854 13.7539 9.3637 14.0488 9 14.0488C8.6363 14.0488 8.34146 13.7539 8.34146 13.3902V12.9644C8.00971 12.913 7.70351 12.8239 7.42286 12.6971C6.95048 12.4838 6.58096 12.1784 6.31429 11.7811C6.04762 11.3838 5.91429 10.9056 5.91429 10.3464C5.91429 10.1758 6.05264 10.0374 6.2233 10.0374H7.09099C7.26165 10.0374 7.4 10.1758 7.4 10.3464C7.4 10.8099 7.54857 11.1594 7.84572 11.3949C7.98689 11.5032 8.15214 11.5858 8.34146 11.6427V9.44438C7.96267 9.34563 7.62599 9.23061 7.33143 9.09933C6.94286 8.91539 6.64191 8.67628 6.42857 8.38198C6.22286 8.08768 6.12 7.70509 6.12 7.23421C6.12 6.76334 6.23429 6.36236 6.46286 6.03127C6.69905 5.69283 7.02667 5.43532 7.44572 5.25874C7.71539 5.14249 8.01397 5.06297 8.34146 5.02019V4.60976ZM7.92572 6.51686C8.03527 6.43296 8.17385 6.36986 8.34146 6.32756V8.05408C8.30002 8.03867 8.26048 8.02289 8.22286 8.00675C8.01715 7.91846 7.86096 7.8081 7.75429 7.67566C7.65524 7.54323 7.60572 7.38136 7.60572 7.19007C7.60572 6.90313 7.71238 6.67873 7.92572 6.51686ZM9.65854 11.6804V9.763C9.73694 9.78762 9.81076 9.81287 9.88 9.83875C10.1162 9.91968 10.2952 10.0264 10.4171 10.1588C10.5391 10.2912 10.6 10.4641 10.6 10.6775C10.6 10.9865 10.4705 11.2403 10.2114 11.439C10.0696 11.5511 9.88528 11.6315 9.65854 11.6804Z" fill="#8E00FF"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0ZM1.54286 9C1.54286 4.88153 4.88153 1.54286 9 1.54286C13.1185 1.54286 16.4571 4.88153 16.4571 9C16.4571 13.1185 13.1185 16.4571 9 16.4571C4.88153 16.4571 1.54286 13.1185 1.54286 9Z" fill="#8E00FF"/>
                </svg>
          ) : null}
        </div>
      )}
      <select
        className={`pl-3 pr-2 block w-[88%] bg-transparent sm:text-sm rounded-xl ml-7 outline-none text-purpleT1 placeholder-purpleT5 ${showIcon ? 'pl-10' : ''
          }`}
        onChange={action}
      >
        <option value="" disabled selected>{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;