import IVector2 from '../canvas/vector2';

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

export default class Paint {
    private canvas: HTMLCanvasElement | null;
    private ctx: CanvasRenderingContext2D | null;
    private coord_canvas: IVector2;
    private ratio: IVector2;
    private clicked: boolean;

    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.clicked = false;
        this.coord_canvas = { x: 0, y: 0 };
        this.ratio = { x: 1, y: 1 };
    }

    setCanvasCtx(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;

        this.ctx.fillStyle = 'black';
        this.ctx.lineWidth = 2;

        this.canvas.width = CANVAS_WIDTH;
        this.canvas.height = CANVAS_HEIGHT;

        this.coord_canvas = {
            x: canvas.getBoundingClientRect().x + window.scrollX,
            y: canvas.getBoundingClientRect().y + window.scrollY,
        };
        this.ratio = {
            x: canvas.width / canvas.clientWidth,
            y: canvas.height / canvas.clientHeight,
        };
    }

    set paintColor(color: string) {
        if (!this.ctx) return;
        this.ctx.strokeStyle = color;
    }

    set paintWeight(weight: number) {
        if (!this.ctx) return;
        this.ctx.lineWidth = weight;
    }

    save() {
        const dataURLtoBlob = (dataURL: string | undefined) => {
            if (!dataURL) return;
            let array, binary, i, len;
            binary = atob(dataURL.split(',')[1]);
            array = [];
            i = 0;
            len = binary.length;
            while (i < len) {
                array.push(binary.charCodeAt(i));
                i++;
            }
            return new Blob([new Uint8Array(array)], {
                type: 'image/png',
            });
        };
        return dataURLtoBlob(this.canvas?.toDataURL('image/png'));
    }

    clear() {
        if (!this.canvas) return;
        this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    onResize() {
        if (!this.canvas) return;

        this.coord_canvas = {
            x: this.canvas.getBoundingClientRect().x + window.scrollX,
            y: this.canvas.getBoundingClientRect().y + window.scrollY,
        };

        this.ratio = {
            x: this.canvas.width / this.canvas.clientWidth,
            y: this.canvas.height / this.canvas.clientHeight,
        };
    }

    onMouseDown() {
        this.clicked = true;
        this.ctx?.beginPath();
    }

    onMouseUp() {
        this.ctx?.stroke();
        this.ctx?.closePath();
        this.clicked = false;
    }

    onMouseMove(e: React.MouseEvent) {
        if (!this.canvas) return;
        if (this.clicked) {
            let mouse: IVector2 = {
                x: (e.pageX - this.coord_canvas.x) * this.ratio.x,
                y: (e.pageY - this.coord_canvas.y) * this.ratio.y,
            };
            this.ctx?.lineTo(mouse.x, mouse.y);
            this.ctx?.stroke();
        }
    }
}
