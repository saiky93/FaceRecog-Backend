import { Component, OnInit } from '@angular/core';
import { Company } from '../../model/company';
import { EmployeeService} from '../../services/employee.service'
import {Router} from '@angular/router';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Observable }     from 'rxjs/Observable';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-update-employee-user-information',
  templateUrl: './update-employee-user-information.component.html',
  styleUrls: ['./update-employee-user-information.component.css']
})
export class UpdateEmployeeUserInformationComponent implements OnInit {


  companyId: string;
  employee: Company;
  message: string;
  countries: {};
  states: {};
  cities: {};
  securityQuestions1: {};
  securityQuestions2: {};
  securityQuestions3: {};
  headers: Headers = new Headers();
  cls: any;
  
  constructor(private employeeService: EmployeeService,private _router:Router, private _http: Http) {

   }

  ngOnInit() {


    this.employee = {
      user: {
        email : '',
        password: '',
        confirmPassword: '',
        securityQuestion1: '',
        securityQuestion2: '',
        securityQuestion3: '',
        securityAnswer1: '',
        securityAnswer2: '',
        securityAnswer3: ''
        
      },
      company: {
        name:'',
        addressLine1: '',
        addressLine2: '',
        country: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
        eIN: '',
        description: '',
        website: ''
      },
      employee:
      {
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        country: '',
        city: '',
        state: '',
        zipCode: '',
        companyId: '',
        picture: '',
        position: '',
        phone: ''

      }
       
      
  
  }

  this.employeeService.getUserInfo()
  .subscribe(
      (user) => {

        this.employee.user = user;
      },
      (error) => console.log(error)
  );


  
  this.employeeService.getAllCountries()
  .subscribe(
      (response) => {
        console.log(response)
        this.countries = response.json().result;
      },
      (error) => console.log(error)
  );


  this.employeeService.getAllStates()
  .subscribe(
      (response) => {
        console.log(response)
        this.states = response.json().result;
      },
      (error) => console.log(error)
  );

  this.employeeService.getAllCities()
  .subscribe(
      (response) => {
        console.log(response)
        this.cities = response.json().result;
      },
      (error) => console.log(error)
  );

  this.employeeService.getAllSecurityQuestions()
  .subscribe(
      (response) => {
        console.log(response)
        this.securityQuestions1 = response.json().result;
      },
      (error) => console.log(error)
  );

  this.employeeService.getAllSecurityQuestions()
  .subscribe(
      (response) => {
        console.log(response)
        this.securityQuestions2 = response.json().result;
      },
      (error) => console.log(error)
  );

  this.employeeService.getAllSecurityQuestions()
  .subscribe(
      (response) => {
        console.log(response)
        this.securityQuestions3 = response.json().result;
      },
      (error) => console.log(error)
  );

  this.message="";
  }

  onChange1(securityQuestion) {
    this.employeeService.getAllSecurityQuestions()
    .subscribe(
    (response) => {
    console.log(securityQuestion);
    this.securityQuestions2 = response.json().result.filter((securityQ)=>securityQ.question != securityQuestion && securityQ.question != this.employee.user.securityQuestion3);
    this.securityQuestions3 = response.json().result.filter((securityQ)=>securityQ.question != securityQuestion && securityQ.question != this.employee.user.securityQuestion2);
    },
    (error) => console.log(error)
    );
  }

  onChange2(securityQuestion) {
    this.employeeService.getAllSecurityQuestions()
    .subscribe(
    (response) => {
    console.log(securityQuestion);
    this.securityQuestions1 = response.json().result.filter((securityQ)=>securityQ.question != securityQuestion && securityQ.question != this.employee.user.securityQuestion3);
    this.securityQuestions3 = response.json().result.filter((securityQ)=>securityQ.question != securityQuestion && securityQ.question != this.employee.user.securityQuestion1);
    },
    (error) => console.log(error)
    );
  }

  onChange3(securityQuestion) {
    this.employeeService.getAllSecurityQuestions()
    .subscribe(
    (response) => {
    console.log(securityQuestion);
    this.securityQuestions1 = response.json().result.filter((securityQ)=>securityQ.question != securityQuestion && securityQ.question != this.employee.user.securityQuestion2);
    this.securityQuestions2 = response.json().result.filter((securityQ)=>securityQ.question != securityQuestion && securityQ.question != this.employee.user.securityQuestion1);
    },
    (error) => console.log(error)
    );
  }
onSubmit(f){

    if(f.valid==false){
      this.cls="text-danger"
      this.message = "Please enter the required information"
    }
    else
    {
     this.employeeService.saveEmployeeUserInfo(this.employee.user)
     .subscribe(
         (response) => {
           if(response.json().responseCode=="NO_DATA_FOUND"){
             this.cls="text-danger";
             this.message= "This user doesn't exist";  
           }else
           {
             this.cls="text-success";
             this.message= "Successfully updated";  
            

           }
         },
         (error) => console.log(error)
     );
  }
  }
  
  
}

