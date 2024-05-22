import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../base';
import { User } from './user.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity('author')
export class Author extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text' })
  biography: string;

  @Column({ nullable: true })
  birthday: string;

  @ApiHideProperty()
  @ManyToOne(() => User, (user) => user.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}