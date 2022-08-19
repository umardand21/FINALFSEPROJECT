import { TestBed } from '@angular/core/testing';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[AuthenticationService]
    });
    service = TestBed.inject(AuthenticationService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });
  afterEach(() => {
    httpMock.verify();
  });
 
//Testing User Login.
it("Test User Login",()=>
{
  const dummyCredential:any={
    "username":"Amol","password":"Amol@1234"
};
  const dummyToken:any={
    "token":"dummytokenstringtestvalidation"
  };
service.getLogedIn(dummyCredential).subscribe(data=>{
  expect(data).toEqual(dummyToken);
})

const req = httpMock.expectOne(service._url+"auth/authenticate");
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(dummyCredential);

const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: dummyToken });
req.event(expectedResponse)
});


//Test get user details 
it("Testing get UserDetails",()=>
{
  const userDetails:any=
  { "name" : "Amol", "dateOfBirth" : "1999-07-24", "pan" : "AITPU1276B", "aadharNumber" : 266005303995, "pensionType" : "Family" }
  
  
  const responseData:any={
    "name": "Padmini",
    "dateOfBirth": "30/08/2000",
    "pan": "PCASD1234Q",
    "pensionType": "family",
    "pensionAmount": 24500.0
}

service.getPensionDetails(userDetails).subscribe(data=>{
  expect(data).toEqual(responseData);
})

const req = httpMock.expectOne(service._url+"process/PensionDetail");
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(userDetails);

const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: responseData });
req.event(expectedResponse)
});

//Testing Disbursement
it("Test Pension Disbursement",()=>
{
  const disbusrementInput:any=
  { "aadharNumber" : 266005303995, "pensionAmount": 24500.0}
  
  
  const disbursementStatus:any=
  {"pensionStatusCode":10}

service.disburse(disbusrementInput).subscribe(data=>{
  expect(data).toEqual(disbursementStatus);
})

const req = httpMock.expectOne(service._url+"process/ProcessPension");
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(disbusrementInput);

const expectedResponse = new HttpResponse({ status: 200, statusText: 'OK', body: disbursementStatus });
req.event(expectedResponse)
});
});