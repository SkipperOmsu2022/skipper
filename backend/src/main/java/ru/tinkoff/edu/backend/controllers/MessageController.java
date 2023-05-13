package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.conversations.MessageDTO;
import ru.tinkoff.edu.backend.dto.conversations.ConversationDTO;
import ru.tinkoff.edu.backend.dto.conversations.PaginationListConversationDTO;
import ru.tinkoff.edu.backend.services.MessageService;

import javax.validation.Valid;
import java.util.List;

@RestController
@Validated
@Tag(name = "Message Controller", description = "Отправка и принятие сообщений через WebSocket.")
@RequestMapping(value = "/api/chat")
@CrossOrigin
@Log4j2
public class MessageController {
    // Реализует простой протокол обмена текстовых сообщений - STOMP
    private final SimpMessagingTemplate simpMessagingTemplate;
    private final MessageService messageService;

    public MessageController(SimpMessagingTemplate simpMessagingTemplate, MessageService messageService) {
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.messageService = messageService;
    }

    /**
     * Отправка сообщения от одного пользователя - другому.
     * MessageMapping - api для принятия сообщения.
     */
    @MessageMapping("/chat/{idFrom}/{idTo}")
    public void sendMessage(@DestinationVariable Long idFrom, @DestinationVariable Long idTo,
                            @Payload MessageDTO message) {
        simpMessagingTemplate.convertAndSend("/topic/messages/" + idTo,
                messageService.save(idTo, idFrom, message));
    }

    @Operation(summary = "Получение списка сообщений.",
            description = "Возвращает все сообщения пользователя с указанным id с пагинацией." +
                    "Каждый диалог содержит указанное количество последних сообщений в хронологическом порядке." +
                    "Порядок диалогов: дата последнего сообщения.")
    @GetMapping("/list-messages/{userId}")
    public ResponseEntity<List<ConversationDTO>> getMessages(@PathVariable Long userId,
                                                             @Valid PaginationListConversationDTO dto) {
        return ResponseEntity.ok(messageService.getListConversations(userId, dto));
    }

    @Operation(summary = "Получение информации о пользователе в диалоге.")
    @GetMapping("/user-info/{id}")
    public ResponseEntity<ConversationDTO> getUserInfoForConversation(@PathVariable Long id) {
        return ResponseEntity.ok(messageService.getUserInfoForConversation(id));
    }
}
