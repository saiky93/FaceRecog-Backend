import { Component, OnInit } from '@angular/core';
import { Company } from '../../model/company';
import { CompanyProfileService} from '../../services/company.profile.service'
import {Router} from '@angular/router';
import { AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-companyProfile',
  templateUrl: './companyProfile.component.html',
  styleUrls: ['./companyProfile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  company: Company;
  message: string;
  compId: string;

  constructor(private companyProfileService: CompanyProfileService, private _router:Router, private authen: AuthenticationService) {

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
console.log(localStorage.getItem('currentUser'));
   //this.compId=this.companyProfileService.getLoggedId();
    this.companyProfileService.getLoggedCompany().subscribe(
    
    (compy) => {this.company=compy,
    
    console.log(this.company),
    
    (error) => console.log(error)
    
    } 
    
    );
    
    }

    logout()
    {
      this.authen.logout();
      
    }
}


