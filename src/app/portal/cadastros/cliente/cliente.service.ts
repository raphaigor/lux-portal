import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../../../shared/services/http/http.service";
import { RestService } from "../../../shared/services/rest/rest.service";

@Injectable()
export class ClienteService {

  	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService, private restService: RestService) { 

	}

	searchClientes(data){
		return this.httpService.doPost('/services/cadastro/cliente/listar', data);
	}

	saveCliente(data){
		return this.httpService.doPost('/services/cadastro/cliente', data);
	}

	desativarCliente(id, data){
		return this.httpService.doPut('/services/cadastro/cliente/'+id+'/status', data);
	}

	searchCEP(cep){
		return this.httpService.doGet('https://viacep.com.br/ws/'+cep+'/json', null, true);
	}

}
