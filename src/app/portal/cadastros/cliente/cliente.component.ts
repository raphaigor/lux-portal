import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import * as moment from 'moment';

import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

	cpf_cnpj = '';
	DECIMAL_SEPARATOR=".";
	GROUP_SEPARATOR=",";
	pureResult: any;
	maskedId: any;
	val: any;
	v: any;

	listEstados = [
		{"nome": "Acre", "sigla": "AC"},
		{"nome": "Alagoas", "sigla": "AL"},
		{"nome": "Amapá", "sigla": "AP"},
		{"nome": "Amazonas", "sigla": "AM"},
		{"nome": "Bahia", "sigla": "BA"},
		{"nome": "Ceará", "sigla": "CE"},
		{"nome": "Distrito Federal", "sigla": "DF"},
		{"nome": "Espírito Santo", "sigla": "ES"},
		{"nome": "Goiás", "sigla": "GO"},
		{"nome": "Maranhão", "sigla": "MA"},
		{"nome": "Mato Grosso", "sigla": "MT"},
		{"nome": "Mato Grosso do Sul", "sigla": "MS"},
		{"nome": "Minas Gerais", "sigla": "MG"},
		{"nome": "Pará", "sigla": "PA"},
		{"nome": "Paraíba", "sigla": "PB"},
		{"nome": "Paraná", "sigla": "PR"},
		{"nome": "Pernambuco", "sigla": "PE"},
		{"nome": "Piauí", "sigla": "PI"},
		{"nome": "Rio de Janeiro", "sigla": "RJ"},
		{"nome": "Rio Grande do Norte", "sigla": "RN"},
		{"nome": "Rio Grande do Sul", "sigla": "RS"},
		{"nome": "Rondônia", "sigla": "RO"},
		{"nome": "Roraima", "sigla": "RR"},
		{"nome": "Santa Catarina", "sigla": "SC"},
		{"nome": "São Paulo", "sigla": "SP"},
		{"nome": "Sergipe", "sigla": "SE"},
		{"nome": "Tocantins", "sigla": "TO"}
	];

	showModalCadastro = false;
	showModalDesativar = false;

	formSearch: FormGroup;
	formSave: FormGroup;

	listClientes = [];

	objDesativar = {id: null, nome: null};

	showBtSalvar = true;

	@ViewChild('myTable') table;

	constructor(private formBuilder: FormBuilder, private notifications: NotificationsService, private clienteService: ClienteService) { 
		
		this.formSearch = this.formBuilder.group({
			nome: [null],
			status: [null],
			dataCadastroInicio: [null],
			dataCadastroFim: [null]
		});

		this.formSave = this.formBuilder.group({
			id: [null],
			bairro: [null, [Validators.required]],
			cep: [null, [Validators.required]],
			cidade: [null, [Validators.required]],
			cnpjCpf: [null, [Validators.required]],
			complemento: [null],
			contato1: [null, [Validators.required]],
			email: [null, [Validators.required]],
			endereco: [null, [Validators.required]],
			nome: [null, [Validators.required]],
			numero: [null, [Validators.required]],
			responsavel: [null],
			uf: [null, [Validators.required]]
		});

	}

	ngOnInit() {
	}

	formatDate(data) {
		if(data){
			return moment(new Date(data)).format('DD/MM/YYYY');
		}else {
			return '-';
		}
	}

	limparForm(){
		this.formSearch = this.formBuilder.group({
			nome: [null],
			status: [null],
			dataCadastroInicio: [null],
			dataCadastroFim: [null]
		});
	}

	pesquisarClientes(data){

		this.clienteService.searchClientes(data)
			.subscribe(
				response => (
					this.listClientes = response
			));

	}

	fecharModal(){

		this.formSave = this.formBuilder.group({
			id: [null],
			bairro: [null, [Validators.required]],
			cep: [null, [Validators.required]],
			cidade: [null, [Validators.required]],
			cnpjCpf: [null, [Validators.required]],
			complemento: [null],
			contato1: [null, [Validators.required]],
			email: [null, [Validators.required]],
			endereco: [null, [Validators.required]],
			nome: [null, [Validators.required]],
			numero: [null, [Validators.required]],
			responsavel: [null],
			uf: [null, [Validators.required]]
		});

		this.showModalCadastro = false;

	}

	sendForm(data){

		if(this.formSave.invalid){
			this.notifications.warn("Atenção!", "Preenchimento incorreto!");
			return;
		}

		this.showBtSalvar = false;

		data.cnpjCpf = this.unFormat(data.cnpjCpf);

		this.clienteService.saveCliente(data)
			.subscribe(
				response => (
					this.retornoSave(response)
			));
	}

	retornoSave(data){
		this.showBtSalvar = true;
		if(data){
			this.notifications.success("Sucesso!", 'Cliente salvo...');
			this.fecharModal();

			this.pesquisarClientes(this.formSearch.value);
		}
	}

	editarCliente(data){

		this.formSave = this.formBuilder.group({
			id: [data.id],
			bairro: [data.bairro, [Validators.required]],
			cep: [data.cep, [Validators.required]],
			cidade: [data.cidade, [Validators.required]],
			cnpjCpf: [data.cnpjCpf, [Validators.required]],
			complemento: [data.complemento],
			contato1: [data.contato1, [Validators.required]],
			email: [data.email, [Validators.required]],
			endereco: [data.endereco, [Validators.required]],
			nome: [data.nome, [Validators.required]],
			numero: [data.numero, [Validators.required]],
			responsavel: [data.responsavel],
			uf: [data.uf, [Validators.required]]
		});

		this.format(data.cnpjCpf);

		this.showModalCadastro = true;

	}

	inativarCliente(data){
		this.objDesativar = data;
		this.showModalDesativar = true;
	}

	fecharModalDesativar(){
		this.objDesativar = {id: null, nome: null};
		this.showModalDesativar = false;
	}

	sendDesativar(){
		
		let data = '"INATIVO"';

		this.clienteService.desativarCliente(this.objDesativar.id, data)
			.subscribe(
				response => (
					this.retornoDesativa(response)
			));
	}

	retornoDesativa(data){
		if(data){
			this.notifications.success("Sucesso!", 'Cliente desativado...');
			this.fecharModalDesativar();

			this.pesquisarClientes(this.formSearch.value);
		}
	}

	buscarCep(cep){

		if(cep && cep.length == 8){
			this.clienteService.searchCEP(cep)
				.subscribe(
					response => (
						this.retornoCep(response)
				));
		}
	}

	retornoCep(data){

		this.formSave.controls['endereco'].setValue(data.logradouro);
		this.formSave.controls['bairro'].setValue(data.bairro);
		this.formSave.controls['cidade'].setValue(data.localidade);
		this.formSave.controls['uf'].setValue(data.uf);

	}

	format(valString) {
		
		if (!valString) {
			return '';
		}
		
		if(valString.length <= 11){
		  this.maskedId = this.cpf_mask(valString);
		}else{
		  this.maskedId = this.cnpj(valString);
		}

		this.formSave.controls['cnpjCpf'].setValue(this.maskedId);
	};
	
	unFormat(val) {
		if (!val) {
			return '';
		}
		val = val.replace(/\D/g, '');
	
		if (this.GROUP_SEPARATOR === ',') {
			return val.replace(/,/g, '');
		} else {
			return val.replace(/\./g, '');
		}
	};
	
	cpf_mask(v) {
		v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
		v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
		v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
		//de novo (para o segundo bloco de números)
		v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
		return v;
	}
	
	cnpj(v) {
		v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
		v = v.replace(/^(\d{2})(\d)/, '$1.$2'); //Coloca ponto entre o segundo e o terceiro dígitos
		v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); //Coloca ponto entre o quinto e o sexto dígitos
		v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); //Coloca uma barra entre o oitavo e o nono dígitos
		v = v.replace(/(\d{4})(\d)/, '$1-$2'); //Coloca um hífen depois do bloco de quatro dígitos
		return v;
	}

	ativarCliente(cliente){

		let data = '"ATIVO"';

		this.clienteService.desativarCliente(cliente.id, data)
			.subscribe(
				response => (
					this.retornoAtivar(response)
			));
	}

	retornoAtivar(data){
		if(data){
			this.notifications.success("Sucesso!", 'Cliente ativado...');
			this.pesquisarClientes(this.formSearch.value);
		}
	}

}
