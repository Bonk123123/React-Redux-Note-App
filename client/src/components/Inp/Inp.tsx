import React, { FC } from 'react';
import './Inp.scss';

interface props {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
    className?: string;
    debounce?: () => void;
    option?: Object;
}

const Inp: FC<props> = ({
    state,
    setState,
    placeholder,
    className,
    option,
    debounce,
}) => {
    const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState(e.target.value);
        if (debounce) debounce();
    };

    return (
        <input
            onChange={(e) => changeInputHandler(e)}
            value={state}
            placeholder={placeholder}
            className={'inp ' + className}
            {...option}
        />
    );
};

export default Inp;
