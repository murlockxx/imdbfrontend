import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as fasStar } from '@fortawesome/free-solid-svg-icons';

function InteractiveStar() {
    const [isClicked, setIsClicked] = useState(false);
    const [hover, setHover] = useState(false);

    return (
        <button
            className="btn btn-sm btn-secondary"
            onClick={() => setIsClicked(!isClicked)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ background: 'none', border: 'none', color: hover || isClicked ? '#ffc107' : '#e4e5e9',width: '30px' }}
        >
            <FontAwesomeIcon icon={isClicked || hover ? fasStar : farStar} />
        </button>
    );
}

export default InteractiveStar;
