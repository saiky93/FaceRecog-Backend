import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class WeatherService {

  constructor(private http:Http) { }

  parsiweather(){
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=Parsippany&units=imperial&APPID=77551c1e6cafce85e4831a926629c894');
  }
}
