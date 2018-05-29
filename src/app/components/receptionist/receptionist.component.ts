import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { SpeechService } from '../../services/speech.service';
import { WeatherService } from '../../services/weather.service';
import { TrainingService } from '../../services/training.service';
import { FaceRecognitionService } from '../../services/face-recognition.service';
import {DomSanitizer} from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { EmployeeService} from '../../services/employee.service';
import {WebCamComponent } from 'ng2-webcam';
import 'rxjs/add/operator/filter';
import { CookieService } from 'angular2-cookie/core';
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
  subscriptionKey:string;
  trackIn:any;
  employeeData : any [];
  @ViewChild("video")
  public video: ElementRef;
  @ViewChild("canvas")
  public canvas: ElementRef;
  employeeEmail : any [];
  showEmployee: boolean;
  showEmail:boolean;

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
  constructor(public speech: SpeechService,public cookie:CookieService,public weather: WeatherService,public facerecog: FaceRecognitionService,public train: TrainingService, public employeeService: EmployeeService, private sanitizer:DomSanitizer, private element:ElementRef) {
    this.counter=0;
    this.subscriptionKey="f803eda1b99f4b638572e5d875829940";
    this.counter1=0;
    this.employeeInfo={
      email:''
    };
    this.timer = setInterval(()=>{
      this.getSpeechVoices();
    },200);

    console.log(this.tracker);
    

    this.hide=true;
    this.captures=[];

    this.showEmployee=true;
    this.showEmail=true;

    const {SpeechSynthesisUtterance}: IWindow = <IWindow>window;
    const {speechSynthesis}: IWindow = <IWindow>window;
  }

   say(utterence: string)
   {
    //method to be used for speech synthesis
    var voiceGreeting = new SpeechSynthesisUtterance(utterence);
    voiceGreeting.voice=this.voices.filter(function(voice) { return voice.name == "Google UK English Female"; })[0];
    (<any>window).speechSynthesis.speak(voiceGreeting);
   }

 getSpeechVoices()
 {
   this.voices = (<any>window).speechSynthesis.getVoices();
   if(this.voices.length!==0)
   {
     console.log(this.voices);
     this.say("");//this will pre set say() function to be used later on
     clearInterval(this.timer);
   }
   
 }
   

  ngOnInit() {
    this.speech.init();
    this._listenEmps();
    this._listenEmps1();
    this._listenEnd();
    this._listenParsippany();
    this._listenErrors();

  }
  public ngAfterViewInit() {
    setTimeout(()=>{
      this.faceTrack();

    },1000)
}

