import { PickType } from '@nestjs/swagger';
import { Voluntario } from '../voluntario.entity';

export class LoginDto extends PickType(Voluntario, ['usuario']) {}
