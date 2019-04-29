package com.appconfig.controllers;


import com.appconfig.model.AccountAddress;
import com.appconfig.model.Cart;
import com.appconfig.model.Product;
import com.appconfig.service.ProductService;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController {

    @Autowired
    private ProductService productService;


    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseBody
    @PostMapping(value = "/saveProduct", produces = "application/json", consumes = "application/json")
    public Product saveProduct(@Valid @RequestBody Product product, BindingResult bindingResult) {
        if(bindingResult.hasErrors()){
            return null;
        }
        return productService.saveProduct(product);

    }

    @ResponseBody
    @GetMapping(value = "/getAllProducts", produces = "application/json")
    public List<Product> getAllGroupTypes() {
        return productService.getAllProducts();

    }

    @ResponseBody
    @GetMapping(value = "/getProductById", produces = "application/json")
    public Product getAllGroupTypes(@RequestParam Integer productId) {
        if(productId == null) return  null;

        return productService.getProductById(productId);

    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @ResponseBody
    @DeleteMapping(value = "/deleteProduct/{productId}", produces = "application/json")
    public String deleteGroupQuestion(@PathVariable Integer productId) {
        if(productId == null)
            return new Gson().toJson("ERROR");

        return productService.deleteProduct(productId);
    }

    @ResponseBody
    @PostMapping(value = "/saveInCart", produces = "application/json", consumes = "application/json")
    public Cart saveInCart(@Valid @RequestBody Cart cart, BindingResult bindingResult) {
        if(bindingResult.hasErrors()){
            return null;
        }

        return productService.saveCart(cart);
    }

    @ResponseBody
    @GetMapping(value = "/getCartByUsername", produces = "application/json")
    public Cart getCartByUsername(@RequestParam String username) {
        return productService.getCartByUsername(username);

    }

    @ResponseBody
    @GetMapping(value = "/getProductsForCart", produces = "application/json")
    public List<Product> getProductsForCart(@RequestParam String username) {
        return productService.getCartForCheckout(username);
    }

    @ResponseBody
    @GetMapping(value = "/getProductQuantity", produces = "application/json")
    public String getProductQuantity(@RequestParam Integer productId,@RequestParam Integer quantityRequested) {
        return productService.getProductQuantity(productId,quantityRequested);
    }




}
