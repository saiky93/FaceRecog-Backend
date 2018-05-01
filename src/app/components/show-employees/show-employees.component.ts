import { Component, OnInit } from '@angular/core';

import { Company } from '../../model/Company';

import { CompanyProfileService } from '../../services/company.profile.service';

import { Router } from '@angular/router';

@Component({

selector: 'app-show-employees',

templateUrl: './show-employees.component.html',

styleUrls: ['./show-employees.component.css']

})

export class ShowEmployeesComponent implements OnInit {



constructor(private companyProfileService: CompanyProfileService,private router: Router) { }



employee: Company;

employees: Company[];

em:Company;

ngOnInit() {

this.employee ={

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

companyId: "",

picture: '',

position: '',

phone: ''

}




}


this.companyProfileService.showEmployees().subscribe(

(employ : any[]) => {this.employees=employ,

console.log(this.employees),

(error) => console.log(error)

}

);


}

deleteUser(id)
{if(confirm("Are you sure to delete the employee? "))
{
    this.companyProfileService.deleteUser(id).subscribe(()=>{this.showEmployees();});
}
}


showEmployees()
{
    this.companyProfileService.showEmployees().subscribe(
        
        (employ : any[]) => {this.employees=employ,
        
        console.log(this.employees),
        
        (error) => console.log(error)
        
        }
        
        );
}

updateUser(id)
{
    this.router.navigate(['updateEmployeeFromCompany/'+id]);
}
}


