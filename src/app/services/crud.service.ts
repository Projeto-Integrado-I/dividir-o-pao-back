import { Observable } from 'rxjs';
import { AbstractService } from './abstract.service';
import { ServiceResponse } from './service-response.interface';

export abstract class CrudService<T> extends AbstractService {
  public abstract saveOrUpdate(entity: T): Observable<ServiceResponse<T>>;
  public abstract findById(id: number): Observable<ServiceResponse<T>>;
  public abstract deleteById(id: number): Observable<ServiceResponse<null>>;
  protected abstract save(entity: T): Observable<ServiceResponse<T>>;
  protected abstract update(entity: T): Observable<ServiceResponse<T>>;
}
