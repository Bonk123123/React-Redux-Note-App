import React, { FC } from 'react';
import Paint from './Paint';
import './CreateCanvas.scss';
import Inp from '../Inp/Inp';
import Btn from '../Btn/Btn';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { updateItem } from '../../redux/noteActSlice/noteActSlice';
import { IContent } from '../../models/NoteContent';

const paint = new Paint();

interface props {
    i: number;
    createIsClicked: boolean;
    item?: IContent;
}

const CreateCanvas: FC<props> = ({ i, createIsClicked, item }) => {
    const dispatch = useAppDispatch();

    const [weight, setWeight] = React.useState('');
    const [color, setColor] = React.useState('black');

    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');

        if (!ctx || !canvas) return;

        paint.setCanvasCtx(canvas, ctx);

        window.addEventListener('resize', () => paint.onResize());

        return () =>
            window.removeEventListener('resize', () => paint.onResize());
    }, []);

    React.useEffect(() => {
        paint.paintWeight = parseInt(weight);
    }, [weight]);

    React.useEffect(() => {
        paint.paintColor = color;
    }, [color]);

    React.useEffect(() => {
        dispatch(
            updateItem({
                j: i,
                content: {
                    type: 'canvas',
                    content: paint.save() as File,
                },
            })
        );
    }, [createIsClicked, dispatch, i, item]);

    return (
        <div className="create">
            <canvas
                onMouseDown={() => paint.onMouseDown()}
                onMouseUp={() => paint.onMouseUp()}
                onMouseMove={(e) => paint.onMouseMove(e)}
                ref={canvasRef}
                className="create-canvas"
            ></canvas>
            <div className="create-attr">
                <Inp
                    placeholder="weight"
                    state={weight}
                    setState={setWeight}
                    className="create-attr-weight"
                    option={{ type: 'number', min: 2, max: 50 }}
                />

                <input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    type="color"
                    className="create-attr-color"
                />
                <Btn
                    option={{ onClick: () => paint.clear() }}
                    name="Clear"
                    className="create-attr-clear"
                />
            </div>
        </div>
    );
};

export default CreateCanvas;
