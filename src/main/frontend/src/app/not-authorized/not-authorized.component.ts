import { Component, OnInit } from '@angular/core';
import {AppService} from "../shared/app.service";

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html',
  styleUrls: ['./not-authorized.component.css']
})
export class NotAuthorizedComponent implements OnInit {

  constructor(private appService:AppService) { }

  ngOnInit() {
    this.appService.extractCredentialsFromLocalStorage();
  }

}
