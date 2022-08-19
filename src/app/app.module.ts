import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { PensionDetailsComponent } from './pension-details/pension-details.component';
import { PensionDisbursementComponent } from './pension-disbursement/pension-disbursement.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ErrorComponent,
    PensionDetailsComponent,
    PensionDisbursementComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
