import React from 'react';

function Die(props) {
    const isHeldBackgroundColor = {
        backgroundColor: props.isHeld ? "#59e391" : "white"
    }

    return (
        <div
            className='die-face'
            style={isHeldBackgroundColor}
            onClick={props.holdDice}
        >
            <h2 className='die-num'>
                {props.value}
            </h2>
        </div>
    )
}

export default Die;