import { Injectable } from '@angular/core';
import { Http, Headers, Response,RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import 'rxjs/add/operator/map'
 
 
@Injectable()
export class AuthenticationService {
    private headers = new Headers({'Content-Type': 'application/json'});
    showMes;
    constructor(private http: Http,private router: Router) { }
 
    login(username: string, password: string) {

        
        return this.http.post('http://localhost:8080/user/login',JSON.stringify({email: username, password: password}), {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.showMes=true;
                }
                else{
                    this.showMes=false;
                }
            });
    }
 
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.router.navigate['/'];
        
    }
}