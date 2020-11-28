import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';
import * as jsPDF from 'jspdf';
import * as moment from 'moment';
import html2canvas from 'html2canvas';

import { SimuladorService } from './simulador.service';

@Component({
  selector: 'app-simulador',
  templateUrl: './simulador.component.html',
  styleUrls: ['./simulador.component.css']
})
export class SimuladorComponent implements OnInit {

	cpf_cnpj = '';
	DECIMAL_SEPARATOR=".";
	GROUP_SEPARATOR=",";
	pureResult: any;
	maskedId: any;
	val: any;
	v: any;

	meses = [
		'Janeiro',
		'Fevereiro',
		'Março',
		'Abril',
		'Maio',
		'Junho',
		'Julho',
		'Agosto',
		'Setembro',
		'Outubro',
		'Novembro',
		'Dezembro'
	]

	showModalSimulacao = true;

	showModalVenda = false;
	showModalCliente = false;
	showModalImprimir = false;

	showBoxDadosResumo = true;
	showBoxDadosPrice = false;
	showBoxDadosGrafico = false;

	formSimular: FormGroup;
	formSaveVenda: FormGroup;
	formSearchCliente: FormGroup;
	formSaveCliente: FormGroup;

	listUsinas = [];
	listRedeEletrica = [];
	listStatusVenda = [];

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

	listPrice = [];

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

	clienteSelecionado = {
		id: null,
		nome: null,
		cep: null,
		endereco: null,
		numero: null,
		bairro: null,
		cidade: null,
		uf: null,
		email: null,
		contato1: null,
		responsavel: null
	};

	descFile = '';
	arquivo64 = '';
	descExtension = '';

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

	listEstados = [
		{"nome": "Acre", "sigla": "AC"},
		{"nome": "Alagoas", "sigla": "AL"},
		{"nome": "Amapá", "sigla": "AP"},
		{"nome": "Amazonas", "sigla": "AM"},
		{"nome": "Bahia", "sigla": "BA"},
		{"nome": "Ceará", "sigla": "CE"},
		{"nome": "Distrito Federal", "sigla": "DF"},
		{"nome": "Espírito Santo", "sigla": "ES"},
		{"nome": "Goiás", "sigla": "GO"},
		{"nome": "Maranhão", "sigla": "MA"},
		{"nome": "Mato Grosso", "sigla": "MT"},
		{"nome": "Mato Grosso do Sul", "sigla": "MS"},
		{"nome": "Minas Gerais", "sigla": "MG"},
		{"nome": "Pará", "sigla": "PA"},
		{"nome": "Paraíba", "sigla": "PB"},
		{"nome": "Paraná", "sigla": "PR"},
		{"nome": "Pernambuco", "sigla": "PE"},
		{"nome": "Piauí", "sigla": "PI"},
		{"nome": "Rio de Janeiro", "sigla": "RJ"},
		{"nome": "Rio Grande do Norte", "sigla": "RN"},
		{"nome": "Rio Grande do Sul", "sigla": "RS"},
		{"nome": "Rondônia", "sigla": "RO"},
		{"nome": "Roraima", "sigla": "RR"},
		{"nome": "Santa Catarina", "sigla": "SC"},
		{"nome": "São Paulo", "sigla": "SP"},
		{"nome": "Sergipe", "sigla": "SE"},
		{"nome": "Tocantins", "sigla": "TO"}
	];

	listParceiro = [];

	exportAsConfig: ExportAsConfig = {
		type: 'pdf', // the type you want to download
		elementId: 'myTableElementId', // the id of html/table element
	}

	objImprimir = {
		nomeUsina: null,
		nomeRede: null,
		parceiro: null,
		listConsumo: []
	}

	showRelatorio = false;

	dadosSimulacao = {
		usinaId: null,
		tipoRedeEletricaId: null,
		parceiroId: null,
		historicoConsumo: []
	}

