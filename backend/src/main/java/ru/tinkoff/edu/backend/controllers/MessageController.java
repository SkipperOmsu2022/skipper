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
import ru.tinkoff.edu.backend.dto.MessageDTO;
import ru.tinkoff.edu.backend.dto.UserConversationDTO;
import ru.tinkoff.edu.backend.services.MessageService;

import java.util.List;

@RestController
@Validated
@Tag(name="Messages Controller", description="Отправка и принятие сообщений через WebSocket.")
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
    @MessageMapping("/chat/{id_from}/{id_to}")
    public void sendMessage(@DestinationVariable Long id_from, @DestinationVariable Long id_to,
                            @Payload MessageDTO message) {
        simpMessagingTemplate.convertAndSend("/topic/messages/" + id_to,
                messageService.save(id_to, id_from, message));
    }

    @Operation(summary = "Получение списка сообщений.",
            description = "Возвращает все сообщения пользователя с указанным id.")
    @GetMapping("/list-messages/{id}")
    public ResponseEntity<List<UserConversationDTO>> getMessages(@PathVariable Long id) {
        return ResponseEntity.ok(messageService.getListMessages(id));
    }


}
