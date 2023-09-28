import React from 'react';
import './NewNotePage.scss';
import { Link } from 'react-router-dom';

import Btn from '../../components/Btn/Btn';
import CreateText from '../../components/CreateText/CreateText';
import CreateImage from '../../components/CreateImage/CreateImage';
import CreateCanvas from '../../components/CreateCanvas/CreateCanvas';
import CreateTable from '../../components/CreateTable/CreateTable';
import Plus from '../../components/SVGplus/Plus';
import { IContentTypes } from '../../models/NoteTypesOfContents';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import {
    deleteItem,
    deleteNote,
    pushItem,
    setNoteName,
} from '../../redux/noteActSlice/noteActSlice';
import Loading from '../../components/Loading/Loading';
import { fetchNewNote } from '../../redux/noteActSlice/noteActSlice';
import AddModal from '../../components/AddModal/AddModal';

const NewNote = () => {
    const { note, note_name, isLoading, message } = useAppSelector(
        (state) => state.noteAct
    );
    const dispatch = useAppDispatch();

    const [modal, setModal] = React.useState({ x: 0, y: 0, visible: false });
    const [createIsClicked, setCreateIsClicked] = React.useState(false);

    React.useEffect(() => {
        dispatch(deleteNote());
    }, [dispatch]);

    const handleAddContent = (content: IContentTypes) => {
        dispatch(pushItem(content));
        setModal((prev) => ({ ...prev, visible: false }));
    };

    const handleDeleteContent = (id: number) => {
        dispatch(deleteItem(id));
    };

    const createNote = async () => {
        setCreateIsClicked(true);
        dispatch(fetchNewNote({ note, note_name }));
    };

    return (
        <div className="new-note">
            {modal.visible && (
                <AddModal
                    modal={modal}
                    setModal={setModal}
                    handleAddContent={handleAddContent}
                />
            )}
            <div className="new-note-name">
                <div className="new-note-name-nav">
                    <Link className="new-note-name-nav-home" to={'/'}>
                        <Btn className="new-note-name-nav-home-btn" name="<" />
                    </Link>
                    <Link className="new-note-name-nav-logout" to={'/login'}>
                        <Btn
                            className="new-note-name-nav-logout-btn"
                            name="logout"
                        />
                    </Link>
                </div>

                <p className="new-note-name-p">
                    {note_name ? note_name : 'note name'}
                </p>
            </div>
            <div className="new-note-create">
                <input
                    className="new-note-create-name"
                    value={note_name}
                    onChange={(e) => dispatch(setNoteName(e.target.value))}
                    placeholder="note name"
                />
                <div className="new-note-create-to-send">
                    <div className="new-note-create-to-send-content">
                        {note.length === 0 && (
                            <p className="new-note-create-to-send-content-onempty">
                                click add to start create
                            </p>
                        )}

                        {note.map((item, i) => {
                            switch (item.type) {
                                case 'line':
                                    return (
                                        <>
                                            <Plus
                                                onClickFunction={() =>
                                                    handleDeleteContent(i)
                                                }
                                                view="x"
                                            />{' '}
                                            <span className="new-note-create-to-send-content-line"></span>
                                        </>
                                    );
                                case 'text':
                                    return (
                                        <>
                                            <Plus
                                                onClickFunction={() =>
                                                    handleDeleteContent(i)
                                                }
                                                view="x"
                                            />
                                            <CreateText i={i} />
                                        </>
                                    );
                                case 'image':
                                    return (
                                        <>
                                            <Plus
                                                onClickFunction={() =>
                                                    handleDeleteContent(i)
                                                }
                                                view="x"
                                            />
                                            <CreateImage i={i} />
                                        </>
                                    );
                                case 'canvas':
                                    return (
                                        <>
                                            <Plus
                                                onClickFunction={() =>
                                                    handleDeleteContent(i)
                                                }
                                                view="x"
                                            />
                                            <CreateCanvas
                                                i={i}
                                                createIsClicked={
                                                    createIsClicked
                                                }
                                            />
                                        </>
                                    );
                                case 'table':
                                    return (
                                        <>
                                            <Plus
                                                onClickFunction={() =>
                                                    handleDeleteContent(i)
                                                }
                                                view="x"
                                            />
                                            <CreateTable i={i} />
                                        </>
                                    );
                                default:
                                    return <></>;
                            }
                        })}
                    </div>
                    {message ? <p className="error">message</p> : ''}
                    {isLoading ? <Loading /> : ''}

                    <Btn
                        name="add"
                        className="new-note-create-to-send-addbtn"
                        option={{
                            onClick: (e: React.MouseEvent<HTMLButtonElement>) =>
                                setModal((prev) => ({
                                    x: e.pageX,
                                    y: e.pageY,
                                    visible: !prev.visible,
                                })),
                        }}
                    />

                    <Btn
                        name="create Note"
                        className="new-note-create-to-send-addbtn"
                        option={{ onClick: createNote }}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewNote;
