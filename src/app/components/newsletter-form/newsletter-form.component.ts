import { Component, OnInit, signal } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NewsletterService } from '../../service/newsletter.service';
import { BtnPrimaryComponent } from '../btn-primary/btn-primary.component';

@Component({
  selector: 'newsletter-form',
  standalone: true,
  imports: [
    BtnPrimaryComponent,
    ReactiveFormsModule
  ],
  providers: [NewsletterService],
  templateUrl: './newsletter-form.component.html',
  styleUrl: './newsletter-form.component.scss',
})
export class NewsletterFormComponent implements OnInit {
  form!: FormGroup;
  loading = signal(false);

  constructor(
    private formBuilder: FormBuilder,
    private service: NewsletterService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.loading.set(true);
    if (this.form.valid) {
      this.service
        .sendData(this.form.value.name, this.form.value.email)
        .subscribe({
          next: () => {
            this.form.reset();
            this.loading.set(false);
          },
        });
    }
  }
}