	arrFields = [
		{field: 'bancoAgenciaContaCorrente', text: 'Banco/Conta'},
		{field: 'cep', text: 'CEP'},
		{field: 'endereco', text: 'Endereço'},
		{field: 'numero', text: 'Número'},
		{field: 'bairro', text: 'Bairro'},
		{field: 'cidade', text: 'Cidade'},
		{field: 'uf', text: 'Estado'},
		{field: 'numeroInstalacao', text: 'Número Instalação'},
		{field: 'status', text: 'STATUS'}
	]

	constructor(private formBuilder: FormBuilder, private notifications: NotificationsService, private simuladorService: SimuladorService, private exportAsService: ExportAsService) { 

		this.dadosUser = JSON.parse(localStorage.getItem('app-lux-user'));
		
		this.formSimular = this.formBuilder.group({
			usinaId: [null],
			parceiroId: [this.dadosUser.parceiroId, [Validators.required]],
			tipoRedeEletricaId: [null, [Validators.required]],
			ignorarTaxaMinima: [false],
			historicoConsumo: this.formBuilder.array([])
		});

		this.formSearchCliente = this.formBuilder.group({
			cnpjCpf: [null, [Validators.required]]
		});

		this.formSaveVenda = this.formBuilder.group({
			bancoAgenciaContaCorrente: [null, [Validators.required]],
			bairro: [null, [Validators.required]],
			cep: [null, [Validators.required]],
			cidade: [null, [Validators.required]],
			clienteId: [null, [Validators.required]],
			clienteNome: [null, [Validators.required]],
			endereco: [null, [Validators.required]],
			numero: [null, [Validators.required]],
			numeroInstalacao: [null, [Validators.required]],
			numeroInstalacao2: [null, [Validators.required]],
			observacao: [null],
			uf: [null, [Validators.required]],
			vendedorId: [this.dadosUser.vendedorId],
			tipoArquivo: [null],
			arquivo: [null],
			status: [null, [Validators.required]]
		});

		this.formSaveCliente = this.formBuilder.group({
			bairro: [null, [Validators.required]],
			cep: [null, [Validators.required]],
			cidade: [null, [Validators.required]],
			cnpjCpf: [null, [Validators.required]],
			complemento: [null],
			contato1: [null, [Validators.required]],
			email: [null, [Validators.required]],
			endereco: [null, [Validators.required]],
			nome: [null, [Validators.required]],
			numero: [null, [Validators.required]],
			responsavel: [null],
			uf: [null, [Validators.required]]
		});

		this.simuladorService.searchUsinas(this.dadosUser.vendedorId)
			.subscribe(
				response => (
					this.listUsinas = response
			));

		this.simuladorService.searchTipoRede()
			.subscribe(
				response => (
					this.listRedeEletrica = response
			));

		if(this.dadosUser.tipoUsuario == 'USUARIO_TERCEIRO'){
			this.simuladorService.searchParceiroVendedor(this.dadosUser.vendedorId)
				.subscribe(
					response => (
						this.listParceiro = response.map(function(item){
							return {
								id: item.parceiroId,
								razaoSocial: item.parceiroRazaoSocial
							}
						})
				));

		} else {
			this.simuladorService.searchParceiro()
				.subscribe(
					response => (
						this.listParceiro = response
				));
		}

		this.openSimular();
	
	}

	ngOnInit() {
	}

	openSimular() {

		const control = this.formSimular.get('historicoConsumo') as FormArray;

		for (let index = 1; index < 13; index++) {
			let x = this.formBuilder.group({
				mes: [index],
				price: [0]
			});
			
			control.push(x);
			
		}

		this.showModalSimulacao = true;
	}

	fecharModalSimular(){

		this.formSimular = this.formBuilder.group({
			usinaId: [null],
			parceiroId: [this.dadosUser.parceiroId, [Validators.required]],
			tipoRedeEletricaId: [null, [Validators.required]],
			ignorarTaxaMinima: [false],
			historicoConsumo: this.formBuilder.array([])
		});

		this.showModalSimulacao = false;
	}

	simular(data){

		if(this.formSimular.invalid){
			this.notifications.warn("Atenção!", "Preenchimento incorreto!");
			return;
		}

		if(!data.historicoConsumo[0].price){
			this.notifications.warn("Atenção!", "Informe pelo menos o primeiro mês!");
			return;
		}

		this.simuladorService.searchUsinasParceiro(data.parceiroId)
			.subscribe(
				response => (
					this.executeSimulacao(data, response)	
			));

	}

