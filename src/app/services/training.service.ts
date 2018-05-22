import { Injectable } from '@angular/core';
import { Http, Response,RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import { ContentType, ResponseType } from '@angular/http/src/enums';

@Injectable()
export class TrainingService{

    constructor(private http:Http){
        
            }
            
training(id)
{
    
    return this.http.get('http://127.0.0.1:5000/takePictures/'+id);
}

prediction(dataURI){
    let bodyString = JSON.stringify({imguri: dataURI})
    console.log(bodyString);
    let headers = new Headers({'Content-Type':'application/json; charset=utf-8' , 'DataType':'json'});
    let options = new RequestOptions({headers:headers});
    return this.http.post('http://127.0.0.1:5000/predict',bodyString,options);
}
}

    