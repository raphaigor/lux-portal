import { Injectable } from '@angular/core';
import { Inject } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Headers } from '@angular/http';
import { NotificationsService } from "angular2-notifications";
import { environment } from '../../environments/environment';

@Injectable()
export class LoginService {

	private urlBase = environment.url_server;

    constructor(@Inject(Http) private http: Http, private router: Router, private notifications: NotificationsService) {
	}
	
	encryptPass(_pass): String {
        return window.btoa(_pass);
    }

    doLogin(data) {

		var msg = this.encryptPass(data.login+':'+data.password);

        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + msg);
        
        this.http.post(this.urlBase + '/auth/login', null, {headers:headers})
            .subscribe(
                (response) => {
                    this.saveLogin(response);
                    this.router.navigate(['/home']);
                },
                (err) => {
					this.notifications.warn("Atenção!", "Usuário ou senha incorretos!");
			        return false;
                }
            );

	}

	saveLogin(result){
        let user = JSON.parse(result._body);
        localStorage.setItem('app-lux-user', JSON.stringify(user));
        localStorage.setItem('app-lux-token', JSON.stringify(user.token));
    }

    esqueciSenha(login){
        this.http.get(this.urlBase + '/auth/passwordRecovery?login='+login)
        .subscribe(
            (response) => {
                if(response.status == 204){
                    this.notifications.success("Senha enviada!", "Sua senha foi enviada para o e-mail cadastrado!");
                } else {
                    this.notifications.warn("Atenção!", "Erro ao encontrar usuário!");
                    return false;
                }
            },
            (err) => {
                this.notifications.warn("Atenção!", "Erro ao encontrar usuário!");
                return false;
            }
        );
    }
	
}
