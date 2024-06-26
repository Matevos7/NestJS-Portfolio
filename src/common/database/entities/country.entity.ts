import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../base';

@Entity('countries')
export class Country extends BaseEntity {
  @Column()
  name: string;

  @Column()
  alpha2: string;

  @Column()
  alpha3: string;

  @Column()
  continent: string;

  @Column({
    name: 'phone_code',
  })
  phoneCode: string;

  @Column({
    nullable: true,
  })
  currency: string;
}
