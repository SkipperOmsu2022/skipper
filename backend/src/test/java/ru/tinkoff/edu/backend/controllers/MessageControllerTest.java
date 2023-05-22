package ru.tinkoff.edu.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.util.Sets;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.web.servlet.MockMvc;
import ru.tinkoff.edu.backend.dto.UserConversationDTO;
import ru.tinkoff.edu.backend.entities.Messages;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.services.MessageService;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.Set;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = MessageController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
@Import(ControllerTestConfiguration.class)
class MessageControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SimpMessagingTemplate simpMessagingTemplate;

    @MockBean
    private MessageService messageService;

    @Autowired
    ObjectMapper objectMapper;

    Set<Messages> messages = Sets.set(
            new Messages(1L, User.builder().id(1L).build(), User.builder().id(2L).build(),
                    "Hello!", LocalDateTime.now()),
            new Messages(2L, User.builder().id(2L).build(), User.builder().id(1L).build(),
                    "Hello too!", LocalDateTime.now())
    );

    Long id = 1L;

    @Test
    void get_messagesList_thenReturn200() throws Exception {
        Set<UserConversationDTO> listMessages = Sets.set(
                new UserConversationDTO(id, "Ivan", "Ivanov", null, "Геймер", messages),
                new UserConversationDTO(2L, "Ivan", "Ivanov", null, "Геймер", messages)
        );

        when(messageService.getListMessages(id)).thenReturn(listMessages);

        mockMvc.perform(get("/api/chat/list-messages/" + id))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(listMessages)));
    }

    @Test
    void get_messagesList_withEntityNotFoundException_thenReturn400() throws Exception {
        when(messageService.getListMessages(id)).thenThrow(new EntityNotFoundException("Entity not found!"));

        mockMvc.perform(get("/api/chat/list-messages/" + id))
                .andDo(print())
                .andExpect(status().isNotFound());
    }

    @Test
    void get_userInfoForConversation_thenReturn200() throws Exception {
        UserConversationDTO user = new UserConversationDTO(id, "Иван", "Иванов", null, "Танкист на пенсии", messages);

        when(messageService.getUserInfoForConversation(id)).thenReturn(user);

        mockMvc.perform(get("/api/chat/user-info/" + id))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(user)));
    }

    @Test
    void get_userInfoForConversation_withEntityNotFoundException_thenReturn200() throws Exception {
        when(messageService.getUserInfoForConversation(id)).thenThrow(new EntityNotFoundException("Entity not found!"));

        mockMvc.perform(get("/api/chat/user-info/" + id))
                .andDo(print())
                .andExpect(status().isNotFound());
    }
}