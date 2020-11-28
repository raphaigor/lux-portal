import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../../../shared/services/http/http.service";
import { RestService } from "../../../shared/services/rest/rest.service";

@Injectable()
export class RelatorioVendedorService {

  	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService, private restService: RestService) { 

	}

	searchVendedores(){
		return this.httpService.doPost('/services/cadastro/vendedor/listar', { status: 'ATIVO' });
	}

	searchParceirosGerente(vendedorId){
		return this.httpService.doPost('/services/cadastro/vendedor/listar-parceiros/'+vendedorId, null);
	}

	searchRelatorio(strParam){
		return this.httpService.doGet('/services/relatorio/vendas-por-vendedor'+strParam, null);
	}

	searchVendedoresParceiros(data){
		return this.httpService.doPost('/services/cadastro/vendedor/listar-por-parceiro', data);
	}

}
