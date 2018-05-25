import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class FaceRecognitionService {
  constructor(private httpClient: HttpClient) { }

  scanImage(subscriptionKey: string, base64Image: string) {
    const headers = this.getHeaders(subscriptionKey);
    const params = this.getParams();
    const blob = this.makeblob(base64Image);
    const url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";
    return this.httpClient.post(
      url,
      blob,
      {
        params,
        headers
      }
    );
  }

  createPersonGroup(subscriptionKey: string)
  {
    let headers = new HttpHeaders();
    let body = "{'name':'heifer-users','userData':'This value will be used to store information about the users account. It is just a string for the moment.'}";    
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Ocp-Apim-Subscription-Key', subscriptionKey);    
    const url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/";
    return this.httpClient.put(url+'testg',body,{headers});
  }

  createPerson(subscriptionKey: string)
  {
    let headers = new HttpHeaders();
    headers= headers.set('Content-Type', 'application/json');
    headers= headers.set('Ocp-Apim-Subscription-Key', subscriptionKey); 
    let body = "{'name':'Sai'}"; //8a3a2298-fcfb-465e-8ee9-99b55cfa2724   //sai cd2e32ae-cc16-4e57-a843-9f9917dd022a
    const url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/testg/persons"
    return this.httpClient.post(url,body,{headers});
  }

  addFaceToPerson(subscriptionKey:string)
  {
    let headers = new HttpHeaders();
    headers= headers.set('Content-Type', 'application/json');
    headers= headers.set('Ocp-Apim-Subscription-Key', subscriptionKey);
    const url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/testg/persons/cd2e32ae-cc16-4e57-a843-9f9917dd022a/persistedFaces"
    let body = "{'url':'https://imageshack.com/a/img924/589/qQx2bI.jpg'}";
    return this.httpClient.post(url,body,{headers});
  }

  trainPersonGroup(subscriptionKey: string)
  {
    let headers = new HttpHeaders();
    headers= headers.set('Content-Type', 'application/json');
    headers= headers.set('Ocp-Apim-Subscription-Key', subscriptionKey);
    const url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/testg/train";
    return this.httpClient.post(url,null,{headers});
  }

  identifyPerson(subscriptionKey:string,faceId: string)
  {
    let headers = new HttpHeaders();
    headers= headers.set('Content-Type', 'application/json');
    headers= headers.set('Ocp-Apim-Subscription-Key', subscriptionKey);
    const url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/identify";
    let body ="{'personGroupId': 'macrosoftemployee','faceIds': ['"+faceId+"'],'maxNumOfCandidatesReturned': '1'}"
    return this.httpClient.post(url,body,{headers});
  }

  getNameFromPersonId(subscriptionKey: string,personId:string)
  {
    const url = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/persongroups/macrosoftemployee/persons/"+personId;
    let headers = new HttpHeaders();
    headers= headers.set('Content-Type', 'application/json');
    headers= headers.set('Ocp-Apim-Subscription-Key', subscriptionKey);
    return this.httpClient.get(url,{headers});
  }

  private makeblob(dataURL) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

  private getHeaders(subscriptionKey: string) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/octet-stream');
    headers = headers.set('Ocp-Apim-Subscription-Key', subscriptionKey);

    return headers;
  }

  private getParams() {
    const httpParams = new HttpParams()
      .set('returnFaceId', 'true')
      .set('returnFaceLandmarks', 'false')
      .set(
        'returnFaceAttributes',
        'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
      );

    return httpParams;
  }
}
