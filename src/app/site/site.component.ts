import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NotificationsService } from "angular2-notifications";

import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

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

}
