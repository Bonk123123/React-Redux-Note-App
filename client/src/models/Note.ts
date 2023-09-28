import { IContent } from './NoteContent';
import { status } from './Status';

export default interface INote {
    note_id: string;
    note_name: string;
    note_describe: string;
    note_status: status;
    note_last_change: Date;
}
