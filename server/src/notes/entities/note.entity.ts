import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  note_name: string;

  @Column()
  note_status: string;

  @Column()
  last_change: Date;

  @Column({ nullable: true })
  user_id: string;

  @ManyToOne((type) => User, (user) => user.id)
  user_: string;
}