	executeSimulacao(data, dadosUsina){

		let objSend = {
			usinaId: dadosUsina[0].usinaId,
			tipoRedeEletricaId: data.tipoRedeEletricaId,
			parceiroId: data.parceiroId,
			ignorarTaxaMinima: data.ignorarTaxaMinima,
			historicoConsumo: []
		}

		this.objImprimir.nomeUsina = this.listUsinas.filter(function(item){
			return item.id == dadosUsina[0].usinaId
		});

		this.objImprimir.nomeRede = this.listRedeEletrica.filter(function(item){
			return item.id == data.tipoRedeEletricaId
		});

		this.objImprimir.parceiro = this.listParceiro.filter(function(item){
			return item.id == data.parceiroId
		});

		data.historicoConsumo.forEach(element => {
			if(element.price > 0){
				objSend.historicoConsumo.push(element.price);
			}
		});

		this.objImprimir.listConsumo = objSend.historicoConsumo;

		this.dadosSimulacao = {
			usinaId: dadosUsina[0].usinaId,
			tipoRedeEletricaId: data.tipoRedeEletricaId,
			parceiroId: data.parceiroId,
			historicoConsumo: []
		}

		this.dadosSimulacao.historicoConsumo = objSend.historicoConsumo;

		this.fecharModalSimular();
		
		this.simuladorService.sendSimular(objSend)
			.subscribe(
				response => (
					this.objSimulacao = response	
			));

		this.simuladorService.sendSimularPrice(objSend)
			.subscribe(
				response => (
					this.listPrice = response,
					this.mountGrafico(response)	
			));

	}

	formatValorReal(valor){
		if(valor){
			var numero = valor.toFixed(2).split('.');
			numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');
			return numero.join(',');
		}
		return valor;
	}

	novaVenda(data){

		this.simuladorService.searchStatusVenda(this.dadosSimulacao.usinaId, this.objSimulacao.consumoContrado)
			.subscribe(
				response => (
					this.listStatusVenda = response
			));

		this.showModalVenda = true;
	}

	formatInputVenda(dados){
		this.format(dados.cnpjCpf);
	}

	buscarCliente(dados){

		dados.cnpjCpf = this.unFormat(dados.cnpjCpf);

		if(dados.cnpjCpf){
			this.simuladorService.searchCliente(dados)
				.subscribe(
					response => (
						this.retornoCliente(response)
				));
		}

	}

	retornoCliente(data){

		if(!data.length){
			this.notifications.warn("Atenção!", "Cliente não encontrado!");
			return;
		} 

		this.clienteSelecionado = data[0];

		this.formSaveVenda.controls['clienteId'].setValue(this.clienteSelecionado.id);
		this.formSaveVenda.controls['clienteNome'].setValue(this.clienteSelecionado.nome);

	}

	cadastrarCliente(dados){

		let cnpjCpf = dados.cnpjCpf;

		this.showModalCliente = true;

		this.formSaveCliente.controls['cnpjCpf'].setValue(cnpjCpf);
		this.format2(cnpjCpf);
	}

