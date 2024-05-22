import { IsNotEmpty, IsString, IsInt, IsISBN } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ICreateBook } from '@common/models';
import { IsDateFormat } from '@common/decorators';

export class CreateBookDTO implements ICreateBook {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsISBN()
  @ApiProperty()
  isbn: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  description: string;

  @IsDateFormat('MM/dd/yyyy')
  @ApiProperty({
    format: 'MM/dd/yyyy',
    example: '01/30/2000',
  })
  @IsNotEmpty()
  publishedAt: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  authorId: number;
}
