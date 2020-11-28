import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import * as moment from 'moment';

import { ParametroFinanceiroService } from "./parametro-financeiro.service";

@Component({
  selector: 'app-parametro-financeiro',
  templateUrl: './parametro-financeiro.component.html',
  styleUrls: ['./parametro-financeiro.component.css']
})
export class ParametroFinanceiroComponent implements OnInit {

	showModalCadastro = false;
	showModalDesativar = false;

	formSearch: FormGroup;
	formSave: FormGroup;

	listParametro = [];
	listUsinas = [];

	objDesativar = {id: null, descricao: null};

	usinaSelected = {
		potenciaKw: 1
	};

	@ViewChild('myTable') table;

	constructor(private formBuilder: FormBuilder, private parametroFinaceiroService: ParametroFinanceiroService, private notifications: NotificationsService) { 
		
		this.formSearch = this.formBuilder.group({
			descricao: [null],
			status: [null],
			dataCadastroInicio: [null],
			dataCadastroFim: [null]
		});

		this.formSave = this.formBuilder.group({
			cdi: [null, [Validators.required]],
			correcaoAm: [null, [Validators.required]],
			correcaoCdi: [null, [Validators.required]],
			correcaoTarifa: [null, [Validators.required]],
			correcaoCarencia: [null, [Validators.required]],
			descricao: [null],
			id: [null],
			prazo: [null, [Validators.required]],
			qtdMesesSimulacaoPrice: [null, [Validators.required]],
			usinaId: [null, [Validators.required]]
		});

		this.parametroFinaceiroService.searchUsinas()
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

	pesquisarParametros(data){

		this.parametroFinaceiroService.searchParametros(data)
			.subscribe(
				response => (
					this.listParametro = response
			));

	}

	fecharModal(){

		this.formSave = this.formBuilder.group({
			cdi: [null, [Validators.required]],
			correcaoAm: [null, [Validators.required]],
			correcaoCdi: [null, [Validators.required]],
			correcaoTarifa: [null, [Validators.required]],
			correcaoCarencia: [null, [Validators.required]],
			descricao: [null],
			id: [null],
			prazo: [null, [Validators.required]],
			qtdMesesSimulacaoPrice: [null, [Validators.required]],
			usinaId: [null, [Validators.required]]
		});

		this.showModalCadastro = false;
	}

	sendForm(data){

		if(this.formSave.invalid){
			this.notifications.warn("Atenção!", "Preenchimento incorreto!");
			return;
		}

		this.parametroFinaceiroService.saveParametros(data)
			.subscribe(
				response => (
					this.retornoSave(response)
			));

	}

	retornoSave(data){
		if(data){
			this.notifications.success("Sucesso!", 'Parâmetro Financeiro salvo...');
			this.fecharModal();

			this.pesquisarParametros(this.formSearch.value);
		}
	}

	editarParametro(data){

		this.formSave = this.formBuilder.group({
			cdi: [data.cdi, [Validators.required]],
			correcaoAm: [data.correcaoAm, [Validators.required]],
			correcaoCdi: [data.correcaoCdi, [Validators.required]],
			correcaoTarifa: [data.correcaoTarifa, [Validators.required]],
			correcaoCarencia: [data.correcaoCarencia, [Validators.required]],
			descricao: [data.descricao],
			id: [data.id],
			prazo: [data.prazo, [Validators.required]],
			qtdMesesSimulacaoPrice: [data.qtdMesesSimulacaoPrice, [Validators.required]],
			usinaId: [data.usinaId, [Validators.required]]
		});

		this.showModalCadastro = true;

	}

	inativarParametro(data){
		this.objDesativar = data;
		this.showModalDesativar = true;
	}

	fecharModalDesativar(){
		this.objDesativar = {id: null, descricao: null};
		this.showModalDesativar = false;
	}

	sendDesativar(){
		
		let data = '"INATIVO"';

		this.parametroFinaceiroService.desativarParametros(this.objDesativar.id, data)
			.subscribe(
				response => (
					this.retornoDesativa(response)
			));
	}

	retornoDesativa(data){
		if(data){
			this.notifications.success("Sucesso!", 'Parâmetro Financeiro desativada...');
			this.fecharModalDesativar();

			this.pesquisarParametros(this.formSearch.value);
		}
	}

}
