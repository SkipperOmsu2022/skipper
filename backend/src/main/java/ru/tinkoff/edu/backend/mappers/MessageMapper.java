package ru.tinkoff.edu.backend.mappers;

import ru.tinkoff.edu.backend.dto.conversations.MessageDTO;
import ru.tinkoff.edu.backend.entities.Message;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class MessageMapper {
    private MessageMapper() {
    }

    public static MessageDTO messageToMessageDTO(Message message) {
        if (message == null) {
            return null;
        }

        return MessageDTO.builder()
                .id(message.getId())
                .messageContent(message.getMessageTextContent())
                .dateTimeSend(message.getDateTimeSend())
                .userFrom(message.getUserSender().getId())
                .build();
    }

    public static List<MessageDTO> messageToMessageDTOs(List<Message> messages) {
        if (messages == null) {
            return Collections.emptyList();
        }

        return messages.stream()
                .map(MessageMapper::messageToMessageDTO)
                .collect(Collectors.toList());
    }
}
