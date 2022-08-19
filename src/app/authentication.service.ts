import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 public _url = "http://localhost:8090/"
 //private baseUrl="http://localhost:8081/";
 private baseUrl="http://13.233.31.11/:8081/";
 public _processurl = 'http://localhost:8084/';
 constructor(private httpClient: HttpClient) { //}
  //loginUser(users:Users):Observable<object>{
   // console.log(users)
    //return this.httpClient.post(`${this.baseUrl}`,users);
    console.log('inside book');}
  

  //service method for login
  getLogedIn(credential: any) {
    return this.httpClient.post<any>(
      this.baseUrl + 'auth/authenticate',
      credential
    );
  }

  
  //service method for pension Detail Validation
  getPensionDetails(data: any) {
    console.log('successfully pension details');
    //getting token from session
    const token = sessionStorage.getItem('token');

    //passing token to header
    const header = token ? { Authorization: `Bearer ${token}` } : undefined;
    console.log('toekn is added');
    //http request for login
    return this.httpClient.post<any>(
      this._processurl + 'process/PensionDetail',
      {
        name: data.name,
        dateOfBirth: data.dateOfBirth,
        pan: data.pan.toUpperCase(),
        aadharNumber: Number(data.aadharNumber),
        pensionType: data.pensionType,
      },
      {
        headers: header,
      }
    );
  }

  
  //service Method for Pension Disbursement.
  disburse(data: any) {
    console.log("inside process");
    //getting token from session
    const token = sessionStorage.getItem('token');

    //passing token to header
    const header = token ? { Authorization: `Bearer ${token}` } : undefined;

    //http reuest for pension Deisbursement
    return this.httpClient.post<any>(
      this._processurl + 'process/ProcessPension',
      data,
      {
        headers: header,
      }
    );
  }


}
