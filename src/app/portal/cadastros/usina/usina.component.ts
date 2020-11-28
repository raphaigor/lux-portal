import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import * as moment from 'moment';

import { UsinaService } from './usina.service';

@Component({
  selector: 'app-usina',
  templateUrl: './usina.component.html',
  styleUrls: ['./usina.component.css']
})
export class UsinaComponent implements OnInit {

	dateCad = null;

	showModalCadastro = false;
	showModalDesativar = false;

	formSearch: FormGroup;
	formSave: FormGroup;
	formConcorrente: FormGroup;

	listUsinas = [];
	concorrentesList = [];

	objDesativar = {id: null, nome: null};

	showBtSalvar = true;

	@ViewChild('myTable') table;
	
	constructor(private formBuilder: FormBuilder, private usinaService: UsinaService, private notifications: NotificationsService) { 
		
		this.formSearch = this.formBuilder.group({
			descricao: [null],
			status: [null],
			dataCadastroInicio: [null],
			dataCadastroFim: [null]
		});

		this.formSave = this.formBuilder.group({
			id: [null],
			nome: [null, [Validators.required]],
			potenciaKw: [null, [Validators.required]],
			horasGeracaoMes: [null, [Validators.required]],
			disponibilidade: [null, [Validators.required]],
			geracaoTotalKwh: [0],
			comissaoVenda: [null, [Validators.required]],
			premio: [null, [Validators.required]],
			comissaoTotalVenda: [0],
			custoTotal: [null, [Validators.required]]
		});

		this.formConcorrente = this.formBuilder.group({
			nome: [null, [Validators.required]],
			percentualAdicional: [null, [Validators.required]]
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
			descricao: [null],
			status: [null],
			dataCadastroInicio: [null],
			dataCadastroFim: [null]
		});
	}

	pesquisarUsinas(data){

		this.usinaService.searchUsinas(data)
			.subscribe(
				response => (
					this.listUsinas = response
			));
		
	}

	fecharModal(){

		this.formSave = this.formBuilder.group({
			id: [null],
			nome: [null, [Validators.required]],
			potenciaKw: [null, [Validators.required]],
			horasGeracaoMes: [(365*24)/12],
			disponibilidade: [null, [Validators.required]],
			geracaoTotalKwh: [0],
			comissaoVenda: [null, [Validators.required]],
			premio: [null, [Validators.required]],
			comissaoTotalVenda: [0],
			custoTotal: [null, [Validators.required]]
		});

		this.formConcorrente = this.formBuilder.group({
			nome: [null, [Validators.required]],
			percentualAdicional: [null, [Validators.required]]
		});

		this.concorrentesList = [];
		
		this.showModalCadastro = false;
	}

	calcForm(){

		let geracaoTotalKwh = 0;
		if(this.formSave.value.disponibilidade){
			geracaoTotalKwh = ((this.formSave.value.potenciaKw * this.formSave.value.disponibilidade) / 100) * this.formSave.value.horasGeracaoMes;
		}

		this.formSave.controls['geracaoTotalKwh'].setValue(geracaoTotalKwh);

		let comissaoTotalVenda = 0;
		if(this.formSave.value.premio){
			comissaoTotalVenda = (this.formSave.value.geracaoTotalKwh / 1000 * this.formSave.value.comissaoVenda) + this.formSave.value.premio;
		}

		this.formSave.controls['comissaoTotalVenda'].setValue(comissaoTotalVenda);

	}

	sendForm(data){

		if(this.formSave.invalid){
			this.notifications.warn("Atenção!", "Preenchimento incorreto!");
			return;
		}

		this.showBtSalvar = false;

		this.calcForm();

		data.concorrenteDTOList = this.concorrentesList;

		this.usinaService.saveUsina(data)
			.subscribe(
				response => (
					this.retornoSave(response)
			));

	}

	retornoSave(data){
		this.showBtSalvar = true;
		if(data){
			this.notifications.success("Sucesso!", 'Usina salva...');
			this.fecharModal();

			this.pesquisarUsinas(this.formSearch.value);
		}
	}

	editarUsina(data){

		this.formSave = this.formBuilder.group({
			id: [data.id],
			nome: [data.nome, [Validators.required]],
			potenciaKw: [data.potenciaKw, [Validators.required]],
			horasGeracaoMes: [data.horasGeracaoMes, [Validators.required]],
			disponibilidade: [data.disponibilidade, [Validators.required]],
			geracaoTotalKwh: [0],
			comissaoVenda: [data.comissaoVenda, [Validators.required]],
			premio: [data.premio, [Validators.required]],
			comissaoTotalVenda: [0],
			custoTotal: [data.custoTotal, [Validators.required]]
		});

		this.usinaService.searchConcorrentes(data.id)
			.subscribe(
				response => (
					this.concorrentesList = response
			));

		this.calcForm();
		this.showModalCadastro = true;

	}

	inativarUsina(data){
		this.objDesativar = data;
		this.showModalDesativar = true;
	}

	fecharModalDesativar(){
		this.objDesativar = {id: null, nome: null};
		this.showModalDesativar = false;
	}

	sendDesativar(){
		
		let data = '"INATIVO"';

		this.usinaService.desativarUsina(this.objDesativar.id, data)
			.subscribe(
				response => (
					this.retornoDesativa(response)
			));
	}

	retornoDesativa(data){
		if(data){
			this.notifications.success("Sucesso!", 'Usina desativada...');
			this.fecharModalDesativar();

			this.pesquisarUsinas(this.formSearch.value);
		}
	}

	addConcorrente(data){

		if(this.formConcorrente.invalid){
			this.notifications.warn("Atenção!", "Preenchimento incorreto!");
			return;
		}

		this.concorrentesList.push(data);

		this.formConcorrente = this.formBuilder.group({
			nome: [null, [Validators.required]],
			percentualAdicional: [null, [Validators.required]]
		});

	}

	removerLinha(ind){
		this.concorrentesList.splice(ind, 1);
	}

	ativarUsina(usina) {

		let data = '"ATIVO"';

		this.usinaService.desativarUsina(usina.id, data)
			.subscribe(
				response => (
					this.retornoAtivar(response)
			));

	}

	retornoAtivar(data){
		if(data){
			this.notifications.success("Sucesso!", 'Usina ativada...');
			this.pesquisarUsinas(this.formSearch.value);
		}
	}

}