import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class IsEmailExistsService{

    constructor(private http:Http){

    }

    isEmailExists(email){
       return this.http.post('http://192.168.1.130:8080/user/email', email);
    }

}