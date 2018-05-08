import { Component, OnInit } from '@angular/core';
import { SpeechService } from '../../services/speech.service';
import { Subscription } from 'rxjs/Subscription';
import { EmployeeService} from '../../services/employee.service';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {Company} from '../../model/Company';
@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css']
})
export class ReceptionistComponent implements OnInit {

  emps: string[];
  emps1: string[];
  end: string[];
  parsi: string[];
  empsSub: Subscription;
  emp1Sub: Subscription;
  endSub: Subscription;
  parsiSub: Subscription;
  errorsSub: Subscription;
  errorMsg:string;
  employeeId:number;
  employeeInfo: any;
  employeeData : any [];
  employeeEmail : any [];
  showEmployee: boolean;

  constructor(public speech: SpeechService, public employeeService: EmployeeService) {
    this.employeeInfo={
      email:''
    };

    this.showEmployee=true;
   }
   

  ngOnInit() {
    this.speech.init();
    this._listenEmps();
    this._listenEmps1();
    this._listenEnd();
    this._listenParsi();
    this._listenErrors();
  }

  get btnLabel(): string {
    return this.speech.listening ? 'Listening...' : 'Listen';
  }
  
  private _listenEmps(){
    this.empsSub = this.speech.words$
      .filter(obj => obj.type == 'emps')
      .map(empsObj => empsObj.word)
      .subscribe(
        emps => {
          this._setError();
          console.log('emps', emps);
          this.showEmployeeData(emps);
          //if he says 1.This variable will be initialized with id said by user
          var employeeIdFromSpeech;

          
          // this.showEmployeeEmail(emps);
          
        }
      );
  }

  private _listenEmps1() {
    this.emp1Sub = this.speech.words$
    .filter(obj => obj.type == 'emp1')
    .map(emp1Obj => emp1Obj.word)
    .subscribe(
      emp1 => {
        this._setError();
        console.log('emp1', emp1);
        this.showEmployeeInfo(emp1);
      
      }
    );
  }

  private _listenEnd() {
    this.endSub = this.speech.words$
    .filter(obj => obj.type == 'end')
    .map(emp1Obj => emp1Obj.word)
    .subscribe(
      end => {
        this._setError();
        console.log('end', end);
      }
    );
  }

  private _listenParsi() {
    this.parsiSub = this.speech.words$
    .filter(obj => obj.type == 'parsi')
    .map(emp1Obj => emp1Obj.word)
    .subscribe(
      parsi => {
        this._setError();
        console.log('parsi', parsi);
      }
    );
  }

  private _listenErrors() {
    this.errorsSub = this.speech.errors$
      .subscribe(err => this._setError(err));
  }

  private _setError(err?: any) {
    if (err) {
      console.log('Speech Recognition:', err);
      this.errorMsg = err.message;
    } else {
      this.errorMsg = null;
    }
  }

  ngOnDestroy() {
    this.empsSub.unsubscribe();
    this.emp1Sub.unsubscribe();
    this.endSub.unsubscribe();
    this.parsiSub.unsubscribe();
    this.errorsSub.unsubscribe();
  }

  showEmployeeData(employeeNameFromSpeech){
    this.employeeService.getEmployeesByFirstOrLastName(employeeNameFromSpeech).subscribe((data)=>{
      console.log(data);
      this.employeeData=data;
      this.showEmployee = false;
      
    });

  }

  showEmployeeInfo(employeeId){
    this.employeeService.getEmployeeEmail(employeeId).subscribe((data)=>{
      console.log(data);
      this.employeeInfo = data;
      this.showEmployee = true;

    })
  }

}
