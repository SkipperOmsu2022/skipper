package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.MessageDTO;
import ru.tinkoff.edu.backend.dto.UserConversationDTO;

import java.util.List;

@Service
public interface MessageService {
    MessageDTO save(Long userIdTo, Long userIdFrom, MessageDTO message);
    List<UserConversationDTO> getListMessages(Long id);
    UserConversationDTO getUserInfoForConversation(Long id);
}
