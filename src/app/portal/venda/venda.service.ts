import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../../shared/services/http/http.service";
import { RestService } from "../../shared/services/rest/rest.service";

@Injectable()
export class VendaService {

	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService, private restService: RestService) { 

	}

	searchVendas(data){
		return this.httpService.doPost('/services/financeiro/venda/listar', data);
	}

	searchUsinas(){
		return this.httpService.doPost('/services/cadastro/usina/listar', { status: 'ATIVO' });
	}

	searchUsinasVendedor(vendedorId){
		return this.httpService.doPost('/services/cadastro/usina/listar/vinculadas-parceiro-vendedor/'+vendedorId, {});
	}

	searchVendedores(){
		return this.httpService.doPost('/services/cadastro/vendedor/listar', { status: 'ATIVO' });
	}

	searchClientes(){
		return this.httpService.doPost('/services/cadastro/cliente/listar', { status: 'ATIVO' });
	}

	searchCapacidade(usinaId){
		return this.httpService.doGet('/services/cadastro/usina/listar/capacidade-usina/'+usinaId, null);
	}

	searchParceiro(){
		return this.httpService.doPost('/services/cadastro/parceiro/listar', {status: "ATIVO"});
	}

	searchParceiroVendedor(vendedorId){
		return this.httpService.doPost('/services/cadastro/vendedor/listar-parceiros/'+vendedorId, null);
	}

	sendStatus(data){
		return this.httpService.doPost('/services/financeiro/venda/alterar-status', data);
	}

	sendSimular(data){
		return this.httpService.doPost('/services/financeiro/resumo-simulacao', data);
	}

	sendSimularPrice(data){
		return this.httpService.doPost('/services/financeiro/simulacao-detalhada-financeiro', data);
	}

	searchStatusVenda(usinaId, capacidadeContratada){
		return this.httpService.doGet('/services/financeiro/venda/status-disponiveis/'+usinaId+'/'+capacidadeContratada, null);
	}
}
