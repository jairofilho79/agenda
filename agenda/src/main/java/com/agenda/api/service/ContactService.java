package com.agenda.api.service;

import java.util.Optional;

import com.agenda.api.entity.Contact;

public interface ContactService {
	
	Contact save(Contact contact);

	Optional<Contact> findByPhone(String phone);

}
