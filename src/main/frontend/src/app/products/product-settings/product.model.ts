export class ProductModel {

  id:number;
  phoneName:string;
  phoneBrand:string;
  phonePrice:number;
  discountedPrice:number;
  phoneCategory:string;
  phoneDescription:string;
  imageUrl:string;
  imageUrlRear:string;
  stock:number;
  rating:number;
  subtotal:number;


  constructor(id: number, phoneName: string, phoneBrand: string, phonePrice: number, discountedPrice: number, phoneCategory: string, phoneDescription: string, imageUrl: string, imageUrlRear: string, stock: number, rating: number) {
    this.id = id;
    this.phoneName = phoneName;
    this.phoneBrand = phoneBrand;
    this.phonePrice = phonePrice;
    this.discountedPrice = discountedPrice;
    this.phoneCategory = phoneCategory;
    this.phoneDescription = phoneDescription;
    this.imageUrl = imageUrl;
    this.imageUrlRear = imageUrlRear;
    this.stock = stock;
    this.rating = rating;
  }
}
