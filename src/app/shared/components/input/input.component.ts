import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements OnInit {
  @Input() placeholder: string = '';
  @Input() type?: 'text' | 'password' | 'email';
  @Input() control: string = '';
  @Input() label: string = '';
  @Input() formGroup!: FormGroup;
  @Input() isDisabled: boolean = false;

  ngOnInit(): void {
    this.formGroup.addControl(
      this.control,
      new FormControl('', Validators.required)
    );
  }
}
