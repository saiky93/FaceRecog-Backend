import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';


import { AuthenticationService } from '../../services/authentication.service';

import { Company } from '../../model/Company';

@Component({

moduleId: module.id,

templateUrl: 'login.component.html'

})


export class LoginComponent implements OnInit {

loading = false;

returnUrl: string;

company: Company;

showMessage=true;

constructor(

private route: ActivatedRoute,

private router: Router,

private authenticationService: AuthenticationService

) { }


ngOnInit() {

// reset login status

this.authenticationService.logout();


// get return url from route parameters or default to '/'

this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';



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

employee: {

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

}


login() {

this.loading = true;

this.authenticationService.login(this.company.user.email, this.company.user.password)

.subscribe(

data => {


let currentUser = JSON.parse(localStorage.getItem('currentUser'));


if(currentUser.user.userType == 'COMPANY'){

this.router.navigate(['companyProfile']);

}else if(currentUser.user.userType == 'EMPLOYEE'){

this.router.navigate(['employeeProfile']);

}

this.showMessage=this.authenticationService.showMes;


},

error => {

this.loading = false;

this.showMessage=this.authenticationService.showMes;


});

}

}