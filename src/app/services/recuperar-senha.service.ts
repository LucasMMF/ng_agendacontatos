import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { RecuperarSenhaRequest } from "../models/recuperar-senha.request.model";
import { RecuperarSenhaResponse } from "../models/recuperar-senha.response.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RecuperarSenhaService {

    constructor(
        private httpClient: HttpClient
    ){
    }

    // POST /api/recuperar-senha
    post(request: RecuperarSenhaRequest): Observable<RecuperarSenhaResponse> {
        return this.httpClient.post<RecuperarSenhaResponse>
            (environment.apiContatos + "/recuperar-senha", request);
    }
    
}