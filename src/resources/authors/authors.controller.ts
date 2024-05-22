import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthorsService } from './authors.service';
import { CreateAuthorDTO, UpdateAuthorDTO } from './dto';
import { AuthUserGuard } from '@common/guards';
import { IdDTO, PaginationQueryDTO, SuccessDTO } from '@common/dtos';
import { AuthUser } from '@common/decorators';
import { ITokenPayload } from '@common/models';

@ApiTags('Authors')
@ApiBearerAuth()
@Controller('authors')
@UseGuards(AuthUserGuard)
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new author',
  })
  async create(@AuthUser() user: ITokenPayload, @Body() body: CreateAuthorDTO): Promise<SuccessDTO> {
    return this.authorsService.create(user, body);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all authors',
  })
  async findAll(@Query() pagination: PaginationQueryDTO) {
    return this.authorsService.findAll(pagination);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get an author by id',
  })
  async findOne(@Param() param: IdDTO) {
    return this.authorsService.findOne(param.id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update an author by id',
  })
  async update(@Param() param: IdDTO, @Body() body: UpdateAuthorDTO): Promise<SuccessDTO> {
    return this.authorsService.update(param.id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete an author by id',
  })
  async remove(@Param() param: IdDTO,) {
    return this.authorsService.remove(param.id);
  }
}
