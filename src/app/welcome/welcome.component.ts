import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { WelcomeDataService } from '../service/data/welcome-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message: string = "Hello World";
  welcomeMessage: string;
  name: string = "";

  //ActivatedRoute
  constructor(private route: ActivatedRoute, private service: WelcomeDataService) {

  }

  ngOnInit() {
    this.name = this.route.snapshot.params['name'];
  }

  getWelcomeMessage() {
    this.service.executeHelloWorldBeanService().subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  getWelcomeMessageWithParam(){
    this.service.executeHelloWorldBeanServiceWithPathVariable(this.name).subscribe(
      response => this.handleSuccessfulResponse(response),
      error => this.handleErrorResponse(error)
    );
  }

  handleSuccessfulResponse(response) {
    this.welcomeMessage = response.message;
  }

  handleErrorResponse(error) {
    this.welcomeMessage = error.error.message;
  }
}

export class Class1 {

}