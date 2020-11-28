import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import * as moment from 'moment';

import { ColaboradorService } from './colaborador.service';

@Component({
  selector: 'app-colaborador',
  templateUrl: './colaborador.component.html',
  styleUrls: ['./colaborador.component.css']
})
export class ColaboradorComponent implements OnInit {

	showModalCadastro = false;
	showModalDesativar = false;

	listCadastros = [];

	formSearch: FormGroup;
	formSave: FormGroup;

	objDesativar = {id: null, nome: null, username: null};

	showBtSalvar = true;

	@ViewChild('myTable') table;

	constructor(private formBuilder: FormBuilder, private colaboradorService: ColaboradorService, private notifications: NotificationsService) {  

		this.formSearch = this.formBuilder.group({
			nome: [null],
			status: [null],
		});

		this.formSave = this.formBuilder.group({
			id: [null],
			email: [null, [Validators.required]],
			nome: [null, [Validators.required]]
		});

	}

	ngOnInit() {
	}

	limparForm(){
		this.formSearch = this.formBuilder.group({
			nome: [null],
			status: [null],
		});
	}

	pesquisarColaborador(data){

		this.colaboradorService.searchCadastros(data)
			.subscribe(
				response => (
					this.listCadastros = response
			));

	}

	formatDate(data) {
		if(data){
			return moment(new Date(data)).format('DD/MM/YYYY');
		}else {
			return '-';
		}
	}

	fecharModal() {

		this.formSave = this.formBuilder.group({
			id: [null],
			email: [null, [Validators.required]],
			nome: [null, [Validators.required]]
		});

		this.showModalCadastro = false;

	}
	
	sendForm(data) {

		if(this.formSave.invalid){
			this.notifications.warn("Atenção!", "Preenchimento incorreto!");
			return;
		}

		data.username = data.email;

		this.showBtSalvar = false;

		this.colaboradorService.save(data)
			.subscribe(
				response => (
					this.retornoSave(response)
			));


	}

	retornoSave(data){
		this.showBtSalvar = true;
		if(data){
			this.notifications.success("Sucesso!", 'Colaborador salvo...');
			this.fecharModal();

			this.pesquisarColaborador(this.formSearch.value);
		}
	}

	editarVendedor(data){

		this.formSave = this.formBuilder.group({
			id: [data.id],
			email: [data.email, [Validators.required]],
			nome: [data.nome, [Validators.required]]
		});

		this.showModalCadastro = true;

	}

	inativarVendedor(data){
		this.objDesativar = data;
		this.showModalDesativar = true;
	}

	fecharModalDesativar(){
		this.objDesativar = {id: null, nome: null, username: null};
		this.showModalDesativar = false;
	}

	sendDesativar(){
		
		let data = {
			id: this.objDesativar.id,
			status: 'INATIVO',
			nome: this.objDesativar.nome,
			email: this.objDesativar.username,
			username: this.objDesativar.username
		};

		this.colaboradorService.save(data)
			.subscribe(
				response => (
					this.retornoDesativa(response)
			));
	}

	retornoDesativa(data){
		if(data){
			this.notifications.success("Sucesso!", 'Colaborador desativado...');
			this.fecharModalDesativar();

			this.pesquisarColaborador(this.formSearch.value);
		}
	}

	ativarVendedor(data){
		
		data.status = 'ATIVO';

		this.colaboradorService.save(data)
			.subscribe(
				response => (
					this.retornoAtiva(response)
			));
	}

	retornoAtiva(data){
		if(data){
			this.notifications.success("Sucesso!", 'Colaborador ativado...');
			this.pesquisarColaborador(this.formSearch.value);
		}
	}

}
