import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class AddEmployeeService{

    constructor(private http:Http){

    }
    
    
    getLoggedCompany(){
        return this.http.get('http://192.168.1.130:8080/user/logged/',this.jwt());
    }
    getAllCountries(){
        return this.http.get('http://192.168.1.130:8080/address/country/');
    }

    
    getAllStates(){
        return this.http.get('http://192.168.1.130:8080/address/state/');
    }

    
    getAllCities(){
        return this.http.get('http://192.168.1.130:8080/address/city/');
    }

    getAllSecurityQuestions(){
        return this.http.get('http://192.168.1.130:8080/address/questions/');
    }

    addEmployee(company){

        return this.http.post('http://192.168.1.130:8080/user/employee', company,this.jwt());
     }
 
     jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }

}
}