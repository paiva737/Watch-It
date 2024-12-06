import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TmdbService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '02bbff06e04809904f451cbdbf9084e8';

  constructor(private http: HttpClient) {}

  getRecommendedMovie(preferences: any): Observable<any> {
    const params: any = {
      api_key: this.apiKey,
      language: preferences.language || 'pt-BR',
      sort_by: preferences.sort_by || 'popularity.desc',
      include_adult: preferences.include_adult || false,
      page: preferences.page || 1,
    };
  
    // Adicionar filtros opcionais
    if (preferences.with_genres) {
      params['with_genres'] = preferences.with_genres;
    }
  
    if (preferences.with_runtime) {
      if (preferences.with_runtime.gte) {
        params['with_runtime.gte'] = preferences.with_runtime.gte;
      }
      if (preferences.with_runtime.lte) {
        params['with_runtime.lte'] = preferences.with_runtime.lte;
      }
    }
  
    if (preferences.with_cast) {
      params['with_cast'] = preferences.with_cast;
    }
  
    console.log('Parâmetros enviados para a API:', params);
  
    return this.http.get(`${this.apiUrl}/discover/movie`, { params });
  }
  

  getActorIdByName(actorName: string): Observable<any> {
    const params = {
      api_key: this.apiKey,
      query: actorName,
      language: 'pt-BR',
    };

    return this.http.get(`${this.apiUrl}/search/person`, { params });
  }
}
