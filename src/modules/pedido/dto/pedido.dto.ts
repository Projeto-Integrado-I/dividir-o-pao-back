import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsObject,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ItemPedidoDto } from './../../item-pedido/dto/item-pedido.dto';
import { VoluntarioDto } from './../../voluntario/dto/voluntario.dto';
export class PedidoDto {
  @ApiPropertyOptional({ description: 'Id do pedido' })
  @IsOptional()
  @IsInt()
  id: number;

  @ApiPropertyOptional({ description: 'Valor total' })
  @IsOptional()
  @Min(0)
  valorTotal: number;

  @ApiProperty({ description: 'Array de itens do pedido' })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => ItemPedidoDto)
  itensPedido: ItemPedidoDto[];

  @ApiProperty({ description: 'Voluntário que solicitou o pedido' })
  @IsObject()
  voluntario: VoluntarioDto;

  @ApiPropertyOptional({ description: 'Data de criação do pedido' })
  @IsOptional()
  createdDate: Date;

  @ApiPropertyOptional({ description: 'Data de atualização do pedido' })
  @IsOptional()
  updatedDate: Date;
}
