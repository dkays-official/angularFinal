import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit {
  @Input() placeholder : string = '';
  @Input() type?: 'text' | 'password' | 'email';
  @Input() control: string = '';
  @Input() label : string = '';
  @Input() loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm.addControl(this.control, new FormControl(''));
  }

}
