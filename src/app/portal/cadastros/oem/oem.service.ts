import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../../../shared/services/http/http.service";
import { RestService } from "../../../shared/services/rest/rest.service";

@Injectable()
export class OemService {

	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService, private restService: RestService) { 

	}

	searchUsinas(){
		return this.httpService.doPost('/services/cadastro/usina/listar', {status: "ATIVO"});
	}

	searchOem(data){
		return this.httpService.doPost('/services/cadastro/oem/listar', data);
	}

	saveOem(data){
		return this.httpService.doPost('/services/cadastro/oem', data);
	}

	desativarOem(oemId, data){
		return this.httpService.doPut('/services/cadastro/oem/'+oemId+'/status', data);
	}
}
