import { AUTH_ERROR_MESSAGES } from './auth';
import { AUTHOR_ERROR_MESSAGES } from './author';
import { COUNTRY_ERROR_MESSAGES } from './country';

export const ERROR_MESSAGES = {
  ...AUTH_ERROR_MESSAGES,
  ...COUNTRY_ERROR_MESSAGES,
  ...AUTHOR_ERROR_MESSAGES
};
