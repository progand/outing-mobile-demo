import { screen } from "tns-core-modules/platform";
import { Page } from "ui/page";
import { Component, ElementRef, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "../../shared/auth/auth.service";
const emailValidator = require("email-validator");

@Component({
  selector: "login",
  moduleId: __filename,
  templateUrl: "./login.html",
  styleUrls: ["./login-common.css", "./login.css"],
  providers: []
})
export class LoginComponent implements OnInit {
  email: String = '';
  password: String = '';
  isError = false;
  inProgress = false;
  isAuthenticated = false;

  constructor(private authService: AuthService, private page: Page, private router: Router) {
    this.page.actionBarHidden = true;
  }

  ngOnInit() {
    this.updateAutenticationStatus();
  }

  login() {
    if (!this.isEmailValid()) {
      alert("Enter a valid email address.");
      return;
    }
    console.log(`Singing in as ${this.email} with password ${this.password}`);

    this.inProgress = true;
    this.authService.login(this.email, this.password)
      .subscribe(profile => {
        this.isError = false;
        this.inProgress = false;
        this.router.navigate([`/`]);
      },
      err => {
        this.isError = true;
        this.inProgress = false;
      });
  }

  logout() {
    this.authService.logout();
    this.updateAutenticationStatus();
  }

  updateAutenticationStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  isEmailValid() {
    return emailValidator.validate(this.email);
  }
}