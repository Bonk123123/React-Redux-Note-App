import React, { FC } from 'react';
import './Note.scss';

import Complete from '../SVGstatus/Complete';
import InProgress from '../SVGstatus/InProgress';
import TemporarilyStopped from '../SVGstatus/TemporarilyStopped';
import { Link } from 'react-router-dom';
import { status } from '../../models/Status';

interface props {
    cardName: string;
    status: status;
    lastChange: Date;
    id: string;
}

const Note: FC<props> = ({ cardName, status, lastChange, id }) => {
    return (
        <Link to={`/note/${id}`} className="card">
            <div className="card-up">
                {status === 'in progress' && <InProgress />}
                {status === 'temporarily stopped' && <TemporarilyStopped />}
                {status === 'completed' && <Complete />}
                <p className="card-up-date">
                    Last update: <br /> {new Date(lastChange).toUTCString()}
                </p>
            </div>
            <div className="card-down">
                <p className="card-down-name">{cardName}</p>
            </div>
        </Link>
    );
};

export default Note;
