package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.log4j.Log4j2;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.tinkoff.edu.backend.entities.Message;

@RestController
@Validated
@Tag(name="Message Controller", description="Отправка и принятие сообщений через WebSocket.")
@RequestMapping(value = "")
@CrossOrigin
@Log4j2
public class MessageController {
    // Реализует простой протокол обмена текстовых сообщений - STOMP
    private final SimpMessagingTemplate simpMessagingTemplate;

    public MessageController(SimpMessagingTemplate simpMessagingTemplate) {
        this.simpMessagingTemplate = simpMessagingTemplate;
    }

    /**
     * Отправка сообщения от одного пользователя - другому.
     * MessageMapping - api для принятия сообщения.
     */
    @MessageMapping("/chat/{id_from}/{id_to}")
    public void sendMessage(@DestinationVariable Long id_from, @DestinationVariable Long id_to,
                            @Payload Message message) {
        log.info("from: " + id_from + ", to: " + id_to + ", message:" + message.getText());
        simpMessagingTemplate.convertAndSend("/topic/messages/" + id_to, message);
        // можно потом заменить на SendTo()
    }
}
