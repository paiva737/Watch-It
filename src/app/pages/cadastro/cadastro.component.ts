import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nome: [null, Validators.required],
      nascimento: [null, Validators.required],
      cpf: [null, Validators.required],
      cidade: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required, Validators.minLength(3)]],
      genero: ['outro'],
      telefone: [null, Validators.required],
      confirmarEmail: [null, [Validators.required, Validators.email]],
      confirmarSenha: [null, [Validators.required, Validators.minLength(3)]],
      aceitarTermos: [false, Validators.requiredTrue]
    });
  }

  cadastrar() {
    if (this.cadastroForm.valid) {
      const novoCadastro = this.cadastroForm.value;
      this.authService.cadastrar(novoCadastro).subscribe({
        next: (response) => {
          console.log('Cadastro realizado com sucesso:', response.message);
          this.router.navigate(['/login']);
        },
        error: (err) => console.error('Erro ao realizar cadastro:', err.error.message)
      });
    } else {
      console.log('Erro: Campos obrigatórios não preenchidos.');
    }
  }
}
