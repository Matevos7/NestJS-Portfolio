import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateAuthor } from '@common/models';
import { IsAdult, IsDateFormat } from '@common/decorators';

export class CreateAuthorDTO implements ICreateAuthor {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  biography: string;

  @IsAdult({
    message: 'The user should be adult.',
  })
  @IsDateFormat('MM/dd/yyyy')
  @ApiProperty({
    format: 'MM/dd/yyyy',
    example: '01/30/2000',
  })
  @IsNotEmpty()
  birthday: string;
}
