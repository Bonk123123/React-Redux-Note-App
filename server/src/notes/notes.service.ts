import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { NoteContentService } from 'src/note_content/note_content.service';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private notesRepository: Repository<Note>,
    private noteContentService: NoteContentService,
  ) {}

  async createNote(createNoteDto: CreateNoteDto) {
    if (!createNoteDto.note_name)
      throw new HttpException(
        'invalid note name or status',
        HttpStatus.BAD_REQUEST,
      );

    const note = this.notesRepository.create({
      note_name: createNoteDto.note_name,
      note_status: 'in progress',
      last_change: new Date(),
      user_id: createNoteDto.user_id,
    });

    await this.notesRepository.save(note);

    return note;
  }

  async findByName(search: string) {
    const data = await this.notesRepository.find();
    return data.filter((item) =>
      item.note_name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  async findAll() {
    return await this.notesRepository.find();
  }

  async findOne(id: string) {
    if (id.length !== 36)
      throw new HttpException('no such note exists', HttpStatus.NOT_FOUND);
    return await this.notesRepository.findOneBy({ id });
  }

  async update(id: string, updateNoteDto: UpdateNoteDto) {
    await this.notesRepository.update(
      { id },
      {
        ...updateNoteDto,
      },
    );
  }

  async remove(id: string) {
    await this.noteContentService.removeByNoteId(id);
    await this.notesRepository.delete({ id });
  }
}
