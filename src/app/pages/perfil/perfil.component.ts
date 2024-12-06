import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  formGroup!: FormGroup;
  titulo = 'Dados Pessoais';
  textoBotao = 'ATUALIZAR';
  perfilComponent = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {}

  ngOnInit() {
    // Inicializando o formGroup com os campos necessários
    this.formGroup = this.fb.group({
      nome: ['', Validators.required],
      nascimento: ['', Validators.required],
      cpf: ['', Validators.required],
      cidade: ['', Validators.required],
      genero: [''],
      telefone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      confirmarEmail: ['', Validators.required],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      confirmarSenha: ['', Validators.required],
      aceitarTermos: [false]
    });

    // Caso o token esteja presente, carrega os dados do usuário
    if (this.tokenService.retornarToken()) {
      this.userService.retornarUser().subscribe(usuario => {
        if (usuario) {
          this.formGroup.patchValue({
            nome: usuario.nome,
            email: usuario.email
          });
        }
      });
    } else {
      // Redireciona para o login caso o token não esteja presente
      this.router.navigate(['/login']);
    }
  }

  atualizar() {
    console.log('Perfil atualizado com sucesso!');
  }

  deslogar() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }
}
