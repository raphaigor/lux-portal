import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../../../shared/services/http/http.service";
import { RestService } from "../../../shared/services/rest/rest.service";

@Injectable()
export class ParametroFinanceiroService {

	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService, private restService: RestService) { 

	}

	searchUsinas(){
		return this.httpService.doPost('/services/cadastro/usina/listar', {status: "ATIVO"});
	}

	searchParametros(data){
		return this.httpService.doPost('/services/cadastro/parametro-financeiro/listar', data);
	}

	saveParametros(data){
		return this.httpService.doPost('/services/cadastro/parametro-financeiro', data);
	}

	desativarParametros(id, data){
		return this.httpService.doPut('/services/cadastro/parametro-financeiro/'+id+'/status', data);
	}
}
