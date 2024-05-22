import { PartialType } from '@nestjs/swagger';
import { CreateBookDTO } from './create-book.dto';
import { ICreateBook } from '@common/models';

export class UpdateBookDTO extends PartialType(CreateBookDTO) implements Partial<ICreateBook> { }
