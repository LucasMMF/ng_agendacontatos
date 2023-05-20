import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { RecuperarSenhaRequest } from 'src/app/models/recuperar-senha.request.model';
import { RecuperarSenhaService } from 'src/app/services/recuperar-senha.service';

@Component({
  selector: 'app-password-recover',
  templateUrl: './password-recover.component.html',
  styleUrls: ['./password-recover.component.css']
})
export class PasswordRecoverComponent {

  // Atributos
  mensagem: string = '';

  // Construtor
  constructor(
    private recuperarSenhaService: RecuperarSenhaService,
    private spinner: NgxSpinnerService
  ){
  }

  // Formulário
  formRecuperarSenha = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  // Função para capturar os campos do formulário
  // e verificar se possuem erros de validação
  get form(): any {
    return this.formRecuperarSenha.controls;
  }

  // Função para processar o SUBMIT do formulário
  onSubmit(): void {

    this.spinner.show();

    const recuperarSenhaRequest: RecuperarSenhaRequest = {
      email: this.formRecuperarSenha.value.email as string
    };

    this.recuperarSenhaService.post(recuperarSenhaRequest)
      .subscribe({
        next: (data) => {
          this.mensagem = `Recuperação de senha realizada com sucesso para o usuário: ${data.nome}`;
          this.formRecuperarSenha.reset();
        },
        error: (e) => {
          this.mensagem = e.error.message;
        }
      }).add(() => {
        this.spinner.hide();
      })

  }

}
