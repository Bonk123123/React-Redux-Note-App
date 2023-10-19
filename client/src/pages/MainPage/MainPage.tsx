import React from 'react';
import './MainPage.scss';

import Note from '../../components/Note/Note';
import PlusCard from '../../components/PlusCard/PlusCard';
import Btn from '../../components/Btn/Btn';
import Inp from '../../components/Inp/Inp';
import useDebounce from '../../hooks/useDebounce';
import { Link, useNavigate } from 'react-router-dom';
import More from '../../components/SVGMore/More';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchNotes } from '../../redux/notesSlice/notesSlice';
import Loading from '../../components/Loading/Loading';
import { getCookie } from '../../utils/getCookie';

const MainPage = () => {
    const { notes, isLoading, message } = useAppSelector(
        (state) => state.notes
    );
    const dispatch = useAppDispatch();
    const [search, setSearch] = React.useState('');
    const navigate = useNavigate();

    React.useEffect(() => {
        // if (!getCookie('user')) navigate('/login');
        const user = JSON.parse(JSON.stringify(getCookie('user')));
        if (!user) navigate('/login');
        dispatch(fetchNotes(''));
    }, [dispatch]);

    const handleFetchNotes = React.useCallback(() => {
        dispatch(fetchNotes(search));
    }, [dispatch, search]);

    const debounce = useDebounce(handleFetchNotes, 300);

    return (
        <div className="main-grid">
            <span className="main-grid-span">
                <Link className="main-grid-span-logout" to={'/login'}>
                    <Btn
                        className="main-grid-span-logout-btn"
                        name="logout"
                        option={{ onClick: () => (document.cookie = 'user=') }}
                    />
                </Link>
                <p className="main-grid-span-name">my notes</p>

                <Inp
                    className="main-grid-span-search"
                    state={search}
                    setState={setSearch}
                    placeholder="search note"
                    debounce={debounce}
                />
            </span>
            {message ? (
                <p className="error">{message}</p>
            ) : (
                <>
                    {!isLoading ? <PlusCard /> : <Loading />}
                    {!isLoading ? (
                        notes.map((item) => (
                            <Note
                                cardName={item.note_name}
                                status={item.note_status}
                                lastChange={item.last_change}
                                id={item.id}
                            />
                        ))
                    ) : (
                        <></>
                    )}
                </>
            )}

            {notes.length >= 30 && (
                <span className="main-grid-span-btn">
                    <Btn className="main-grid-span-btn-more" name="">
                        <More />
                    </Btn>
                </span>
            )}
        </div>
    );
};

export default MainPage;
