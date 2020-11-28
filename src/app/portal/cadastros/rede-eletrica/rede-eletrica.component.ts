import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import * as moment from 'moment';

import { RedeEletricaService } from './rede-eletrica.service';

@Component({
  selector: 'app-rede-eletrica',
  templateUrl: './rede-eletrica.component.html',
  styleUrls: ['./rede-eletrica.component.css']
})
export class RedeEletricaComponent implements OnInit {

	showModalCadastro = false;
	showModalDesativar = false;

	formSearch: FormGroup;
	formSave: FormGroup;

	listRedes = [];

	objDesativar = {id: null, descricao: null};

	constructor(private formBuilder: FormBuilder, private redeEletricaService: RedeEletricaService, private notifications: NotificationsService) { 
		
		this.formSearch = this.formBuilder.group({
			id: [null],
			descricao: [null],
			status: [null]
		});

		this.formSave = this.formBuilder.group({
			id: [null],
			descricao: [null, [Validators.required]]
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
			id: [null],
			descricao: [null],
			status: [null]
		});
	}

	pesquisarRedes(data){

		this.redeEletricaService.searchRedes(data)
			.subscribe(
				response => (
					this.listRedes = response
			));
		
	}

	fecharModal(){

		this.formSave = this.formBuilder.group({
			id: [null],
			descricao: [null, [Validators.required]]
		});
		
		this.showModalCadastro = false;
	}

	sendForm(data){

		if(this.formSave.invalid){
			this.notifications.warn("Atenção!", "Preenchimento incorreto!");
			return;
		}

		this.redeEletricaService.saveRede(data)
			.subscribe(
				response => (
					this.retornoSave(response)
			));

	}

	retornoSave(data){
		if(data){
			this.notifications.success("Sucesso!", 'Rede Elétrica salva...');
			this.fecharModal();

			this.pesquisarRedes(this.formSearch.value);
		}
	}

	editarRede(data){

		this.formSave = this.formBuilder.group({
			id: [data.id],
			descricao: [data.descricao, [Validators.required]]
		});

		this.showModalCadastro = true;

	}

	inativarRede(data){
		this.objDesativar = data;
		this.showModalDesativar = true;
	}

	fecharModalDesativar(){
		this.objDesativar = {id: null, descricao: null};
		this.showModalDesativar = false;
	}

	sendDesativar(){
		
		let data = '"INATIVO"';

		this.redeEletricaService.desativarRede(this.objDesativar.id, data)
			.subscribe(
				response => (
					this.retornoDesativa(response)
			));
	}

	retornoDesativa(data){
		if(data){
			this.notifications.success("Sucesso!", 'Rede Elétrica desativada...');
			this.fecharModalDesativar();

			this.pesquisarRedes(this.formSearch.value);
		}
	}

}
