import { PartialType } from '@nestjs/swagger';
import { CreateAuthorDTO } from './create-author.dto';
import { ICreateAuthor } from '@common/models';

export class UpdateAuthorDTO extends PartialType(CreateAuthorDTO) implements Partial<ICreateAuthor> { }
