import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import * as moment from 'moment';

import { RelatorioTipoRedeService } from './relatorio-tipo-rede.service';

@Component({
  selector: 'app-relatorio-tipo-rede',
  templateUrl: './relatorio-tipo-rede.component.html',
  styleUrls: ['./relatorio-tipo-rede.component.css']
})
export class RelatorioTipoRedeComponent implements OnInit {

	formSearch: FormGroup;
	listUsinas = [];
	listParceiros = [];
	listVendedores = [];
	
	modalImpressao = false;
	rowData = [];

	showResult = false;

	exportAsConfig: ExportAsConfig = {
		type: 'xls', // the type you want to download
		elementId: 'table-relatorio', // the id of html/table element
	}

	constructor(private formBuilder: FormBuilder, private notifications: NotificationsService, private relatorioTipoRedeService: RelatorioTipoRedeService, private exportAsService: ExportAsService) { 
		
		this.formSearch = this.formBuilder.group({
			usinaId: [null],
			parceiroId: [null]
		}); 

		this.relatorioTipoRedeService.searchUsinas()
			.subscribe(
				response => (
					this.listUsinas = response
			));

		this.relatorioTipoRedeService.searchParceiro()
			.subscribe(
				response => (
					this.listParceiros = response
			));
	
	}

	ngOnInit() {
	}

	limparForm() {
		this.formSearch = this.formBuilder.group({
			usinaId: [null],
			parceiroId: [null]
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

		this.relatorioTipoRedeService.searchRelatorio(str)
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
			pdf.save('Lux - Vendas Tipo Rede.pdf'); // Generated PDF   
		});  

	}

	gerarExcel(){
		this.exportAsService.save(this.exportAsConfig, 'Lux - Vendas Tipo Rede');
	}

	sendModal() {
		this.modalImpressao = true;
	}

	fecharModalImp() {
		this.modalImpressao = false;
	}

}
