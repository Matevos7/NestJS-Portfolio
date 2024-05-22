import { Author } from "@common/database/entities";
import { USER } from "./user";
import { ICreateAuthor } from "@common/models";

const name = 'Author';
const newName = 'Updated Author';
const biography = 'long biography';
const birthday = '01/01/2000';

export const AUTHOR_ID = 1;

export const AUTHOR: Author = {
  id: AUTHOR_ID, name,
  createdAt: new Date(),
  updatedAt: new Date(),
  biography,
  birthday,
  user: USER
};

export const AUTHORS: Author[] = [AUTHOR];

export const CREATE_AUTHOR: ICreateAuthor = {
  name,
  biography,
  birthday
};

export const UPDATE_AUTHOR: Partial<ICreateAuthor> = { name: newName };
