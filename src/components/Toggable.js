import React from 'react';
import PropTypes from 'prop-types';

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

Toggable.propTypes = {
    visible : PropTypes.bool.isRequired,
    toggle : PropTypes.func.isRequired,
    buttonLabel : PropTypes.string.isRequired,
    children : PropTypes.node.isRequired,
}

export default Toggable