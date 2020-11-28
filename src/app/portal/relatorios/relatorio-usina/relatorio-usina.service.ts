import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../../../shared/services/http/http.service";
import { RestService } from "../../../shared/services/rest/rest.service";

@Injectable()
export class RelatorioUsinaService {

	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService, private restService: RestService) { 

	}

	searchUsinas(){
		return this.httpService.doPost('/services/cadastro/usina/listar', { status: 'ATIVO' });
	}

	searchVendedores(){
		return this.httpService.doPost('/services/cadastro/vendedor/listar', { status: 'ATIVO' });
	}

	searchParceiro(){
		return this.httpService.doPost('/services/cadastro/parceiro/listar', {status: "ATIVO"});
	}

	searchRelatorio(strParam){
		let data = null;
		if(strParam){
			data = strParam;
		}
		return this.httpService.doGet('/services/relatorio/vendas-usina', data);
	}
}
