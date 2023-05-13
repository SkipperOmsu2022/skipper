package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.conversations.MessageDTO;
import ru.tinkoff.edu.backend.dto.conversations.ConversationDTO;
import ru.tinkoff.edu.backend.dto.conversations.PaginationListConversationDTO;

import java.util.List;

@Service
public interface MessageService {
    MessageDTO save(Long userIdTo, Long userIdFrom, MessageDTO message);
    List<ConversationDTO> getListConversations(Long userId, PaginationListConversationDTO dto);
    ConversationDTO getUserInfoForConversation(Long id);
}
