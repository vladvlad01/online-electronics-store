
export class AddressModel {

  id:number;
  line1: string;
  line2:string;
  city: string;
  county: string;
  postcode: string;
  country: string;


  constructor(line1: string, line2: string, city: string, county: string, postcode: string, country: string) {
    this.line1 = line1;
    this.line2 = line2;
    this.city = city;
    this.county = county;
    this.postcode = postcode;
    this.country = country;
  }
}
