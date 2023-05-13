import { AbstractControl } from "@angular/forms";

/*
    Classe de validação customizada para comparar
    os campos 'senha' e 'senhaConfirmacao'
*/
export class PasswordMatchValidator {

    static MatchPassword(abstractControl: AbstractControl) {

        // Capturar o campo 'senha'
        let senha = abstractControl.get('senha')?.value;
        // Capturar o campo 'senhaConfirmacao' do formulário
        let senhaConfirmacao = abstractControl.get('senhaConfirmacao')?.value;

        // Verificar se os campos estão com valores diferentes
        if (senha != senhaConfirmacao)
            // gerar um erro de validação no campo 'senhaConfirmacao'
            abstractControl.get('senhaConfirmacao')?.setErrors({
                // Nome do erro atribuido ao campo
                matchPassword: true
            });
        
        return null; // Vazio (não há erros de validação)

    }

}