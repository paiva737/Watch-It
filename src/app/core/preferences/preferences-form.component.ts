import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PreferencesService } from '../services/preferences.service';
import { TmdbService } from '../services/tmdb.service';

@Component({
  selector: 'app-preferences-form',
  templateUrl: './preferences-form.component.html',
  styleUrls: ['./preferences-form.component.scss']
})
export class PreferencesFormComponent implements OnInit {
  preferencesForm!: FormGroup;
  recommendedMovie: any = null; // Armazena o filme recomendado

  constructor(
    private fb: FormBuilder,
    private preferencesService: PreferencesService,
    private tmdbService: TmdbService
  ) {}

  ngOnInit(): void {
    this.preferencesForm = this.fb.group({
      genres: [''],
      duration: [''],
      ageGroup: [''],
      actorsDirectors: [''],
      platforms: ['']
    });

    // Preencher o formulário com preferências salvas
    const savedPreferences = this.preferencesService.getPreferences();
    if (savedPreferences) {
      this.preferencesForm.patchValue(savedPreferences);
    }
  }

  onSubmit(): void {
    console.log('Formulário enviado:', this.preferencesForm.value);

    if (this.preferencesForm.valid) {
      const preferences = this.preferencesForm.value;

      if (preferences.actorsDirectors) {
        this.tmdbService.getActorIdByName(preferences.actorsDirectors).subscribe((response) => {
          if (response.results && response.results.length > 0) {
            const actorId = response.results[0].id;
            console.log('ID do ator encontrado:', actorId);
            this.fetchRecommendedMovie(preferences, actorId); // Chama o método com ID do ator
          } else {
            console.log('Ator não encontrado:', preferences.actorsDirectors);
            this.fetchRecommendedMovie(preferences); // Chama sem o filtro de ator
          }
        });
      } else {
        this.fetchRecommendedMovie(preferences); // Chama diretamente sem filtro de ator
      }
    }
  }

  fetchRecommendedMovie(preferences: any, actorId?: number): void {
    const updatedPreferences: any = {};
  
    // Adicionar filtro de gênero, se selecionado
    if (preferences.genres && preferences.genres !== '') {
      updatedPreferences['with_genres'] = preferences.genres;
    }
  
    // Adicionar filtros de duração, se selecionado
    if (preferences.duration && preferences.duration !== '') {
      switch (preferences.duration) {
        case 'menos-90':
          updatedPreferences['with_runtime.lte'] = 90;
          break;
        case '90-120':
          updatedPreferences['with_runtime.gte'] = 90;
          updatedPreferences['with_runtime.lte'] = 120;
          break;
        case '120-150':
          updatedPreferences['with_runtime.gte'] = 120;
          updatedPreferences['with_runtime.lte'] = 150;
          break;
        case 'mais-150':
          updatedPreferences['with_runtime.gte'] = 150;
          break;
      }
    }
  
    // Adicionar filtro de faixa etária, se selecionado
    if (preferences.ageGroup && preferences.ageGroup !== '') {
      updatedPreferences['include_adult'] = preferences.ageGroup === 'adulto';
    }
  
    // Adicionar filtro de ator, se o ID estiver disponível
    if (actorId) {
      updatedPreferences['with_cast'] = actorId;
    }
  
    // Adicionar filtro de plataforma, se selecionado
    if (preferences.platforms && preferences.platforms !== '') {
      updatedPreferences['with_watch_providers'] = preferences.platforms;
    }
  
    // Parâmetros obrigatórios
    updatedPreferences['language'] = 'pt-BR';
    updatedPreferences['sort_by'] = 'popularity.desc';
    updatedPreferences['page'] = 1;
  
    console.log('Parâmetros enviados para a API:', updatedPreferences);
  
    this.tmdbService.getRecommendedMovie(updatedPreferences).subscribe((response) => {
      console.log('Resposta da API:', response);
      if (response && response.results && response.results.length > 0) {
        this.recommendedMovie = response.results[0]; // Salvar o primeiro filme encontrado
        console.log('Filme recomendado:', this.recommendedMovie);
      } else {
        this.recommendedMovie = null; // Caso não haja filmes encontrados
        console.log('Nenhum filme encontrado com os filtros fornecidos.');
      }
    });
  }
  
  

  closeRecommendedMovie(): void {
    this.recommendedMovie = null;
  }
}
