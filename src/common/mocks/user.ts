import { User } from "@common/database/entities";
import { COUNTRY } from "./country";
import { Roles } from "@common/enums";

export const USER_ID = 1;

export const USER: User = {
  id: USER_ID,
  createdAt: new Date(),
  updatedAt: new Date(),
  fullName: "Test Testyan",
  email: "test@gmail.com",
  phone: '+37494000000',
  password: 'hash1234!',
  country: COUNTRY,
  role: Roles.USER
};

export const USERS: User[] = [USER];
