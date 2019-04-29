package com.appconfig.model;

import javax.persistence.*;

@Entity
@Table(name = "PRODUCT")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String phoneName;
    private String phoneBrand;
    private Integer phonePrice;
    private Integer discountedPrice;
    private String phoneCategory;
    private String phoneDescription;
    private String imageUrl;
    private String imageUrlRear;
    private Integer stock;
    private Integer rating;



    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPhoneName() {
        return phoneName;
    }

    public void setPhoneName(String phoneName) {
        this.phoneName = phoneName;
    }

    public String getPhoneBrand() {
        return phoneBrand;
    }

    public void setPhoneBrand(String phoneBrand) {
        this.phoneBrand = phoneBrand;
    }

    public Integer getPhonePrice() {
        return phonePrice;
    }

    public void setPhonePrice(Integer phonePrice) {
        this.phonePrice = phonePrice;
    }

    public Integer getDiscountedPrice() {
        return discountedPrice;
    }

    public void setDiscountedPrice(Integer discountedPrice) {
        this.discountedPrice = discountedPrice;
    }

    public String getPhoneCategory() {
        return phoneCategory;
    }

    public void setPhoneCategory(String phoneCategory) {
        this.phoneCategory = phoneCategory;
    }

    public String getPhoneDescription() {
        return phoneDescription;
    }

    public void setPhoneDescription(String phoneDescription) {
        this.phoneDescription = phoneDescription;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getImageUrlRear() {
        return imageUrlRear;
    }

    public void setImageUrlRear(String imageUrlRear) {
        this.imageUrlRear = imageUrlRear;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}
