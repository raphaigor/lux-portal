import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import * as jsPDF from 'jspdf';
import * as moment from 'moment';
import html2canvas from 'html2canvas';

import { VendaService } from './venda.service';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrls: ['./venda.component.css']
})
export class VendaComponent implements OnInit {

	myDateValue: Date;

	URL_FILE = 'http://luxapi-env.7snatgwhm2.us-east-1.elasticbeanstalk.com/arquivo/venda/';

	showModalCadastro = false;
	showModalDesativar = false;
	showModalImpressao = false;

	formSearch: FormGroup;
	formSave: FormGroup;
	formStatus: FormGroup;

	listVendas = [];

	listUsinas = []
	listVendedores = [];
	listClientes = [];
	listParceiro = [];

	listStatus = [];

	objDesativar = {id: null, nome: null};
	objUsina = {id: null};

	doughnutChartLabels:Array<any> = [];
	doughnutChartData:Array<any> = [];

	doughnutChartType:string = 'doughnut';
	doughnutChartColors:any[] = [{ backgroundColor: ["#0EA7E3", "#FDBE0F", "#58B239", '#EE9414', "#01888E ", '#A64847', '#505050', '#EE9414', "#956F06", '#E82A37'] }];

	doughnutChartOptions = {
		legend: {
			position: 'bottom'
		}
	}

	showChart2 = false;

	showModal = false;

	objVenda = {
		id: null
	}

	objSimulacao = {
		consumoContrado: null,
		valorFinanciado: null,
		taxaMinimaCemigMes: null,
		numeroParcelasFinanciamento: null,
		custoUsinaCooperativaMes: null,
		valorPrimeiraParcelaFinanciamento: null,
		valorEconomizadoMes: null,
		valorUltimaParcelaFinanciamento: null,
		valorEconomizadoTotal: null,
		direitoEnegiaInjetadaUsinaGeradora: null,
		percentualReducaoContaCemig: null,
		comissaoVendedor: null,
		taxaInternaRetorno: null
	};

	objImpressao = {
		parceiroRazaoSocial: null,
		vendedorNome: null,
		clienteNome: null,
		cidade: null,
		uf: null,
		resumoPriceUsinaNome: null,
		resumoPriceTipoRedeEletricaDescricao: null,
		status: null,
		numeroInstalacao: null
	};

	dadosUser: {
		nome: null,
		acessoId: null,
		login: null,
		status: null,
		tipoUsuario: null,
		token: null,
		vendedorId: null,
		parceiroId: null
	};

	barChartOptions:any = {
		scaleShowVerticalLines: false,
		responsive: true,
		scales: {
			yAxes: [{
				display: false
			}]
		}
	};

	public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	public barChartType:string = 'bar';
	public barChartLegend:boolean = true;

	public barChartData:any[] = [
		{data: [65, 59, 80, 81, 56, 55, 40], label: 'Financiamento'},
		{data: [28, 48, 40, 19, 86, 27, 90], label: 'Economia'}
	];

	lineChartColors:any[] = [
		{
			backgroundColor: '#2217dd',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointHoverBackgroundColor: '#fff',
		},	
		{ // grey
			backgroundColor: '#c01512',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointHoverBackgroundColor: '#fff',
		}
	];

	showGrafico = false;

	@ViewChild('myTable') table;

	constructor(private formBuilder: FormBuilder, private notifications: NotificationsService, private vendaService: VendaService) { 

		this.dadosUser = JSON.parse(localStorage.getItem('app-lux-user'));

		this.formStatus = this.formBuilder.group({
			observacao: [null, [Validators.required]],
			status: [null, [Validators.required]],
			vendaId: [null]
		});

		let vendedorId = null;
		if(this.dadosUser.tipoUsuario == 'USUARIO_TERCEIRO'){
			
			vendedorId = this.dadosUser.vendedorId;
			
			this.vendaService.searchParceiroVendedor(vendedorId)
				.subscribe(
					response => (
						this.listParceiro = response
				));
		} else {
			this.vendaService.searchParceiro()
				.subscribe(
					response => (
						this.listParceiro = response
				));
		}

		this.formSearch = this.formBuilder.group({
			id: [null],
			clienteId: [null],
			parceiroId: [null],
			usinaId: [null],
			vendedorId: [vendedorId],
			dataVendaFim: [null],
			dataVendaInicio: [null],
			status: [null]
		});

		this.vendaService.searchUsinas()
			.subscribe(
				response => (
					this.listUsinas = response
			));

		this.vendaService.searchVendedores()
			.subscribe(
				response => (
					this.listVendedores = response
			));

		this.vendaService.searchClientes()
			.subscribe(
				response => (
					this.listClientes = response
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
			id: [null],
			clienteId: [null],
			parceiroId: [null],
			usinaId: [null],
			vendedorId: [null],
			dataVendaFim: [null],
			dataVendaInicio: [null],
			status: [null]
		});
	}

