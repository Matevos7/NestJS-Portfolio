import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseEntity } from '../base';
import { Country } from './';
import { Roles } from '@common/enums';

@Entity('users')
export class User extends BaseEntity {
  @Column({ name: 'full_name' })
  fullName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ unique: true })
  password: string;

  @ManyToOne(() => Country, (country) => country.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'country_id' })
  country: Country;

  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.USER,
  })
  role: Roles;
}
