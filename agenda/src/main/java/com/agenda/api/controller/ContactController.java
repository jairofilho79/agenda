package com.agenda.api.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agenda.api.controller.dto.ContactDTO;
import com.agenda.api.controller.response.Response;
import com.agenda.api.entity.Contact;
import com.agenda.api.service.ContactService;

@RestController
@RequestMapping("contact")
public class ContactController {

	@Autowired
	ContactService service;
	
	@PostMapping
	public ResponseEntity<Response<ContactDTO>> create(@Valid @RequestBody ContactDTO dto, BindingResult result) {
		
		Response<ContactDTO> response = new Response<>();
		
		if (result.hasErrors()) {
			result.getAllErrors().forEach(e -> response.addErros(e.getDefaultMessage()));
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
		}
		
		Contact contact = service.save(dto.toContact());
		
		response.setData(contact.toDTO());
		
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
		
	}
}
