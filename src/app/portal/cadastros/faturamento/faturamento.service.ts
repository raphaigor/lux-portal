import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../../../shared/services/http/http.service";
import { RestService } from "../../../shared/services/rest/rest.service";

@Injectable()
export class FaturamentoService {

	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService, private restService: RestService) { 

	}

	searchUsinas(){
		return this.httpService.doPost('/services/cadastro/usina/listar', {status: "ATIVO"});
	}

	searchTipoRede(){
		return this.httpService.doPost('/services/cadastro/rede-eletrica/listar', {status: "ATIVO"});
	}

	searchFaturamento(data){
		return this.httpService.doPost('/services/cadastro/faturamento/listar', data);
	}

	saveFaturamento(data){
		return this.httpService.doPost('/services/cadastro/faturamento', data);
	}

	desativarFaturamento(faturamentoId, data){
		return this.httpService.doPut('/services/cadastro/faturamento/'+faturamentoId+'/status', data);
	}
}
