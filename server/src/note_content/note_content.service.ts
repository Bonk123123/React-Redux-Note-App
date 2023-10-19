import {
  HttpException,
  HttpStatus,
  Injectable,
  StreamableFile,
} from '@nestjs/common';
import { CreateNoteContentDto } from './dto/create-note_content.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { NoteContent } from './entities/note_content.entity';
import { Repository } from 'typeorm';
import { ContentDataService } from 'src/content_data/content_data.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class NoteContentService {
  constructor(
    @InjectRepository(NoteContent)
    private readonly noteContentRepository: Repository<NoteContent>,

    private readonly contentDataService: ContentDataService,
  ) {}

  async create(
    note_id: string,
    content: CreateNoteContentDto,
    file: Express.Multer.File | null | undefined,
  ) {
    const newNoteContent = this.noteContentRepository.create({
      note_id,
      type: content.type === 'canvas' ? 'image' : content.type,
      rows_in_table: content.type === 'table' ? content.content.length : null,
    });
    await this.noteContentRepository.save(newNoteContent);

    // проверка на тип и создание note content

    switch (content.type) {
      case 'text':
        this.contentDataService.create({
          content_id: newNoteContent.id,
          data: content.content,
        });
        return content.content;
      case 'image':
        if (!file)
          throw new HttpException(
            'File error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        this.contentDataService.create({
          content_id: newNoteContent.id,
          data: file.path,
        });
        return file.path;
      case 'table':
        this.contentDataService.create({
          content_id: newNoteContent.id,
          data: content.content,
        });
        return content.content;
      case 'line':
        this.contentDataService.create({
          content_id: newNoteContent.id,
          data: content.content,
        });
        return content.content;
      case 'canvas':
        if (!file)
          throw new HttpException(
            'File error',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        this.contentDataService.create({
          content_id: newNoteContent.id,
          data: file.path,
        });
        return file.path;
      default:
        throw new HttpException('no such content type', HttpStatus.BAD_REQUEST);
    }
  }

  async findAllNoteContent(note_id: string) {
    if (note_id.length !== 36)
      throw new HttpException('no such note exists', HttpStatus.NOT_FOUND);
    const note_content = await this.noteContentRepository.findBy({ note_id });

    let content = [];

    for (let i = 0; i < note_content.length; i++) {
      const content_datum = await this.contentDataService.findAllByContentId(
        note_content[i].id,
      );

      if (note_content[i].type === 'table') {
        let table_for_get = [];

        let columns_in_table =
          note_content[i].rows_in_table !== 0
            ? content_datum.length / note_content[i].rows_in_table
            : 0;

        for (let j = 0; j < note_content[i].rows_in_table; j++) {
          let row = [];
          if (note_content[i].rows_in_table !== 0) {
            for (let k = 0; k < columns_in_table; k++) {
              row.push(content_datum[k].data);
            }
          }
          content_datum.splice(0, note_content[i].rows_in_table + 1);
          table_for_get.push(row);
        }

        content.push({
          type: note_content[i].type,
          content: table_for_get,
        });
      } else if (
        note_content[i].type === 'image' ||
        note_content[i].type === 'canvas'
      ) {
        const image = createReadStream(
          join(process.cwd(), content_datum[0].data),
        );
        content.push({
          type: note_content[i].type,
          content:
            'http://localhost:5001/' + content_datum[0].data.split('\\')[2],
        });
      } else {
        content.push({
          type: note_content[i].type,
          content:
            note_content[i].type === 'text'
              ? content_datum.map((item) => item.data)[0]
              : [content_datum.map((item) => item.data)],
        });
      }
    }

    return content;
  }

  async removeByNoteId(note_id: string) {
    const note_content = await this.noteContentRepository.findBy({ note_id });

    for (let i = 0; i < note_content.length; i++) {
      await this.contentDataService.removeByContentId(note_content[i].id);
    }

    await this.noteContentRepository.delete({ note_id });
  }
}
