import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ContactComponent } from './contact/contact.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    HomeComponent,
    ServicesComponent,
    HowItWorksComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
     SharedModule
  ]
})
export class PublicModule { }
