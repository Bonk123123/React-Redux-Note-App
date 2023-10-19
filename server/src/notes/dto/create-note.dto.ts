import { IContent } from 'src/models/NoteContent';
import { status } from 'src/models/Status';

export class CreateNoteDto {
  note_name: string;
  user_id: string;
}
