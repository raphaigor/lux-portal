import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { RestService } from "../rest/rest.service";
import { NotificationsService } from "angular2-notifications";
import { LoadingBarService } from "ng2-loading-bar";
import { Router } from "@angular/router";
import { environment } from '../../../../environments/environment';

@Injectable()
export class HttpService {

	protected urlBase = environment.url_server

	constructor(private http: Http,
		private restService: RestService,
		private notifications: NotificationsService,
		private loadingBarService: LoadingBarService,
		private router: Router) {
	}

	getHeaders(externo = false) {

		if(!externo){
			var headers = new Headers({ 
				'Content-Type': 'application/json',
				'X-Auth-Token': this.restService.getSessionToken()
			});
		} else {
			var headers = new Headers();
		}

		return headers;
	}

	private handleResponse(observable: Observable<Response>) {

		var result = null;
	
		try {

			result = observable.map(res => {

				if(res.status == 200){
					this.loadingBarService.complete();
					var result = res.json();
					return result;
				} else {
					return this.endWith(res);
				}
				

			}).catch((error: any) => [(
				this.endWith(error)
			)]);

        } catch (err) {
            this.loadingBarService.complete();
		}
		
        return result;
    }

    public endWith(response) {

		if (response.status == 201) {
			this.loadingBarService.complete();
			return true;
		}

		if (response.status == 204) {
			this.loadingBarService.complete();
			return true;
		}

		if (response.status == 409) {
			var result = response.json();
			this.loadingBarService.complete();
			this.notifications.error("Atenção!", result.message);
			return false;
		}

		if (response.status == 400) {
			var result = response.json();
			this.loadingBarService.complete();
			this.notifications.error("Atenção!", result.message);
			return false;
		}

        if (response.status == 401) {
            Observable.apply([
				this.loadingBarService.complete(),
				this.notifications.error("Atenção!", "Ação não autorizada."),
			]);
			return false;
        } else {
          	Observable.apply([
				this.notifications.error("Atenção!", "Serviço temporariamente indisponível."),
              	this.loadingBarService.complete()
			]);
			return false;
    	}

	}

	public doGet(path: string, params: string, urlExterna = false) {

		this.loadingBarService.reset();
		this.loadingBarService.start();

		if(urlExterna){
			url = path;
		} else {
			url = this.urlBase + path;
		}
		
		if(params != null && params != ''){
			var url = url + '?' + params;
		}
	
    	return this.handleResponse(this.http.get(url, {headers: this.getHeaders(urlExterna)}));
	}

	public doPost(path: string, params?: any) {

		this.loadingBarService.reset();
		this.loadingBarService.start();
	
		var url;
	
		url = this.urlBase + path;
		
		if (!params) params = {};

		var requestOptions = new RequestOptions({headers: this.getHeaders()});
		
		return this.handleResponse(this.http.post(url, params, requestOptions));
	}

	public doPut(path: string, params?: any) {

		this.loadingBarService.reset();
		this.loadingBarService.start();

		var url = this.urlBase + path;

		var requestOptions = new RequestOptions({headers: this.getHeaders()});

		return this.handleResponse(this.http.put(url, params, requestOptions));
	}

}