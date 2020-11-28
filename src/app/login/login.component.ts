import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";

import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	showFormEsqueci = false;
	loginForm: FormGroup;

	constructor(private router: Router, private formBuilder: FormBuilder, private loginService: LoginService, private notifications: NotificationsService) { 
		
		this.loginForm = this.formBuilder.group({
			login: [null, Validators.required],
			password: [null, Validators.required]
		});

	}

	ngOnInit() {
	}

	login(data){
		// this.router.navigate(['/home']);
		this.loginService.doLogin(data);
	}

	esqueciSenha() {
		this.loginForm = this.formBuilder.group({
			login: [null, Validators.required],
			password: [null, Validators.required]
		});
		this.showFormEsqueci = !this.showFormEsqueci;
	}

	esqueci(data){

		if(!data.login){
			this.notifications.warn("Atenção!", "Informe seu login!");
			return false;
		}

		this.loginService.esqueciSenha(data.login);
		
	}

}
