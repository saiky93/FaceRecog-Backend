import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CompanyService{

    constructor(private http:Http){

    }

    getAllCountries(){
        return this.http.get('http://192.168.1.130:8080/address/country/');
    }

    
    getAllStates(){
        return this.http.get('http://192.168.1.130:8080/address/state/');
    }

    getAllSecurityQuestions(){
        return this.http.get('http://192.168.1.130:8080/address/questions/');
    }

    getAllCities(){
        return this.http.get('http://192.168.1.130:8080/address/city/');
    }

    
    registerCompany(company){

        return this.http.post('http://192.168.1.130:8080/user/user', company);
     }
 

    /*storeCompanies(servers: any[]){
       return this.http.put('https://demonghttp.firebaseio.com/company.json', servers);
    }

    getCompanies(){
        return this.http.get('https://demonghttp.firebaseio.com/company.json')
            .map(
                (response: Response) => {
                    const data = response.json();
                    return data;
                }
            );
    }*/

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }

}}