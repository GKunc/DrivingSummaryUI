import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SummaryCreatorComponent } from './summary-creator/summary-creator.component';
import { EmailSenderComponent } from './email-sender/email-sender.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    EmailSenderComponent,
    SummaryCreatorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: SummaryCreatorComponent },
      { path: 'summary-creator', component: SummaryCreatorComponent },
      { path: 'email-sender/:date', component: EmailSenderComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