	pesquisarVendas(data){

		if(this.dadosUser.tipoUsuario !== 'USUARIO_TERCEIRO' && !data.usinaId){
			this.notifications.warn("Atenção!", "Escolha uma Usina!");
			return;
		}

		this.vendaService.searchVendas(data)
			.subscribe(
				response => (
					this.listVendas = response
			));
		
	}

	executar(data){

		this.vendaService.searchStatusVenda(data.resumoPriceUsinaId, data.consumoContratado)
			.subscribe(
				response => (
					this.listStatus = response
			));

		this.showModal = true;
		this.objVenda = data;
	}

	buscarCapacidade(data){

		this.doughnutChartLabels = [];
		this.doughnutChartData = [];

		this.showChart2 = false;

		this.listVendas = [];

		if(data){
			this.vendaService.searchCapacidade(data)
				.subscribe(
					response => (
						this.objUsina = response,
						this.mountGrafico(response)
				));
		}

	}

	mountGrafico(data){

		this.doughnutChartLabels.push('VENDIDO');
		this.doughnutChartData.push(data.capacidadeContratada);

		this.doughnutChartLabels.push('DISPONIVEL');
		this.doughnutChartData.push(data.geracaoTotalKwh - data.capacidadeContratada);

		this.showChart2 = true;
	}

	fecharModal(){
		this.showModal = false;
	}

	sendAlterar(data) {

		if(this.formStatus.invalid){
			this.notifications.warn("Atenção!", "Preenchimento incorreto!");
			return;
		}

		data.vendaId = this.objVenda.id;

		this.vendaService.sendStatus(data)
			.subscribe(
				response => (
					this.retornoSave(response)
			));
		

	}

	retornoSave(data){
		if(data){
			this.notifications.success("Sucesso!", 'Venda alterada...');
			this.fecharModal();

			this.pesquisarVendas(this.formSearch.value);
		}
	}

	imprimir(data){

		this.objImpressao = data;
		
		let objSimular = {
			historicoConsumo: [data.consumoContratado],
			ignorarTaxaMinima: true,
			parceiroId: data.parceiroId,
			tipoRedeEletricaId: data.resumoPriceTipoRedeEletricaId,
			usinaId: data.resumoPriceUsinaId
		}

		this.vendaService.sendSimular(objSimular)
			.subscribe(
				response => (
					this.objSimulacao = response
			));

		this.vendaService.sendSimularPrice(objSimular)
			.subscribe(
				response => (
					this.mountGraficoResumo(response)	
			));

		this.showModalImpressao = true;

	}

	fecharModalImp(){
		this.showModalImpressao = false;
	}

	formatValorReal(valor){
		if(valor){
			var numero = valor.toFixed(2).split('.');
			numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
			return numero.join(',');
		}
		return valor;
	}

	mountGraficoResumo(data){

		this.showGrafico = false;

		this.barChartLabels = [];
		this.barChartData = [];

		let arrFinan = [];
		let arrEcono = [];

		for (let index = 0; index < data.length; index++) {
			const element = data[index];

			this.barChartLabels.push(element.mes);
			arrFinan.push(element.parcelaFinanciamento);
			arrEcono.push(element.reducaoContaCemig);
			
		}

		let objFinan = {
			data: arrFinan,
			label: 'Financiamento'
		}

		this.barChartData.push(objFinan);

		let objEcono = {
			data: arrEcono,
			label: 'Economia'
		}

		this.barChartData.push(objEcono);

		this.showGrafico = true;

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
			pdf.save('Lux - Venda.pdf'); // Generated PDF   
		});  

	}

}
