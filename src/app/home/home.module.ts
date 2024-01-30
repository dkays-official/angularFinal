import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AssessmentComponent } from './components/assessment/assessment.component';

@NgModule({
  declarations: [  
    HomepageComponent,
    NavbarComponent,
    AssessmentComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class HomeModule { }
