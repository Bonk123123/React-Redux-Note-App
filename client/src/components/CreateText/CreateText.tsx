import React, { FC } from 'react';
import './CreateText.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { updateItem } from '../../redux/noteContentSlice/noteContentSlice';
import { IContent } from '../../models/NoteContent';

interface props {
    i: number;
    item?: IContent;
}

const CreateText: FC<props> = ({ i, item }) => {
    const { content } = useAppSelector((state) => state.noteContent.note[i]);
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        if (item) {
            dispatch(
                updateItem({
                    j: i,
                    content: { type: 'text', content: item.content },
                })
            );
        }
    }, [dispatch, i]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(
            updateItem({
                j: i,
                content: { type: 'text', content: e.target.value },
            })
        );
    };
    return (
        <textarea
            value={typeof content === 'string' ? content : ''}
            onChange={(e) => handleChange(e)}
            placeholder="your Text"
            className="add-textarea"
        ></textarea>
    );
};

export default CreateText;
