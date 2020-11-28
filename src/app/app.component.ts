import { Component } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale); 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

	height = 4;
    color = "#F9A61A";
    runInterval = 300;

	date: Date = new Date();
	settings = {
		bigBanner: true,
		timePicker: false,
		format: 'dd-MM-yyyy',
		defaultOpen: false
	}
	
	alertOptions: any = {
		timeOut: 5000,
		preventLastDuplicates: true,
		maxStack: 3,
		showProgressBar: true
	}

	title = 'lux-portal';
	  
	constructor(private localeService: BsLocaleService) {

		this.localeService.use('pt-br');

	}
}
