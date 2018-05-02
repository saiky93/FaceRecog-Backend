import { Component, OnInit } from '@angular/core';

import { CompanyProfileService} from '../../services/company.profile.service'

import { Company } from '../../model/company';



@Component({

selector: 'app-updatecompanyprofile',

templateUrl: './updatecompanyprofile.component.html',

styleUrls: ['./updatecompanyprofile.component.css']

})

export class UpdatecompanyprofileComponent implements OnInit {

company: Company;

compId: string; 

countries: {};

states: {};

cities: {};

message: string; 
cls = "text-danger";

constructor(private companyProfileService: CompanyProfileService) { }



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

this.compId="1";

this.companyProfileService.getAllCountries()

.subscribe(

(response) => {

console.log(response)

this.countries = response.json().result;

},

(error) => console.log(error)

);







this.companyProfileService.getAllStates()

.subscribe(

(response) => {

console.log(response)

this.states = response.json().result;

},

(error) => console.log(error)

);



this.companyProfileService.getAllCities()

.subscribe(

(response) => {

console.log(response)

this.cities = response.json().result;

},

(error) => console.log(error)

);

this.companyProfileService.getLoggedCompany().subscribe(
    
    (compy) => {this.company=compy,
    
    console.log(this.company),
    
    (error) => console.log(error)
    
    } 
    
    );
    



this.message=""; 

}


onSelectCountry(countryName) {
    this.companyProfileService.getAllStates()
    .subscribe(
        (response) => {
          console.log(response)
          this.states = response.json().result.filter((state)=>state.country == countryName);
        },
        (error) => console.log(error)
    );

    this.companyProfileService.getAllCities()
    .subscribe(
        (response) => {
          this.cities = response.json().result.filter((city)=>city.country == countryName);
        },
        (error) => console.log(error)
    );
  
  
  }

  onSelectState(stateName) {
    console.log(stateName)
    this.companyProfileService.getAllCities()
    .subscribe(
        (response) => {
          this.cities = response.json().result.filter((city)=>city.state == stateName);
        },
        (error) => console.log(error)
    );
  
  }


onSubmit(f){


if(f.valid==false){

this.message = "Please enter the required information";

}

else

{

this.companyProfileService.updateCompany(this.company)

.subscribe(

(response) => {

console.log(response.json().message);
this.cls = "text-success";
this.message = "Information successfully updated";

},

(error) => console.log(error)

);

}

}



}