package com.agenda.api.controller.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.agenda.api.entity.Contact;

import lombok.Data;

@Data
public class ContactDTO {
	
	private Long id;
	
	@NotNull
	@Length(min=3, max = 100, message = "O nome deve conter entre 3 e 50 caracteres")
	private String name;
	
	@NotNull
	@Length(min=11, max = 100, message = "O telefone deve conter no minimo 10 caracteres")
	private String phone;
	
	@Email(message = "Email inválido")
	private String email;

	public Contact toContact() {
		Contact c = new Contact();
		c.setName(name);
		c.setPhone(phone);
		c.setEmail(email);
		return c;
	}
	
	

}
