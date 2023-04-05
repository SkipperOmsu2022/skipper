package ru.tinkoff.edu.backend.services.implementation;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.MessageDTO;
import ru.tinkoff.edu.backend.dto.UserConversationDTO;
import ru.tinkoff.edu.backend.entities.Messages;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.repositories.MessageRepository;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.MessageService;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;


/**
 * Transactional нужен, чтобы извлекать весь контекст в прокси, иначе вызывается исключение LazyInitializationException.
 */
@Log4j2
@Service
@Transactional
public class MessageServiceImpl implements MessageService {
    private final MessageRepository messageRepository;
    private final UserRepository userRepository;

    public MessageServiceImpl(MessageRepository messageRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.userRepository = userRepository;
    }

    @Override
    public MessageDTO save(Long userIdTo, Long userIdFrom, MessageDTO messageDTO) {
        User userTo = userRepository.getReferenceById(userIdTo);
        User userFrom = userRepository.getReferenceById(userIdFrom);

        Messages message = new Messages();
        message.setMessageContent(messageDTO.getMessageContent());
        message.setUserTo(userTo);
        message.setUserFrom(userFrom);
        message = messageRepository.save(message);

        messageDTO.setId(message.getId());
        messageDTO.setDateTimeSend(message.getDateTimeSend());
        messageDTO.setUserFrom(message.getUserFrom());

        return messageDTO;
    }

    @Override
    public Set<UserConversationDTO> getListMessages(Long id) {
        User user = userRepository.getReferenceById(id);
        List<Messages> messages = messageRepository.findAllByUserFromOrUserTo(user, user);
        Map<Long, Set<Messages>> messagesMap = new HashMap<>();

        for(Messages m: messages) {
            if(!(Objects.equals(m.getUserFrom(), id))) {
                messagesMap.merge(m.getUserFrom(), Collections.singleton(m),
                        (oldValue, value) ->
                                Stream.concat(oldValue.stream(), value.stream()).collect(Collectors.toSet()));
            } else if(!(Objects.equals(m.getUserTo(), id))) {
                messagesMap.merge(m.getUserTo(), Collections.singleton(m),
                        (oldValue, value) ->
                                Stream.concat(oldValue.stream(),value.stream()).collect(Collectors.toSet()));
            }
        }

        return messagesMap.keySet().stream().map(userId -> {
            User tempUser = userRepository.getReferenceById(userId);
            return UserConversationDTO.builder()
                    .userId(tempUser.getId())
                    .firstName(tempUser.getFirstName())
                    .lastName(tempUser.getLastName())
                    .imageUserResource(tempUser.getImageUserResource())
                    .mentorSpecializations(tempUser.getInlineMentorSpecializations())
                    .messages(messagesMap.get(userId))
                    .build();
        }).collect(Collectors.toSet());
    }

    @Override
    public UserConversationDTO getUserInfoForConversation(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        return UserConversationDTO.builder()
                .userId(userFromDB.getId())
                .firstName(userFromDB.getFirstName())
                .lastName(userFromDB.getLastName())
                .imageUserResource(userFromDB.getImageUserResource())
                .mentorSpecializations(userFromDB.getInlineMentorSpecializations())
                .build();
    }
}