	fecharModalVenda(){

		this.formSearchCliente = this.formBuilder.group({
			cnpjCpf: [null, [Validators.required]]
		});
		
		this.formSaveVenda = this.formBuilder.group({
			bancoAgenciaContaCorrente: [null, [Validators.required]],
			bairro: [null, [Validators.required]],
			cep: [null, [Validators.required]],
			cidade: [null, [Validators.required]],
			clienteId: [null, [Validators.required]],
			clienteNome: [null, [Validators.required]],
			endereco: [null, [Validators.required]],
			numero: [null, [Validators.required]],
			numeroInstalacao: [null, [Validators.required]],
			numeroInstalacao2: [null, [Validators.required]],
			observacao: [null],
			uf: [null, [Validators.required]],
			vendedorId: [this.dadosUser.vendedorId],
			tipoArquivo: [null],
			arquivo: [null],
			status: [null, [Validators.required]]
		});

		this.formSaveCliente = this.formBuilder.group({
			bairro: [null, [Validators.required]],
			cep: [null, [Validators.required]],
			cidade: [null, [Validators.required]],
			cnpjCpf: [null, [Validators.required]],
			complemento: [null],
			contato1: [null, [Validators.required]],
			email: [null, [Validators.required]],
			endereco: [null, [Validators.required]],
			nome: [null, [Validators.required]],
			numero: [null, [Validators.required]],
			responsavel: [null, [Validators.required]],
			uf: [null, [Validators.required]]
		});

		this.arquivo64 = '',
		this.descExtension = '';
		this.descFile = '';

		this.showModalVenda = false;

		this.clienteSelecionado = {
			id: null,
			nome: null,
			cep: null,
			endereco: null,
			numero: null,
			bairro: null,
			cidade: null,
			uf: null,
			email: null,
			contato1: null,
			responsavel: null
		};
	}

	usarEndereco(){

		this.formSaveVenda.controls['cep'].setValue(this.clienteSelecionado.cep);
		this.formSaveVenda.controls['endereco'].setValue(this.clienteSelecionado.endereco);
		this.formSaveVenda.controls['numero'].setValue(this.clienteSelecionado.numero);
		this.formSaveVenda.controls['bairro'].setValue(this.clienteSelecionado.bairro);
		this.formSaveVenda.controls['cidade'].setValue(this.clienteSelecionado.cidade);
		this.formSaveVenda.controls['uf'].setValue(this.clienteSelecionado.uf);

	}

	naoUsarEndereco(){

		this.formSaveVenda.controls['cep'].setValue(null);
		this.formSaveVenda.controls['endereco'].setValue(null);
		this.formSaveVenda.controls['numero'].setValue(null);
		this.formSaveVenda.controls['bairro'].setValue(null);
		this.formSaveVenda.controls['cidade'].setValue(null);
		this.formSaveVenda.controls['uf'].setValue(null);

	}

	sendFormVenda(data){

		if(this.formSaveVenda.invalid){

			this.formSaveVenda.markAsTouched()

			let erros = [];

			for (let index = 0; index < this.arrFields.length; index++) {
				const element = this.arrFields[index];
				if(this.formSaveVenda.controls[element.field].status != 'VALID'){
					this.formSaveVenda.controls[element.field].markAsTouched(); 
					erros.push(element.text);
				}
			}
			
			this.notifications.warn("Atenção!", "Preenchimento incorreto! Preencha os campos "+erros.join(', '));
			return;
		}

		if(data.numeroInstalacao != data.numeroInstalacao2){
			this.notifications.warn("Atenção!", "Números da instalação não conferem!");
			return;
		}

		if(!this.arquivo64){
			this.notifications.warn("Atenção!", "Conta da CEMIG é obrigatória!");
			return;
		}

		delete data.numeroInstalacao2;

		data.dadosSimulacao = this.dadosSimulacao;
		data.dadosSimulacao.ignorarTaxaMinima = false;

		data.parceiroId = this.dadosSimulacao.parceiroId;
		data.arquivo = this.arquivo64;
		data.tipoArquivo = this.descExtension;

		data.consumoContratado = this.objSimulacao.consumoContrado;

		this.simuladorService.sendVenda(data)
			.subscribe(
				response => (
					this.retornoVenda(response)
			));

	}

