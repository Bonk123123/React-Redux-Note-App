import React from 'react';
import './NotePage.scss';
import { Link, useParams } from 'react-router-dom';
import Btn from '../../components/Btn/Btn';
import NoteTable from '../../components/NoteTable/NoteTable';
import NoteText from '../../components/NoteText/NoteText';
import NoteImage from '../../components/NoteImage/NoteImage';
import Plus from '../../components/SVGplus/Plus';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import AddModal from '../../components/AddModal/AddModal';
import { IContentTypes } from '../../models/NoteTypesOfContents';
import CreateImage from '../../components/CreateImage/CreateImage';
import CreateText from '../../components/CreateText/CreateText';
import CreateTable from '../../components/CreateTable/CreateTable';
import CreateCanvas from '../../components/CreateCanvas/CreateCanvas';
import {
    setNoteName,
    fetchOneNote,
    fetchUpdateNote,
    pushItem,
} from '../../redux/noteActSlice/noteActSlice';
import Loading from '../../components/Loading/Loading';

// let array: IContent[] = [
//     {
//         type: 'text',
//         content: 'cnjdkejc cnjdmd fdj j j ejjejjjej nll qn lfwqef j',
//     },
//     {
//         type: 'text',
//         content: 'привет меня зовут артур и я тут всё это сделал',
//     },
//     {
//         type: 'image',
//         content:
//             'https://api.360tv.ru/get_resized/DACzaD29NbA2Heg6c-EBkcB5wqlpygNFQzOndFMRmNI/rs:fill-down:1920:1080/g:fp:0.5:0.5/aHR0cHM6Ly8yNTc4MjQuc2VsY2RuLnJ1L2JhYnlsb24tbWVkaWEvYXJ0aWNsZXMvaW1hZ2UvMjAyMy80L2EwZTlmODYxLWZhMDEtNDZjZS04MDMyLTQxNzc0ODVkMjMxMi5qcGc.webp',
//     },
//     { type: 'line', content: 'line' },
//     {
//         type: 'table',
//         content: [
//             ['1', '2', '3', '4'],
//             ['aaa', 'bbb', 'ccc', 'ddd'],
//         ],
//     },
// ];

const NotePage = () => {
    const { note_id } = useParams();
    const [editMode, setEditMode] = React.useState(false);

    const [updateIsClicked, setUpdateIsClicked] = React.useState(false);

    const [modal, setModal] = React.useState({ x: 0, y: 0, visible: false });

    const { note, note_name, isLoading, message } = useAppSelector(
        (state) => state.noteAct
    );
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        dispatch(fetchOneNote(note_id ? note_id : ''));
    }, [dispatch, note_id]);

    const updateNote = async () => {
        if (!note_id) return;
        dispatch(fetchUpdateNote({ note, note_id, note_name }));
        setUpdateIsClicked(false);
        dispatch(fetchOneNote(note_id ? note_id : ''));
    };

    const handleAddContent = (content: IContentTypes) => {
        dispatch(pushItem(content));
        setModal((prev) => ({ ...prev, visible: false }));
    };

    const handleOnEdit = () => {
        setEditMode((prev) => !prev);
    };

    if (isLoading) return <Loading />;
    if (message) return <p className="error">{message}</p>;

    return (
        <div className="note">
            {modal.visible && (
                <AddModal
                    modal={modal}
                    setModal={setModal}
                    handleAddContent={handleAddContent}
                />
            )}

            <div className="note-name">
                <div className="note-name-nav">
                    <Link className="note-name-nav-home" to={'/'}>
                        <Btn className="note-name-nav-home-btn" name="<" />
                    </Link>
                    <Link className="note-name-nav-logout" to={'/login'}>
                        <Btn
                            className="note-name-nav-logout-btn"
                            name="logout"
                        />
                    </Link>
                </div>
                <p className="note-name-p">
                    {note_name ? note_name : 'note name'}
                </p>
            </div>

            <div className="note-content">
                {editMode && (
                    <input
                        className="note-content-name-input"
                        type="text"
                        value={note_name}
                        onChange={(e) => dispatch(setNoteName(e.target.value))}
                    />
                )}

                {note.map((item, i) => {
                    switch (item.type) {
                        case 'image':
                            return (
                                <>
                                    {editMode && <Plus view="x" />}
                                    {editMode ? (
                                        <CreateImage i={i} item={item} />
                                    ) : (
                                        <NoteImage item={item} />
                                    )}
                                </>
                            );

                        case 'text':
                            return (
                                <>
                                    {editMode && <Plus view="x" />}
                                    {editMode ? (
                                        <CreateText i={i} item={item} />
                                    ) : (
                                        <NoteText item={item} />
                                    )}
                                </>
                            );

                        case 'table':
                            return (
                                <>
                                    {editMode && <Plus view="x" />}
                                    {editMode ? (
                                        <CreateTable i={i} item={item} />
                                    ) : (
                                        <NoteTable item={item} />
                                    )}
                                </>
                            );

                        case 'canvas':
                            return (
                                <>
                                    {editMode && <Plus view="x" />}
                                    <CreateCanvas
                                        i={i}
                                        createIsClicked={updateIsClicked}
                                    />
                                </>
                            );

                        case 'line':
                            return (
                                <>
                                    {editMode && <Plus view="x" />}
                                    <span
                                        key={item.type}
                                        className="line"
                                    ></span>
                                </>
                            );
                        default:
                            return <></>;
                    }
                })}
                {editMode && (
                    <Btn
                        option={{
                            onClick: (e: React.MouseEvent<HTMLButtonElement>) =>
                                setModal((prev) => ({
                                    x: e.pageX,
                                    y: e.pageY,
                                    visible: !prev.visible,
                                })),
                        }}
                        name="add"
                    />
                )}
                {editMode && (
                    <div className="note-content-btn">
                        <Btn
                            className="note-content-btn-unsafe"
                            option={{
                                onClick: handleOnEdit,
                            }}
                            name="unsafe"
                        />
                        <Btn
                            className="note-content-btn-update"
                            option={{ onClick: updateNote }}
                            name="update"
                        />
                    </div>
                )}

                {!editMode && (
                    <Btn name="edit" option={{ onClick: handleOnEdit }} />
                )}
            </div>
        </div>
    );
};

export default NotePage;
