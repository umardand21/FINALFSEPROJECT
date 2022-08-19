import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthenticationService } from '../authentication.service';

import { LoginComponent } from './login.component';
import { Observable } from 'rxjs';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("Loader and Alert test",()=>{
    let mockService: jasmine.SpyObj<AuthenticationService>;
    mockService = jasmine.createSpyObj('PensionServiceService', ['getLogedIn']);
     mockService.getLogedIn.and.returnValue(new Observable((data)=>{
       data.next({"status":"NotFound"});
       data.complete();
     }));
     const comp=new LoginComponent(mockService);
     expect(comp.loader).toBeFalse();
     expect(comp.alert).toBeFalse();
     comp.userLogin()
     expect(comp.alert).toBeTrue();
 
   })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
