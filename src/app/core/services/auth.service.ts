import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/auth/login`, { email, senha }); // Endpoint corrigido
  }

  cadastrar(usuario: any): Observable<any> {
    console.log("Dados enviados para o backend:", usuario);
    return this.http.post(`${this.apiUrl}/api/auth/register`, usuario); // Endpoint corrigido
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }
}
