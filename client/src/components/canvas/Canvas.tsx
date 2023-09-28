import React, { FC } from 'react';
import Game from './Game';
// import { addGeneration } from '../../redux/canvasSlice/canvasSlice';

import './Canvas.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';

let life2d = new Game();

const Canvas: FC = () => {
    const dispatch = useAppDispatch();
    const { color, pause } = useAppSelector((state) => state.canvas);

    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        const WIDTH = document.body.clientWidth;
        const HEIGHT = window.innerHeight;

        life2d.gameInit(
            {
                begin: { x: 0, y: 0 },
                end: {
                    x: document.body.offsetWidth,
                    y: window.innerHeight,
                },
            },
            10
        );

        canvas.width = WIDTH;
        canvas.height = HEIGHT;

        life2d.lifes_color = 'rgb(0, 100, 200)';
        life2d.set_ctx = ctx;

        window.addEventListener(
            'resize',
            (e) => {
                life2d.onResizeFunction(
                    {
                        x: document.body.offsetWidth,
                        y: window.innerHeight,
                    },
                    canvas
                );
                life2d.full_display_life();
            },
            true
        );

        return () => {
            window.removeEventListener(
                'resize',
                (e) => {
                    life2d.onResizeFunction(
                        {
                            x: document.body.offsetWidth,
                            y: window.innerHeight,
                        },
                        canvas
                    );
                    life2d.full_display_life();
                },
                true
            );
        };
    }, []);

    React.useEffect(() => {
        life2d.full_display_life();
        const interval = setInterval(() => {
            if (pause) return;
            life2d.display_life();
            life2d.next_gen();
            // dispatch(addGeneration());
        }, 60);

        return () => clearInterval(interval);
    }, [pause, dispatch]);

    React.useEffect(() => {
        life2d.lifes_color = color;
        life2d.full_display_life();
    }, [color]);

    return (
        <canvas
            onMouseMove={(e) => {
                if (pause) return;
                life2d.create_life_by_mouse({ x: e.clientX, y: e.clientY });
                life2d.display_life();
            }}
            ref={canvasRef}
            className="canvas"
        ></canvas>
    );
};

export default Canvas;
