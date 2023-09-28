import IVector2 from './vector2';

export default class Game {
    private cells: boolean[][];
    private quantity_cells_x: number;
    private quantity_cells_y: number;
    private prev_cells: boolean[][];
    private life_color: string;
    private cell_width: number;
    private field_line_weight: number;
    private ctx: CanvasRenderingContext2D | null;
    private marking: { begin: IVector2; end: IVector2 };

    constructor() {
        this.cells = [];
        this.prev_cells = [];
        this.life_color = 'green';
        this.marking = { begin: { x: 0, y: 0 }, end: { x: 0, y: 0 } };
        this.ctx = null;
        this.cell_width = 0;
        this.field_line_weight = 1;
        this.quantity_cells_x = 0;
        this.quantity_cells_y = 0;
    }

    gameInit(marking: { begin: IVector2; end: IVector2 }, cell_width: number) {
        this.marking = marking;
        this.cell_width = cell_width;
        let width = Math.abs(this.marking.end.x - this.marking.begin.x);
        let height = Math.abs(this.marking.end.y - this.marking.begin.y);

        this.quantity_cells_x = Math.ceil(width / this.cell_width);
        this.quantity_cells_y = Math.ceil(height / this.cell_width);

        for (let i = 0; i < this.quantity_cells_x; i++) {
            let CellsX = [];
            for (let j = 0; j < this.quantity_cells_y; j++) {
                CellsX.push(false);
            }
            this.cells.push(CellsX);
        }

        this.prev_cells = structuredClone(this.cells);
    }

    set field_weight(weight: number) {
        this.field_line_weight = weight;
    }

    set cells_width(width: number) {
        this.cell_width = width;
    }

