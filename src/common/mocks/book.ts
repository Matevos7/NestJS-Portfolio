import { Book } from "@common/database/entities";
import { USER, AUTHOR } from "./";
import { ICreateBook } from "@common/models";

const title: string = 'Book';
const newTitile: string = 'Updated Test Book';
const description: string = 'test';
const isbn: string = '978-0-545-01022-1';
const publishedAt: string = 'long biography';

export const BOOK_ID: number = 1;

export const BOOK: Book = {
  id: BOOK_ID, title,
  isbn,
  description,
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt,
  author: AUTHOR,
  user: USER
}

export const BOOKS: Book[] = [BOOK];

export const CREATE_BOOK: ICreateBook = { title, description, isbn, publishedAt, authorId: AUTHOR.id };

export const UPDATE_BOOK: Partial<ICreateBook> = { title: newTitile }