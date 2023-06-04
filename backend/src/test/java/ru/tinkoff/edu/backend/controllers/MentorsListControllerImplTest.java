package ru.tinkoff.edu.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import ru.tinkoff.edu.backend.controllers.mentorlist.MentorsListControllerImpl;
import ru.tinkoff.edu.backend.entities.Qualification;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;
import ru.tinkoff.edu.backend.services.MentorListService;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(
    value = MentorsListControllerImpl.class,
    excludeAutoConfiguration = SecurityAutoConfiguration.class)
@Import(ControllerTestConfiguration.class)
class MentorsListControllerImplTest {

  @Autowired private MockMvc mockMvc;

  @MockBean private MentorListService mentorListService;

  @Autowired ObjectMapper objectMapper;

  @Test
  void get_educationRUList_thenReturnListObjectsWithStatus200() throws Exception {
    List<Qualification> qualificationList =
        Arrays.asList(
            new Qualification(1L, "10.05.01", "Компьютерная безопасность"),
            new Qualification(2L, "42.03.02", "Журналистика"));

    String query = "Комп";

    when(mentorListService.getSpecializationMentorList(query)).thenReturn(qualificationList);

    mockMvc
        .perform(get("/api/list/edu").queryParam("query", query))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().json(objectMapper.writeValueAsString(qualificationList)));
  }

  @Test
  void get_educationRUListWithoutParams_thenStatus400() throws Exception {
    mockMvc.perform(get("/api/list/edu")).andDo(print()).andExpect(status().isBadRequest());
  }

  @Test
  void get_mapMentorSpecialization_thenReturnMapObjectStatus200() throws Exception {
    Map<MentorSpecialization, String> mapMentorSpecialization =
        MentorSpecialization.getMapMentorSpecialization();

    when(mentorListService.getMapMentorSpecialization()).thenReturn(mapMentorSpecialization);

    mockMvc
        .perform(get("/api/list/specializations"))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().json(objectMapper.writeValueAsString(mapMentorSpecialization)));
  }
}
