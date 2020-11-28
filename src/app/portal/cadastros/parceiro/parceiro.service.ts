import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../../../shared/services/http/http.service";
import { RestService } from "../../../shared/services/rest/rest.service";

@Injectable()
export class ParceiroService {

	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService, private restService: RestService) { 

	}

	searchUsinas(){
		return this.httpService.doPost('/services/cadastro/usina/listar', {status: "ATIVO"});
	}

	searchParceiros(data){
		return this.httpService.doPost('/services/cadastro/parceiro/listar', data);
	}

	saveParceiros(data){
		return this.httpService.doPost('/services/cadastro/parceiro', data);
	}

	desativarParceiros(id, data){
		return this.httpService.doPut('/services/cadastro/parceiro/'+id+'/status', data);
	}

	searchCEP(cep){
		return this.httpService.doGet('https://viacep.com.br/ws/'+cep+'/json', null, true);
	}

	searchUsinasParceiros(id){
		return this.httpService.doPost('/services/cadastro/parceiro/listar-usinas/'+id, {});
	}
}
