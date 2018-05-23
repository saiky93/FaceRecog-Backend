import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SpeechService } from '../../services/speech.service';
import { WeatherService } from '../../services/weather.service';
import { TrainingService } from '../../services/training.service';
import {DomSanitizer} from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { EmployeeService} from '../../services/employee.service';
import {WebCamComponent } from 'ng2-webcam';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import {Company} from '../../model/Company';
import { IWindow } from './custom.window';
import 'tracking/build/tracking';
import 'tracking/build/data/face';

const global = <any>window;
declare var window: any;
declare var tracking: any;

@Component({
  selector: 'app-receptionist',
  templateUrl: './receptionist.component.html',
  styleUrls: ['./receptionist.component.css']
})
export class ReceptionistComponent implements OnInit {
  tracker:any;
  emps: string[];
  emps1: string[];
  end: string[];
  parsippany: string[];
  empsSub: Subscription;
  emp1Sub: Subscription;
  endSub: Subscription;
  parsiSub: Subscription;
  errorsSub: Subscription;
  errorMsg:string;
  employeeId:number;
  employeeInfo: any;
  captures: any[];
  trackIn:any;
  employeeData : any [];
  @ViewChild("video")
  public video: ElementRef;
  @ViewChild("canvas")
  public canvas: ElementRef;
  employeeEmail : any [];
  showEmployee: boolean;
  voices:any[];
  timer;
  public videosrc : any;
  FaceRecognitionBackend = "http://localhost:5000/";
  abc;
  hide:boolean;
  weatherString:string;
  detector:any;
  sendPhotoForFaceRecognition:any;
  counter;
  clock;
  counter1;
  clock1;
  constructor(public speech: SpeechService,public weather: WeatherService,public train: TrainingService, public employeeService: EmployeeService, private sanitizer:DomSanitizer, private element:ElementRef) {
    this.counter=0;
    this.counter1=0;
    this.employeeInfo={
      email:''
    };
   

    console.log(this.tracker);
    

    this.hide=true;
    this.captures=[];

    this.showEmployee=true;

    const {SpeechSynthesisUtterance}: IWindow = <IWindow>window;
    const {speechSynthesis}: IWindow = <IWindow>window;

    //this timer will run until we have list voices from speech api in the this.voices array
    this.timer = setInterval(()=>{
      this.getSpeechVoices();
    },200);

    this.clock = setInterval(()=>{
     this.counter = this.counter+1;
    },1000);

    this.clock1=setInterval(()=>{
      this.counter1=this.counter1+1;
    },1000);
   }


   say(utterence: string)
   {
    //method to be used for speech synthesis
    var abc = this.speech;
    var voiceGreeting = new SpeechSynthesisUtterance(utterence);
    voiceGreeting.voice=this.voices.filter(function(voice) { return voice.name == "Google UK English Female"; })[0];
    (<any>window).speechSynthesis.speak(voiceGreeting);
    voiceGreeting.onend =function(){
      abc.startListening();
    }
   }

 getSpeechVoices()
 {
   this.voices = (<any>window).speechSynthesis.getVoices();
   if(this.voices.length!==0)
   {
     console.log(this.voices);
     this.say("");//this will pre set say() function to be used later on
     clearInterval(this.timer);
    //  this.speech.abort();//THE say command below shall be moved to face detection function.
    // //  this.say("Welcome to Macrosoft. How May I help you? If you want me to call an employee, say employee followed by their first name or last name")
   }
   
 }
   

  ngOnInit() {
    this.speech.init();
    this._listenEmps();
    this._listenEmps1();
    this._listenEnd();
    this._listenParsippany();
    this._listenErrors();
    this.speech.abort();

  }
  public ngAfterViewInit() {
    setTimeout(()=>{
      this.faceTrack();

    },1000)
}

faceTrack()
{
  var ghadi=0;
  var ghadi1=0;
  var clock1 = setInterval(()=>{
    ghadi1=this.counter1;
    if(ghadi1==5)
    {
      this.counter1=0;
    }
  },1000);
  var clock = setInterval(()=>{
    ghadi=this.counter;
    if(ghadi==10)
    {
      this.counter=0;
    }
  },1000);
  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);
  var isVisitorWelcomed=0;
  var sendPhoto=1;
  var femvoice=this.voices;

