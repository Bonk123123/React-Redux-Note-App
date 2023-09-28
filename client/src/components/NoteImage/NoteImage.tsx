import React, { FC } from 'react';
import { IContent } from '../../models/NoteContent';
import './NoteImage.scss';

interface props {
    item: IContent;
}

const NoteImage: FC<props> = ({ item }) => {
    return (
        <img
            className="img"
            key={item.type}
            src={typeof item.content === 'string' ? item.content : ''}
            alt=""
        />
    );
};

export default NoteImage;
