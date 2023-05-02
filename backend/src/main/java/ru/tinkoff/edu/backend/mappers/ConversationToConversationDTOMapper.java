package ru.tinkoff.edu.backend.mappers;

import ru.tinkoff.edu.backend.dto.ConversationDTO;
import ru.tinkoff.edu.backend.entities.Conversation;
import ru.tinkoff.edu.backend.entities.User;

import static ru.tinkoff.edu.backend.mappers.MessageMapper.messageToMessageDTOs;

public class ConversationToConversationDTOMapper {
    private ConversationToConversationDTOMapper() {
    }

    public static ConversationDTO conversationToConversationDTO(Conversation conversation, User user) {
        if(conversation == null) {
            return null;
        }

        return ConversationDTO.builder()
                .userId(user.getId())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .imageUserResource(user.getImageUserResource())
                .mentorSpecializations(user.getInlineMentorSpecializations())
                .messages(messageToMessageDTOs(conversation.getMessages()))
                .build();
    }
}
