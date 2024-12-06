import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-form-base',
  templateUrl: './form-base.component.html',
  styleUrls: ['./form-base.component.scss']
})
export class FormBaseComponent implements OnInit {
  estadoControl: FormControl = new FormControl(null, Validators.required);

  @Input() formGroup!: FormGroup;
  @Input() perfilComponent: boolean = false;
  @Input() titulo: string = 'Crie sua conta';
  @Input() textoBotao: string = 'CADASTRAR';
  @Output() acaoClique: EventEmitter<any> = new EventEmitter<any>();
  @Output() sair: EventEmitter<any> = new EventEmitter<any>();

  constructor(private formularioService: FormularioService) {}

  ngOnInit() {
    // Garantir que o formGroup foi passado
    if (this.formGroup) {
      // Configura o validador de aceitarTermos conforme o componente de perfil
      if (this.perfilComponent) {
        this.formGroup.get('aceitarTermos')?.setValidators(null);
      } else {
        this.formGroup.get('aceitarTermos')?.setValidators([Validators.requiredTrue]);
      }
      this.formGroup.get('aceitarTermos')?.updateValueAndValidity();

      // Registra o formGroup no serviço de formulário
      this.formularioService.setCadastro(this.formGroup);
    } else {
      console.warn("formGroup não foi inicializado.");
    }
  }

  executarAcao() {
    this.acaoClique.emit();
  }

  deslogar() {
    this.sair.emit();
  }
}
