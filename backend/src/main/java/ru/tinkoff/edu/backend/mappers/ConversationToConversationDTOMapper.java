package ru.tinkoff.edu.backend.mappers;

import ru.tinkoff.edu.backend.dto.conversations.ConversationDTO;
import ru.tinkoff.edu.backend.dto.conversations.MessageDTO;
import ru.tinkoff.edu.backend.entities.Conversation;
import ru.tinkoff.edu.backend.entities.User;

import java.util.List;

public class ConversationToConversationDTOMapper {
  private ConversationToConversationDTOMapper() {}

  public static ConversationDTO conversationToConversationDTO(
      Conversation conversation, User user, List<MessageDTO> messages) {
    if (conversation == null) {
      return null;
    }

    return ConversationDTO.builder()
        .userId(user.getId())
        .firstName(user.getFirstName())
        .lastName(user.getLastName())
        .imageUserResource(user.getImageUserResource())
        .mentorSpecializations(user.getInlineMentorSpecializations())
        .messages(messages)
        .build();
  }
}
