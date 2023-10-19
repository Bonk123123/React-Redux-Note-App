import React, { FC } from 'react';
import './CreateImage.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { updateItem } from '../../redux/noteContentSlice/noteContentSlice';
import { IContent } from '../../models/NoteContent';

interface props {
    i: number;
    item?: IContent;
}

const CreateImage: FC<props> = ({ i, item }) => {
    const dispatch = useAppDispatch();
    const { content } = useAppSelector((state) => state.noteContent.note[i]);

    const inpRef = React.useRef<HTMLInputElement>(null);

    const handleClickInput = () => {
        inpRef.current?.click();
    };

    React.useEffect(() => {
        if (item) {
            dispatch(
                updateItem({
                    j: i,
                    content: { type: 'image', content: item.content },
                })
            );
        }
    }, [dispatch, i]);

    const overrideEventDefaults = (
        e: React.DragEvent<HTMLDivElement> | React.ChangeEvent<HTMLInputElement>
    ) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
        overrideEventDefaults(e);
        if (e.dataTransfer.files)
            dispatch(
                updateItem({
                    j: i,
                    content: {
                        type: 'image',
                        content: e.dataTransfer.files[0],
                    },
                })
            );
    };

    const handleSetFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        overrideEventDefaults(e);
        if (e.target.files)
            dispatch(
                updateItem({
                    j: i,
                    content: {
                        type: 'image',
                        content: e.target.files[0],
                    },
                })
            );
    };

    return (
        <div
            onClick={handleClickInput}
            onDrop={(e) => handleDropFile(e)}
            onDragEnter={overrideEventDefaults}
            onDragLeave={overrideEventDefaults}
            onDragOver={overrideEventDefaults}
            className="add-image"
        >
            <input
                onChange={(e) => handleSetFile(e)}
                ref={inpRef}
                type="file"
                className="add-image-input"
            />
            <p className="add-image-name">
                {content instanceof File
                    ? 'Image name: ' +
                      content.name +
                      ', size: ' +
                      (content.size / 1024).toFixed() +
                      'kb'
                    : 'click or drop to set Image'}
            </p>
            <img
                className="add-image-img"
                src={
                    content instanceof File
                        ? URL.createObjectURL(content)
                        : typeof content === 'string'
                        ? content
                        : ''
                }
                alt=""
            />
        </div>
    );
};

export default CreateImage;
