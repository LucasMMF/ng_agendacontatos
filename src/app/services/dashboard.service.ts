import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { DashboardModel } from "../models/dashboard.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(
        private httpClient: HttpClient
    ){
    }

    // GET /api/dashboard
    get(): Observable<DashboardModel[]> {
        return this.httpClient.get<DashboardModel[]>
            (environment.apiContatos + "/dashboard");
    }

}