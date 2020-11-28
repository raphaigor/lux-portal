import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import * as moment from 'moment';

import { RelatorioUsinaService } from './relatorio-usina.service';

@Component({
  selector: 'app-relatorio-usina',
  templateUrl: './relatorio-usina.component.html',
  styleUrls: ['./relatorio-usina.component.css']
})
export class RelatorioUsinaComponent implements OnInit {

	formSearch: FormGroup;
	listUsinas = [];
	listParceiros = [];
	listVendedores = [];
	
	rowData = [];

	modalImpressao = false;
	showResult = false;

	exportAsConfig: ExportAsConfig = {
		type: 'xls', // the type you want to download
		elementId: 'table-relatorio', // the id of html/table element
	}

  	constructor(private formBuilder: FormBuilder, private notifications: NotificationsService, private relatorioUsinaService: RelatorioUsinaService, private exportAsService: ExportAsService) { 
		
		this.formSearch = this.formBuilder.group({
			usinaId: [null],
			parceiroId: [null],
			vendedorId: [null]
		});
		
		this.relatorioUsinaService.searchUsinas()
			.subscribe(
				response => (
					this.listUsinas = response
			));

		this.relatorioUsinaService.searchParceiro()
			.subscribe(
				response => (
					this.listParceiros = response
			));

		this.relatorioUsinaService.searchVendedores()
			.subscribe(
				response => (
					this.listVendedores = response
			));

	}

	ngOnInit() {
	}

	limparForm() {
		this.formSearch = this.formBuilder.group({
			usinaId: [null],
			parceiroId: [null],
			vendedorId: [null]
		});
	}

	pesquisar(data){

		this.showResult = true;

		let str = '';
		if(data.usinaId){
			str += '&usinaId='+data.usinaId
		}
		if(data.parceiroId){
			str += '&parceiroId='+data.parceiroId
		}
		if(data.vendedorId){
			str += '&vendedorId='+data.vendedorId
		}

		this.relatorioUsinaService.searchRelatorio(str)
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
			pdf.save('Lux - Vendas por Usina.pdf'); // Generated PDF   
		});  

	}

	gerarExcel(){
		this.exportAsService.save(this.exportAsConfig, 'Lux - Vendas por Usina');
	}

	sendModal() {
		this.modalImpressao = true;
	}

	fecharModalImp() {
		this.modalImpressao = false;
	}

}
