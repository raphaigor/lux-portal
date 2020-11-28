import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import * as moment from 'moment';

import { OemService } from './oem.service';

@Component({
  selector: 'app-oem',
  templateUrl: './oem.component.html',
  styleUrls: ['./oem.component.css']
})
export class OemComponent implements OnInit {

	showModalCadastro = false;
	showModalDesativar = false;

	formSearch: FormGroup;
	formSave: FormGroup;

	listOem = [];
	listUsinas = [];

	objDesativar = {id: null, descricao: null};

	usinaSelected = {
		potenciaKw: 1,
		geracaoTotalKwh: 0
	};

	showBtSalvar = true;

	@ViewChild('myTable') table;

	constructor(private formBuilder: FormBuilder, private oemService: OemService, private notifications: NotificationsService) { 
		
		this.formSearch = this.formBuilder.group({
			descricao: [null],
			status: [null],
			dataCadastroInicio: [null],
			dataCadastroFim: [null]
		});

		this.formSave = this.formBuilder.group({
			id: [null],
			descricao: [null],
			usinaId: [null, [Validators.required]],
			quantidadeVigilantes: [null, [Validators.required]],
			salarioVigilante: [null, [Validators.required]],
			salarioVigilantesMes: [0],
			software: [null, [Validators.required]],
			internetUsina: [null, [Validators.required]],
			quantidadeGestorTecnico: [null],
			custoGestorTecnico: [null, [Validators.required]],
			demandaCemig: [null, [Validators.required]],
			icms: [null, [Validators.required]],
			pis: [null, [Validators.required]],
			cofins: [null, [Validators.required]],
			demandaImposto: [0],
			contador: [null, [Validators.required]],
			gestorCooperativa: [null, [Validators.required]],
			secretaria: [null, [Validators.required]],
			aluguel: [null, [Validators.required]],
			gastosAguaLuzTelefone: [null, [Validators.required]],
			aluguelUsina: [null, [Validators.required]],
			demandaCemigMes: [0],
			demandaCemigAno: [0],
			fundoReservaKwh: [null, [Validators.required]],
			fundoReservaMensal: [0],
			fundoReservaAnual: [0],
			demandaContratada: [null, [Validators.required]],
			oemMes: [0],
			oemAno: [0]
		});

		this.oemService.searchUsinas()
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

	pesquisarOem(data){

		this.oemService.searchOem(data)
			.subscribe(
				response => (
					this.listOem = response
			));

	}

	fecharModal(){

		this.formSave = this.formBuilder.group({
			id: [null],
			descricao: [null],
			usinaId: [null, [Validators.required]],
			quantidadeVigilantes: [null, [Validators.required]],
			salarioVigilante: [null, [Validators.required]],
			salarioVigilantesMes: [0],
			software: [null, [Validators.required]],
			internetUsina: [null, [Validators.required]],
			quantidadeGestorTecnico: [null],
			custoGestorTecnico: [null, [Validators.required]],
			demandaCemig: [null, [Validators.required]],
			icms: [null, [Validators.required]],
			pis: [null, [Validators.required]],
			cofins: [null, [Validators.required]],
			demandaImposto: [0],
			contador: [null, [Validators.required]],
			gestorCooperativa: [null, [Validators.required]],
			secretaria: [null, [Validators.required]],
			aluguel: [null, [Validators.required]],
			gastosAguaLuzTelefone: [null, [Validators.required]],
			aluguelUsina: [null, [Validators.required]],
			demandaCemigMes: [0],
			demandaCemigAno: [0],
			fundoReservaKwh: [null, [Validators.required]],
			fundoReservaMensal: [0],
			fundoReservaAnual: [0],
			demandaContratada: [null, [Validators.required]],
			oemMes: [0],
			oemAno: [0]
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
			this.usinaSelected = {potenciaKw: 1, geracaoTotalKwh: 0}
		}
	}

	calcForm(){

		let salarioVigilantesMes = 0;
		salarioVigilantesMes = this.formSave.value.quantidadeVigilantes * this.formSave.value.salarioVigilante;

		this.formSave.controls['salarioVigilantesMes'].setValue(salarioVigilantesMes);

		let demandaImposto = 0;
		demandaImposto = this.formSave.value.demandaCemig * ((100/(100-this.formSave.value.icms)) * (100/(100-this.formSave.value.pis) * (100/(100-this.formSave.value.cofins))));

		this.formSave.controls['demandaImposto'].setValue(demandaImposto);

		let demandaCemigMes = 0;
		demandaCemigMes = demandaImposto * this.formSave.value.demandaContratada;

		this.formSave.controls['demandaCemigMes'].setValue(demandaCemigMes);

		let demandaCemigAno = 0
		demandaCemigAno = demandaCemigMes * 12;

		this.formSave.controls['demandaCemigAno'].setValue(demandaCemigAno);

		let fundoReservaMensal = 0;
		fundoReservaMensal = this.formSave.value.fundoReservaKwh / 1000 * this.usinaSelected.geracaoTotalKwh;
		this.formSave.controls['fundoReservaMensal'].setValue(fundoReservaMensal);

		let fundoReservaAnual = 0;
		fundoReservaAnual = fundoReservaMensal * 12;
		this.formSave.controls['fundoReservaAnual'].setValue(fundoReservaAnual);

		let oemMes = 0
		oemMes = salarioVigilantesMes +
			this.formSave.value.software +
			this.formSave.value.internetUsina +
			this.formSave.value.custoGestorTecnico +
			this.formSave.value.contador + 
			this.formSave.value.gestorCooperativa + 
			this.formSave.value.secretaria + 
			this.formSave.value.aluguel + 
			this.formSave.value.gastosAguaLuzTelefone + 
			this.formSave.value.aluguelUsina + 
			demandaCemigMes;

		this.formSave.controls['oemMes'].setValue(oemMes);

		let oemAno = 0;
		oemAno = oemMes * 12;

		this.formSave.controls['oemAno'].setValue(oemAno);

	}

	sendForm(data){

		this.calcForm();

		if(this.formSave.invalid){
			this.notifications.warn("Atenção!", "Preenchimento incorreto!");
			return;
		}

		this.showBtSalvar = false;

		this.oemService.saveOem(data)
			.subscribe(
				response => (
					this.retornoSave(response)
			));

	}

	retornoSave(data){
		this.showBtSalvar = true;
		if(data){
			this.notifications.success("Sucesso!", 'O & M salva...');
			this.fecharModal();

			this.pesquisarOem(this.formSearch.value);
		}
	}

	editarOem(data){

		this.formSave = this.formBuilder.group({
			id: [data.id],
			descricao: [data.descricao],
			usinaId: [data.usinaId, [Validators.required]],
			quantidadeVigilantes: [data.quantidadeVigilantes],
			salarioVigilante: [data.salarioVigilante, [Validators.required]],
			salarioVigilantesMes: [0],
			software: [data.software, [Validators.required]],
			internetUsina: [data.internetUsina, [Validators.required]],
			quantidadeGestorTecnico: [data.quantidadeGestorTecnico],
			custoGestorTecnico: [data.custoGestorTecnico, [Validators.required]],
			demandaCemig: [data.demandaCemig, [Validators.required]],
			icms: [data.icms, [Validators.required]],
			pis: [data.pis, [Validators.required]],
			cofins: [data.cofins, [Validators.required]],
			demandaImposto: [0],
			contador: [data.contador, [Validators.required]],
			gestorCooperativa: [data.gestorCooperativa, [Validators.required]],
			secretaria: [data.secretaria, [Validators.required]],
			aluguel: [data.aluguel, [Validators.required]],
			gastosAguaLuzTelefone: [data.gastosAguaLuzTelefone, [Validators.required]],
			aluguelUsina: [data.aluguelUsina, [Validators.required]],
			demandaCemigMes: [0],
			demandaCemigAno: [0],
			fundoReservaKwh: [data.fundoReservaKwh, [Validators.required]],
			fundoReservaMensal: [0],
			fundoReservaAnual: [0],
			demandaContratada: [data.demandaContratada, [Validators.required]],
			oemMes: [0],
			oemAno: [0]
		});

		this.changeUsina(data.usinaId);

		this.calcForm();

		this.showModalCadastro = true;

	}

	inativarOem(data){
		this.objDesativar = data;
		this.showModalDesativar = true;
	}

	fecharModalDesativar(){
		this.objDesativar = {id: null, descricao: null};
		this.showModalDesativar = false;
	}

	sendDesativar(){
		
		let data = '"INATIVO"';

		this.oemService.desativarOem(this.objDesativar.id, data)
			.subscribe(
				response => (
					this.retornoDesativa(response)
			));
	}

	retornoDesativa(data){
		if(data){
			this.notifications.success("Sucesso!", 'O & M desativada...');
			this.fecharModalDesativar();

			this.pesquisarOem(this.formSearch.value);
		}
	}

	formatValorReal(valor){
		if(valor){
			var numero = valor.toFixed(2).split('.');
			numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
			return numero.join(',');
		}
		return valor;
	}

	ativarOem(oem){

		let data = '"ATIVO"';

		this.oemService.desativarOem(oem.id, data)
			.subscribe(
				response => (
					this.retornoAtivar(response)
			));
	}

	retornoAtivar(data){
		if(data){
			this.notifications.success("Sucesso!", 'O & M ativado...');
			this.pesquisarOem(this.formSearch.value);
		}
	}

}