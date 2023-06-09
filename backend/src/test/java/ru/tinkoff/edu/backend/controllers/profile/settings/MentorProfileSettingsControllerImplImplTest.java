package ru.tinkoff.edu.backend.controllers.profile.settings;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.util.Sets;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import ru.tinkoff.edu.backend.controllers.ControllerTestConfiguration;
import ru.tinkoff.edu.backend.controllers.profile.settings.mentor.MentorProfileSettingsControllerImpl;
import ru.tinkoff.edu.backend.dto.profile.settings.EducationDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMentorDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.WorkExperienceDTO;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;
import ru.tinkoff.edu.backend.services.MentorProfileService;

import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.Set;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(
    value = MentorProfileSettingsControllerImpl.class,
    excludeAutoConfiguration = SecurityAutoConfiguration.class)
@Import(ControllerTestConfiguration.class)
class MentorProfileSettingsControllerImplImplTest {
  @Autowired private MockMvc mockMvc;

  @MockBean private MentorProfileService mentorProfileService;

  @Autowired private ObjectMapper objectMapper;

  Set<EducationDTO> educationDTOS =
      Sets.set(
          new EducationDTO(2015, 2020, 891L, "10.05.01 Компьютерная безопасность", "ОмГУ"),
          new EducationDTO(2010, 2014, 1010L, "42.03.02 Журналистика", "КГУ"));

  Set<WorkExperienceDTO> workExperienceDTOS =
      Sets.set(new WorkExperienceDTO(2020, null, "ГазпромМежРегионГаз"));

  UserEditMentorDTO userEditMentorDTO =
      new UserEditMentorDTO(
          true,
          "Я являюсь создателем этого проекта.",
          Collections.singleton(MentorSpecialization.ADMINISTRATION_SOFTWARE),
          educationDTOS,
          workExperienceDTOS,
          Sets.set("/api/user/certificate/1", "/api/user/certificate/2"));

  MockMultipartFile[] multipartFiles =
      new MockMultipartFile[] {
        new MockMultipartFile(
            "certificates", "diplom1.jpg", "image/jpeg", "diplom1.jpg".getBytes()),
        new MockMultipartFile("certificates", "diplom2.jpg", "image/jpeg", "diplom2.jpg".getBytes())
      };

  @Test
  void get_mentorSettings_thenReturnObjectWithStatus200() throws Exception {
    Long id = 1L;
    when(mentorProfileService.getMentorInfo(id)).thenReturn(userEditMentorDTO);

    mockMvc
        .perform(get("/api/user/profile/settings/mentor/" + id))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().json(objectMapper.writeValueAsString(userEditMentorDTO)));
  }

  @Test
  void put_mentorSettings_thenReturnStatus200() throws Exception {
    long id = 2L;

    MockMultipartFile jsonObject =
        new MockMultipartFile(
            "info",
            "info",
            "application/json",
            objectMapper.writeValueAsString(userEditMentorDTO).getBytes(StandardCharsets.UTF_8));

    mockMvc
        .perform(
            multipart("/api/user/profile/settings/mentor/{id}", id)
                .file(multipartFiles[0])
                .file(multipartFiles[1])
                .file(jsonObject)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    }))
        .andDo(print())
        .andExpect(status().isOk());
  }

  @Test
  void put_mentorSettings_withExceptionMaxNumberOfFIle_thenReturnObjectWIthStatus400()
      throws Exception {
    long id = 3L;
    MockMultipartFile jsonObject =
        new MockMultipartFile(
            "info",
            "info",
            "application/json",
            objectMapper.writeValueAsString(userEditMentorDTO).getBytes(StandardCharsets.UTF_8));

    mockMvc
        .perform(
            multipart("/api/user/profile/settings/mentor/{id}", id)
                .file(multipartFiles[0])
                .file(multipartFiles[1])
                .file(multipartFiles[0])
                .file(multipartFiles[1])
                .file(multipartFiles[0])
                .file(multipartFiles[1])
                .file(jsonObject)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    }))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(
            jsonPath("message")
                .value("editMentorSettings.certificates: Максимальное количество файлов: 3!"));
  }
}
