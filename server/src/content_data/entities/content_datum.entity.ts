import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { NoteContent } from 'src/note_content/entities/note_content.entity';

@Entity()
export class ContentData {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content_id: string;

  @ManyToOne((type) => NoteContent, (note_content) => note_content.id)
  content_: string;

  @Column()
  data: string;
}
