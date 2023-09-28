import React, { FC } from 'react';
import './Plus.scss';

interface props {
    view: 'x' | '+';
    onClickFunction?: () => void;
}

const Plus: FC<props> = ({ view, onClickFunction }) => {
    return (
        <svg
            onClick={onClickFunction}
            className={view === '+' ? 'plus' : 'cross'}
            fill="#ffffff"
            height="800px"
            width="800px"
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
        >
            <polygon points="13,11 13,4 11,4 11,11 4,11 4,13 11,13 11,20 13,20 13,13 20,13 20,11 " />
        </svg>
    );
};

export default Plus;
