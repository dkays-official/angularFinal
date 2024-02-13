import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [InputComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, HttpClientModule],
  exports: [InputComponent],
  providers: [HttpService],
})
export class SharedModule {}
