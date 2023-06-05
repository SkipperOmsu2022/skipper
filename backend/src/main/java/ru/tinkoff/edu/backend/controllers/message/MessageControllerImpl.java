package ru.tinkoff.edu.backend.controllers.message;

import java.util.List;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;
import ru.tinkoff.edu.backend.dto.conversations.ConversationDTO;
import ru.tinkoff.edu.backend.dto.conversations.MessageDTO;
import ru.tinkoff.edu.backend.dto.conversations.PaginationListConversationDTO;
import ru.tinkoff.edu.backend.dto.conversations.PaginationListMessageDTO;
import ru.tinkoff.edu.backend.services.MessageService;

@RestController
@Log4j2
public class MessageControllerImpl implements MessageController {
  // Реализует простой протокол обмена текстовых сообщений - STOMP
  private final SimpMessagingTemplate simpMessagingTemplate;
  private final MessageService messageService;

  public MessageControllerImpl(
      SimpMessagingTemplate simpMessagingTemplate, MessageService messageService) {
    this.simpMessagingTemplate = simpMessagingTemplate;
    this.messageService = messageService;
  }

  @Override
  public void sendMessage(Long idFrom, Long idTo, MessageDTO message) {
    simpMessagingTemplate.convertAndSend(
        "/topic/messages/" + idTo, messageService.save(idTo, idFrom, message));
  }

  @Override
  public ResponseEntity<List<ConversationDTO>> getMessages(
      Long userId, PaginationListConversationDTO dto) {
    return ResponseEntity.ok(messageService.getListConversations(userId, dto));
  }

  @Override
  public ResponseEntity<List<MessageDTO>> getMessagesForConversation(
      Long userId1, Long userId2, PaginationListMessageDTO dto) {
    return ResponseEntity.ok(messageService.getListMessagesForConversation(userId1, userId2, dto));
  }

  @Override
  public ResponseEntity<ConversationDTO> getUserInfoForConversation(Long id) {
    return ResponseEntity.ok(messageService.getUserInfoForConversation(id));
  }
}
