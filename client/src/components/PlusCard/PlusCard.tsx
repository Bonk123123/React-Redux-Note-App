import React from 'react';
import './PlusCard.scss';
import Plus from '../SVGplus/Plus';
import { Link } from 'react-router-dom';

const PlusCard = () => {
    return (
        <Link to={'/note'} className="plus-card">
            <Plus view="+" />
        </Link>
    );
};

export default PlusCard;
