import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../../../shared/services/http/http.service";
import { RestService } from "../../../shared/services/rest/rest.service";

@Injectable()
export class VendedorService {

	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService, private restService: RestService) { 

	}

	searchParceiro(){
		return this.httpService.doPost('/services/cadastro/parceiro/listar', {status: "ATIVO"});
	}

	searchVendedor(data){
		return this.httpService.doPost('/services/cadastro/vendedor/listar', data);
	}

	saveVendedor(data){
		return this.httpService.doPost('/services/cadastro/vendedor', data);
	}

	desativarVendedor(id, data){
		return this.httpService.doPut('/services/cadastro/vendedor/'+id+'/status', data);
	}

	searchParceiroVendedor(vendedorId){
		return this.httpService.doPost('/services/cadastro/vendedor/listar-parceiros/'+vendedorId, {});
	}
}
