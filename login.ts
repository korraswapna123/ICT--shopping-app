import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      alert('Please enter username and password');
      return;
    }

    alert('Login successful ✅');

    // Navigate to shopping dashboard
    this.router.navigate(['/dashboard']);
  }
}
