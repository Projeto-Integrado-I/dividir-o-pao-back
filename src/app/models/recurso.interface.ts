import { TipoRecurso } from './tipo-recurso.enum';

export interface Recurso {
  id?: number;
  nome: string;
  preco: number;
  tipoMedida: string;
  ativo: boolean;
  tipoRecurso: TipoRecurso;
}