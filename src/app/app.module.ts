import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BlacklistDomainValidatorDirective, ForbiddenValidatorDirective } from './blacklist-domain-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    ForbiddenValidatorDirective,
    BlacklistDomainValidatorDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
