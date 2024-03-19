package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.response.ApiResponse;
import com.app.response.DisplayProductResponse;
import com.app.service.ProductService;

@RestController
public class HomeController {
	
	@Autowired
	private ProductService productService;

//	@GetMapping("/")
//	public List<DisplayProductResponse> homeController(){
//		
//		List<DisplayProductResponse> products = productService.getAllProducts();
//		//ApiResponse res=new ApiResponse("Welcome To E-Commerce System", true);
//		
//		return products;
//	}
	
	@GetMapping("/")
	public ResponseEntity<List<DisplayProductResponse>> homeController(){
		
		List<DisplayProductResponse> products = productService.getAllProducts();
		//ApiResponse res=new ApiResponse("Welcome To E-Commerce System", true);
		
		return new ResponseEntity<>(products,HttpStatus.OK);
	}
}
