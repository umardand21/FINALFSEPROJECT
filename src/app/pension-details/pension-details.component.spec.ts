import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { PensionDetailsComponent } from './pension-details.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('PensionDetailsComponent', () => {
  let component: PensionDetailsComponent;
  let fixture: ComponentFixture<PensionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PensionDetailsComponent ],
      providers: [HttpClient,HttpHandler],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PensionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  //Testing what if Valid data is provided for verification

  it("test Pesnsion detail component with valid detail",()=>{
    let mockService: jasmine.SpyObj<AuthenticationService>;
     mockService = jasmine.createSpyObj('PensionServiceService', ['getPensionDetails']);
      mockService.getPensionDetails.and.returnValue(new Observable((data)=>{
        data.next({ "name" : "Amol", "dateOfBirth" : "1999-07-24", "pan" : "AITPU1276B", "aadharNumber" : 266005303995, "pensionType" : "Family" });
        data.complete();
      }));
      let comp=new PensionDetailsComponent(mockService);
      expect(comp.loader).toBeFalse();
      expect(comp.alert).toBeFalse();
      expect(comp.authFailed).toBeFalse();
      expect(comp.toggler).toBeTrue();
      comp.submitDetails();
      expect(comp.toggler).toBeFalse();
    })
  
    //Testing what if invalid data is provided for verification
  
    it("test Pesnsion detail component with invalid detail",()=>{
      let mockService: jasmine.SpyObj<AuthenticationService>;
       mockService = jasmine.createSpyObj('PensionServiceService', ['getPensionDetails']);
        mockService.getPensionDetails.and.returnValue(new Observable((data)=>{
          data.next({ "status":"NOT_FOUND" });
          data.complete();
        }));
        let comp=new PensionDetailsComponent(mockService);
        expect(comp.loader).toBeFalse();
        expect(comp.alert).toBeFalse();
        expect(comp.authFailed).toBeFalse();
        expect(comp.toggler).toBeTrue();
        comp.submitDetails();
        expect(comp.toggler).toBeTrue();
        expect(comp.alert).toBeTrue();
      })
    });
  
