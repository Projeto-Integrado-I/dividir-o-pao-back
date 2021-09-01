import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsObject, IsOptional, Min } from 'class-validator';
import { PedidoDto } from './../../pedido/dto/pedido.dto';
import { RecursoDto } from './../../recurso/dto/recurso.dto';
export class ItemPedidoDto {
  @ApiPropertyOptional({ description: 'Id do item pedido' })
  @IsInt()
  @IsOptional()
  id: number;

  @ApiProperty({ description: 'Recurso' })
  @IsObject()
  recurso: RecursoDto;

  @ApiPropertyOptional({ description: 'Pedido', example: PedidoDto })
  @IsObject()
  @IsOptional()
  pedido: PedidoDto;

  @ApiProperty({ description: 'Quantidade', example: 5 })
  @IsInt()
  @Min(1)
  quantidade: number;

  @ApiProperty({ description: 'Valor do item', example: 4.5 })
  @Min(0.01)
  valor: number;
}
