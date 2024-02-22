import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TakeassignmentComponent } from './components/takeassignment/takeassignment.component';
import { QuestionnaireComponent } from './components/questionnaire/questionnaire.component';
import { HttpService } from '../shared/services/http.service';
import { SubquestionComponent } from './components/subquestion/subquestion.component';

@NgModule({
  declarations: [
    HomepageComponent,
    NavbarComponent,
    AssessmentComponent,
    TakeassignmentComponent,
    QuestionnaireComponent,
    SubquestionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [HttpService]
})
export class HomeModule {}
