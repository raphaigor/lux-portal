import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../../../shared/services/http/http.service";
import { RestService } from "../../../shared/services/rest/rest.service";

@Injectable()
export class RedeEletricaService {

	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService, private restService: RestService) { 

	}

	searchRedes(data){
		return this.httpService.doPost('/services/cadastro/rede-eletrica/listar', data);
	}

	saveRede(data){
		return this.httpService.doPost('/services/cadastro/rede-eletrica', data);
	}

	desativarRede(id, data){
		return this.httpService.doPut('/services/cadastro/rede-eletrica/'+id+'/status', data);
	}
}
