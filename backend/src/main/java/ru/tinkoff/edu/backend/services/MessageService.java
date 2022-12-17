package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.MessageDTO;
import ru.tinkoff.edu.backend.entities.Messages;

import java.util.List;
import java.util.Map;

@Service
public interface MessageService {
    MessageDTO save(Long userIdTo, Long userIdFrom, MessageDTO message);
    Map<Long, List<Messages>> getListMessages(Long id);
}
