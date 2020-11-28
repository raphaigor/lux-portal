import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

import { SimpleNotificationsModule } from 'angular2-notifications';
import { LoadingBarModule, LoadingBarService } from 'ng2-loading-bar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NotifierModule } from 'angular-notifier';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ChartsModule } from 'ng2-charts';
import { ExportAsModule } from 'ngx-export-as';

import { HttpService } from './shared/services/http/http.service';
import { RestService } from './shared/services/rest/rest.service';
import { CommonService } from './shared/services/common.service';
import { DialogComponent } from './shared/components/app-dialog/app-dialog.component';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { LayoutComponent } from './portal/layout/layout.component';
import { HomeComponent } from './portal/home/home.component';
import { UsinaComponent } from './portal/cadastros/usina/usina.component';
import { UsinaService } from './portal/cadastros/usina/usina.service';
import { OemComponent } from './portal/cadastros/oem/oem.component';
import { OemService } from './portal/cadastros/oem/oem.service';
import { FaturamentoComponent } from './portal/cadastros/faturamento/faturamento.component';
import { FaturamentoService } from './portal/cadastros/faturamento/faturamento.service';
import { ParametroFinanceiroComponent } from './portal/cadastros/parametro-financeiro/parametro-financeiro.component';
import { ParametroFinanceiroService } from './portal/cadastros/parametro-financeiro/parametro-financeiro.service';
import { ConcorrenteComponent } from './portal/cadastros/concorrente/concorrente.component';
import { ConcorrenteService } from './portal/cadastros/concorrente/concorrente.service';
import { ParceiroComponent } from './portal/cadastros/parceiro/parceiro.component';
import { ParceiroService } from './portal/cadastros/parceiro/parceiro.service';
import { VendedorComponent } from './portal/cadastros/vendedor/vendedor.component';
import { VendedorService } from './portal/cadastros/vendedor/vendedor.service';
import { ClienteComponent } from './portal/cadastros/cliente/cliente.component';
import { ClienteService } from './portal/cadastros/cliente/cliente.service';
import { SimuladorComponent } from './portal/simulador/simulador.component';
import { SimuladorService } from './portal/simulador/simulador.service';
import { VendaComponent } from './portal/venda/venda.component';
import { VendaService } from './portal/venda/venda.service';
import { RedeEletricaComponent } from './portal/cadastros/rede-eletrica/rede-eletrica.component';
import { RedeEletricaService } from './portal/cadastros/rede-eletrica/rede-eletrica.service';
import { SiteComponent } from './site/site.component';
import { RelatorioVendedorComponent } from './portal/relatorios/relatorio-vendedor/relatorio-vendedor.component';
import { RelatorioVendedorService } from './portal/relatorios/relatorio-vendedor/relatorio-vendedor.service';
import { RelatorioResultadoVendedorComponent } from './portal/relatorios/relatorio-resultado-vendedor/relatorio-resultado-vendedor.component';
import { RelatorioResultadoVendedorService } from './portal/relatorios/relatorio-resultado-vendedor/relatorio-resultado-vendedor.service';
import { RelatorioUsinaComponent } from './portal/relatorios/relatorio-usina/relatorio-usina.component';
import { RelatorioUsinaService } from './portal/relatorios/relatorio-usina/relatorio-usina.service';
import { RelatorioTipoRedeComponent } from './portal/relatorios/relatorio-tipo-rede/relatorio-tipo-rede.component';
import { RelatorioTipoRedeService } from './portal/relatorios/relatorio-tipo-rede/relatorio-tipo-rede.service';
import { ColaboradorComponent } from './portal/cadastros/colaborador/colaborador.component';
import { ColaboradorService } from './portal/cadastros/colaborador/colaborador.service';

@NgModule({
    declarations: [
		AppComponent,
		LoginComponent,
		UsinaComponent,
		HomeComponent,
		LayoutComponent,
		DialogComponent,
		OemComponent,
		FaturamentoComponent,
		ParametroFinanceiroComponent,
		ConcorrenteComponent,
		ParceiroComponent,
		VendedorComponent,
		ClienteComponent,
		SimuladorComponent,
		VendaComponent,
		RedeEletricaComponent,
		SiteComponent,
		RelatorioVendedorComponent,
		RelatorioResultadoVendedorComponent,
		RelatorioUsinaComponent,
		RelatorioTipoRedeComponent,
		ColaboradorComponent
    ],
    imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		BrowserAnimationsModule,
		HttpModule,
		HttpClientModule,
		LoadingBarModule,
		SimpleNotificationsModule.forRoot(),
		NgxDatatableModule,
		ReactiveFormsModule,
		CurrencyMaskModule,
		NotifierModule,
		AngularDateTimePickerModule,
		NgxMaskModule.forRoot(),
		NgxMyDatePickerModule.forRoot(), 
		BsDatepickerModule.forRoot(),
		DatepickerModule.forRoot(),
		ChartsModule,
		ExportAsModule
    ],
    providers: [
		HttpService,
        RestService,
        CommonService,
		LoadingBarService,
		LoginService,
		UsinaService,
		OemService,
		FaturamentoService,
		ParametroFinanceiroService,
		ConcorrenteService,
		ParceiroService,
		VendedorService,
		ClienteService,
		SimuladorService,
		VendaService,
		RedeEletricaService,
		RelatorioVendedorService,
		RelatorioResultadoVendedorService,
		RelatorioUsinaService,
		RelatorioTipoRedeService,
		ColaboradorService,
		{ provide: LOCALE_ID, useValue: "pt-BR" }
	],
    bootstrap: [AppComponent]
})
export class AppModule { }
