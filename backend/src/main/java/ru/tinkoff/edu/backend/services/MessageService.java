package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.MessageDTO;
import ru.tinkoff.edu.backend.dto.UserConversationDTO;

import java.util.List;
import java.util.Set;

@Service
public interface MessageService {
    MessageDTO save(Long userIdTo, Long userIdFrom, MessageDTO message);
    Set<UserConversationDTO> getListMessages(Long id);
    UserConversationDTO getUserInfoForConversation(Long id);
}
