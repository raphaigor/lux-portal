import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import * as moment from 'moment';

import { FaturamentoService } from "./faturamento.service";

@Component({
  selector: 'app-faturamento',
  templateUrl: './faturamento.component.html',
  styleUrls: ['./faturamento.component.css']
})
export class FaturamentoComponent implements OnInit {

	showModalCadastro = false;
	showModalDesativar = false;

	formSearch: FormGroup;
	formSave: FormGroup;

	listFaturamento = [];
	listUsinas = [];
	listTipoRede = [];

	objDesativar = {id: null, descricao: null};

	usinaSelected = {
		geracaoTotalKwh: 1
	};

	showBtSalvar = true;

	@ViewChild('myTable') table;

	constructor(private formBuilder: FormBuilder, private faturamentoService: FaturamentoService, private notifications: NotificationsService) { 
		
		this.formSearch = this.formBuilder.group({
			descricao: [null],
			status: [null],
			dataCadastroInicio: [null],
			dataCadastroFim: [null],
			usinaId: [null]
		});

		this.formSave = this.formBuilder.group({
			id: [null],
			descricao: [null],
			usinaId: [null, [Validators.required]],
			taxaMinimaGrupo: [null, [Validators.required]],
			tarifaKwh: [null, [Validators.required]],
			icms: [null, [Validators.required]],
			pis: [null, [Validators.required]],
			cofins: [null, [Validators.required]],
			previsaoPercentual: [null, [Validators.required]],
			tarifaImpostoKwh: [0],
			tarifaImpostoKwh2: [0],
			custoDisponibilidade: [0],
			custoEvitadoMes: [0],
			custoEvitadoAno: [0],
			tipoRedeEletricaId: [null, [Validators.required]]
		});

		this.faturamentoService.searchUsinas()
			.subscribe(
				response => (
					this.listUsinas = response
			));

		this.faturamentoService.searchTipoRede()
			.subscribe(
				response => (
					this.listTipoRede = response
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
			usinaId: [null]
		});
	}

	pesquisarFaturamento(data){

		this.faturamentoService.searchFaturamento(data)
			.subscribe(
				response => (
					this.listFaturamento = response
			));
		
	}

	fecharModal(){

		this.formSave = this.formBuilder.group({
			id: [null],
			descricao: [null],
			usinaId: [null, [Validators.required]],
			taxaMinimaGrupo: [null, [Validators.required]],
			tarifaKwh: [null, [Validators.required]],
			icms: [null, [Validators.required]],
			pis: [null, [Validators.required]],
			cofins: [null, [Validators.required]],
			previsaoPercentual: [null, [Validators.required]],
			tarifaImpostoKwh: [0],
			tarifaImpostoKwh2: [0],
			custoDisponibilidade: [0],
			custoEvitadoMes: [0],
			custoEvitadoAno: [0],
			tipoRedeEletricaId: [null, [Validators.required]]
		});
		
		this.showModalCadastro = false;
	}

	changeUsina(usinaId){

		var newArray = this.listUsinas.filter(function (el) {
			return el.id == usinaId;
		});

		if(newArray.length){
			this.usinaSelected = newArray[0];
		} else {
			this.usinaSelected = {geracaoTotalKwh: 1}
		}
	}

	calcForm(){

		let tarifaImpostoKwh = 0;
		tarifaImpostoKwh = this.formSave.value.tarifaKwh * ((100/(100-this.formSave.value.icms))*(100/(100-this.formSave.value.pis)*(100/(100-this.formSave.value.cofins))));

		let tarifaImpostoKwh2 = 0;
		tarifaImpostoKwh2 = tarifaImpostoKwh + (tarifaImpostoKwh * (this.formSave.value.previsaoPercentual/100));

		this.formSave.controls['tarifaImpostoKwh2'].setValue(tarifaImpostoKwh2);

		let custoDisponibilidade = 0;
		custoDisponibilidade = tarifaImpostoKwh2 * this.formSave.value.taxaMinimaGrupo;

		this.formSave.controls['custoDisponibilidade'].setValue(custoDisponibilidade);

		let custoEvitadoMes = 0;
		custoEvitadoMes = tarifaImpostoKwh2 * this.usinaSelected.geracaoTotalKwh;

		this.formSave.controls['custoEvitadoMes'].setValue(custoEvitadoMes);

		let custoEvitadoAno = custoEvitadoMes * 12;
		this.formSave.controls['custoEvitadoAno'].setValue(custoEvitadoAno);

	}

	sendForm(data){

		this.calcForm();

		if(this.formSave.invalid){
			this.notifications.warn("Atenção!", "Preenchimento incorreto!");
			return;
		}

		this.showBtSalvar = false;

		this.faturamentoService.saveFaturamento(data)
			.subscribe(
				response => (
					this.retornoSave(response)
			));

	}

	retornoSave(data){
		this.showBtSalvar = true;
		if(data){
			this.notifications.success("Sucesso!", 'Faturamento salvo...');
			this.fecharModal();

			this.pesquisarFaturamento(this.formSearch.value);
		}
	}

	editarFaturamento(data){

		this.formSave = this.formBuilder.group({
			id: [data.id],
			descricao: [data.descricao],
			usinaId: [data.usinaId, [Validators.required]],
			taxaMinimaGrupo: [data.taxaMinimaGrupo, [Validators.required]],
			tarifaKwh: [data.tarifaKwh, [Validators.required]],
			icms: [data.icms, [Validators.required]],
			pis: [data.pis, [Validators.required]],
			cofins: [data.cofins, [Validators.required]],
			tarifaImpostoKwh: [0],
			tarifaImpostoKwh2: [data.tarifaImpostoKwh2],
			previsaoPercentual: [data.previsaoPercentual, [Validators.required]],
			custoDisponibilidade: [0],
			custoEvitadoMes: [0],
			custoEvitadoAno: [0],
			tipoRedeEletricaId: [data.tipoRedeEletricaId, [Validators.required]]
		});

		this.changeUsina(data.usinaId);

		this.calcForm();

		this.showModalCadastro = true;

	}

	inativarFaturamento(data){
		this.objDesativar = data;
		this.showModalDesativar = true;
	}

	fecharModalDesativar(){
		this.objDesativar = {id: null, descricao: null};
		this.showModalDesativar = false;
	}

	sendDesativar(){
		
		let data = '"INATIVO"';

		this.faturamentoService.desativarFaturamento(this.objDesativar.id, data)
			.subscribe(
				response => (
					this.retornoDesativa(response)
			));
	}

	retornoDesativa(data){
		if(data){
			this.notifications.success("Sucesso!", 'Faturamento desativado...');
			this.fecharModalDesativar();

			this.pesquisarFaturamento(this.formSearch.value);
		}
	}

	ativarFaturamento(faturamento){

		let data = '"ATIVO"';

		this.faturamentoService.desativarFaturamento(faturamento.id, data)
			.subscribe(
				response => (
					this.retornoAtiva(response)
			));
	}

	retornoAtiva(data){
		if(data){
			this.notifications.success("Sucesso!", 'Faturamento ativado...');
			this.pesquisarFaturamento(this.formSearch.value);
		}
	}

}
