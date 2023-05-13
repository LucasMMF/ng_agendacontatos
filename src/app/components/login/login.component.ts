import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AutenticarService } from 'src/app/services/autenticar.service';
import { AutenticarRequest } from 'src/app/models/autenticar.request.model';
import { AutenticarHelper } from 'src/app/helpers/autenticar.helper';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Atributos
  mensagem: string = '';

  // Método construtor
  constructor(
    private autenticarService: AutenticarService,
    private autenticarHelper: AutenticarHelper,
    private spinner: NgxSpinnerService
  ){
  }

  // Estrutura de formulário
  formLogin = new FormGroup({
    // Campo 'email'
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    // Campo 'senha'
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|\\,./?]).{8,20}$/)
    ])
  });

  // Função para verificar a validação dos campos
  get form(): any {
    // Retornar os controler do formulário (FormControl)
    return this.formLogin.controls;
  }

  // Função para capturar o SUBMIT do formulário
  onSubmit(): void {

    this.spinner.show();

    const autenticarRequest: AutenticarRequest = {
      email: this.formLogin.value.email as string,
      senha: this.formLogin.value.senha as string
    };

    this.autenticarService.post(autenticarRequest)
      .subscribe({
        next: (data) => {
          this.autenticarHelper.signIn(data);
          window.location.href = '/dashboard';
        },
        error: (e) => {
          this.mensagem = e.error.message;
        }
      })
      .add(() => {
        this.spinner.hide();
      })
  }

}
