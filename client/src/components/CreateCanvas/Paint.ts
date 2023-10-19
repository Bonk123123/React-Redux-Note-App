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
        var dataUrl = this.canvas?.toDataURL('image/jpeg');
        if (!dataUrl) return;
        var bytes =
            dataUrl.split(',')[0].indexOf('base64') >= 0
                ? atob(dataUrl.split(',')[1])
                : (<any>window).unescape(dataUrl.split(',')[1]);
        var mime = dataUrl.split(',')[0].split(':')[1].split(';')[0];
        var max = bytes.length;
        var ia = new Uint8Array(max);
        for (var i = 0; i < max; i++) {
            ia[i] = bytes.charCodeAt(i);
        }

        var newImageFileFromCanvas = new File([ia], 'fileName.jpg', {
            type: mime,
        });

        return newImageFileFromCanvas;

        // const dataBlob = await new Promise<Blob | null>((resolve) =>
        //     this.canvas?.toBlob((blob) => resolve(blob), 'image/png')
        // );
        // if (!dataBlob) return;
        // let file: File = new File([dataBlob], 'file.png');
        // console.log(file);
        // return file;
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
