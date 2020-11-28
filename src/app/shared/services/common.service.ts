import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { HttpService } from "../services/http/http.service";

@Injectable()
export class CommonService {

	constructor(@Inject(Http) private http: Http, @Injectable() private httpService: HttpService,) { 
	}

	searchLocalidade(term){
		return this.httpService.doGet('/place/list/'+term, null);
	}

}