import React, { FC } from 'react';
import Canvas from '../components/canvas/Canvas';
import './Layout.scss';
import { Outlet } from 'react-router-dom';
import Btn from '../components/Btn/Btn';
import { useDispatch } from 'react-redux';
import { pauseOrResumeGame, setColor } from '../redux/canvasSlice/canvasSlice';
import { useAppSelector } from '../hooks/reduxHooks';

const Layout: FC = () => {
    const { pause } = useAppSelector((state) => state.canvas);

    const dispatch = useDispatch();

    return (
        <div className="layout">
            <Canvas />
            <div className="layout-info">
                {/* <p>generation: {generation}</p> */}
                <input
                    defaultValue={'#0064C8'}
                    type="color"
                    onChange={(e) => dispatch(setColor(e.target.value))}
                />
                <Btn
                    name={pause ? 'start' : 'stop'}
                    option={{ onClick: () => dispatch(pauseOrResumeGame()) }}
                />
            </div>
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
