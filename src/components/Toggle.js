import React from 'react';

const Toggle = ({ labelText, showLabel, startToggled, showQuestion, questionAction, textColor }) => {
  return (
    <label className={`relative inline-flex items-center cursor-pointer ${textColor === 'purple' ? 'text-purpleT2' : 'text-whiteT1'}`}>
      <input type="checkbox" value="" className="sr-only peer" defaultChecked={startToggled} />
      <div className="w-11 h-6 rounded-full peer dark:bg-purpleT2 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-purpleT3 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-whiteT1"></div>
      {showLabel && <span className="text-sm ml-1 font-thin">{labelText}</span>}
      {showQuestion && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6 ml-1 text-gray-400 cursor-help"
          onClick={questionAction}
        >
          <svg width="12" height="" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 15C30 18.9782 28.4196 22.7936 25.6066 25.6066C22.7936 28.4196 18.9782 30 15 30C11.0218 30 7.20644 28.4196 4.3934 25.6066C1.58035 22.7936 0 18.9782 0 15C0 11.0218 1.58035 7.20644 4.3934 4.3934C7.20644 1.58035 11.0218 0 15 0C18.9782 0 22.7936 1.58035 25.6066 4.3934C28.4196 7.20644 30 11.0218 30 15ZM10.305 11.3119H11.8519C12.1106 11.3119 12.3169 11.1 12.3506 10.8431C12.5194 9.61312 13.3631 8.71688 14.8669 8.71688C16.1531 8.71688 17.3306 9.36 17.3306 10.9069C17.3306 12.0975 16.6294 12.645 15.5212 13.4775C14.2594 14.3944 13.26 15.465 13.3313 17.2031L13.3369 17.61C13.3388 17.733 13.3891 17.8503 13.4768 17.9366C13.5645 18.0229 13.6826 18.0713 13.8056 18.0712H15.3262C15.4506 18.0712 15.5698 18.0219 15.6577 17.934C15.7456 17.846 15.795 17.7268 15.795 17.6025V17.4056C15.795 16.0594 16.3069 15.6675 17.6888 14.6194C18.8306 13.7512 20.0213 12.7875 20.0213 10.7644C20.0213 7.93125 17.6288 6.5625 15.0094 6.5625C12.6338 6.5625 10.0313 7.66875 9.85313 10.8487C9.85056 10.9093 9.86041 10.9697 9.88206 11.0263C9.90371 11.0829 9.93672 11.1345 9.97904 11.1779C10.0214 11.2213 10.0721 11.2555 10.1282 11.2786C10.1842 11.3016 10.2444 11.313 10.305 11.3119ZM14.6644 23.3925C15.8081 23.3925 16.5938 22.6537 16.5938 21.6544C16.5938 20.6194 15.8063 19.8919 14.6644 19.8919C13.5694 19.8919 12.7725 20.6194 12.7725 21.6544C12.7725 22.6537 13.5675 23.3925 14.6644 23.3925Z" fill="#F1F1F1" />
          </svg>
        </svg>
      )}
    </label>
  );
};

export default Toggle;
