import { Injectable } from "@angular/core";
import { AutenticarHelper } from "../helpers/autenticar.helper";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

    constructor(
        private autenticarHelper: AutenticarHelper
    ){
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const urls = [
            environment.apiContatos + "/contatos",
            environment.apiContatos + "/dashboard"
        ]

        // Verificando se a chamada feita pelo HttpClient
        // é para um endereço de API que contenha /api/contatos
        // if (req.url.includes("/contatos") || req.url.includes("/dashboard")) {
        if (urls.some(item => req.url.includes(item))) {

            // Capturar o Token gravado na localstorage
            let accessToken = this.autenticarHelper.getData()?.accessToken;

            // Adicionar o token no cabeçalho da requisição da API
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + accessToken
                }
            });
        }

        // Liberando a requisição
        return next.handle(req);
    }

}