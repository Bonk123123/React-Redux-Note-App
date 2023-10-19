import React from 'react';
import './PlusCard.scss';
import Plus from '../SVGplus/Plus';
import { Link, useNavigate } from 'react-router-dom';
import Inp from '../Inp/Inp';
import Btn from '../Btn/Btn';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchNewNote } from '../../redux/noteSlice/noteSlice';
import { getCookie } from '../../utils/getCookie';

const PlusCard = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { id } = useAppSelector((state) => state.note.note);

    const [create_btn, setCreate_btn] = React.useState(false);

    const [name, setName] = React.useState('');

    const handleCreateNote = () => {
        const user = JSON.parse(getCookie('user'));

        dispatch(fetchNewNote({ note_name: name, user_id: user.user_id }));
    };

    React.useEffect(() => {
        if (id !== '') navigate(`note/${id}`);
    }, [id]);

    return (
        <div onClick={() => setCreate_btn(true)} className="plus-card">
            {create_btn ? (
                <div>
                    <Inp
                        placeholder="post name"
                        state={name}
                        setState={setName}
                        className="plus-card-input"
                    />
                    <div>
                        <Btn
                            name="create"
                            className="plus-card-btns"
                            option={{ onClick: handleCreateNote }}
                        />
                        <Btn
                            name="cancel"
                            className="plus-card-btns"
                            option={{ onClick: () => setCreate_btn(false) }}
                        />
                    </div>
                </div>
            ) : (
                <Plus view="+" />
            )}
        </div>
    );
};

export default PlusCard;
