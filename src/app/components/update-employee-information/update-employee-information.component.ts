import { Component, OnInit } from '@angular/core';
import { Company } from '../../model/company';
import { EmployeeService} from '../../services/employee.service'
import {Router} from '@angular/router';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Observable }     from 'rxjs/Observable';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-update-employee-information',
  templateUrl: './update-employee-information.component.html',
  styleUrls: ['./update-employee-information.component.css']
})
export class UpdateEmployeeInformationComponent implements OnInit {

  companyId: string;
  employee: Company;
  message: string;
  countries: {};
  states: {};
  cities: {};
  securityQuestions: {};
  headers: Headers = new Headers();
  cls:any;
  
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
        sSN : '',
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

  this.employeeService.getLoggedEmployee()
  .subscribe(
      ({data, currentUser}) => {
        this.employee.employee = data;

        this.employee.user = currentUser;
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
//        this.states = response.json().result;
this.states = response.json().result;        
//this.states = response.json().result.filter((state)=>state.country == this.employee.employee.country);
        
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
        this.securityQuestions = response.json().result;
      },
      (error) => console.log(error)
  );
  

  this.message="";
  }
  onSelectCountry(countryName) {
    this.employeeService.getAllStates()
    .subscribe(
        (response) => {
          console.log(response)
          this.states = response.json().result.filter((state)=>state.country == countryName);
        },
        (error) => console.log(error)
    );

    this.employeeService.getAllCities()
    .subscribe(
        (response) => {
          this.cities = response.json().result.filter((city)=>city.country == countryName);
        },
        (error) => console.log(error)
    );
  
  
  }

  onSelectState(stateName) {
    console.log(stateName)
    this.employeeService.getAllCities()
    .subscribe(
        (response) => {
          this.cities = response.json().result.filter((city)=>city.state == stateName);
        },
        (error) => console.log(error)
    );
  
  }

  onSubmit(f){

    if(f.valid==false){
      this.cls="text-danger";
      this.message = "Please enter the required information"
    }
    else
    {
     this.employeeService.saveEmployee(this.employee)
     .subscribe(
         (response) => {
           if(response.json().responseCode=="EMAIL_ALREADY_EXIST"){
             this.cls="text-danger";
             this.message= "This email already exist";  
           }else
           {
             this.cls="text-success";
             this.message= "Successfully Updated";  
            

           }
         },
         (error) => console.log(error)
     );
  }
  }
  
  
}
