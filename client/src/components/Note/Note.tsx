import React, { FC } from 'react';
import './Note.scss';

import Complete from '../SVGstatus/Complete';
import InProgress from '../SVGstatus/InProgress';
import TemporarilyStopped from '../SVGstatus/TemporarilyStopped';
import { Link } from 'react-router-dom';
import { status } from '../../models/Status';

interface props {
    cardName: string;
    describe: string;
    status: status;
    lastChange: Date;
}

const Note: FC<props> = ({ cardName, describe, status, lastChange }) => {
    return (
        <Link to={'/note/id'} className="card">
            <div className="card-up">
                {status === 'in progress' && <InProgress />}
                {status === 'temporarily stopped' && <TemporarilyStopped />}
                {status === 'completed' && <Complete />}
                <p className="card-up-date">
                    Last change: <br /> {lastChange.toDateString()}
                </p>
            </div>
            <div className="card-down">
                <p className="card-down-name">{cardName}</p>
                <p className="card-down-describe">{describe}</p>
            </div>
        </Link>
    );
};

export default Note;
