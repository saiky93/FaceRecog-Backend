import { Component, OnInit } from '@angular/core';
import { Company } from '../../model/company';
import { EmployeeService} from '../../services/employee.service'
import {Router} from '@angular/router';
import { AuthenticationService} from '../../services/authentication.service';
import { Observable }     from 'rxjs/Observable';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-employeeProfile',
  templateUrl: './employee.profile.component.html',
  styleUrls: ['./employee.profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  private apiBaseUrl = 'http://localhost:8080'; 
  headers: Headers = new Headers();
  employee: Company;
  message: string;
  employeeId: string;
  picture: string;
  url:string;
  saveImage:boolean;
  uploaded: boolean;
  constructor(private employeeService: EmployeeService, private sanitizer: DomSanitizer, private _router:Router, private _http: Http, private authen: AuthenticationService) { }

  ngOnInit() {
    this.saveImage = false;
    this.uploaded = false;
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
        sSN: '',
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
    this.url=this.apiBaseUrl+"/images/";
    //this.picture = "http://localhost:8080/images/"+this.employee.employee.picture;
//console.log(localStorage.getItem('currentUser'));
   
    this.employeeService.getLoggedEmployee().subscribe(
            ({data,currentUser}) => {
              this.employee.employee=data,
              this.employeeId = currentUser.user.employee;
              
              this.picture = this.url+data.picture;
              (error) => console.log(error)
            } 
          );

    this.employeeService.getUserInfo()
          .subscribe(
              (user) => {
        
                this.employee.user = user;
              },
              (error) => console.log(error)
          );
        
      
        }

    logout()
    {
      this.authen.logout();
      
    }

    // photoUrl(){
    //   //return this.employee.employee.picture;
    //   console.log(this.picture);
      
    //   this.picture = this.sanitizer.bypassSecurityTrustUrl(this.employee.employee.picture);
    // };
  /**
   * Handles the change event of the input tag,
   * Extracts the image file uploaded and 
   * makes an Http request with the image file.
   */ 
  handleInputChange (event) {
    
    var image = event.target.files[0];

    var pattern = /image-*/;
    var reader = new FileReader();

    if (!image.type.match(pattern)) {
        console.error('File is not an image');
        //of course you can show an alert message here
        return;
    }
    
    let endPoint = '/upload/image/'+this.employeeId; //use your own API endpoint
    let headers = new Headers();
    //headers.set('Content-Type', 'application/octet-stream');
    headers.set('Upload-Content-Type', image.type)
    
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
     if (currentUser && currentUser.token) {
     headers.set ( 'Authorization', 'Bearer ' + currentUser.token );
      
    }

    this.makeRequest(endPoint, 'POST', image, headers).subscribe(
          response  => {this.handleSuccess(response); },
          error =>  {this.handleError(error); }
        );

  }
  
  /**
   * Makes the HTTP request and returns an Observable
   */
  private makeRequest (endPoint: string,
                        method: string, body = null,
                        headers: Headers = new Headers()): Observable<any>
  {
      let url = this.apiBaseUrl + endPoint;
      this.headers = headers;
      if (method == 'GET') {
          let options = new RequestOptions({ headers: this.headers });
          return this._http.get(url, options)
                          .map(this.extractData)
                          .catch(this.extractError);
      } else if (method == 'POST') {
          let options = new RequestOptions({ headers: this.headers });
          return this._http.post(url, body, options)
                          .map(this.extractData)
                          .catch(this.extractError);
      }
  }
  
  /**
   * Extracts the response from the API response.
   */ 
  private extractData (res: Response) {
        let body = res.json();
        return body.result || body || { };
    }
    
  private extractError (res: Response) {
        let errMsg = 'Error received from the API';
        return errMsg;
    }
  
  private handleSuccess(response) {
    console.log(JSON.stringify(response));
    //this.ngOnInit()
    window.location.reload(); 
    //window.location.reload(); 
  }
  
  private handleError(errror) {
    console.error('Error uploading image')
    //provide your own implementation of displaying the error message
  }
  uploadImageOnPage($event) : void {
    this.readThis($event.target);
  }
  
  readThis(inputValue: any): void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
  
    myReader.onloadend = (e) => {
    
      this.picture = myReader.result;;
    this.saveImage = true;
    }
    myReader.readAsDataURL(file);
  }

  UploadImage(){
    //Here we upload the image to the database.
    this.employeeService. UploadEmployeeImage(this.employeeId, this.picture)
    .subscribe(
        (response) => {
  
          //this.employee.user = user;
          this.saveImage=false;
          this.uploaded = true;
        },
        (error) =>{
          console.log(error);
        } 
    );
  

  
    
  }

}


