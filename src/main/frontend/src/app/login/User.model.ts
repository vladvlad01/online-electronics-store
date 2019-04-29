import {Authorities} from "./Authorities";

export class UserModel {
    name:string;
    authorities:Authorities[];


  constructor(name: string, authorities: Authorities[]) {
    this.name = name;
    this.authorities = authorities;
  }
}
