import React from 'react';

const DualButton = ({leftButtonText, rightButtonText}) => {
    return (
        <div>
            <div><h1>{leftButtonText}</h1></div>
            <div><h1>{rightButtonText}</h1></div>
        </div>
    );
};

export default DualButton;