import React from 'react';
import './svg.scss';

const TemporarilyStopped = () => {
    return (
        <svg
            className="imgSVG"
            fill="#ffffff"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
        >
            <g>
                <rect x="11" y="6" width="2" height="2" />
                <rect x="11" y="10" width="2" height="8" />
                <path
                    d="M21,5V4h-1V3h-1V2H5v1H4v1H3v1H2v14h1v1h1v1h1v1h14v-1h1v-1h1v-1h1V5H21z M20,17h-1v1h-1v1h-1v1H7v-1H6v-1H5v-1H4V7h1V6h1
          V5h1V4h10v1h1v1h1v1h1V17z"
                />
            </g>
        </svg>
    );
};

export default TemporarilyStopped;
