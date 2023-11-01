import React from 'react';


{/*Component that isn't Projects*/}
function BackgroundBox(props) {
    const boxStyle = {
        backgroundColor: props.backgroundColor || '#FFE5B4',
        border: '1px solid #ccc',
        padding: '10px'
    };
    
    return (
        <div style = {boxStyle}>
            {props.children}
        </div>
    );
}

export default BackgroundBox;