import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  handleHttpError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      console.error('Erro no cliente:', error.error.message);
      return 'Erro no cliente. Tente novamente.';
    } else {
      console.error(`Erro no servidor: Código ${error.status}`, error.message);
      return `Erro no servidor: ${error.status}. Tente novamente mais tarde.`;
    }
  }
}
