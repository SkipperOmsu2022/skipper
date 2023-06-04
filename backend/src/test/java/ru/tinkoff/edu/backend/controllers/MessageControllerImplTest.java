package ru.tinkoff.edu.backend.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.assertj.core.util.Lists;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.web.servlet.MockMvc;
import ru.tinkoff.edu.backend.controllers.message.MessageControllerImpl;
import ru.tinkoff.edu.backend.dto.conversations.ConversationDTO;
import ru.tinkoff.edu.backend.dto.conversations.PaginationListConversationDTO;
import ru.tinkoff.edu.backend.entities.Conversation;
import ru.tinkoff.edu.backend.entities.Message;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.services.MessageService;

import javax.persistence.EntityNotFoundException;
import java.time.LocalDateTime;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static ru.tinkoff.edu.backend.mappers.MessageMapper.messageToMessageDTOs;

@WebMvcTest(
    value = MessageControllerImpl.class,
    excludeAutoConfiguration = SecurityAutoConfiguration.class)
@Import(ControllerTestConfiguration.class)
class MessageControllerImplTest {
  @Autowired private MockMvc mockMvc;

  @MockBean private SimpMessagingTemplate simpMessagingTemplate;

  @MockBean private MessageService messageService;

  @Autowired ObjectMapper objectMapper;

  List<Message> messages =
      Lists.list(
          new Message(
              1L, User.builder().id(1L).build(), "Hello!", LocalDateTime.now(), new Conversation()),
          new Message(
              2L,
              User.builder().id(2L).build(),
              "Hello too!",
              LocalDateTime.now(),
              new Conversation()));

  Long id = 1L;

  @Test
  void get_messagesList_thenReturn200() throws Exception {
    List<ConversationDTO> listMessages =
        Lists.list(
            new ConversationDTO(
                id, "Ivan", "Ivanov", null, "Геймер", messageToMessageDTOs(messages)),
            new ConversationDTO(
                2L, "Ivan", "Ivanov", null, "Геймер", messageToMessageDTOs(messages)));

    when(messageService.getListConversations(id, PaginationListConversationDTO.builder().build()))
        .thenReturn(listMessages);

    mockMvc
        .perform(get("/api/chat/list-messages/" + id))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().json(objectMapper.writeValueAsString(listMessages)));
  }

  @Test
  void get_messagesList_withEntityNotFoundException_thenReturn400() throws Exception {
    when(messageService.getListConversations(id, PaginationListConversationDTO.builder().build()))
        .thenThrow(new EntityNotFoundException("Entity not found!"));

    mockMvc
        .perform(get("/api/chat/list-messages/" + id))
        .andDo(print())
        .andExpect(status().isNotFound());
  }

  @Test
  void get_userInfoForConversation_thenReturn200() throws Exception {
    ConversationDTO user =
        new ConversationDTO(
            id, "Иван", "Иванов", null, "Танкист на пенсии", messageToMessageDTOs(messages));

    when(messageService.getUserInfoForConversation(id)).thenReturn(user);

    mockMvc
        .perform(get("/api/chat/user-info/" + id))
        .andDo(print())
        .andExpect(status().isOk())
        .andExpect(content().contentType(MediaType.APPLICATION_JSON))
        .andExpect(content().json(objectMapper.writeValueAsString(user)));
  }

  @Test
  void get_userInfoForConversation_withEntityNotFoundException_thenReturn200() throws Exception {
    when(messageService.getUserInfoForConversation(id))
        .thenThrow(new EntityNotFoundException("Entity not found!"));

    mockMvc
        .perform(get("/api/chat/user-info/" + id))
        .andDo(print())
        .andExpect(status().isNotFound());
  }
}
