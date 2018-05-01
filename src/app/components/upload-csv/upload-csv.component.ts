import { Component, OnInit } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { CompanyProfileService} from '../../services/company.profile.service';
import {Company} from '../../model/Company';
@Component({
  selector: 'app-upload-csv',
  templateUrl: './upload-csv.component.html',
  styleUrls: ['./upload-csv.component.css']
})
export class UploadCsvComponent implements OnInit {
  apiEndPoint = "http://localhost:8080/upload/csv";
  message="";
  loading=false;
  company: Company;
  filename: string;
  compid: string;
  cls;
  constructor(private http: Http,private companyProfileService: CompanyProfileService) { }

  ngOnInit() {
    this.companyProfileService.getLoggedCompany().subscribe(
      
      (compy) => {
        
        this.compid=compy.id;
    },
      (error) => {
        console.log(error);
      
      } 
      
      );
      
  }

  
  fileChange(event) {
    this.message="";
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData: FormData = new FormData();
      formData.append('uploadFile', file, file.name.replace(/[^A-Z0-9]+/ig, "")+".csv");
      let headers = new Headers();
      headers.append('Accept', 'application/json');

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser && currentUser.token) {
    headers.set ( 'Authorization', 'Bearer ' + currentUser.token );
     
   }

      this.filename=file.name.replace(/[^A-Z0-9]+/ig, "");      
      let options = new RequestOptions({ headers: headers });
      this.http.post(`${this.apiEndPoint}`, formData, options)
        .map(res => res.json())
        .catch(error => Observable.throw(error))
        .subscribe(
        data => {
          console.log(data);
            },
            error => {console.log(error)
        }
        );

       
    }
  }

  upload()
  {
    this.loading=true;
    setTimeout(()=>{
    this.loading = false;
    this.companyProfileService.createaccount(this.compid,this.filename).subscribe( 
      data => {
                  if(data.message=="Accounts Successfully created ")
                  {
                    this.message = "Accounts Successfully Created";
                    this.cls="text-success";
                  }
                  else
                  {
                    this.message= "There was some problem. Please check your data";
                    this.cls="text-danger";
                  }
               },
                 error => {
                  console.log(error)
                }
      
    );
    },500);
    
 
  }


}
