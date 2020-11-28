import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './portal/home/home.component';
import { UsinaComponent } from './portal/cadastros/usina/usina.component';
import { OemComponent } from './portal/cadastros/oem/oem.component';
import { RedeEletricaComponent } from './portal/cadastros/rede-eletrica/rede-eletrica.component';
import { FaturamentoComponent } from './portal/cadastros/faturamento/faturamento.component';
import { ParametroFinanceiroComponent } from './portal/cadastros/parametro-financeiro/parametro-financeiro.component';
import { ConcorrenteComponent } from './portal/cadastros/concorrente/concorrente.component';
import { ParceiroComponent } from './portal/cadastros/parceiro/parceiro.component';
import { VendedorComponent } from './portal/cadastros/vendedor/vendedor.component';
import { ClienteComponent } from './portal/cadastros/cliente/cliente.component';
import { SimuladorComponent } from './portal/simulador/simulador.component';
import { VendaComponent } from './portal/venda/venda.component';
import { RelatorioVendedorComponent } from './portal/relatorios/relatorio-vendedor/relatorio-vendedor.component';
import { RelatorioResultadoVendedorComponent } from './portal/relatorios/relatorio-resultado-vendedor/relatorio-resultado-vendedor.component';
import { RelatorioUsinaComponent } from './portal/relatorios/relatorio-usina/relatorio-usina.component';
import { RelatorioTipoRedeComponent } from './portal/relatorios/relatorio-tipo-rede/relatorio-tipo-rede.component';
import { ColaboradorComponent } from './portal/cadastros/colaborador/colaborador.component';

import { SiteComponent } from './site/site.component';

const routes: Routes = [
	{ path: '', redirectTo: '/site', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'cadastros/usina', component: UsinaComponent },
    { path: 'cadastros/oem', component: OemComponent },
    { path: 'cadastros/rede-eletrica', component: RedeEletricaComponent },
    { path: 'cadastros/faturamento', component: FaturamentoComponent },
    { path: 'cadastros/parametro-financeiro', component: ParametroFinanceiroComponent },
    { path: 'cadastros/concorrente', component: ConcorrenteComponent },
    { path: 'cadastros/parceiro', component: ParceiroComponent },
    { path: 'cadastros/vendedor', component: VendedorComponent },
    { path: 'cadastros/cliente', component: ClienteComponent },
    { path: 'cadastros/colaborador', component: ColaboradorComponent },
    { path: 'simulador', component: SimuladorComponent },
    { path: 'vendas', component: VendaComponent },
    { path: 'site', component: SiteComponent },
    { path: 'relatorios/vendedor', component: RelatorioVendedorComponent },
    { path: 'relatorios/resultado-vendedor', component: RelatorioResultadoVendedorComponent },
    { path: 'relatorios/usina', component: RelatorioUsinaComponent },
    { path: 'relatorios/tipo-rede', component: RelatorioTipoRedeComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }
