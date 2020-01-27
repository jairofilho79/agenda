package com.agenda.api.controller;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.net.URI;

import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.agenda.api.controller.dto.ContactDTO;
import com.agenda.api.entity.Contact;
import com.agenda.api.service.ContactService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
@AutoConfigureMockMvc
public class ContactControllerTest {
	
	private static final String NAME = "Contato 1";

	private static final String PHONE = "99999-9999";

	private static final String EMAIL = "teste@teste.com";

	private static final String URL = "/contact";

	@Mock
	ContactService service;
	
	@Autowired
	MockMvc mvc;
	
	public void testSave() throws Exception {
		
		mvc.perform(MockMvcRequestBuilders.post(URL)
				.content(getJsonPayload())
				.contentType(MediaType.APPLICATION_JSON))
		.andExpect(status().isCreated());
	}
	
	public Contact getMockContact() {
		Contact c = new Contact();
		c.setName(NAME);
		c.setPhone(PHONE);
		c.setEmail(EMAIL);
		return c;
	}
	
	public String getJsonPayload() throws JsonProcessingException {
		ContactDTO dto = new ContactDTO();
		dto.setName(NAME);
		dto.setPhone(PHONE);
		dto.setEmail(EMAIL);
		
		ObjectMapper mapper = new ObjectMapper();
		return mapper.writeValueAsString(dto);
	}

}
