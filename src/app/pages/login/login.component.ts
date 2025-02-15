import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/core/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  private apiUrl = 'http://localhost:8080/api/auth/login';

// constructor
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      console.log('Dados enviados para o login:', { email, senha });
  
      this.loginService.login(email, senha).subscribe({
        next: (response) => {
          if (response.token) {
            console.log('Token JWT recebido:', response.token);
            this.loginService.setToken(response.token);
            this.router.navigate(['/dashboard']).then(() => {
              window.location.reload();
            });
          } else {
            console.error('Token JWT não recebido');
          }
        },
        error: (error) => {
          this.errorMessage = 'Falha no login, verifique as credenciais';
          console.error('Erro no login:', error);
        },
      });
    }
  }
}
