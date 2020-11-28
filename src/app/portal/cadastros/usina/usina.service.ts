import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../../../shared/services/http/http.service";
import { RestService } from "../../../shared/services/rest/rest.service";

@Injectable()
export class UsinaService {

	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService, private restService: RestService) { 

	}

	searchUsinas(data){
		return this.httpService.doPost('/services/cadastro/usina/listar', data);
	}

	saveUsina(data){
		return this.httpService.doPost('/services/cadastro/usina', data);
	}

	desativarUsina(usinaId, data){
		return this.httpService.doPut('/services/cadastro/usina/'+usinaId+'/status', data);
	}

	searchConcorrentes(usinaId){
		return this.httpService.doGet('/services/cadastro/usina/listar/concorrentes/'+usinaId, null);
	}
}
