import { IsPhoneNumberOrEmail } from '@common/decorators';
import { ILogin } from '@common/models';
import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';

export class LoginDTO implements ILogin {
  @IsPhoneNumberOrEmail({
    message: 'Login should be an email or phone',
  })
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(60)
  password: string;
}
