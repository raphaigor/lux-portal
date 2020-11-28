import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import * as moment from 'moment';

import { ParceiroService } from './parceiro.service';

@Component({
  selector: 'app-parceiro',
  templateUrl: './parceiro.component.html',
  styleUrls: ['./parceiro.component.css']
})
export class ParceiroComponent implements OnInit {

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
	formUsina: FormGroup;
	formParams: FormGroup;

	listParceiros = [];
	listUsinas = [];
	listUsinasBase = [];

	objDesativar = {id: null, razaoSocial: null};

	showBoxDados = true;
	showBoxParam = false;
	showBoxUsina = false;

	showBtSalvar = true;

	@ViewChild('myTable') table;

	constructor(private formBuilder: FormBuilder, private notifications: NotificationsService, private parceiroService: ParceiroService) { 
		
		this.formSearch = this.formBuilder.group({
			descricao: [null],
			status: [null],
			dataCadastroInicio: [null],
			dataCadastroFim: [null]
		});

		this.formSave = this.formBuilder.group({
			id: [null],
			bairro: [null],
			cep: [null, [Validators.required]],
			cidade: [null, [Validators.required]],
			cnpjCpf: [null, [Validators.required]],
			complemento: [null],
			contato1: [null, [Validators.required]],
			email: [null, [Validators.required]],
			endereco: [null, [Validators.required]],
			fantasia: [null],
			numero: [null, [Validators.required]],
			razaoSocial: [null, [Validators.required]],
			responsavel: [null, [Validators.required]],
			uf: [null, [Validators.required]]
		});

		this.formParams = this.formBuilder.group({
			cdi: [null, [Validators.required]],
			correcaoAm: [null, [Validators.required]],
			correcaoCdi: [null, [Validators.required]],
			correcaoTarifa: [null, [Validators.required]],
			correcaoCarencia: [null, [Validators.required]],
			prazoCarencia: [null, [Validators.required]],
			prazoFinanciamento: [null, [Validators.required]],
			qtdMesesSimulacao: [null, [Validators.required]]
		});

		this.formUsina = this.formBuilder.group({
			usinaId: [null, [Validators.required]]
		});

		this.parceiroService.searchUsinas()
			.subscribe(
				response => (
					this.listUsinas = response
			));

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
			descricao: [null],
			status: [null],
			dataCadastroInicio: [null],
			dataCadastroFim: [null]
		});
	}

	pesquisarParceiros(data){

		this.parceiroService.searchParceiros(data)
			.subscribe(
				response => (
					this.listParceiros = response
			));

	}

	fecharModal(){

		this.formSave = this.formBuilder.group({
			id: [null],
			bairro: [null],
			cep: [null, [Validators.required]],
			cidade: [null, [Validators.required]],
			cnpjCpf: [null, [Validators.required]],
			complemento: [null],
			contato1: [null, [Validators.required]],
			email: [null, [Validators.required]],
			endereco: [null, [Validators.required]],
			fantasia: [null],
			numero: [null, [Validators.required]],
			razaoSocial: [null, [Validators.required]],
			responsavel: [null, [Validators.required]],
			uf: [null, [Validators.required]]
		});

		this.formParams = this.formBuilder.group({
			cdi: [null, [Validators.required]],
			correcaoAm: [null, [Validators.required]],
			correcaoCdi: [null, [Validators.required]],
			correcaoTarifa: [null, [Validators.required]],
			correcaoCarencia: [null, [Validators.required]],
			prazoCarencia: [null, [Validators.required]],
			prazoFinanciamento: [null, [Validators.required]],
			qtdMesesSimulacao: [null, [Validators.required]]
		});

		this.selecionaTab('dados');
		
		this.showModalCadastro = false;

		this.listUsinasBase = [];
	}

	addUsina(data){

		if(this.formUsina.invalid){
			this.notifications.warn("Atenção!", "Preenchimento incorreto!");
			return;
		}

		var newArray = this.listUsinas.filter(function (el) {
			return el.id == data.usinaId;
		});

		if(newArray.length){
			this.listUsinasBase.push(newArray[0]);
		}

		this.formUsina = this.formBuilder.group({
			usinaId: [null, [Validators.required]]
		});

	}

	removerLinha(ind){
		this.listUsinasBase.splice(ind, 1);
	}

	sendForm(data, dataParam){

		if(this.formSave.invalid){
			this.notifications.warn("Atenção!", "Dados Básicos - Preenchimento incorreto!");
			return;
		}

		if(!this.listUsinasBase.length){
			this.notifications.warn("Atenção!", "Escolha pelo menos uma Usina!");
			return;
		}

		if(this.formParams.invalid){
			this.notifications.warn("Atenção!", "Parâmetros Financeiros - Preenchimento incorreto!");
			return;
		}

		this.showBtSalvar = false;

		data.cnpjCpf = this.unFormat(data.cnpjCpf);

		Object.assign(data, dataParam);

		data.usinasParceirosDTO = this.listUsinasBase.map(function(item){
			return {
				usinaId: item.id
			}
		});

		this.parceiroService.saveParceiros(data)
			.subscribe(
				response => (
					this.retornoSave(response)
			));

	}

	retornoSave(data){
		this.showBtSalvar = true;
		if(data){
			this.notifications.success("Sucesso!", "Parceiro salvo...");
			this.fecharModal();

			this.pesquisarParceiros(this.formSearch.value);
		}
	}

	editarParceiro(data){

		this.parceiroService.searchUsinasParceiros(data.id)
			.subscribe(
				response => (
					this.retornoEdit(data, response)
			));
	}

	retornoEdit(data, usinas){
		
		this.formSave = this.formBuilder.group({
			id: [data.id],
			bairro: [data.bairro],
			cep: [data.cep, [Validators.required]],
			cidade: [data.cidade, [Validators.required]],
			cnpjCpf: [this.format(data.cnpjCpf), [Validators.required]],
			complemento: [data.complemento],
			contato1: [data.contato1, [Validators.required]],
			email: [data.email, [Validators.required]],
			endereco: [data.endereco, [Validators.required]],
			fantasia: [data.fantasia],
			numero: [data.numero, [Validators.required]],
			razaoSocial: [data.razaoSocial, [Validators.required]],
			responsavel: [data.responsavel, [Validators.required]],
			uf: [data.uf, [Validators.required]]
		});

		this.formParams = this.formBuilder.group({
			cdi: [data.cdi, [Validators.required]],
			correcaoAm: [data.correcaoAm, [Validators.required]],
			correcaoCdi: [data.correcaoCdi, [Validators.required]],
			correcaoTarifa: [data.correcaoTarifa, [Validators.required]],
			correcaoCarencia: [data.correcaoCarencia, [Validators.required]],
			prazoCarencia: [data.prazoCarencia, [Validators.required]],
			prazoFinanciamento: [data.prazoFinanciamento, [Validators.required]],
			qtdMesesSimulacao: [data.qtdMesesSimulacao, [Validators.required]]
		});

		this.format(data.cnpjCpf);

		this.listUsinasBase = usinas.map(function(item){
			let ret = {
				nome: item.usinaNome,
				id: item.usinaId
			};

			return ret;
		});

		this.showModalCadastro = true;
	}

	inativarParceiro(data){
		this.objDesativar = data;
		this.showModalDesativar = true;
	}

	fecharModalDesativar(){
		this.objDesativar = {id: null, razaoSocial: null};
		this.showModalDesativar = false;
	}

	sendDesativar(){
		
		let data = '"INATIVO"';

		this.parceiroService.desativarParceiros(this.objDesativar.id, data)
			.subscribe(
				response => (
					this.retornoDesativa(response)
			));
	}

	retornoDesativa(data){
		if(data){
			this.notifications.success("Sucesso!", 'Parceiro desativado...');
			this.fecharModalDesativar();

			this.pesquisarParceiros(this.formSearch.value);
		}
	}

	buscarCep(cep){

		if(cep && cep.length == 8){
			this.parceiroService.searchCEP(cep)
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

	selecionaTab(tab){

		if(tab == 'dados'){
			this.showBoxDados = true;
			this.showBoxParam = false;
			this.showBoxUsina = false;
		}

		if(tab == 'param'){
			this.showBoxDados = false;
			this.showBoxParam = true;
			this.showBoxUsina = false;
		}

		if(tab == 'usina'){
			this.showBoxDados = false;
			this.showBoxParam = false;
			this.showBoxUsina = true;
		}

	}

	ativarParceiro(parceiro){
		
		let data = '"ATIVO"';

		this.parceiroService.desativarParceiros(parceiro.id, data)
			.subscribe(
				response => (
					this.retornoAtiva(response)
			));
	}

	retornoAtiva(data){
		if(data){
			this.notifications.success("Sucesso!", 'Parceiro ativado...');
			this.pesquisarParceiros(this.formSearch.value);
		}
	}

	calcForm(){

		let correcaoAm = 0;
		correcaoAm = (this.formParams.value.cdi / 100) * (this.formParams.value.correcaoCdi / 12);
		let correcaoAm2 = correcaoAm.toFixed(9);

		this.formParams.controls['correcaoAm'].setValue(correcaoAm2);

	}

}
