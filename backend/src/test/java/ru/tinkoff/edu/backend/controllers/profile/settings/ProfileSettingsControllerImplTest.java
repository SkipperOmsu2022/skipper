package ru.tinkoff.edu.backend.controllers.profile.settings;

import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.json.JsonMapper;
import org.junit.jupiter.api.Test;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import ru.tinkoff.edu.backend.controllers.ControllerTestConfiguration;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditAccountDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditContactsDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMainInfoDTO;
import ru.tinkoff.edu.backend.enums.UserGender;
import ru.tinkoff.edu.backend.exception.DifferentPasswordException;
import ru.tinkoff.edu.backend.exception.IncorrectCurrentPasswordException;
import ru.tinkoff.edu.backend.exception.OldPasswordRepeatNewPasswordException;
import ru.tinkoff.edu.backend.services.ProfileService;

import java.time.LocalDate;
import java.util.Map;
import java.util.stream.Stream;

@WebMvcTest(
    value = ProfileSettingsControllerImpl.class,
    excludeAutoConfiguration = SecurityAutoConfiguration.class)
@Import(ControllerTestConfiguration.class)
class ProfileSettingsControllerImplTest {
  @Autowired private MockMvc mockMvc;

  @MockBean private ProfileService profileService;

  @Autowired private ObjectMapper objectMapper;

  ObjectMapper objectMapperWithoutAnnotations =
      JsonMapper.builder().disable(MapperFeature.USE_ANNOTATIONS).build();

  UserEditMainInfoDTO userEditMainInfoDTO =
      new UserEditMainInfoDTO(
          "Ivan",
          "Ivanov",
          "Yovanovitch",
          LocalDate.of(2000, 1, 1),
          null,
          null,
          UserGender.MALE,
          "Обыкновенный пользователь этого сайта");

  UserEditAccountDTO userEditAccountDTO =
      new UserEditAccountDTO("123@example", "123", "124", "124");

  UserEditContactsDTO userEditContactsDTO =
      UserEditContactsDTO.builder()
          .linkVk("vk.com/durov")
          .linkTelegram("@tel")
          .linkDiscord("#dis")
          .linkSkype("sky")
          .build();

  @Test
  void get_mainInfo_thenReturnObjectWithStatus200() throws Exception {
    Long id = 1L;
    when(profileService.getMainInfoUser(id)).thenReturn(userEditMainInfoDTO);

    mockMvc
        .perform(get("/api/user/profile/settings/" + id))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().json(objectMapper.writeValueAsString(userEditMainInfoDTO)));
  }

  @Test
  void put_mainInfo_thenReturnStatus200() throws Exception {
    long id = 1L;
    MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
    Map<String, String> fieldMap =
        objectMapper.convertValue(userEditMainInfoDTO, new TypeReference<Map<String, String>>() {});
    map.setAll(fieldMap);

    mockMvc
        .perform(
            put("/api/user/profile/settings/" + id)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .params(map))
        .andDo(print())
        .andExpect(status().isOk());
  }

  @Test
  void get_accountDetails_thenReturnObjectWithStatus200() throws Exception {
    Long id = 1L;
    when(profileService.getAccountDetailsUser(id)).thenReturn(userEditAccountDTO);

    mockMvc
        .perform(get("/api/user/profile/settings/account/" + id))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().json(objectMapper.writeValueAsString(userEditAccountDTO)));
  }

  @Test
  void put_editAccountDetails_thenReturnStatus200() throws Exception {
    long id = 1L;

    mockMvc
        .perform(
            put("/api/user/profile/settings/account/" + id)
                .content(objectMapperWithoutAnnotations.writeValueAsString(userEditAccountDTO))
                .contentType(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk());
  }

  @ParameterizedTest
  @MethodSource("provideArgumentToMethod_editAccountDetailsWithAnyException")
  void put_editAccountDetailsWithAnyException_thenReturnStatus400(RuntimeException exception)
      throws Exception {
    Long id = 1L;
    doThrow(exception).when(profileService).updateAccountDetailsUser(id, userEditAccountDTO);

    mockMvc
        .perform(
            put("/api/user/profile/settings/account/" + id)
                .content(objectMapperWithoutAnnotations.writeValueAsString(userEditAccountDTO))
                .contentType(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("message", exception.getMessage()).exists());
  }

  static Stream<Arguments> provideArgumentToMethod_editAccountDetailsWithAnyException() {
    return Stream.of(
        Arguments.of(new IncorrectCurrentPasswordException("Incorrect current password!")),
        Arguments.of(
            new DifferentPasswordException("The new and the confirming password must match!")),
        Arguments.of(
            new OldPasswordRepeatNewPasswordException(
                "The new password matches the old password!")));
  }

  @Test
  void get_userContacts_thenReturnStatus200() throws Exception {
    Long id = 1L;
    when(profileService.getContactsUser(id)).thenReturn(userEditContactsDTO);

    mockMvc
        .perform(get("/api/user/profile/settings/contacts/" + id))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().json(objectMapper.writeValueAsString(userEditContactsDTO)));
  }

  @Test
  void put_editUserContacts_thenReturnStatus200() throws Exception {
    long id = 1L;

    mockMvc
        .perform(
            put("/api/user/profile/settings/contacts/" + id)
                .content(objectMapper.writeValueAsString(userEditContactsDTO))
                .contentType(MediaType.APPLICATION_JSON))
        .andDo(print())
        .andExpect(status().isOk());
  }
}
