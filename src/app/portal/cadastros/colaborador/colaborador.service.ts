import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../../../shared/services/http/http.service";
import { RestService } from "../../../shared/services/rest/rest.service";

@Injectable()
export class ColaboradorService {

	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService, private restService: RestService) { 

	}

	searchCadastros(data){
		return this.httpService.doPost('/services/cadastro/acesso/listar', data);
	}

	save(data){
		return this.httpService.doPost('/services/cadastro/acesso', data);
	}
}
