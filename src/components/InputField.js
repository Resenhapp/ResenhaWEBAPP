import React from 'react';

const InputField = ({ placeholder, showIcon = false, Icon }) => {
  return (
    <div className="relative h-14 ring-2 ring-inset ring-whiteT2 bg-whiteT1 rounded-2xl flex items-center">
      {showIcon && Icon && (
        <div className="absolute left-0 pl-3 flex">
          {Icon === 'lock' ? (
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2.94388 5.67078C2.95577 2.95268 5.16757 0.759629 7.88469 0.770641C10.6017 0.771533 12.8048 2.97514 12.8048 5.69239V7.0927C14.4356 7.67827 15.6023 9.23802 15.6023 11.0712V15.0028C15.6023 17.3375 13.7099 19.2288 11.3763 19.2288H4.37202C2.03843 19.2288 0.146019 17.3375 0.146019 15.0028V11.0712C0.146019 9.23788 1.31285 7.67803 2.94387 7.09257L2.94388 5.67078ZM4.44387 6.8452H11.3048V5.69239C11.3048 3.80302 9.77241 2.27064 7.88304 2.27064H7.87975C5.99097 2.26237 4.45298 3.78614 4.44387 5.67578V6.8452ZM4.37202 8.3452C2.8666 8.3452 1.64602 9.56512 1.64602 11.0712V15.0028C1.64602 16.5089 2.8666 17.7288 4.37202 17.7288H11.3763C12.8817 17.7288 14.1023 16.5089 14.1023 15.0028V11.0712C14.1023 9.56512 12.8817 8.3452 11.3763 8.3452H4.37202ZM7.87433 11.2691C8.28854 11.2691 8.62433 11.6049 8.62433 12.0191V14.0551C8.62433 14.4693 8.28854 14.8051 7.87433 14.8051C7.46012 14.8051 7.12433 14.4693 7.12433 14.0551V12.0191C7.12433 11.6049 7.46012 11.2691 7.87433 11.2691Z"
                fill="#961CFF"
              />
            </svg>
          ) : Icon === 'mail' ? (
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.31388 1.95834C3.1284 1.95834 1.58333 3.71873 1.58333 6.06129V12.0452C1.58333 14.3877 3.1284 16.1481 5.31388 16.1481H13.9517C14.9897 16.1354 15.9785 15.6961 16.6879 14.9306C17.3983 14.164 17.7663 13.1372 17.7048 12.0892C17.7039 12.0745 17.7035 12.0598 17.7035 12.0452V6.06129C17.7035 6.04661 17.7039 6.03194 17.7048 6.0173C17.7663 4.96928 17.3983 3.94244 16.6879 3.17582C15.9785 2.41036 14.9898 1.97109 13.9517 1.95834H5.31388ZM0.0833282 6.06129C0.0833282 3.05294 2.14619 0.458344 5.31388 0.458344H13.9645C15.4173 0.474637 16.7989 1.08885 17.7881 2.15624C18.7719 3.21788 19.2823 4.63572 19.2035 6.08247V12.024C19.2823 13.4707 18.7719 14.8886 17.7881 15.9502C16.7989 17.0176 15.4173 17.6318 13.9645 17.6481L13.9561 17.6482L5.31388 17.6481C2.14619 17.6481 0.0833282 15.0535 0.0833282 12.0452V6.06129ZM3.8719 5.83814C4.13032 5.51442 4.60223 5.46149 4.92595 5.71991L8.86665 8.86571C9.33359 9.23012 9.9854 9.2304 10.4526 8.86655L14.3584 5.72186C14.681 5.4621 15.1532 5.51306 15.4129 5.8357C15.6727 6.15834 15.6217 6.63047 15.2991 6.89023L11.3815 10.0444C10.3699 10.8376 8.95052 10.8375 7.93885 10.0444L7.93367 10.0403L3.99013 6.89219C3.66642 6.63377 3.61348 6.16186 3.8719 5.83814Z"
                fill="#961CFF"
              />
            </svg>
          ) : Icon === 'id' ? (
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.375 0C1.74511 0 1.14102 0.243131 0.695621 0.675907C0.250223 1.10868 0 1.69565 0 2.30769V12.6923C0 13.3043 0.250223 13.8913 0.695621 14.3241C1.14102 14.7569 1.74511 15 2.375 15H15.625C16.2549 15 16.859 14.7569 17.3044 14.3241C17.7498 13.8913 18 13.3043 18 12.6923V2.30769C18 1.69565 17.7498 1.10868 17.3044 0.675907C16.859 0.243131 16.2549 0 15.625 0H2.375ZM1.1875 2.30769C1.1875 2.00167 1.31261 1.70819 1.53531 1.4918C1.75801 1.27541 2.06006 1.15385 2.375 1.15385H4.75V3.46154H1.1875V2.30769ZM5.9375 13.8462V1.15385H15.625C15.9399 1.15385 16.242 1.27541 16.4647 1.4918C16.6874 1.70819 16.8125 2.00167 16.8125 2.30769V12.6923C16.8125 13.0212 16.67 13.3188 16.4444 13.5288C15.8031 12.1085 14.6561 10.3846 11.305 10.3846C7.69853 10.3846 6.71531 12.3808 6.17738 13.8462H5.9375ZM1.1875 11.5385H4.75V13.8462H2.375C2.06006 13.8462 1.75801 13.7246 1.53531 13.5082C1.31261 13.2918 1.1875 12.9983 1.1875 12.6923V11.5385ZM4.75 10.3846H1.1875V8.07692H4.75V10.3846ZM4.75 6.92308H1.1875V4.61538H4.75V6.92308Z" fill="#961CFF" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9 6.5C9 5.11929 10.1193 4 11.5 4C12.8807 4 14 5.11929 14 6.5C14 7.88071 12.8807 9 11.5 9C10.1193 9 9 7.88071 9 6.5Z" fill="#961CFF" />
            </svg>
          ) : Icon === 'calendar' ? (
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11.942 0.75C11.942 0.335786 11.6306 0 11.2464 0C10.8622 0 10.5507 0.335786 10.5507 0.75V1.75H5.44926V0.75C5.44926 0.335786 5.13781 0 4.75361 0C4.36941 0 4.05796 0.335786 4.05796 0.75V1.75H2.31883C1.03816 1.75 -1.52588e-05 2.86929 -1.52588e-05 4.25L0 15C0 16.3807 1.03818 17.5 2.31884 17.5H13.6812C14.9618 17.5 16 16.3807 16 15L16 4.25C16 2.86929 14.9618 1.75 13.6811 1.75H11.942V0.75ZM14.6087 7V4.25C14.6087 3.69772 14.1934 3.25 13.6811 3.25H11.942V4.25C11.942 4.66421 11.6306 5 11.2464 5C10.8622 5 10.5507 4.66421 10.5507 4.25V3.25H5.44926V4.25C5.44926 4.66421 5.13781 5 4.75361 5C4.36941 5 4.05796 4.66421 4.05796 4.25V3.25H2.31883C1.80656 3.25 1.39129 3.69772 1.39129 4.25V7H14.6087ZM1.39129 8.5H14.6087L14.6087 15C14.6087 15.5523 14.1934 16 13.6812 16H2.31884C1.80658 16 1.3913 15.5523 1.3913 15L1.39129 8.5Z" fill="#961CFF" />
            </svg>
          ) : Icon === 'person' ? (
            <svg width="15" height="17" viewBox="0 0 15 17" fill="none" className='flex content-center align-center justify-center' xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M7.50017 1.52239C5.92903 1.52239 4.65537 2.77198 4.65537 4.31343C4.65537 5.85488 5.92903 7.10448 7.50017 7.10448C9.0713 7.10448 10.345 5.85488 10.345 4.31343C10.345 2.77198 9.0713 1.52239 7.50017 1.52239ZM3.10367 4.31343C3.10367 1.93119 5.07205 0 7.50017 0C9.92829 0 11.8967 1.93119 11.8967 4.31343C11.8967 6.69568 9.92829 8.62687 7.50017 8.62687C5.07205 8.62687 3.10367 6.69568 3.10367 4.31343Z" fill="#961CFF" />
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9.36759 11.0035C8.12491 10.8794 6.87516 10.8794 5.63248 11.0035L5.61601 11.0049C4.95873 11.0567 4.30511 11.1611 3.65995 11.3175L3.65314 11.3192C3.22755 11.4184 2.78293 11.5725 2.41416 11.7872C2.04588 12.0015 1.80364 12.2459 1.68608 12.5084C1.50638 12.943 1.50692 13.4533 1.68769 13.8874C1.81003 14.1716 2.05125 14.4128 2.41051 14.6165C2.77351 14.8222 3.21464 14.9646 3.65277 15.0616C3.66087 15.0634 3.66894 15.0653 3.67698 15.0674C4.31523 15.23 4.96295 15.3368 5.61457 15.3869C5.65311 15.3898 5.69137 15.3956 5.72903 15.4042C5.87305 15.4369 6.0213 15.4399 6.27714 15.4399C6.29325 15.4399 6.30935 15.4404 6.32543 15.4414C7.34023 15.5035 8.35758 15.4857 9.37031 15.3882L9.38498 15.3869C10.0399 15.3361 10.6909 15.2292 11.3327 15.067C11.3398 15.0652 11.3469 15.0635 11.354 15.0619C11.7889 14.9648 12.2304 14.8224 12.5936 14.6165C12.9546 14.4118 13.1935 14.171 13.3114 13.8897C13.494 13.453 13.494 12.9389 13.3114 12.5022C13.1935 12.2209 12.9545 11.9798 12.5923 11.7735C12.2279 11.566 11.785 11.4212 11.3469 11.3191L11.3408 11.3177C10.6951 11.1618 10.0411 11.0573 9.38335 11.0049L9.36759 11.0035ZM9.5168 9.48812C8.175 9.35472 6.82542 9.35471 5.48362 9.48808C4.74605 9.54659 4.01336 9.66382 3.29103 9.83877C2.76673 9.96124 2.1646 10.1623 1.62246 10.4778C1.08144 10.7927 0.548558 11.2526 0.258824 11.911L0.253417 11.9236C-0.0844723 12.7309 -0.0844723 13.661 0.253417 14.4683L0.255651 14.4736C0.548069 15.1577 1.08248 15.6219 1.63424 15.9347C2.17902 16.2435 2.78085 16.4284 3.29878 16.5439C4.00329 16.7227 4.71902 16.8419 5.43997 16.9004C5.74839 16.9625 6.03659 16.9624 6.25206 16.9623C6.25248 16.9623 6.2529 16.9623 6.25331 16.9623C7.34034 17.0276 8.43002 17.0081 9.51462 16.904C10.2535 16.8463 10.9872 16.7258 11.7093 16.5439C12.2227 16.4285 12.8249 16.2436 13.3699 15.9347C13.921 15.6223 14.4581 15.1569 14.7465 14.4687C15.0844 13.6613 15.0845 12.7309 14.7467 11.9236C14.4582 11.2354 13.9211 10.7699 13.3712 10.4568C12.8247 10.1456 12.2206 9.9582 11.7087 9.83869C10.9865 9.66443 10.2541 9.54725 9.5168 9.48812Z" fill="#961CFF" />
            </svg>
          ) : Icon === 'card' ? (
            <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.75 1.375C20.1147 1.375 20.4644 1.51987 20.7223 1.77773C20.9801 2.03559 21.125 2.38533 21.125 2.75V13.75C21.125 14.1147 20.9801 14.4644 20.7223 14.7223C20.4644 14.9801 20.1147 15.125 19.75 15.125H3.25C2.88533 15.125 2.53559 14.9801 2.27773 14.7223C2.01987 14.4644 1.875 14.1147 1.875 13.75V2.75C1.875 2.38533 2.01987 2.03559 2.27773 1.77773C2.53559 1.51987 2.88533 1.375 3.25 1.375H19.75ZM3.25 0C2.52065 0 1.82118 0.289731 1.30546 0.805456C0.789731 1.32118 0.5 2.02065 0.5 2.75V13.75C0.5 14.4793 0.789731 15.1788 1.30546 15.6945C1.82118 16.2103 2.52065 16.5 3.25 16.5H19.75C20.4793 16.5 21.1788 16.2103 21.6945 15.6945C22.2103 15.1788 22.5 14.4793 22.5 13.75V2.75C22.5 2.02065 22.2103 1.32118 21.6945 0.805456C21.1788 0.289731 20.4793 0 19.75 0H3.25Z" fill="#961CFF" />
              <path d="M3.25 4.8125C3.25 4.63016 3.32243 4.4553 3.45136 4.32636C3.5803 4.19743 3.75516 4.125 3.9375 4.125H6.6875C6.86984 4.125 7.0447 4.19743 7.17364 4.32636C7.30257 4.4553 7.375 4.63016 7.375 4.8125V6.1875C7.375 6.36984 7.30257 6.5447 7.17364 6.67364C7.0447 6.80257 6.86984 6.875 6.6875 6.875H3.9375C3.75516 6.875 3.5803 6.80257 3.45136 6.67364C3.32243 6.5447 3.25 6.36984 3.25 6.1875V4.8125ZM3.25 8.9375C3.25 8.75516 3.32243 8.58029 3.45136 8.45136C3.5803 8.32243 3.75516 8.25 3.9375 8.25H10.8125C10.9948 8.25 11.1697 8.32243 11.2986 8.45136C11.4276 8.58029 11.5 8.75516 11.5 8.9375C11.5 9.11984 11.4276 9.29471 11.2986 9.42364C11.1697 9.55257 10.9948 9.625 10.8125 9.625H3.9375C3.75516 9.625 3.5803 9.55257 3.45136 9.42364C3.32243 9.29471 3.25 9.11984 3.25 8.9375ZM3.25 11.6875C3.25 11.5052 3.32243 11.3303 3.45136 11.2014C3.5803 11.0724 3.75516 11 3.9375 11H5.3125C5.49484 11 5.6697 11.0724 5.79864 11.2014C5.92757 11.3303 6 11.5052 6 11.6875C6 11.8698 5.92757 12.0447 5.79864 12.1736C5.6697 12.3026 5.49484 12.375 5.3125 12.375H3.9375C3.75516 12.375 3.5803 12.3026 3.45136 12.1736C3.32243 12.0447 3.25 11.8698 3.25 11.6875ZM7.375 11.6875C7.375 11.5052 7.44743 11.3303 7.57636 11.2014C7.7053 11.0724 7.88016 11 8.0625 11H9.4375C9.61984 11 9.7947 11.0724 9.92364 11.2014C10.0526 11.3303 10.125 11.5052 10.125 11.6875C10.125 11.8698 10.0526 12.0447 9.92364 12.1736C9.7947 12.3026 9.61984 12.375 9.4375 12.375H8.0625C7.88016 12.375 7.7053 12.3026 7.57636 12.1736C7.44743 12.0447 7.375 11.8698 7.375 11.6875ZM11.5 11.6875C11.5 11.5052 11.5724 11.3303 11.7014 11.2014C11.8303 11.0724 12.0052 11 12.1875 11H13.5625C13.7448 11 13.9197 11.0724 14.0486 11.2014C14.1776 11.3303 14.25 11.5052 14.25 11.6875C14.25 11.8698 14.1776 12.0447 14.0486 12.1736C13.9197 12.3026 13.7448 12.375 13.5625 12.375H12.1875C12.0052 12.375 11.8303 12.3026 11.7014 12.1736C11.5724 12.0447 11.5 11.8698 11.5 11.6875ZM15.625 11.6875C15.625 11.5052 15.6974 11.3303 15.8264 11.2014C15.9553 11.0724 16.1302 11 16.3125 11H17.6875C17.8698 11 18.0447 11.0724 18.1736 11.2014C18.3026 11.3303 18.375 11.5052 18.375 11.6875C18.375 11.8698 18.3026 12.0447 18.1736 12.1736C18.0447 12.3026 17.8698 12.375 17.6875 12.375H16.3125C16.1302 12.375 15.9553 12.3026 15.8264 12.1736C15.6974 12.0447 15.625 11.8698 15.625 11.6875Z" fill="#961CFF" />
            </svg>
          ) : Icon === 'cvv' ? (
            <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.75 1.625C20.1147 1.625 20.4644 1.76987 20.7223 2.02773C20.9801 2.28559 21.125 2.63533 21.125 3V14C21.125 14.3647 20.9801 14.7144 20.7223 14.9723C20.4644 15.2301 20.1147 15.375 19.75 15.375H3.25C2.88533 15.375 2.53559 15.2301 2.27773 14.9723C2.01987 14.7144 1.875 14.3647 1.875 14V3C1.875 2.63533 2.01987 2.28559 2.27773 2.02773C2.53559 1.76987 2.88533 1.625 3.25 1.625H19.75ZM3.25 0.25C2.52065 0.25 1.82118 0.539731 1.30546 1.05546C0.789731 1.57118 0.5 2.27065 0.5 3V14C0.5 14.7293 0.789731 15.4288 1.30546 15.9445C1.82118 16.4603 2.52065 16.75 3.25 16.75H19.75C20.4793 16.75 21.1788 16.4603 21.6945 15.9445C22.2103 15.4288 22.5 14.7293 22.5 14V3C22.5 2.27065 22.2103 1.57118 21.6945 1.05546C21.1788 0.539731 20.4793 0.25 19.75 0.25H3.25Z" fill="#961CFF" />
              <path d="M8.5 12C8.5 11.1716 9.17157 10.5 10 10.5C10.8284 10.5 11.5 11.1716 11.5 12C11.5 12.8284 10.8284 13.5 10 13.5C9.17157 13.5 8.5 12.8284 8.5 12Z" fill="#961CFF" />
              <path d="M12.5 12C12.5 11.1716 13.1716 10.5 14 10.5C14.8284 10.5 15.5 11.1716 15.5 12C15.5 12.8284 14.8284 13.5 14 13.5C13.1716 13.5 12.5 12.8284 12.5 12Z" fill="#961CFF" />
              <path d="M16.5 12C16.5 11.1716 17.1716 10.5 18 10.5C18.8284 10.5 19.5 11.1716 19.5 12C19.5 12.8284 18.8284 13.5 18 13.5C17.1716 13.5 16.5 12.8284 16.5 12Z" fill="#961CFF" />
            </svg>
          ) : null}
        </div>
      )}
      <input
        type="text"
        className={`pl-3 pr-2 block w-full bg-transparent sm:text-sm rounded-xl ml-7 outline-none text-blackT1 placeholder-grayT0 ${showIcon ? 'pl-10' : ''
          }`}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
