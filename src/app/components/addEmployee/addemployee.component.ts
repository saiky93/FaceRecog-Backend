import { Component, OnInit } from '@angular/core';
import { Company } from '../../model/company';
import { AddEmployeeService} from '../../services/addemployee.service'
import {Router} from '@angular/router';


import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Observable }     from 'rxjs/Observable';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';

@Component({
  selector: 'addemployee',
  templateUrl: './addemployee.component.html',
  styleUrls: ['./addemployee.component.css']
})
export class AddEmployeeComponent implements OnInit {
 
  companyId: string;
  company: Company;
  message: string;
  countries: {};
  states: {};
  cities: {};
  securityQuestions: {};
  cls:any;
  private apiBaseUrl = 'http://localhost:8080'; 
  headers: Headers = new Headers();
  
  constructor(private addEmployeeService: AddEmployeeService,private _router:Router, private _http: Http) {

   }

  ngOnInit() {


    this.company = {
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
        companyId: '1',
        picture: '',
        position: '',
        phone: ''

      }
       
      
  
  }

  this.addEmployeeService.getLoggedCompany()
  .subscribe(
      (response) => {
        console.log(response.json().result.companyId)
        this.company.employee.companyId = response.json().result.companyId;
      },
      (error) => console.log(error)
  );


  console.log(Company);
  this.addEmployeeService.getAllCountries()
  .subscribe(
      (response) => {
        console.log(response)
        this.countries = response.json().result;
      },
      (error) => console.log(error)
  );


  this.addEmployeeService.getAllStates()
  .subscribe(
      (response) => {
        console.log(response)
        this.states = response.json().result;
      },
      (error) => console.log(error)
  );

  this.addEmployeeService.getAllCities()
  .subscribe(
      (response) => {
        console.log(response)
        this.cities = response.json().result;
      },
      (error) => console.log(error)
  );

  this.addEmployeeService.getAllSecurityQuestions()
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
    this.addEmployeeService.getAllStates()
    .subscribe(
        (response) => {
          console.log(response)
          this.states = response.json().result.filter((state)=>state.country == countryName);
        },
        (error) => console.log(error)
    );

    this.addEmployeeService.getAllCities()
    .subscribe(
        (response) => {
          this.cities = response.json().result.filter((city)=>city.country == countryName);
        },
        (error) => console.log(error)
    );
  
  
  }

  onSelectState(stateName) {
    console.log(stateName)
    this.addEmployeeService.getAllCities()
    .subscribe(
        (response) => {
          this.cities = response.json().result.filter((city)=>city.state == stateName);
        },
        (error) => console.log(error)
    );
  
  }
  onSubmit(f){

    if(f.valid==false){
      this.message = "Please enter the required information"
    }
    else
    {
     this.addEmployeeService.addEmployee(this.company)
     .subscribe(
         (response) => {
           console.log(this.company)
           if(response.json().responseCode=="EMAIL_ALREADY_EXIST"){
             this.cls="text-danger";
             this.message= "This email already exist";  
           }else
           {
             this.cls="text-success";
             this.message= "Successfully added";  
            
            

           }
         },
         (error) => console.log(error)
     );
  }
  }
  
  
   
  UploadImage($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
    
      this.company.employee.picture = myReader.result;;
    
    }
    myReader.readAsDataURL(file);
  }

  
}
