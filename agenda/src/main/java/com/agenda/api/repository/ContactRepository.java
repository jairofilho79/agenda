package com.agenda.api.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.agenda.api.entity.Contact;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long> {

}
