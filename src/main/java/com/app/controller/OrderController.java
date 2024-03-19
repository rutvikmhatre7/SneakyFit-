package com.app.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.exception.OrderException;
import com.app.exception.UserException;
import com.app.modal.Address;
import com.app.modal.Order;
import com.app.modal.User;
import com.app.request.AddressDTORequest;
import com.app.response.OrderDTO;
import com.app.response.OrderDisplayDTO;
import com.app.service.OrderService;
import com.app.service.UserService;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
	
	private OrderService orderService;
	private UserService userService;
	
	public OrderController(OrderService orderService,UserService userService) {
		this.orderService=orderService;
		this.userService=userService;
	}
	
	@PostMapping("/")
	public ResponseEntity<?> createOrderHandler(@RequestBody AddressDTORequest spippingAddress,
			@RequestHeader("Authorization")String jwt) throws UserException{
		System.out.println("In Order controller ....>>>/");
		User user=userService.findUserProfileByJwt(jwt);
		System.out.println("first");
		OrderDTO order =orderService.createOrder(user, spippingAddress);
		System.out.println("second");
		System.out.println(order.getId());
		return new ResponseEntity<OrderDTO>(order,HttpStatus.OK);
		
	}
	
	@GetMapping("/user")
	public ResponseEntity< List<?>> usersOrderHistoryHandler(@RequestHeader("Authorization") 
	String jwt) throws OrderException, UserException{
		System.out.println("In Order controller ....>>>/user");
		User user=userService.findUserProfileByJwt(jwt);
		List<OrderDisplayDTO> orders=orderService.usersOrderHistory(user.getId());
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/{orderId}")
	public ResponseEntity< Order> findOrderHandler(@PathVariable Long orderId, @RequestHeader("Authorization") 
	String jwt) throws OrderException, UserException{
		System.out.println("In Order controller ;/{orderId})");
		User user=userService.findUserProfileByJwt(jwt);
		Order orders=orderService.findOrderById(orderId);
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/swagat/{orderId}")
	public ResponseEntity<?> findOrderHandlerSwagat(@PathVariable Long orderId, @RequestHeader("Authorization") 
	String jwt) throws OrderException, UserException{
		System.out.println("In Order controller ;>>> /swagat/{orderId}");
		User user=userService.findUserProfileByJwt(jwt);
		OrderDisplayDTO orders=orderService.findOrderByIdBro(orderId);
		return new ResponseEntity<>(orders,HttpStatus.ACCEPTED);
		
	}
	
	

}
