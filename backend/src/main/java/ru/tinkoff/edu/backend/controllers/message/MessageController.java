package ru.tinkoff.edu.backend.controllers.message;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import javax.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.conversations.ConversationDTO;
import ru.tinkoff.edu.backend.dto.conversations.MessageDTO;
import ru.tinkoff.edu.backend.dto.conversations.PaginationListConversationDTO;
import ru.tinkoff.edu.backend.dto.conversations.PaginationListMessageDTO;

@RestController
@Validated
@Tag(name = "Message Controller", description = "Отправка и принятие сообщений через WebSocket.")
@RequestMapping(value = "/api/chat")
@CrossOrigin
public interface MessageController {
  /**
   * Отправка сообщения от одного пользователя - другому. MessageMapping - api для принятия
   * сообщения.
   */
  @MessageMapping("/chat/{idFrom}/{idTo}")
  void sendMessage(
      @DestinationVariable Long idFrom,
      @DestinationVariable Long idTo,
      @Payload MessageDTO message);

  @Operation(
      summary = "Получение списка диалогов.",
      description =
          "Возвращает все сообщения пользователя с указанным id с пагинацией."
              + "Каждый диалог содержит указанное количество последних сообщений в хронологическом порядке.")
  @GetMapping("/list-messages/{userId}")
  ResponseEntity<List<ConversationDTO>> getMessages(
      @PathVariable Long userId, @Valid PaginationListConversationDTO dto);

  @Operation(summary = "Получение списка сообщений для диалога.")
  @GetMapping("/list-messages/{userId1}/{userId2}")
  ResponseEntity<List<MessageDTO>> getMessagesForConversation(
      @PathVariable Long userId1, @PathVariable Long userId2, @Valid PaginationListMessageDTO dto);

  @Operation(summary = "Получение информации о пользователе в диалоге.")
  @GetMapping("/user-info/{id}")
  ResponseEntity<ConversationDTO> getUserInfoForConversation(@PathVariable Long id);
}
