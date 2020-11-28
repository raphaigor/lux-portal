import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import * as moment from 'moment';

import { RelatorioVendedorService } from './relatorio-vendedor.service';

@Component({
  selector: 'app-relatorio-vendedor',
  templateUrl: './relatorio-vendedor.component.html',
  styleUrls: ['./relatorio-vendedor.component.css']
})
export class RelatorioVendedorComponent implements OnInit {

	formSearch: FormGroup;
	listVendedores = [];
	listVendedoresGerente = [];
	rowData = [];

	modalImpressao = false;

	showResult = false;

	vendedorNome = {
		nome: null
	};

	exportAsConfig: ExportAsConfig = {
		type: 'xls', // the type you want to download
		elementId: 'table-relatorio', // the id of html/table element
	}

	dadosUser: {
		nome: null,
		acessoId: null,
		login: null,
		status: null,
		tipoUsuario: null,
		token: null,
		vendedorId: null,
		parceiroId: null,
		gerente: false
	};

  	constructor(private formBuilder: FormBuilder, private notifications: NotificationsService, private relatorioVendedorService: RelatorioVendedorService, private exportAsService: ExportAsService) { 
		
		this.dadosUser = JSON.parse(localStorage.getItem('app-lux-user'));

		this.formSearch = this.formBuilder.group({
			vendedorId: [null]
		}); 

		this.relatorioVendedorService.searchVendedores()
			.subscribe(
				response => (
					this.listVendedores = response,
					this.buscaVendedor()					
			));

	}

	buscaVendedor(){

		let vendedorId = null;
		if(this.dadosUser.tipoUsuario == 'USUARIO_TERCEIRO' && !this.dadosUser.gerente){
			vendedorId = this.dadosUser.vendedorId;

			this.pesquisar({vendedorId: vendedorId});
		}

		if(this.dadosUser.tipoUsuario == 'USUARIO_TERCEIRO' && this.dadosUser.gerente){
			this.relatorioVendedorService.searchParceirosGerente(this.dadosUser.vendedorId)
				.subscribe(
					response => (
						this.buscarVendedorGerente(response)
				));
		}

	}

	buscarVendedorGerente(data){

		let send = {
			parceiros: data.map(function(item){
				return item.parceiroId;
			})
		}

		this.relatorioVendedorService.searchVendedoresParceiros(send)
			.subscribe(
				response => (
					this.listVendedoresGerente = response
			));
	}

	ngOnInit() {
	}

	limparForm() {
		this.formSearch = this.formBuilder.group({
			vendedorId: [null]
		}); 
	}

	pesquisar(data){

		if(!data.vendedorId){
			this.notifications.warn("Atenção!", "Escolha um Vendedor!");
			return;
		}

		this.vendedorNome = this.listVendedores.find(x => x.id == data.vendedorId);

		this.showResult = true;

		let str = '';
		if(data.vendedorId){
			str = '?vendedorId='+data.vendedorId
		}

		this.relatorioVendedorService.searchRelatorio(str)
			.subscribe(
				response => (
					this.rowData = response
			));

	}

	formatDate(data) {
		if(data){
			return moment(new Date(data)).format('DD/MM/YYYY');
		}else {
			return '-';
		}
	}

	sendImprimir(){

		var data = document.getElementById('myTableElementId');

		html2canvas(data).then(canvas => {  
			// Few necessary setting options  
			var imgWidth = 208;   
			var pageHeight = 295;    
			var imgHeight = canvas.height * imgWidth / canvas.width;  
			var heightLeft = imgHeight;  
		
			const contentDataURL = canvas.toDataURL('image/png')  
			let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF  

			var position = 0;  
			pdf.addImage(contentDataURL, 'PNG', 0, position, 210, imgHeight);
			pdf.save('Lux - Vendas por Vendedor.pdf'); // Generated PDF   
		});  

	}

	gerarExcel(){
		this.exportAsService.save(this.exportAsConfig, 'Lux - Vendas por Vendedor');
	}

	sendModal() {
		this.modalImpressao = true;
	}

	fecharModalImp() {
		this.modalImpressao = false;
	}

}
