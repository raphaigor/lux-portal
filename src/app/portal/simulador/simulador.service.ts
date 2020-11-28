import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../../shared/services/http/http.service";
import { RestService } from "../../shared/services/rest/rest.service";

@Injectable()
export class SimuladorService {

	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService, private restService: RestService) { 

	}

	searchUsinas(vendedorId){
		return this.httpService.doPost('/services/cadastro/usina/listar/vinculadas-parceiro-vendedor/'+vendedorId, {});
	}

	searchTipoRede(){
		return this.httpService.doPost('/services/cadastro/rede-eletrica/listar', {status: "ATIVO"});
	}

	searchCliente(data){
		return this.httpService.doPost('/services/cadastro/cliente/listar', data);
	}

	sendSimular(data){
		return this.httpService.doPost('/services/financeiro/resumo-simulacao', data);
	}

	sendSimularPrice(data){
		return this.httpService.doPost('/services/financeiro/simulacao-detalhada-financeiro', data);
	}

	sendVenda(data){
		return this.httpService.doPost('/services/financeiro/venda', data);
	}

	searchParceiro(){
		return this.httpService.doPost('/services/cadastro/parceiro/listar', {status: "ATIVO"});
	}

	searchCEP(cep){
		return this.httpService.doGet('https://viacep.com.br/ws/'+cep+'/json', null, true);
	}

	saveCliente(data){
		return this.httpService.doPost('/services/cadastro/cliente', data);
	}

	searchStatusVenda(usinaId, capacidadeContratada){
		return this.httpService.doGet('/services/financeiro/venda/status-disponiveis/'+usinaId+'/'+capacidadeContratada, null);
	}

	searchParceiroVendedor(vendedorId){
		return this.httpService.doPost('/services/cadastro/vendedor/listar-parceiros/'+vendedorId, null);
	}

	searchUsinasParceiro(parceiroId){
		return this.httpService.doPost('/services/cadastro/parceiro/listar-usinas/'+parceiroId, null);
	}
}
