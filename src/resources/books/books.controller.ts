import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { BooksService } from './books.service';
import { CreateBookDTO, UpdateBookDTO } from './dto';
import { AuthUserGuard } from '@common/guards';
import { IdDTO, PaginationQueryDTO, SuccessDTO } from '@common/dtos';
import { AuthUser } from '@common/decorators';
import { ITokenPayload } from '@common/models';

@ApiTags('Books')
@ApiBearerAuth()
@Controller('books')
@UseGuards(AuthUserGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  @ApiOperation({
    summary: 'Create a new book',
  })
  async create(
    @AuthUser() user: ITokenPayload,
    @Body() body: CreateBookDTO): Promise<SuccessDTO> {
    return this.booksService.create(user, body);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all books',
  })
  async findAll(@Query() query: PaginationQueryDTO) {
    return this.booksService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get a book by id',
  })
  async findOne(@Param() param: IdDTO) {
    return this.booksService.findOne(param.id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update a book by id',
  })
  async update(@Param() param: IdDTO, @Body() body: UpdateBookDTO): Promise<SuccessDTO> {
    return this.booksService.update(param.id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete a book by id',
  })
  async remove(@Param() param: IdDTO) {
    return this.booksService.remove(param.id);
  }
}
