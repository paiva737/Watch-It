import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl; // URL base configurada no ambiente

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    // Endpoint de login
    return this.http.post(`${this.apiUrl}/auth/login`, { email, senha });
  }

  cadastrar(usuario: any): Observable<any> {
    console.log('Dados enviados para o backend:', usuario);
    // Endpoint de registro
    return this.http.post(`${this.apiUrl}/auth/register`, usuario);
  }

  setToken(token: string): void {
    // Armazena o token no localStorage
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    // Retorna o token do localStorage
    return localStorage.getItem('token');
  }

  removeToken(): void {
    // Remove o token do localStorage
    localStorage.removeItem('token');
  }
}
