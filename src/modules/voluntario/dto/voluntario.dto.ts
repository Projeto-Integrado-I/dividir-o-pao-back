import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CreateFuncaoDto } from 'src/modules/funcao/dto/create-funcao.dto';
import { UserDto } from 'src/modules/user/dto/user.dto';

export class VoluntarioDto {
  @ApiProperty({
    description: 'Id do voluntário',
  })
  @IsOptional()
  @IsInt({ message: '"id" deve ser number' })
  id: number;

  @ApiProperty({
    example: 'João Pedro',
    description: 'Nome do usuário',
  })
  @IsString({ message: '"nome" deve ser string' })
  @MinLength(6, { message: '"nome" deve conter no mínimo 6 caracteres' })
  @IsNotEmpty({ message: '"nome" não pode estar vazia' })
  nome: string;

  @ApiProperty({
    example: '22555554444',
    description: 'Telefone do usuário',
  })
  @IsString({ message: '"telefone" deve ser string' })
  @IsNotEmpty({ message: '"telefone" não pode estar vazio' })
  @MaxLength(11, { message: '"telefone" pode ter no máximo 11 dígitos' })
  telefone: string;

  @ApiProperty()
  @IsObject({ message: '"usuario" é necessário e precisa ser do tipo UserDto' })
  usuario: UserDto;

  @IsArray({
    message:
      '"funcoes" é necessário e precisa ser um array de objetos do tipo FuncaoDto',
  })
  @ArrayMinSize(1, {
    message: '"funcoes" precisa de pelo menos um objeto no array',
  })
  funcoes: CreateFuncaoDto[];
}
