import { IContent } from './NoteContent';
import { status } from './Status';
export default interface INote {
    id: string;
    note_name: string;
    note_status: status;
    last_change: Date;
}
