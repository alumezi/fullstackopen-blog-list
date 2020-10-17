import React from 'react';

const Toggable = ({ visible, toggle, buttonLabel, children }) => {
    const style = {
        display: visible ? "" : "none"
    }

    return <>
        <button onClick={() => toggle(true)}>{buttonLabel}</button>
        <div style={style} >
            {children}
            <button onClick={() => toggle(false)}>cancel</button>
        </div>
    </>
}

export default Toggable