import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';   // ✅ ADD THIS

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule   // ✅ ADD THIS
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent implements OnInit {

  fullName = '';
  username = '';
  password = '';
  dob = '';
  area = '';
  agree = false;

  captcha = '';
  captchaInput = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.generateCaptcha();
  }

  generateCaptcha() {
    this.captcha = Math.floor(1000 + Math.random() * 9000).toString();
    this.captchaInput = '';
  }

  submitForm() {
    if (!this.fullName || !this.username || !this.password) {
      alert('Please fill all required fields');
      return;
    }

    if (!this.agree) {
      alert('Please accept Terms & Conditions');
      return;
    }

    if (this.captchaInput !== this.captcha) {
      alert('Invalid captcha');
      this.generateCaptcha();
      return;
    }

    alert('Registration successful ✅');
    this.router.navigate(['/login']);
  }
}
