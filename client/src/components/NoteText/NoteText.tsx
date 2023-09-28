import React, { FC } from 'react';
import { IContent } from '../../models/NoteContent';
import './NoteText.scss';

interface props {
    item: IContent;
}

const NoteText: FC<props> = ({ item }) => {
    return (
        <p className="text" key={item.type}>
            {!(item.content instanceof File) ? item.content : ''}
        </p>
    );
};

export default NoteText;
