package ru.tinkoff.edu.backend.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import ru.tinkoff.edu.backend.dto.*;
import ru.tinkoff.edu.backend.services.MentorListService;

@AutoConfigureMockMvc
@SpringBootTest
public class MentorsListControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private MentorListService mentorListService;

    MentorListItemDTO mentorListItemDTO = MentorListItemDTO.builder()
            .id(1L)
            .firstName("Ivan")
            .lastName("Lamchev")
            .build();

    public void getMentorsList() throws Exception{

    }
}
