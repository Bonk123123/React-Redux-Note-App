import React, { FC } from 'react';
import { IContent } from '../../models/NoteContent';
import './NoteImage.scss';

interface props {
    item: IContent;
}

const NoteImage: FC<props> = ({ item }: any) => {
    return (
        <img
            className="img"
            key={item.type}
            src={item.content}
            alt={item.content}
        />
    );
};

export default NoteImage;
