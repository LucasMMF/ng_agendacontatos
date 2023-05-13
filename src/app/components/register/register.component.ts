import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordMatchValidator } from 'src/app/validators/password-match.validator';
import { CriarContaRequest } from 'src/app/models/criar-conta.request.model';
import { CriarContaService } from 'src/app/services/criar-conta.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // atributos
  mensagem: string = '';

  // Método construtor
  constructor(
    private criarContaService: CriarContaService, // Injeção de dependência
    private spinner: NgxSpinnerService
  ) {
  }

  // Estrutura do formulário
  formRegister = new FormGroup({
    // Campo 'nome'
    nome: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(150)
    ]),
    // Campo 'email'
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    // Campo 'senha'
    senha: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+=[\]{}|\\,./?]).{8,20}$/)
    ]),
    // Campo 'confirmacao de senha'
    senhaConfirmacao: new FormControl('', [
      Validators.required
    ])
  }, {
    // Incluindo as validações customizadas do formulário
    validators: [
      PasswordMatchValidator.MatchPassword
    ]
  });

  // Função para verificar a validação dos campos
  get form(): any {
    // Retornar todos os controles do formulário (FormControl)
    return this.formRegister.controls;
  }

  // Função para capturar o SUBMIT do formulário
  onSubmit(): void {

    this.spinner.show();

    // Requisição
    const criarContaRequest : CriarContaRequest = {
      nome: this.formRegister.value.nome as string,
      email: this.formRegister.value.email as string,
      senha: this.formRegister.value.senha as string
    };
    
    // Enviando uma requisição HTTP POST para a API
    this.criarContaService.post(criarContaRequest)
    .subscribe({ // Capturando o retorno (promise) da API
      next: (data) => { // Obtendo a resposta de sucesso da API
        this.mensagem = `Parabéns ${data.nome}, sua conta foi criada com sucesso!`;
        this.formRegister.reset(); // Limpar os campos do formulário
      },
      error: (e) => { // Obtendo a resposta de erro da API
        this.mensagem = e.error.message;
        console.log(e.error);
      }
    })
    .add(() => {
      this.spinner.hide();
    })

  }

}
