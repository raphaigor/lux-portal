import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import * as moment from 'moment';

import { ConcorrenteService } from "./concorrente.service";

@Component({
  selector: 'app-concorrente',
  templateUrl: './concorrente.component.html',
  styleUrls: ['./concorrente.component.css']
})
export class ConcorrenteComponent implements OnInit {

	showModalCadastro = false;
	showModalDesativar = false;

	formSearch: FormGroup;
	formSave: FormGroup;
	formUsina: FormGroup;

	listConcorrentes = [];
	listUsinas = [];
	listUsinasBase = [];

	objDesativar = {id: null, nome: null};

	usinaSelected = {
		usina: null,
		baseCalculo: null
	};

	constructor(private formBuilder: FormBuilder, private notifications: NotificationsService, private concorrenteService: ConcorrenteService) { 
		
		this.formSearch = this.formBuilder.group({
			descricao: [null],
			status: [null],
			dataCadastroInicio: [null],
			dataCadastroFim: [null]
		});

		this.formSave = this.formBuilder.group({
			cnpj: [null],
			id: [null],
			nome: [null, [Validators.required]]
		});

		this.formUsina = this.formBuilder.group({
			usinaId: [null, [Validators.required]],
			baseCalculo: [null, [Validators.required]]
		});

		this.concorrenteService.searchUsinas()
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

	pesquisarConcorrente(data){

		this.concorrenteService.searchConcorrentes(data)
			.subscribe(
				response => (
					this.listConcorrentes = response
			));

	}

	fecharModal(){

		this.formSave = this.formBuilder.group({
			cnpj: [null],
			id: [null],
			nome: [null, [Validators.required]]
		});

		this.listUsinasBase = [];

		this.showModalCadastro = false;

	}

	sendForm(data){

		if(this.formSave.invalid){
			this.notifications.warn("Atenção!", "Preenchimento incorreto!");
			return;
		}

		if(!this.listUsinasBase.length){
			this.notifications.warn("Atenção!", "Informe a Usina!");
			return;
		}

		data.usinasParceirosDTO = this.listUsinasBase.map(function(item){
			return {
				usinaId: item.usina.id,
				baseCalculo: item.baseCalculo
			}
		});

		this.concorrenteService.saveConcorrente(data)
			.subscribe(
				response => (
					this.retornoSave(response)
			));

	}

	retornoSave(data){
		if(data){
			this.notifications.success("Sucesso!", 'Concorrente salvo...');
			this.fecharModal();

			this.pesquisarConcorrente(this.formSearch.value);
		}
	}

	editarConcorrente(data){

		this.concorrenteService.searchUsinasConcorrente(data.id)
			.subscribe(
				response => (
					this.retornoUsinasEditar(data, response)
			));
		
	}

	retornoUsinasEditar(data, usinas){

		this.formSave = this.formBuilder.group({
			cnpj: [data.cnpj],
			id: [data.id],
			nome: [data.nome, [Validators.required]]
		});

		this.listUsinasBase = usinas.map(function(item){
			let ret = {
				usina: {
					id: item.usinaId,
					nome: item.usinaNome
				},
				baseCalculo: item.baseCalculo
			};

			return ret;
		});

		this.showModalCadastro = true;

	}

	inativarConcorrente(data){
		this.objDesativar = data;
		this.showModalDesativar = true;
	}

	fecharModalDesativar(){
		this.objDesativar = {id: null, nome: null};
		this.showModalDesativar = false;
	}

	sendDesativar(){
		
		let data = '"INATIVO"';

		this.concorrenteService.desativarConcorrente(this.objDesativar.id, data)
			.subscribe(
				response => (
					this.retornoDesativa(response)
			));
	}

	retornoDesativa(data){
		if(data){
			this.notifications.success("Sucesso!", 'Concorrente desativada...');
			this.fecharModalDesativar();

			this.pesquisarConcorrente(this.formSearch.value);
		}
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
			this.usinaSelected = { usina: newArray[0], baseCalculo: data.baseCalculo };
			this.listUsinasBase.push(this.usinaSelected);
		} else {
			this.usinaSelected = { usina: null, baseCalculo: null };
		}

		this.formUsina = this.formBuilder.group({
			usinaId: [null, [Validators.required]],
			baseCalculo: [null, [Validators.required]]
		});

	}

	removerLinha(ind){
		this.listUsinasBase.splice(ind, 1);
	}

}
