import React from 'react';

const EditButton = ({ content, onClick }) => {
    return (
        <button onClick={onClick} className='w-fit h-fit p-4 flex flex-row font-medium gap-4 text-purpleT3 bg-whiteT1 rounded-xl ring-1 ring-whiteT2 shadow-md'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.816835 2.78413C1.3294 2.27526 2.0119 2 2.71143 2H9C9.50518 2 9.9147 2.43561 9.9147 2.97297C9.9147 3.51033 9.50518 3.94595 9 3.94595H2.71143C2.45792 3.94595 2.22641 4.04655 2.06507 4.20673C1.90586 4.36479 1.8294 4.56423 1.8294 4.75676V17.2432C1.8294 17.4358 1.90586 17.6352 2.06507 17.7933C2.22641 17.9534 2.45792 18.0541 2.71143 18.0541H15.2886C15.5421 18.0541 15.7736 17.9534 15.9349 17.7933C16.0941 17.6352 16.1706 17.4358 16.1706 17.2432V11C16.1706 10.4626 16.5801 10.027 17.0853 10.027C17.5905 10.027 18 10.4626 18 11V17.2432C18 17.9969 17.6979 18.7049 17.1832 19.2159C16.6706 19.7247 15.9881 20 15.2886 20H2.71143C2.0119 20 1.3294 19.7247 0.816835 19.2159C0.302135 18.7049 0 17.9969 0 17.2432V4.75676C0 4.00311 0.302135 3.29512 0.816835 2.78413Z" fill="#8E00FF" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M17.0854 2.00742C16.7936 2.00742 16.5257 2.12296 16.3379 2.30913L7.71656 10.8535L7.26635 12.6383L9.19815 12.1596L17.833 3.6018C18.0187 3.41781 18.1095 3.18368 18.1095 2.95547C18.1095 2.72725 18.0187 2.49312 17.833 2.30913C17.6452 2.12296 17.3773 2.00742 17.0854 2.00742ZM15.048 0.841599C15.5988 0.295718 16.3327 0 17.0854 0C17.8382 0 18.5721 0.295718 19.1229 0.841599C19.6759 1.38966 20 2.14841 20 2.95547C20 3.76253 19.6759 4.52127 19.1229 5.06933L10.3036 13.81C10.1827 13.9297 10.0344 14.0138 9.87343 14.0537L6.16003 14.9737C5.83653 15.0539 5.49715 14.9478 5.2661 14.6944C5.03506 14.4409 4.94626 14.0773 5.03221 13.7366L5.96056 10.0563C6.00636 9.87474 6.09925 9.71049 6.22865 9.58223L15.048 0.841599Z" fill="#8E00FF" />
            </svg>
            {content}
        </button>
    )
}

export default EditButton;