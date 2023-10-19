import { IContentTypes } from './NoteTypesOfContents';

export interface IContent {
  type: IContentTypes;
  content: string | string[][] | 'line' | Express.Multer.File;
}
