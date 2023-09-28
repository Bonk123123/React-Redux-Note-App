import React from 'react';
import './MainPage.scss';

import Note from '../../components/Note/Note';
import PlusCard from '../../components/PlusCard/PlusCard';
import Btn from '../../components/Btn/Btn';
import Inp from '../../components/Inp/Inp';
import useDebounce from '../../hooks/useDebounce';
import { Link } from 'react-router-dom';
import More from '../../components/SVGMore/More';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchNotes } from '../../redux/noteSlice/noteSlice';
import Loading from '../../components/Loading/Loading';

const MainPage = () => {
    const { notes, isLoading, message } = useAppSelector((state) => state.note);
    const dispatch = useAppDispatch();
    const [search, setSearch] = React.useState('');
    // const navigate = useNavigate();

    React.useEffect(() => {
        // document.cookie = 'user=fdfdfdfd; max-age=3';
        // const user = JSON.parse(document.cookie);
        // if (!user) navigate('/login');
        dispatch(fetchNotes(search));
    }, [dispatch, search]);

    const handleFetchNotes = React.useCallback(() => {
        dispatch(fetchNotes(search));
    }, [dispatch, search]);

    const debounce = useDebounce(handleFetchNotes, 300);

    return (
        <div className="main-grid">
            <span className="main-grid-span">
                <Link className="main-grid-span-logout" to={'/login'}>
                    <Btn className="main-grid-span-logout-btn" name="logout" />
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
            {message ? <p className="error">{message}</p> : <></>}
            {!isLoading ? <PlusCard /> : <Loading />}
            {!isLoading ? (
                notes.map((item) => (
                    <Note
                        cardName={item.note_name}
                        describe={item.note_describe}
                        status={item.note_status}
                        lastChange={item.note_last_change}
                    />
                ))
            ) : (
                <></>
            )}

            {notes.length >= 15 && (
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
