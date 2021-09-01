import { Funcao } from './funcao.interface';
import { User } from './user.interface';

export interface Voluntario {
  id?: number;
  nome: string;
  telefone: string;
  usuario: User;
  funcoes: Funcao[];
}
