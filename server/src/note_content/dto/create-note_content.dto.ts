import { IContent } from 'src/models/NoteContent';
import { IContentTypes } from 'src/models/NoteTypesOfContents';

export class CreateNoteContentDto {
  type: IContentTypes;
  content: string | string[][];
}
