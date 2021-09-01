import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContextService {

  private static readonly API_HOST = 'localhost';
  private static readonly API_PORT = '3000';
  private static readonly API_URL = `http://${ContextService.API_HOST}:${ContextService.API_PORT}`;

  constructor() { }

  public get apiUrl(): string {
    return ContextService.API_URL;
  }
}
