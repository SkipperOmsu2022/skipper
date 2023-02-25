package ru.tinkoff.edu.backend.controllers;

import static org.mockito.Mockito.when;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;

import ru.tinkoff.edu.backend.dto.UserLoginDTO;
import ru.tinkoff.edu.backend.dto.UserRegDTO;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.services.ProfileService;
import ru.tinkoff.edu.backend.services.UserService;


@AutoConfigureMockMvc
@SpringBootTest
public class AuthControllerIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    // имитирует поведение сервисного слоя
    @MockBean
    private UserService userService;

    @MockBean
    private ProfileService profileService;

    // Создаём пользователей DTO - пользователи для отправки по сети
    // И обычных User - пользователи, которые лежат в БД
    UserLoginDTO userLoginDTO_1 = new UserLoginDTO("123@example.com", "123");
    User user_1 = User.builder()
            .id(1L)
            .email("123@example.com")
            .password("123")
            .build();


    ObjectMapper objectMapper = new ObjectMapper();

    UserRegDTO userRegDTO_1 = new UserRegDTO("1234@example","1234","Daniil","Kromov");

    User user_2 = User.builder()
            .id(2L)
            .email("1234@example")
            .password("1234")
            .firstName("Daniil")
            .lastName("Kromov")
            .build();

    String jsonUser = objectMapper.writeValueAsString(userRegDTO_1);

    public AuthControllerIntegrationTest() throws JsonProcessingException {
    }

    @Test
    public void loginSuccess() throws Exception {
        // Делаем затычку, что должен возратить метод 'readByUserLoginDTO()', который находится в контроллере
        when(userService.readByUserLoginDTO(userLoginDTO_1)).thenReturn(user_1);

        // имитирует вызов (на стороне клиента) API метода login() контроллера AuthController
        mockMvc.perform(post("/api/auth/login")
                .param("email", userLoginDTO_1.getEmail())
                .param("password", userLoginDTO_1.getPassword())
                .contentType(MediaType.MULTIPART_FORM_DATA))
                // экспектируем на статус
                .andExpect(status().isOk())
                // экспектируем на заголовок Location ()
                .andExpect(header().longValue("Location", user_1.getId()));
    }


    @Test
    public void registrationSuccess() throws Exception {



        when (userService.create(userRegDTO_1)).thenReturn(user_2);

        mockMvc.perform(post("/api/auth/registration")
                        .content(jsonUser)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(header().longValue("Location", user_2.getId()));

    }
}
