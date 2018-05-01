import { Component, OnInit } from '@angular/core';
import {CompanyProfileService} from '../../services/company.profile.service';
import {Employee} from '../../model/Employee';
import { Company } from '../../model/company';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-company-update-emplpoyee',
  templateUrl: './company-update-emplpoyee.component.html',
  styleUrls: ['./company-update-emplpoyee.component.css']
})
export class CompanyUpdateEmplpoyeeComponent implements OnInit {

  retrievedId;
  
  employee: Company;
  countries: {};
  states: {};
  cities: {};
  message: string;
  cls:any;
  pictureWithoutUrl: string;
  pictureWithUrl: string;
  
  constructor(private companyProfileService: CompanyProfileService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.retrievedId=this.route.snapshot.params['id'];
    
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
        companyId: '1',
        picture: '',
        position: '',
        phone: ''

      }
       
      
  
  }

    
   this.companyProfileService.getEmployeeByPassedId(this.retrievedId).subscribe((empy)=> {
  
    
    this.employee.employee=empy;
     this.pictureWithUrl ="http://localhost:8080/images/"+empy.picture;
     console.log(this.employee.employee.picture);
     
   },(error) => console.log(error)
  );

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
         //this.states = response.json().result.filter((state)=>state.country == this.employee.employee.country);
         
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
  
    this.companyProfileService.getAllCities()
    .subscribe(
        (response) => {
          this.cities = response.json().result.filter((city)=>city.state == stateName);
        },
        (error) => console.log(error)
    );
  
  }
  UploadImage($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
    this.employee.employee.picture = myReader.result;
    this.pictureWithUrl = "";
  
    
    }
    myReader.readAsDataURL(file);
  }

  onSubmit(f){
    
        if(f.valid==false){
          this.cls="text-danger";
          this.message = "Please enter the required information"
        }
        else
        {
          console.log(this.employee.employee);
         this.companyProfileService.updateUser(this.retrievedId,this.employee.employee)
          .subscribe(
             (response) => {
               console.log(response);
               if(response.responseCode=="OK"){
                 this.cls="text-success";
                this.message= "Successfully Updated";  
                
                
               }else
               {
                 this.cls="text-danger";
                this.message= "Employee doesnt exist";  
                
    
               }
             },
             (error) => console.log(error)
         );
      }
      }

}
