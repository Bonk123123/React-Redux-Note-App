import React from 'react';
import './NotePage.scss';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
    fetchNoteContent,
    pushItem,
    fetchNewNoteContent,
    deleteItem,
} from '../../redux/noteContentSlice/noteContentSlice';
import Loading from '../../components/Loading/Loading';
import { getCookie } from '../../utils/getCookie';
import { status } from '../../models/Status';
import {
    fetchChangeNoteName,
    fetchNote,
    setId,
    setNoteName,
} from '../../redux/noteSlice/noteSlice';

const NotePage = () => {
    const navigate = useNavigate();
    const { note_id } = useParams();
    const [status, setStatus] = React.useState<status>('in progress');
    const [userId, setUserId] = React.useState('');

    const [editMode, setEditMode] = React.useState(false);

    const [updateIsClicked, setUpdateIsClicked] = React.useState(false);

    const [modal, setModal] = React.useState({ x: 0, y: 0, visible: false });

    const { note, isLoading } = useAppSelector((state) => state.noteContent);
    const { note_name } = useAppSelector((state) => state.note.note);

    const { message } = useAppSelector((state) => state.note);

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const user = JSON.parse(JSON.stringify(getCookie('user')));
        if (!user) navigate('/login');
        setUserId(user.user_id);
        if (note_id) {
            dispatch(fetchNote(note_id));
            dispatch(fetchNoteContent(note_id ? note_id : ''));
        }
    }, [dispatch, note_id]);

    const updateNote = async () => {
        handleOnEdit();
        if (!note_id) return;
        await dispatch(fetchChangeNoteName({ note_id, note_name }));
        await dispatch(fetchNewNoteContent({ content: note, note_id }));
        dispatch(fetchNoteContent(note_id));
    };

    const handleDeleteContent = (id: number) => {
        dispatch(deleteItem(id));
    };

    const handleAddContent = (content: IContentTypes) => {
        dispatch(pushItem(content));
        setModal((prev) => ({ ...prev, visible: false }));
    };

    const handleOnEdit = () => {
        setEditMode((prev) => !prev);
    };

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
                    <Link
                        className="note-name-nav-home"
                        onClick={() => dispatch(setId(''))}
                        to={'/'}
                    >
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
                                    {editMode && (
                                        <Plus
                                            view="x"
                                            onClickFunction={() =>
                                                handleDeleteContent(i)
                                            }
                                        />
                                    )}
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
                                    {editMode && (
                                        <Plus
                                            view="x"
                                            onClickFunction={() =>
                                                handleDeleteContent(i)
                                            }
                                        />
                                    )}
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
                                    {editMode && (
                                        <Plus
                                            view="x"
                                            onClickFunction={() =>
                                                handleDeleteContent(i)
                                            }
                                        />
                                    )}
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
                                    {editMode && (
                                        <Plus
                                            view="x"
                                            onClickFunction={() =>
                                                handleDeleteContent(i)
                                            }
                                        />
                                    )}
                                    <CreateCanvas
                                        i={i}
                                        createIsClicked={updateIsClicked}
                                    />
                                </>
                            );

                        case 'line':
                            return (
                                <>
                                    {editMode && (
                                        <Plus
                                            view="x"
                                            onClickFunction={() =>
                                                handleDeleteContent(i)
                                            }
                                        />
                                    )}
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

                {isLoading && <Loading />}
            </div>
        </div>
    );
};

export default NotePage;
