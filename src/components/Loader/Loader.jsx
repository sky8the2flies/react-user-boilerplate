import React from 'react';

import './Loader.css';

const Loader = (props) => {
    return (
        <div className={'Loader-container'}>
            <div
                style={{
                    witdh: props.witdh ? props.witdh : 25,
                    height: props.height ? props.height : 25,
                }}
                className={'Loader'}
            />
        </div>
    );
};

export default Loader;
