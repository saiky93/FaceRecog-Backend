import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CompanyProfileService{

    constructor(private http:Http){

    }

    getAllCountries(){
        return this.http.get('http://192.168.1.130:8080/address/country/');
    }

    getCompanyUser(){

        return this.http.get('http://192.168.1.130:8080/user/logged',this.jwt());
        
    }
    
    getAllStates(){
        return this.http.get('http://192.168.1.130:8080/address/state/');
    }

    
    getAllCities(){
        return this.http.get('http://192.168.1.130:8080/address/city/');
    }

    getAllSecurityQuestions(){
        return this.http.get('http://192.168.1.130:8080/user/securityQuestion/');
    }

    updateCompany(company){

        return this.http.put('http://192.168.1.130:8080/user/company/', company,this.jwt());
     }
     showEmployees(){
        return this.http.get('http://192.168.1.130:8080/user/company/employee/',this.jwt()).map(
            (response: Response) => {
                const data = response.json().result;
                return data;
            });
    }
    
    getCompany(id){
    
        return this.http.get('http://192.168.1.130:8080/company/'+id,this.jwt()).map((response: Response) => {
            const data = response.json().result;
            return data;
        });
            
    }
    // getCompanyById()
    // {
    //     return this.http.get('http://192.168.1.130:8080/user/logged',this.jwt()).map((response: Response) => {
    //         const data = response.json().result;
    //         return data;
    //     });
            
    // }

    createaccount(compid,filename)
    {
        return this.http.get('http://192.168.1.130:8080/upload/csv/createaccount/'+compid+'/'+filename,this.jwt()).map((response: Response) => {
            const data = response.json();
            return data;
        });

    }
   
    getLoggedCompany()
    {
        return this.http.get('http://192.168.1.130:8080/user/loggedCompany',this.jwt()).map((response: Response) => {
            const data = response.json().result;
            console.log(data);
            return data;
        });
            
    }
    
    getCompanyById(compId)
    
    {
    
    return this.http.get('http://192.168.1.130:8080/company/'+compId).map((response: Response) => {
    
    const data = response.json().result;
    
    return data;
    
    });
    
    
    }

    deleteUser(id)
    {
        return this.http.delete('http://192.168.1.130:8080/user/employee/'+id,this.jwt()).map((response: Response)=>response.json());

    }

    updateUser(id,employee)
    {
        return this.http.put('http://192.168.1.130:8080/user/employee/'+id,employee,this.jwt()).map((response: Response)=>response.json());
    
    }

    getEmployeeByPassedId(id)
    {
        return this.http.get('http://192.168.1.130:8080/employee/'+id,this.jwt()).map((response: Response) => response.json().result);
    }

   
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }

}}