    set set_ctx(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    set lifes_color(color: string) {
        if (!this.ctx) return;
        this.life_color = color;
        this.ctx.fillStyle = color;
    }

    private life_neighbors(coord: IVector2) {
        let quantity_neighbors = 0;

        if (this.prev_cells[coord.x + 1][coord.y + 1]) {
            quantity_neighbors++;
        }
        if (this.prev_cells[coord.x + 1][coord.y]) {
            quantity_neighbors++;
        }
        if (this.prev_cells[coord.x + 1][coord.y - 1]) {
            quantity_neighbors++;
        }
        if (this.prev_cells[coord.x][coord.y - 1]) {
            quantity_neighbors++;
        }
        if (this.prev_cells[coord.x - 1][coord.y - 1]) {
            quantity_neighbors++;
        }
        if (this.prev_cells[coord.x - 1][coord.y]) {
            quantity_neighbors++;
        }
        if (this.prev_cells[coord.x - 1][coord.y + 1]) {
            quantity_neighbors++;
        }
        if (this.prev_cells[coord.x][coord.y + 1]) {
            quantity_neighbors++;
        }

        return quantity_neighbors;
    }

    create_life_by_mouse(coord: IVector2) {
        for (let i = 1; i < this.cells.length - 1; i++) {
            for (let j = 1; j < this.cells[i].length - 1; j++) {
                let mouseX = Math.floor(
                    (coord.x - this.marking.begin.x) / this.cell_width
                );
                let mouseY = Math.floor(
                    (coord.y - this.marking.begin.y) / this.cell_width
                );
                let x =
                    (this.marking.begin.x +
                        i * this.cell_width -
                        this.marking.begin.x) /
                    this.cell_width;
                let y =
                    (this.marking.begin.y +
                        j * this.cell_width -
                        this.marking.begin.y) /
                    this.cell_width;
                if (
                    !this.cells[i][j] &&
                    Math.abs(x - mouseX) < 2 &&
                    Math.abs(y - mouseY) < 2
                ) {
                    this.cells[i][j] = true;
                }
            }
        }
    }

    onResizeFunction(newMarking: IVector2, canvas: HTMLCanvasElement | null) {
        let width = Math.abs(newMarking.x - this.marking.begin.x);
        let height = Math.abs(newMarking.y - this.marking.begin.y);
        if (!this.ctx || !canvas) return;

        canvas.width = newMarking.x;
        canvas.height = newMarking.y;

        let quantity_cells_x = Math.ceil(width / this.cell_width);
        let quantity_cells_y = Math.ceil(height / this.cell_width);

        let newCells = [];
        for (let i = 0; i < quantity_cells_x; i++) {
            let newCellsX = [];
            for (let j = 0; j < quantity_cells_y; j++) {
                newCellsX.push(
                    i < this.quantity_cells_x && j < this.quantity_cells_y
                        ? this.cells[i][j]
                        : false
                );
            }
            newCells.push(newCellsX);
        }

        this.cells = structuredClone(newCells);
        this.prev_cells = structuredClone(newCells);
        this.ctx.fillStyle = this.life_color;

        this.quantity_cells_x = quantity_cells_x;
        this.quantity_cells_y = quantity_cells_y;
    }

    next_gen() {
        this.prev_cells = structuredClone(this.cells);
        for (let i = 1; i < this.prev_cells.length - 1; i++) {
            for (let j = 1; j < this.prev_cells[i].length - 1; j++) {
                let quantity_neighbors = this.life_neighbors({ x: i, y: j });
                //if(this.prev_cells[i][j]) console.log(quantity_neighbors)
                if (quantity_neighbors !== 3 && !this.prev_cells[i][j])
                    continue;

                if (quantity_neighbors === 3 && !this.prev_cells[i][j]) {
                    this.cells[i][j] = true;
                    continue;
                }
                if (
                    (quantity_neighbors === 3 || quantity_neighbors === 2) &&
                    this.prev_cells[i][j]
                )
                    continue;

                if (
                    (quantity_neighbors > 3 || quantity_neighbors < 2) &&
                    this.prev_cells[i][j]
                ) {
                    this.cells[i][j] = false;
                    continue;
                }
            }
        }
    }

    full_display_life() {
        if (!this.ctx) return;

        for (let i = 1; i < this.cells.length - 1; i++) {
            for (let j = 1; j < this.cells[i].length - 1; j++) {
                if (this.cells[i][j] === true) {
                    this.ctx.fillRect(
                        this.marking.begin.x +
                            i * this.cell_width +
                            this.field_line_weight,
                        this.marking.begin.y +
                            j * this.cell_width +
                            this.field_line_weight,
                        this.cell_width - 2 * this.field_line_weight,
                        this.cell_width - 2 * this.field_line_weight
                    );
                } else {
                    this.ctx.clearRect(
                        this.marking.begin.x +
                            i * this.cell_width +
                            this.field_line_weight,
                        this.marking.begin.y +
                            j * this.cell_width +
                            this.field_line_weight,
                        this.cell_width - 2 * this.field_line_weight,
                        this.cell_width - 2 * this.field_line_weight
                    );
                }
            }
        }
    }

    display_life() {
        if (!this.ctx) return;

        for (let i = 1; i < this.cells.length - 1; i++) {
            for (let j = 1; j < this.cells[i].length - 1; j++) {
                if (this.cells[i][j] === this.prev_cells[i][j]) continue;
                if (this.cells[i][j] === true) {
                    this.ctx.fillRect(
                        this.marking.begin.x +
                            i * this.cell_width +
                            this.field_line_weight,
                        this.marking.begin.y +
                            j * this.cell_width +
                            this.field_line_weight,
                        this.cell_width - 2 * this.field_line_weight,
                        this.cell_width - 2 * this.field_line_weight
                    );
                } else {
                    this.ctx.clearRect(
                        this.marking.begin.x +
                            i * this.cell_width +
                            this.field_line_weight,
                        this.marking.begin.y +
                            j * this.cell_width +
                            this.field_line_weight,
                        this.cell_width - 2 * this.field_line_weight,
                        this.cell_width - 2 * this.field_line_weight
                    );
                }
            }
        }
    }
}
