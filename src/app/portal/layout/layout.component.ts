import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

	menuOpen = false;

	dadosUser: {
		nome: 'RAPHAEL IGOR'
		acessoId: null,
		login: null,
		status: null,
		tipoUsuario: null,
		token: null
	};

	constructor(private router: Router) { 

		this.dadosUser = JSON.parse(localStorage.getItem('app-lux-user'));

	}

	ngOnInit() {
	}

	openMenu(){
		this.menuOpen = !this.menuOpen;
	}

	logout(){
		localStorage.removeItem('app-lux-user');
        localStorage.removeItem('app-lux-token');
		this.router.navigate(['/login']);
	}

}
