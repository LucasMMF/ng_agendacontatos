/* 
    Classe de modelo para a resposta
    do serviço GET /api/contatos
*/
export class ConsultarContatos {

    idContato: string = '';
    nome: string = '';
    email: string = '';
    telefone: string = '';
    dataCriacao: Date | null = null;
    idUsuario: string = '';

}