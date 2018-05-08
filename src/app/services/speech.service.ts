import { Injectable,NgZone } from '@angular/core';
import { Subject } from 'rxjs/Subject';

declare var annyang: any;

@Injectable()
export class SpeechService {

  words$ = new Subject<{[key: string]: string}>();
  errors$ = new Subject<{[key: string]: any}>();

  listening = false;

  constructor(private zone: NgZone) { }

  get speechSupported(): boolean {
    return !!annyang;
  }

init(){

  const commands = {

    'employee :emps': (emps) => {
      this.zone.run(() => {
        this.words$.next({type: 'emps', 'word': emps});
        console.log("emps "+ emps);
      });
    },

    'inform :emp1': (emp1) => {
      this.zone.run(() => {
        this.words$.next({type: 'emp1', 'word': emp1});
        console.log("emp1");
      });
    },

    'weather :parsippany': (parsippany) => {
      this.zone.run(() => {
        this.words$.next({type: 'parsippany', 'word': parsippany});
        console.log("parsi");
      });
    }
  };
  annyang.addCommands(commands);

  annyang.addCallback('errorNetwork', (err) => {
    this._handleError('network', 'A network error occurred.', err);
  });
  annyang.addCallback('errorPermissionBlocked', (err) => {
    this._handleError('blocked', 'Browser blocked microphone permissions.', err);
  });
  annyang.addCallback('errorPermissionDenied', (err) => {
    this._handleError('denied', 'User denied microphone permissions.', err);
  });
  annyang.addCallback('resultNoMatch', (userSaid) => {
    this._handleError(
      'no match',
      'Spoken command not recognized',
      { results: userSaid });
  });
}

private _handleError(error, msg, errObj) {
  this.zone.run(() => {
    this.errors$.next({
      error: error,
      message: msg,
      obj: errObj
    });
  });
}

startListening() {
  annyang.start();
  this.listening = true;
}

abort() {
  annyang.abort();
  this.listening = false;
}
}
