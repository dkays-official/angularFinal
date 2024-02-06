import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TakeassignmentComponent } from './components/takeassignment/takeassignment.component';
import { QuestionaireComponent } from './components/questionaire/questionaire.component';

@NgModule({
  declarations: [  
    HomepageComponent,
    NavbarComponent,
    AssessmentComponent,
    TakeassignmentComponent,
    QuestionaireComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class HomeModule { 
}
