import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import * as moment from 'moment';

import { VendedorService } from './vendedor.service';

@Component({
  selector: 'app-vendedor',
  templateUrl: './vendedor.component.html',
  styleUrls: ['./vendedor.component.css']
})
export class VendedorComponent implements OnInit {

	showModalCadastro = false;
	showModalDesativar = false;

	formSearch: FormGroup;
	formSave: FormGroup;

	listVendedor = [];
	listParceiro = [];
	listParceirosSelect = [];

	objDesativar = {id: null, nome: null};

	showBtSalvar = true;

	@ViewChild('myTable') table;

	constructor(private formBuilder: FormBuilder, private vendedorService: VendedorService, private notifications: NotificationsService) { 
		
		this.formSearch = this.formBuilder.group({
			descricao: [null],
			status: [null],
			dataCadastroInicio: [null],
			dataCadastroFim: [null],
			parceiroId: [null]
		});

		this.formSave = this.formBuilder.group({
			id: [null],
			contato1: [null, [Validators.required]],
			cpf: [null, [Validators.required]],
			email: [null, [Validators.required]],
			nome: [null, [Validators.required]],
			gerente: [null, [Validators.required]],
			parceiroId: [null]
		});

		this.vendedorService.searchParceiro()
			.subscribe(
				response => (
					this.listParceiro = response
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
			dataCadastroFim: [null],
			parceiroId: [null]
		});
	}

	pesquisarVendedor(data){

		this.vendedorService.searchVendedor(data)
			.subscribe(
				response => (
					this.listVendedor = response
			));
		
	}

	fecharModal(){

		this.formSave = this.formBuilder.group({
			id: [null],
			contato1: [null, [Validators.required]],
			cpf: [null, [Validators.required]],
			email: [null, [Validators.required]],
			nome: [null, [Validators.required]],
			gerente: [null, [Validators.required]],
			parceiroId: [null]
		});

		this.listParceirosSelect = [];
		this.showModalCadastro = false;

	}

	editarVendedor(data){

		this.formSave = this.formBuilder.group({
			id: [data.id],
			contato1: [data.contato1, [Validators.required]],
			cpf: [data.cpf, [Validators.required]],
			email: [data.email, [Validators.required]],
			nome: [data.nome, [Validators.required]],
			gerente: [(data.gerente) ? 1 : 0, [Validators.required]],
			parceiroId: [null]
		});

		this.vendedorService.searchParceiroVendedor(data.id)
			.subscribe(
				response => (
					this.listParceirosSelect = response.map(function(item){
						return {
							id: item.parceiroId,
							razaoSocial: item.parceiroRazaoSocial
						}
					})
			));

		this.showModalCadastro = true;

	}

	sendForm(data){

		if(this.formSave.invalid){
			this.notifications.warn("Atenção!", "Preenchimento incorreto!");
			return;
		}

		if(!this.listParceirosSelect.length){
			this.notifications.warn("Atenção!", "Escolha pelo menos um parceiro!");
			return;
		}

		data.gerente = (data.gerente == '1') ? true : false;

		delete data.parceiroId;

		data.parceiroVendedorDTOS = this.listParceirosSelect.map(function(item){
			return {parceiroId: item.id}
		});

		this.showBtSalvar = false;

		this.vendedorService.saveVendedor(data)
			.subscribe(
				response => (
					this.retornoSave(response)
			));
	}

	retornoSave(data){
		this.showBtSalvar = true;
		if(data){
			this.notifications.success("Sucesso!", 'Vendedor salvo...');
			this.fecharModal();

			this.pesquisarVendedor(this.formSearch.value);
		}
	}

	inativarVendedor(data){
		this.objDesativar = data;
		this.showModalDesativar = true;
	}

	fecharModalDesativar(){
		this.objDesativar = {id: null, nome: null};
		this.showModalDesativar = false;
	}

	sendDesativar(){
		
		let data = '"INATIVO"';

		this.vendedorService.desativarVendedor(this.objDesativar.id, data)
			.subscribe(
				response => (
					this.retornoDesativa(response)
			));
	}

	retornoDesativa(data){
		if(data){
			this.notifications.success("Sucesso!", 'Vendedor desativado...');
			this.fecharModalDesativar();

			this.pesquisarVendedor(this.formSearch.value);
		}
	}

	ativarVendedor(vendedor){
		
		let data = '"ATIVO"';

		this.vendedorService.desativarVendedor(vendedor.id, data)
			.subscribe(
				response => (
					this.retornoAtiva(response)
			));
	}

	retornoAtiva(data){
		if(data){
			this.notifications.success("Sucesso!", 'Vendedor ativado...');
			this.pesquisarVendedor(this.formSearch.value);
		}
	}

	addParceiro(data){

		if(!this.formSave.value.parceiroId){
			this.notifications.warn("Atenção!", "Preenchimento incorreto!");
			return;
		}

		let parceiroId = this.formSave.value.parceiroId;
		var newArray = this.listParceiro.filter(function (el) {
			return el.id == parceiroId;
		});

		if(newArray.length){
			this.listParceirosSelect.push(newArray[0]);
		}

		this.formSave.controls['parceiroId'].setValue(null);

	}

	removerLinha(ind){
		this.listParceirosSelect.splice(ind, 1);
	}

}