  var imgser = this.train;
  var task = tracking.track(this.video.nativeElement, tracker,{camera:true});
  var speechRecogVariable = this.speech;
  var empname=this.employeeService;
  var fname;
  var lname;
  // var empspeech = new SpeechSynthesisUtterance("Welcome to Macrosoft. How may I help you? Do you want to know about Parsippany weather? if yes say weather parsippany.")
  // empspeech.voice=this.voices.filter(function(voice) { return voice.name == "Google UK English Female"; })[0];
  tracker.on('track', function(event) {
    if(event.data.length===0 && ghadi==10)
    {
      isVisitorWelcomed=0;
      ghadi=0;
    }
    if(ghadi1==5){
      ghadi1=0;
      sendPhoto=0;
    }
              var video = <HTMLCanvasElement>document.getElementById('video');
              var canvas =  <HTMLCanvasElement> document.getElementById('canvas');
              var context = canvas.getContext('2d');
              var snapshot = <HTMLCanvasElement> document.getElementById('snapshotCanvas');
              var snapshotContext = snapshot.getContext('2d');
              var trackimg = this.trackInfo;
              snapshotContext.drawImage(video, 0, 0, video.width, video.height);  
              var dataURI = snapshot.toDataURL('image/jpeg');  
              var dataFromjson;  
              context.clearRect(0, 0, canvas.width, canvas.height); 
              
              console.log(isVisitorWelcomed);
               event.data.forEach(function(rect) {
                 context.strokeStyle = '#a64ceb';
                 context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                 context.font = '11px Helvetica';
                 context.fillStyle = "#fff";
                 if(isVisitorWelcomed==0)
                 {
                   if(sendPhoto==0){
                  // setInterval(()=>{
                    imgser.prediction(dataURI).subscribe((data)=>{
                      console.log(data.json());
                      var imgback = data.json();
                      dataFromjson=data.json();
                      if(imgback.employeeId==-1){
                        task.stop();
                        var speechSynVariable = new SpeechSynthesisUtterance("Welcome to Macrosoft. How May I help you? If you want me to call an employee, say employee followed by their first name or last name");
                        speechSynVariable.voice=femvoice.filter(function(voice) { return voice.name == "Google UK English Female"; })[0];
                        (<any>window).speechSynthesis.speak(speechSynVariable);
                  
                      speechSynVariable.onend = function()
                      {
                        speechRecogVariable.startListening();

                      }
                      
                      }else{
                        empname.getById(dataFromjson.employeeId).subscribe((data)=>{
                          
                          console.log(data);
                          fname = data.firstName;
                          lname = data.lastName;
                          var empspeech = new SpeechSynthesisUtterance("Welcome "+fname+" "+lname+" How may I help you? Do you want to know about Parsippany weather? if yes say weather parsippany.");
                          empspeech.voice=femvoice.filter(function(voice) { return voice.name == "Google UK English Female"; })[0];
                          (<any>window).speechSynthesis.speak(empspeech);
                         
                    
                    empspeech.onend = function()
                    {
                     speechRecogVariable.startListening();
  
                    }
                        });
                        // as of now keep this

                      }
                    });

                  //   console.log("bhamchika");
                  // },60000);
                  // (<any>window).speechSynthesis.speak(speechSynVariable);
                  isVisitorWelcomed= isVisitorWelcomed+1;
                  sendPhoto=sendPhoto+1;
                  // speechSynVariable.onend = function()
                  // {
                  //   speechRecogVariable.startListening();

                  // }
                  
                 }}
              }); 
              
     });
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
          
          // this.speech.abort();
          this.say("Here are the employees i found having similar names. To inform an employee, say inform followed by their employee i d. If the employee you are looking for is not shown, please say employee followed by their first name or last name.");
          // this.say("If you did not find the employee that you are looking for in the table, say employee followed by their first name or last name.");
          // this.say("if you found the employee that you are looking for in the table, say inform followed by their employee id displayed in the table.")
          // this.speech.startListening();
          
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
        // this.speech.abort();
        this.say("I have informed to the employee and he will be there with you shortly. Thank you for coming to macrosoft and have a nice day.");
        //this.say("Thank you for coming to macrosoft and have a nice day.");
        // this.speech.startListening();
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

  private _listenParsippany() {
    this.parsiSub = this.speech.words$
    .filter(obj => obj.type == 'parsippany')
    .map(emp1Obj => emp1Obj.word)
    .subscribe(
      parsippany => {
        this._setError();
        console.log('parsi', parsippany);
        this.weather.parsiweather().
        subscribe((res)=>{
          var weatherData = null;
          weatherData = res.json();
          var conditions = weatherData.weather[0].description;
          var temperature = weatherData.main.temp;
          this.weatherString = "It is currently "+conditions+" with a temperature of "+temperature+" degree fahrenheit.";
          this.say(this.weatherString);
          console.log(this.weatherString);
        });
      }
    );
    // this.speech.startListening();
  }

  private _listenErrors() {
    this.errorsSub = this.speech.errors$
      .subscribe(err => this._setError(err));
      this.speech.startListening();
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

    });
  }

  showEmployeeFromTracking(dataURI){
    this.train.prediction(dataURI).subscribe((eid)=>{
      console.log(eid);
      this.trackIn = eid;
    });
  }
}
