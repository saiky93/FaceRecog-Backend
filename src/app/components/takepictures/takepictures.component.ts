import { Component, OnInit } from '@angular/core';
import {Company} from '../../model/Company';
import { EmployeeService} from '../../services/employee.service';
import { TrainingService }from '../../services/training.service';
import { Observable }     from 'rxjs/Observable';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-takepictures',
  templateUrl: './takepictures.component.html',
  styleUrls: ['./takepictures.component.css']
})
export class TakepicturesComponent implements OnInit {
  empId;
  message;
  loading;
  pictureTakenCheck;
  show=true;
  cls;
  constructor(private trainingService: TrainingService,private employeeService: EmployeeService,private _router:Router, private _http: Http) { }

  ngOnInit() {
    this.employeeService.getLoggedEmployee()
    .subscribe(
        ({data, currentUser}) => {
          this.empId=data.id;
          this.pictureTakenCheck = data.takenPicture;
        },
        (error) => console.log(error)
    );
  }

  trainmodel()
  {
    this.message="Loading..."
    this.loading=true;
    // setTimeout(()=>{
    this.loading = false;
    console.log(this.empId);
    if(this.pictureTakenCheck!=true)
    {  this.trainingService.training(this.empId).subscribe((training)=>{
      console.log(training);
      if(training.json().status=="generated")
      {
        this.message = "Pictures taken successfully";
        this.show=false;
        this.cls="text-success";
        this.employeeService.setTakenImage(this.empId).subscribe((emp)=>{
          console.log(emp);

        });
      }
      else
      {
        this.message= "There is some problem";
      }
    });
  }
  else
  {
    this.cls="text-danger";
    this.message="Pictures already taken."
  }
    
    
  }

  
  
}