	retornoVenda(data){
		if(data){
			this.notifications.success("Sucesso!", "Venda salva com sucesso!");
			this.fecharModalVenda();

			this.objSimulacao = {
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
		}

	}

	saveBase64(file){
		this.arquivo64 = file;
	}

	saveExtension(filename){
		this.descExtension = filename.split('.').pop();
	}

	handleFileInput(files: FileList) {
		
		let fileItem = files.item(0); 

		this.descFile = fileItem.name;
		this.saveExtension(fileItem.name);
		
		let self = this;

		var reader = new FileReader();

		reader.readAsDataURL(fileItem);

		reader.onload = function (readerEvt) {
			var binaryString = reader.result;
			self.saveBase64(binaryString);
		};
	}
	
	format(valString) {
		if (!valString) {
			return '';
		}
		
		if(valString.length <= 11){
		  this.maskedId = this.cpf_mask(valString);
		}else{
		  this.maskedId = this.cnpj(valString);
		}

		this.formSearchCliente.controls['cnpjCpf'].setValue(this.maskedId);
	};
	
	unFormat(val) {
		if (!val) {
			return '';
		}
		val = val.replace(/\D/g, '');
	
		if (this.GROUP_SEPARATOR === ',') {
			return val.replace(/,/g, '');
		} else {
			return val.replace(/\./g, '');
		}
	};
	
	cpf_mask(v) {
		v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
		v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
		v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
		//de novo (para o segundo bloco de números)
		v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
		return v;
	}
	
	cnpj(v) {
		v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
		v = v.replace(/^(\d{2})(\d)/, '$1.$2'); //Coloca ponto entre o segundo e o terceiro dígitos
		v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); //Coloca ponto entre o quinto e o sexto dígitos
		v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); //Coloca uma barra entre o oitavo e o nono dígitos
		v = v.replace(/(\d{4})(\d)/, '$1-$2'); //Coloca um hífen depois do bloco de quatro dígitos
		return v;
	}

	mountGrafico(data){

		this.showGrafico = false;

		this.barChartLabels = [];
		this.barChartData = [];

		let arrFinan = [];
		let arrEcono = [];

		for (let index = 0; index < data.length; index++) {
			const element = data[index];

			this.barChartLabels.push(element.mes);
			arrFinan.push(Math.abs(element.parcelaFinanciamento));
			arrEcono.push(Math.abs(element.reducaoContaCemig));
			
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

	buscarCep(cep){

		if(cep && cep.length == 8){
			this.simuladorService.searchCEP(cep)
				.subscribe(
					response => (
						this.retornoCep(response)
				));
		}
	}

	retornoCep(data){

		this.formSaveCliente.controls['endereco'].setValue(data.logradouro);
		this.formSaveCliente.controls['bairro'].setValue(data.bairro);
		this.formSaveCliente.controls['cidade'].setValue(data.localidade);
		this.formSaveCliente.controls['uf'].setValue(data.uf);

	}

	fecharModalCliente(){

		this.showModalCliente = false;

		this.formSaveCliente = this.formBuilder.group({
			bairro: [null, [Validators.required]],
			cep: [null, [Validators.required]],
			cidade: [null, [Validators.required]],
			cnpjCpf: [null, [Validators.required]],
			complemento: [null],
			contato1: [null, [Validators.required]],
			email: [null, [Validators.required]],
			endereco: [null, [Validators.required]],
			nome: [null, [Validators.required]],
			numero: [null, [Validators.required]],
			responsavel: [null, [Validators.required]],
			uf: [null, [Validators.required]]
		});
	}

	format2(valString) {
		if (!valString) {
			return '';
		}
		
		if(valString.length <= 11){
		  this.maskedId = this.cpf_mask(valString);
		}else{
		  this.maskedId = this.cnpj(valString);
		}

		this.formSaveCliente.controls['cnpjCpf'].setValue(this.maskedId);
	};

	sendFormCliente(data){

		if(this.formSaveCliente.invalid){
			this.notifications.warn("Atenção!", "Preenchimento Cliente incorreto!");
			return;
		}

		data.cnpjCpf = this.unFormat(data.cnpjCpf);

		this.simuladorService.saveCliente(data)
			.subscribe(
				response => (
					this.retornoSaveCliente(response, data.cnpjCpf)
			));

	}

	retornoSaveCliente(data, cpfCNPJ){

		if(data){
			this.notifications.success("Sucesso!", 'Cliente salvo...');
			this.fecharModalCliente();

			this.buscarCliente({cnpjCpf: cpfCNPJ});
		}

	}

	imprimir(){

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
			pdf.save('Lux - Simulação Venda.pdf'); // Generated PDF   
		});  

	}

	sendImprimir() {

		this.showModalImprimir = true;

	}

	fecharModalImp(){
		this.showModalImprimir = false;
	}
}
