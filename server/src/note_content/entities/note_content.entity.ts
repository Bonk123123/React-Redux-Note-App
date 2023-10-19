import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Generated,
} from 'typeorm';
import { Note } from 'src/notes/entities/note.entity';

@Entity()
export class NoteContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  note_id: string;

  @ManyToOne((type) => Note, (note) => note.id)
  note_: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  rows_in_table: number;

  @Column()
  @Generated('increment')
  number_in_note: number;
}
