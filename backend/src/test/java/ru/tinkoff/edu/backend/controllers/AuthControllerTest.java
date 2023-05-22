package ru.tinkoff.edu.backend.controllers;

import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;

import ru.tinkoff.edu.backend.dto.UserLoginDTO;
import ru.tinkoff.edu.backend.dto.UserRegDTO;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.services.UserService;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;


@WebMvcTest(value = AuthController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
@Import(ControllerTestConfiguration.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @Autowired
    ObjectMapper objectMapper;

    UserLoginDTO userLoginDTO_1 = new UserLoginDTO("123@example.com", "123");
    User user_1 = User.builder()
            .id(1L)
            .email("123@example.com")
            .password("123")
            .build();

    UserRegDTO userRegDTO_1 = new UserRegDTO("1234@example","1234","Daniil","Gromov");

    User user_2 = User.builder()
            .id(2L)
            .email("1234@example")
            .password("1234")
            .firstName("Daniil")
            .lastName("Gromov")
            .build();

    @Test
    void post_loginUser_thenStatus200() throws Exception {
        when(userService.readByUserLoginDTO(userLoginDTO_1)).thenReturn(user_1);

        mockMvc.perform(post("/api/auth/login")
                .param("email", userLoginDTO_1.getEmail())
                .param("password", userLoginDTO_1.getPassword())
                .contentType(MediaType.MULTIPART_FORM_DATA))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(header().longValue("Location", user_1.getId()));
    }

    @Test
    void post_loginUserWithEntityNotFoundException_thenStatus400() throws Exception{
        when(userService.readByUserLoginDTO(userLoginDTO_1)).thenThrow(new EntityNotFoundException("User not exist!"));

        mockMvc.perform(post("/api/auth/login")
                        .param("email", userLoginDTO_1.getEmail())
                        .param("password", userLoginDTO_1.getPassword())
                        .contentType(MediaType.MULTIPART_FORM_DATA))
                .andDo(print())
                .andExpect(status().isNotFound());
    }


    @Test
    void post_registrationUser_thenStatus201() throws Exception {
        when (userService.create(userRegDTO_1)).thenReturn(user_2);

        mockMvc.perform(post("/api/auth/registration")
                        .content(objectMapper.writeValueAsString(userRegDTO_1))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isCreated())
                .andExpect(header().longValue("Location", user_2.getId()));
    }

    @Test
    void post_registrationUser_withException_thenStatus201() throws Exception {
        when (userService.create(userRegDTO_1)).thenThrow(new EntityExistsException("User already exist!"));

        mockMvc.perform(post("/api/auth/registration")
                        .content(objectMapper.writeValueAsString(userRegDTO_1))
                        .contentType(MediaType.APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isBadRequest());
    }
}
