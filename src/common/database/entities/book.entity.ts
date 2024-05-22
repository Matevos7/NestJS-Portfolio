import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../base';
import { Author, User } from './';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity('books')
export class Book extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column()
  isbn: string;

  @Column({
    name: 'published_at',
  })
  publishedAt: string;

  @Column()
  description: string;

  @ManyToOne(() => Author, (author) => author.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
