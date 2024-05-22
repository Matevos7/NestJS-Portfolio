import { Book } from "@common/database/entities";
import { USER, AUTHOR } from "./";
import { ICreateBook } from "@common/models";

const title = 'Book';
const newTitile = 'Updated Test Book';
const description = 'test';
const isbn = '978-0-545-01022-1';
const publishedAt = 'long biography';

export const BOOK_ID = 1;

export const BOOK: Book = {
  id: BOOK_ID, title,
  isbn,
  description,
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt,
  author: AUTHOR,
  user: USER
};

export const BOOKS: Book[] = [BOOK];

export const CREATE_BOOK: ICreateBook = { title, description, isbn, publishedAt, authorId: AUTHOR.id };

export const UPDATE_BOOK: Partial<ICreateBook> = { title: newTitile };