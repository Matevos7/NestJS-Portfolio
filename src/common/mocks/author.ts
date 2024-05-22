import { Author } from "@common/database/entities";
import { USER } from "./user";
import { ICreateAuthor } from "@common/models";

const name: string = 'Author';
const newName: string = 'Updated Author';
const biography: string = 'long biography';
const birthday: string = '01/01/2000'

export const AUTHOR_ID: number = 1;

export const AUTHOR: Author = {
  id: AUTHOR_ID, name,
  createdAt: new Date(),
  updatedAt: new Date(),
  biography,
  birthday,
  user: USER
}

export const AUTHORS: Author[] = [AUTHOR]

export const CREATE_AUTHOR: ICreateAuthor = {
  name,
  biography,
  birthday
}

export const UPDATE_AUTHOR: Partial<ICreateAuthor> = { name: newName }
