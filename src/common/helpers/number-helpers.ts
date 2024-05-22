import parsePhoneNumber from 'libphonenumber-js';

export class NumberHelpers {
  static getRandomCode(length = 4): string {
    let code = '';
    const characters = '0123456789';

    for (let i = 0; i < length; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return code;
  }

  static parsePhoneValue(value: string): string {
    return value && parsePhoneNumber(value) // Check if the value is parseable
      ? parsePhoneNumber(value).number
      : value;
  }
}
