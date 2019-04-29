package com.appconfig.service;


import com.appconfig.model.Cart;
import com.appconfig.model.CartProduct;
import com.appconfig.model.Product;
import com.appconfig.repository.CartRepository;
import com.appconfig.repository.ProductRepository;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Transactional
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartRepository cartRepository;

    public Product saveProduct(Product product){
        return  productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public String deleteProduct(Integer productId) {
        if(!productRepository.existsById(productId)) return new Gson().toJson("ERROR");

        productRepository.deleteById(productId);
        return new Gson().toJson("DELETED");
    }

    public Cart saveCart(Cart cart) {
        return cartRepository.save(cart);
    }

    public Cart getCartByUsername(String username) {
        if(!cartRepository.existsByUsername(username)) return  null;

        return cartRepository.findByUsername(username);
    }

    public List<Product> getCartForCheckout(String username){
        List<Product> productsToBuy = new ArrayList<>();

        if(!cartRepository.existsByUsername(username)) return null;

        Cart aCart = cartRepository.findByUsername(username);

       List<CartProduct> cartProducts = aCart.getProductList();
       List<Integer> allProductsId = new ArrayList<>();
       //get all products id and add them into a list
       cartProducts.forEach(cartProduct -> allProductsId.add(cartProduct.getProductId()));
       //make the productsID a distinct list
        LinkedHashSet<Integer> hashSet = new LinkedHashSet<>(allProductsId);
        List<Integer> distinctProductsList = new ArrayList<>(hashSet);

        for(Integer productId : distinctProductsList){
            productsToBuy.add(productRepository.getOne(productId));
        }

        return  productsToBuy;
    }

    public Product getProductById(Integer productId) {
        if(!productRepository.existsById(productId)) return null;

        return productRepository.getOne(productId);
    }

    public String getProductQuantity(Integer productId,Integer quantityRequested) {
        Product product = productRepository.getOne(productId);
        if(product.getStock() >= quantityRequested){
            return new Gson().toJson("ALLOW");
        }
        return new Gson().toJson("ERROR");
    }
}
