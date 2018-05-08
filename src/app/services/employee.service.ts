import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class EmployeeService{

    constructor(private http:Http){

    }

    getAllCountries(){
        return this.http.get('http://localhost:8080/address/country/');
    }

    
    getAllStates(){
        return this.http.get('http://localhost:8080/address/state/');
    }

    getAllSecurityQuestions(){
        return this.http.get('http://localhost:8080/address/questions/');
    }

    getAllCities(){
        return this.http.get('http://localhost:8080/address/city/');
    }
    
    saveEmployeeUserInfo(user){
        console.log(user)
        return this.http.put('http://localhost:8080/user/employeeUserInfo/' + user.id,user, this.jwt());
         
    }

    UploadEmployeeImage(employeeId, image){
        return this.http.put('http://localhost:8080/user/employeeImage/' + employeeId,image, this.jwt());
         
    }
    setTakenImage(id)
    {
     return this.http.put('http://localhost:8080/employee/takePictures/'+id,{},this.jwt());
    }
    
    saveEmployee(employee){
        console.log(employee.user.user.employee)
        return this.http.put('http://localhost:8080/user/employee/' + employee.user.user.employee, employee.employee, this.jwt());
         
    }
    getLoggedEmployee()
    {
        return this.http.get('http://localhost:8080/user/loggedEmployee',this.jwt()).map((response: Response) => {
            const data = response.json().result;
            console.log(data);
            let currentUser = JSON.parse(localStorage.getItem('currentUser'));
            return {data,currentUser};
        });
            
    }

    getEmployeesByFirstOrLastName(employeeName: String){
        return this.http.get('http://localhost:8080/employee/byFirstOrLastName/'+employeeName,this.jwt()).map((response:Response) => {
            const employeeName = response.json().result;
            return employeeName;
        });
    }

    getEmployeeUserEmailForSpeech(employeeId){
        return this.http.get('http://localhost:8080/user/employee/'+employeeId).map(this.extractData);
    }

    getEmployeeEmail(employeeId){
        return this.http.get('http://localhost:8080/user/employee/'+employeeId).map(this.extractData);
    }
   
    getUserInfo()
    {
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        return this.http.get('http://localhost:8080/user/'+currentUser.user.id,this.jwt()).map((response: Response) => {
            const user = response.json().result;
            return user;
        });
            
    }
   

    private extractData(res: Response)
    {
        let body = res.json();
        return body['result'];

    }
 
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }

}}