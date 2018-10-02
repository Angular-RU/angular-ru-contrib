import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NgZone } from '@angular/core';

import { AppComponent } from './app.component';

import { OutsideZone, RunOutsideAngular } from '../../dist/core'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    OutsideZone.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    this.test()
  }
  @RunOutsideAngular()
  test() {
    console.log(NgZone.isInAngularZone())
  }
}
