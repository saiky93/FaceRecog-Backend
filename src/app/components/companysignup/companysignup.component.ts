import { Component, OnInit } from '@angular/core';
import { Company } from '../../model/company';
import { CompanyService} from '../../services/company.service'
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-companysignup',
  templateUrl: './companysignup.component.html',
  styleUrls: ['./companysignup.component.css']
})
export class CompanysignupComponent implements OnInit {

  company: Company;
  message: string;
  countries: {};
  states: {};
  cities: {};
  securityQuestions1: {};
  securityQuestions2: {};
  securityQuestions3: {};
  cls:any;
  shoo = true;
  constructor(private companyService: CompanyService,public dataService : DataService,private _router:Router) {

   }

  ngOnInit() {
    this.company = {
      user: {
        email : localStorage.getItem('checkEmail'),
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
        phone:''

      }
      
  
  }

  this.companyService.getAllCountries()
  .subscribe(
      (response) => {
        console.log(response)
        this.countries = response.json().result;
      },
      (error) => console.log(error)
  );



  // this.companyService.getAllStates()
  // .subscribe(
  //     (response) => {
  //       console.log(response)
  //       this.states = response.json().result;
  //     },
  //     (error) => console.log(error)
  // );

  // this.companyService.getAllCities()
  // .subscribe(
  //     (response) => {
  //       console.log(response)
  //       this.cities = response.json().result;
  //     },
  //     (error) => console.log(error)
  // );

  this.companyService.getAllSecurityQuestions()
  .subscribe(
      (response) => {
        console.log(response)
        this.securityQuestions1 = response.json().result;
      },
      (error) => console.log(error)
  );

  this.companyService.getAllSecurityQuestions()
  .subscribe(
      (response) => {
        console.log(response)
        this.securityQuestions2 = response.json().result;
      },
      (error) => console.log(error)
  );

  this.companyService.getAllSecurityQuestions()
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
    this.companyService.getAllSecurityQuestions()
    .subscribe(
    (response) => {
    console.log(securityQuestion);
    this.securityQuestions2 = response.json().result.filter((securityQ)=>securityQ.question != securityQuestion && securityQ.question != this.company.user.securityQuestion3);
    this.securityQuestions3 = response.json().result.filter((securityQ)=>securityQ.question != securityQuestion && securityQ.question != this.company.user.securityQuestion2);
    },
    (error) => console.log(error)
    );
  }

  onChange2(securityQuestion) {
    this.companyService.getAllSecurityQuestions()
    .subscribe(
    (response) => {
    console.log(securityQuestion);
    this.securityQuestions1 = response.json().result.filter((securityQ)=>securityQ.question != securityQuestion && securityQ.question != this.company.user.securityQuestion3);
    this.securityQuestions3 = response.json().result.filter((securityQ)=>securityQ.question != securityQuestion && securityQ.question != this.company.user.securityQuestion1);
    },
    (error) => console.log(error)
    );
  }

  onChange3(securityQuestion) {
    this.companyService.getAllSecurityQuestions()
    .subscribe(
    (response) => {
    console.log(securityQuestion);
    this.securityQuestions1 = response.json().result.filter((securityQ)=>securityQ.question != securityQuestion && securityQ.question != this.company.user.securityQuestion2);
    this.securityQuestions2 = response.json().result.filter((securityQ)=>securityQ.question != securityQuestion && securityQ.question != this.company.user.securityQuestion1);
    },
    (error) => console.log(error)
    );
  }

  
  onSelectCountry(countryName) {
    this.companyService.getAllStates()
    .subscribe(
        (response) => {
          console.log(response)
          this.states = response.json().result.filter((state)=>state.country == countryName);
        },
        (error) => console.log(error)
    );

    this.companyService.getAllCities()
    .subscribe(
        (response) => {
          this.cities = response.json().result.filter((city)=>city.country == countryName);
        },
        (error) => console.log(error)
    );
  
  
  }

  onSelectState(stateName) {
    console.log(stateName)
    this.companyService.getAllCities()
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
    this.companyService.registerCompany(this.company)
    .subscribe(
        (response) => {
          //console.log(response.json().responseCode)
          if(response.json().responseCode=="EMAIL_ALREADY_EXIST"){
            this.cls = "text-danger";
            this.message= "Account associated with this email already exist in the system.";  
          }else
          {
            this.shoo = false;
            this.cls="text-success";
            this.message = "Account created successfully."           

          }
        },
        (error) => console.log(error)
    );
  }
  }
}
