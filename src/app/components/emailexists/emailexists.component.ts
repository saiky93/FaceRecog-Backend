import { Component } from '@angular/core';
import { IsEmailExistsService } from '../../services/isemailexists.service';
import {DataService} from '../../services/data.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-emailexists',
  templateUrl: './emailexists.component.html',
  styleUrls: ['./emailexists.component.css']
})
export class EmailexistsComponent {
  constructor(private isemailexists: IsEmailExistsService,private _router:Router, public dataService : DataService) { }
  
  checkemail =
    {
      email: "",
    };
 
    jsonemail = "";
    message:string;
    bootclass:string;
    check;
    show = true;
    shoo= true;
    shoo1=true;
    variable=true;
    cls;

   onSubmit(semail: string)
   {
     if(semail != "")
     {
    this.bootclass = "text-primary";
    this.variable=false;
    this.dataService.dataFromService = semail;
    localStorage.setItem('checkEmail',semail);
    this.show = false;
    this.checkemail.email=semail;
    this.isemailexists.isEmailExists(this.checkemail).subscribe(
      (response) => {
        console.log(response.json().result);
        this.jsonemail=JSON.stringify(response.json().result);
        if (this.jsonemail=="null")
        {
          this.cls="text-success";
          this.message = "The Email does not exist click here to register.";
          //this._router.navigate(['csignup']);
          this.check = 1;
        }
        else
        { this.cls="text-danger";
          this.message = "The email already exists in the system.";
          this.check = 2;
          //this._router.navigate(['login']);
        }

        if(this.check == 1)
        {
          this.shoo = false;
          this.shoo1=true;

        }
        else
        { this.shoo=true;
          this.shoo1 = false;
        }
      },
      (error) => console.log(error)
      
    );
      }else{
        this.message = "The email cannot be empty."
        this.show = true;
        this.bootclass = "text-danger";
      }
    }

  
}
