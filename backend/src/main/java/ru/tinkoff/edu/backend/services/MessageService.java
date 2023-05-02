package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.MessageDTO;
import ru.tinkoff.edu.backend.dto.ConversationDTO;

import java.util.List;

@Service
public interface MessageService {
    MessageDTO save(Long userIdTo, Long userIdFrom, MessageDTO message);
    List<ConversationDTO> getListMessages(Long id);
    ConversationDTO getUserInfoForConversation(Long id);
}
