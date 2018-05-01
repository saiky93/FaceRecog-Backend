//importing angular libraries
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';  //used for angular forms and ngmodel
import { HttpModule } from '@angular/http';   //used for http services get post etc.
import { RouterModule, Routes } from '@angular/router'; //used for routes

//importing components
import { AppComponent } from './app.component'; //this is the root component
import { HomeComponent } from './components/homecomponent/homecomponent.component'; //this is our homepage
import { LoginComponent } from './components/login/login.component'; //this is  login page and create new account option will be here
import {EmployeeProfileComponent} from './components/employeeProfile/employee.profile.component'; // this is employee profile page
import { AddEmployeeComponent } from './components/addEmployee/addemployee.component';// this is employee login page
import { CompanysignupComponent } from './components/companysignup/companysignup.component'; //this is company registration page
import { EqualValidator } from './components/companysignup/equal-validator.directive';
import { EmailexistsComponent } from './components/emailexists/emailexists.component';
import { CompanyProfileComponent } from './components/companyProfile/companyProfile.component'
import { ShowEmployeesComponent } from './components/show-employees/show-employees.component';
import { UpdatecompanyprofileComponent } from './components/updatecompanyprofile/updatecompanyprofile.component';
import { UpdateEmployeeInformationComponent } from './components/update-employee-information/update-employee-information.component';
import { UpdateEmployeeUserInformationComponent } from './components/update-employee-user-information/update-employee-user-information.component';
import { CompanyUpdateEmplpoyeeComponent } from './components/company-update-emplpoyee/company-update-emplpoyee.component';
import { Navbar1Component } from './components/navbar1/navbar1.component';
import { Navbar2Component } from './components/navbar2/navbar2.component';
import { Navbar3Component } from './components/navbar3/navbar3.component';
import { Navbar4Component } from './components/navbar4/navbar4.component';



//services created will go here
import { CompanyService } from './services/company.service';
import { EmployeeService } from './services/employee.service';
import { AddEmployeeService } from './services/addemployee.service';
import { CompanyProfileService } from './services/company.profile.service';
import { IsEmailExistsService } from './services/isemailexists.service';
import { DataService } from './services/data.service';
import { AuthenticationService } from './services/authentication.service';
import { TrainingService} from './services/training.service';
import { AuthGuardCompany } from './guards/auth.guard.company';
import { AuthGuardEmployee } from './guards/auth.guard.employee';
import { UploadCsvComponent } from './components/upload-csv/upload-csv.component';
import { TakepicturesComponent } from './components/takepictures/takepictures.component';

//router links - path is the /sublink. mention the component to load for a sublink under component
const appRoutes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'companyProfile', component:CompanyProfileComponent, canActivate: [AuthGuardCompany]},
  {path:'employeeProfile', component:EmployeeProfileComponent, canActivate: [AuthGuardEmployee]},
  {path:'csignup', component: CompanysignupComponent},
  {path:'checkemail', component: EmailexistsComponent},
  {path:'showEmployees', component: ShowEmployeesComponent, canActivate: [AuthGuardCompany]},
  {path:'addemployee', component: AddEmployeeComponent, canActivate: [AuthGuardCompany]},
  {path:'updatecompany', component:UpdatecompanyprofileComponent, canActivate: [AuthGuardCompany]},
  {path:'uploadcsv', component:UploadCsvComponent, canActivate: [AuthGuardCompany]},
  {path:'updateEmployeeInformation', component:UpdateEmployeeInformationComponent, canActivate: [AuthGuardEmployee]},
  {path:'updateEmployeeUserInformation', component:UpdateEmployeeUserInformationComponent, canActivate: [AuthGuardEmployee]},
  {path:'updateEmployeeFromCompany/:id', component:CompanyUpdateEmplpoyeeComponent,canActivate: [AuthGuardCompany]}, 
  {path:'takepictures', component: TakepicturesComponent,canActivate: [AuthGuardEmployee]} 
]
//components will go in declarations, services will go in providers, imported angular libraries will go in imports
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    EmployeeProfileComponent,
    CompanysignupComponent,
    EqualValidator,
    EmailexistsComponent,
    CompanyProfileComponent,
    ShowEmployeesComponent,
    AddEmployeeComponent,
    UpdatecompanyprofileComponent,
    UploadCsvComponent,
    UpdateEmployeeInformationComponent,
    UpdateEmployeeUserInformationComponent,
    CompanyUpdateEmplpoyeeComponent,
    TakepicturesComponent,
    Navbar1Component,
    Navbar2Component,
    Navbar3Component,
    Navbar4Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)

  ],
  providers: [TrainingService,CompanyService,EmployeeService,IsEmailExistsService,DataService,AuthGuardCompany,AuthGuardEmployee,AuthenticationService,CompanyProfileService,AddEmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
