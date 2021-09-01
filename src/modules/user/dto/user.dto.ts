import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserDto {
  @ApiProperty({
    example: 'valid@email.com',
    description: 'Email do usuário',
  })
  @IsString({ message: '"email" deve ser string' })
  @IsNotEmpty({ message: '"email" não pode estar vazio' })
  @IsEmail({ require_tld: true })
  email: string;

  @ApiProperty({
    example: 'Str0ngP@ssw0rd',
    description: '"senha" do usuário',
  })
  @IsString({ message: '"senha" deve ser string' })
  @MinLength(6, { message: '"senha" deve conter no mínimo 6 caracteres' })
  @IsNotEmpty({ message: '"senha" não pode estar vazia' })
  senha: string;
}
