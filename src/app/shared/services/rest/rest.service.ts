import { Injectable } from '@angular/core';
import {Headers, RequestOptions} from "@angular/http";

@Injectable()
export class RestService {
	
	private host;
	private protheusHost;
	constructor() {}

  	requestOptions: RequestOptions;

	setHost(host) {
		localStorage.setItem("API_URL",host);
		this.host = host;
	}

	setProtheusHost(host) {
		localStorage.setItem("PROTHEUS_URL",host);
		this.protheusHost = host;
	}

	getHost() {
		return this.host;
	}

	getProtheusHost() {
		return this.protheusHost;
	}

	public getToken(){
		var user = JSON.parse(localStorage.getItem("currentUser"));
		return user.token;
	}

	public getCgc(){
		var user = JSON.parse(localStorage.getItem("currentUser"));
		return user.cgc;
	}

	public getMemberId(){
		var user = JSON.parse(localStorage.getItem("currentUser"));
		return user.memberId;
	}

	public getDominio(){
		var user = JSON.parse(localStorage.getItem("currentUser"));
		return user.dominio;
	}

	public getSessionToken(){
	
		var token = String(localStorage.getItem('app-lux-token'));
			token = token.replace('"','').replace('"','');

		return token;
	}

}
