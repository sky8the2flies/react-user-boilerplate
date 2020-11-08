import React from 'react';

import './Error.css';

const Error = (props) => {
    return (
        <div
            className="Error-parent"
            style={{ position: props.floating ? 'absolute' : 'relative' }}
        >
            <div className="Error-close" onClick={() => props.closeErr()}>
                &times;
            </div>
            <div
                className="Error-content"
                style={{
                    backgroundColor: props.bgColor ? `${props.bgColor}` : 'red',
                    color: props.color ? `${props.color}` : 'white',
                }}
                color={props.color}
            >
                {props.children}
            </div>
        </div>
    );
};

export default Error;
