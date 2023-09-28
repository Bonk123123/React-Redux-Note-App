import React, { FC } from 'react';
import './AddModal.scss';
import { IContentTypes } from '../../models/NoteTypesOfContents';
import Btn from '../Btn/Btn';

interface props {
    modal: { x: number; y: number; visible: boolean };
    setModal: React.Dispatch<
        React.SetStateAction<{
            x: number;
            y: number;
            visible: boolean;
        }>
    >;
    handleAddContent: (content: IContentTypes) => void;
}

const AddModal: FC<props> = ({ modal, setModal, handleAddContent }) => {
    const modalRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleCloseModalOutside = (e: MouseEvent) => {
            if (!e.target || !modalRef.current) return;
            if (
                e.target instanceof Element &&
                !modalRef.current.contains(e.target) &&
                modal.visible
            ) {
                setModal((prev) => ({ ...prev, visible: false }));
            }
        };
        document.addEventListener(
            'click',
            (e) => handleCloseModalOutside(e),
            true
        );

        return document.removeEventListener(
            'click',
            (e) => handleCloseModalOutside(e),
            true
        );
    }, [modal, setModal]);
    return (
        <div
            ref={modalRef}
            style={{
                bottom: window.innerHeight - modal.y,
                left: modal.x,
            }}
            className="modal"
        >
            <Btn
                option={{
                    onClick: () => handleAddContent('text'),
                }}
                name="Text"
            />
            <Btn
                option={{
                    onClick: () => handleAddContent('image'),
                }}
                name="Image"
            />
            <Btn
                option={{
                    onClick: () => handleAddContent('line'),
                }}
                name="Line"
            />
            <Btn
                option={{
                    onClick: () => handleAddContent('canvas'),
                }}
                name="Canvas"
            />
            <Btn
                option={{
                    onClick: () => handleAddContent('table'),
                }}
                name="Table"
            />
        </div>
    );
};

export default AddModal;
