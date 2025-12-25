import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // needed for routerLink in Navbar/Footer

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { EmergencyBannerComponent } from './emergency-banner/emergency-banner.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    EmergencyBannerComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [   // <-- THIS IS THE FIX
    NavbarComponent,
    FooterComponent,
    EmergencyBannerComponent
  ]
})
export class SharedModule { }
