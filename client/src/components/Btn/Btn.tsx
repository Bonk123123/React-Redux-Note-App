import React, { FC } from 'react';
import './Btn.scss';

interface props {
    name: string;
    className?: string;
    option?: Object;
    children?: React.ReactNode;
}

const Btn: FC<props> = ({ name, className, option, children }) => {
    return (
        <button className={className ? 'btn ' + className : 'btn'} {...option}>
            {name}
            {children}
        </button>
    );
};

export default Btn;