faceTrack()
{
  var sendFaceForFaceRecog:boolean = false;
 
  setInterval(()=>{
  sendFaceForFaceRecog=true;
 },8000);

  var tracker = new tracking.ObjectTracker('face');
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1); 
  var task = tracking.track(this.video.nativeElement, tracker,{camera:true});
  var speechRecogVariable = this.speech;
  var empdata = this.employeeService;
  var noPersonSpeech = this.speech;
  var empname=this.employeeService;
  var voice = this.voices;
  var sessionStarted =0;
 var faceRecogSer = this.facerecog;
 var subKey = this.subscriptionKey;
 var faceId;
 var personId;
 var cookieSer = this.cookie;
 cookieSer.removeAll();
  tracker.on('track', function(event) {
              var video = <HTMLCanvasElement>document.getElementById('video');
              var canvas =  <HTMLCanvasElement> document.getElementById('canvas');
              var context = canvas.getContext('2d');
              var snapshot = <HTMLCanvasElement> document.getElementById('snapshotCanvas');
              var snapshotContext = snapshot.getContext('2d');
              var trackimg = this.trackInfo;
              snapshotContext.drawImage(video, 0, 0, video.width, video.height);  
              context.clearRect(0, 0, canvas.width, canvas.height); 
              
               event.data.forEach(function(rect) {
                 context.strokeStyle = '#a64ceb';
                 context.strokeRect(rect.x, rect.y, rect.width, rect.height);
                 context.font = '11px Helvetica';
                 context.fillStyle = "#fff";
              }); 

              if(event.data.length!==0 && sendFaceForFaceRecog==true)
              {
                speechRecogVariable.abort();
                var dataURI = snapshot.toDataURL('image/jpeg');  
                faceRecogSer.scanImage(subKey,dataURI).subscribe((data:any)=>{
                  faceId = data[0].faceId;
                 
                   
                faceRecogSer.identifyPerson(subKey,faceId).subscribe((data:any)=>{
                  console.log(data);
                  if(data[0].candidates.length>0)
                  {
                  personId = data[0].candidates[0].personId;
                  }
                  else
                  {
                    personId = null;
                    cookieSer.remove("recPersonId");
                  }
                  if(personId!=null)
                  {
                    if(!cookieSer.get("recPersonId"))
                    {
                      cookieSer.put("recPersonId",personId);
                      faceRecogSer.getNameFromPersonId(subKey,personId).subscribe((data:any)=>{
                      var personName = data.name;
                      var personData = data.userData;
                      console.log(data.name);
                      console.log(personData);
                      empdata.getById(personData).subscribe((data)=>{
                        console.log(data);
                        var empinf = data;
                        var name = "Welcome "+empinf.firstName +" "+empinf.lastName
                        document.getElementById("emName").textContent=name; 
                      });
                      var empspeech = new SpeechSynthesisUtterance("Welcome "+personName+".How may I help you? Do you want to know about Parsippany weather? if yes say weather parsippany.")
                      empspeech.voice=voice.filter(function(voice) { return voice.name == "Google UK English Female"; })[0];
                      (<any>window).speechSynthesis.speak(empspeech);
                      setTimeout(()=>{
                        console.log("started listening now");
                        speechRecogVariable.startListening();
                      },8500);  
                    });

                      console.log("put first one");
                    }

                    if(cookieSer.get("recPersonId")!==personId.toString())
                    {
                      // speechRecogVariable.abort();
                      faceRecogSer.getNameFromPersonId(subKey,personId).subscribe((data:any)=>{
                        var personName = data.name;
                        var personData = data.userData;
                        
                        console.log(data.name);
                        console.log(personData);
                        empdata.getById(personData).subscribe((data)=>{
                        console.log(data);
                        var empinf = data;
                        var name = "Welcome "+empinf.firstName +" "+empinf.lastName
                        document.getElementById("emName").textContent=name; 
                      });
                        var empspeech = new SpeechSynthesisUtterance("Welcome "+personName+".How may I help you? Do you want to know about Parsippany weather? if yes say weather parsippany.")
                      empspeech.voice=voice.filter(function(voice) { return voice.name == "Google UK English Female"; })[0];
                      (<any>window).speechSynthesis.speak(empspeech);
                      setTimeout(()=>{
                        console.log("started listening now");
                        speechRecogVariable.startListening();
                      },8500);
                        });
                        cookieSer.put("recPersonId",personId);
                    }
                  }
                  else
                  {
                    if(sessionStarted==0)
                    {
                      // speechRecogVariable.abort();
                      sessionStarted=sessionStarted+1;
                    var empspeech = new SpeechSynthesisUtterance("Welcome to Macrosoft, How may I help you, If you want me to call an employee say employee followed by their first name or last name")
                      empspeech.voice=voice.filter(function(voice) { return voice.name == "Google UK English Female"; })[0];
                      (<any>window).speechSynthesis.speak(empspeech);
                      setTimeout(()=>{
                        console.log("started listening now");
                        speechRecogVariable.startListening();
                      },8500);
                    }
                  }
                });
                });
              }
              else if(event.data.length==0)
              {
                sessionStarted=0;
                document.getElementById("emName").textContent="";
                // speechRecogVariable.abort();
              }
             sendFaceForFaceRecog = false; 
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
          this.say("Here are the employees i found having similar names. To inform an employee, say inform followed by their employee i d. If the employee you are looking for is not shown, please say employee followed by their first name or last name.");
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
        this.say("I have informed to the employee and he will be there with you shortly. Thank you for coming to macrosoft and have a nice day.");
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
      document.getElementById("emName").textContent="";
      this.showEmail = true;
    });

  }

  showEmployeeInfo(employeeId){
    this.employeeService.getEmployeeEmail(employeeId).subscribe((data)=>{
      console.log(data);
      this.employeeInfo = data;
      this.showEmployee = true;
      this.showEmail = false;
    });
  }

  showEmployeeFromTracking(dataURI){
    this.train.prediction(dataURI).subscribe((eid)=>{
      console.log(eid);
      this.trackIn = eid;
    });
  }
}
