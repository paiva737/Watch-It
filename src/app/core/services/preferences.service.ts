import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {
  private preferencesKey = 'userPreferences';

  // Método para salvar preferências no localStorage
  savePreferences(preferences: any): void {
    localStorage.setItem(this.preferencesKey, JSON.stringify(preferences));
  }

  // Método para recuperar preferências do localStorage
  getPreferences(): any {
    const savedPreferences = localStorage.getItem(this.preferencesKey);
    return savedPreferences ? JSON.parse(savedPreferences) : null;
  }
}
