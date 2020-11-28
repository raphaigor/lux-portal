import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../../../shared/services/http/http.service";
import { RestService } from "../../../shared/services/rest/rest.service";

@Injectable()
export class ConcorrenteService {

	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService, private restService: RestService) { 

	}

	searchUsinas(){
		return this.httpService.doPost('/services/cadastro/usina/listar', {status: "ATIVO"});
	}

	searchConcorrentes(data){
		return this.httpService.doPost('/services/cadastro/concorrente/listar', data);
	}

	saveConcorrente(data){
		return this.httpService.doPost('/services/cadastro/concorrente', data);
	}

	desativarConcorrente(id, data){
		return this.httpService.doPut('/services/cadastro/concorrente/'+id+'/status', data);
	}

	searchUsinasConcorrente(id){
		return this.httpService.doPost('/services/cadastro/concorrente/listar-usinas/'+id, {});
	}
}
