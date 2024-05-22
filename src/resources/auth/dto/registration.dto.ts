import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  IsEmail,
  Matches,
  IsNumber,
  MinLength,
  MaxLength,
} from 'class-validator';

import { IRegistration } from '@common/models';
import { NumberHelpers } from '@common/helpers';
import { VALIDATION_PATTERNS } from '@common/constants';

export class RegistrationDTO implements IRegistration {
  @Matches(VALIDATION_PATTERNS.FULLNAME)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @Transform(({ value }) => {
    return NumberHelpers.parsePhoneValue(value);
  })
  @ApiProperty()
  phone: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  countryId: number;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(60)
  @Matches(VALIDATION_PATTERNS.PASSWORD)
  @ApiProperty()
  password: string;

}
