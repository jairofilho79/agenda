package com.agenda.api.repository;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.agenda.api.entity.Contact;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class ContactRepositoryTest {
	
	@Autowired
	ContactRepository repository;
	
	@Test
	public void testSave() {
		Contact c = new Contact();
		c.setName("Jairo");
		c.setPhone("99999-9999");
		c.setEmail("jairo@teste.com");
		
		Contact response = repository.save(c);
		
		assertThat(response.getId(), is(1L));
		assertNotNull(response);
	}

}
