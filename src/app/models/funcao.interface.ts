import { Voluntario } from './voluntario.interface';

export interface Funcao {
  id?: number;
  descricao: string;
  voluntarios?: Voluntario[];
}
