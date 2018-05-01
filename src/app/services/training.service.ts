import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class TrainingService{

    constructor(private http:Http){
        
            }
            
training(id)
{
    
    return this.http.get('http://192.168.1.130:5000/takePictures/'+id);
}
}

    