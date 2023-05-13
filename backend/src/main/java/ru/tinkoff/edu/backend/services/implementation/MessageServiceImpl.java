package ru.tinkoff.edu.backend.services.implementation;

import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.conversations.MessageDTO;
import ru.tinkoff.edu.backend.dto.conversations.ConversationDTO;
import ru.tinkoff.edu.backend.dto.conversations.PaginationListConversationDTO;
import ru.tinkoff.edu.backend.entities.Conversation;
import ru.tinkoff.edu.backend.entities.Message;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.repositories.ConversationRepository;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.MessageService;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

import static ru.tinkoff.edu.backend.mappers.ConversationToConversationDTOMapper.conversationToConversationDTO;
import static ru.tinkoff.edu.backend.mappers.MessageMapper.messageToMessageDTO;
import static ru.tinkoff.edu.backend.mappers.MessageMapper.messageToMessageDTOs;


/**
 * Transactional нужен, чтобы извлекать весь контекст в прокси, иначе вызывается исключение LazyInitializationException.
 */
@Log4j2
@Service
@Transactional
public class MessageServiceImpl implements MessageService {
    private final UserRepository userRepository;
    private final ConversationRepository conversationRepository;

    public MessageServiceImpl(UserRepository userRepository, ConversationRepository conversationRepository) {
        this.userRepository = userRepository;
        this.conversationRepository = conversationRepository;
    }

    @Override
    public MessageDTO save(Long userIdTo, Long userIdFrom, MessageDTO messageDTO) {
        return messageToMessageDTO(
                conversationRepository.save(
                        addMessageInConversation(userIdTo, userIdFrom, messageDTO)
                ).getLastMessage()
        );
    }

    /**
     * Добавляет сообщение в диалог между двумя пользователями и возвращает обновленный диалог.
     *
     * @param userIdTo   идентификатор пользователя, который будет получателем сообщения.
     * @param userIdFrom идентификатор пользователя, который отправляет сообщение.
     * @param messageDTO объект типа MessageDTO, содержащий текст сообщения.
     * @return обновленный объект Conversation с добавленным сообщением.
     */
    protected Conversation addMessageInConversation(Long userIdTo, Long userIdFrom, MessageDTO messageDTO) {
        User userTo = userRepository.getReferenceById(userIdTo);
        User userFrom = userRepository.getReferenceById(userIdFrom);
        return getConversation(userTo, userFrom)
                .addMessage(Message.builder()
                        .userSender(userFrom)
                        .messageTextContent(messageDTO.getMessageContent())
                        .build()
                );
    }

    /**
     * Возвращает Conversation по id пользователей, которые участвуют в диалоге. Иначе возвращает новый объект.
     *
     * @return диалог, если он есть, иначе новый.
     */
    protected Conversation getConversation(User user1, User user2) {
        return conversationRepository
                .getConversationByUsersIn(2L, user1, user2)
                .orElseGet(() -> Conversation.builder()
                        .users(new HashSet<>(Arrays.asList(user1, user2)))
                        .build()
                );
    }

    @Override
    public List<ConversationDTO> getListConversations(Long userId, PaginationListConversationDTO dto) {
        return conversationRepository.getConversationsByUserId(
                        PageRequest.of(dto.getOffsetConversations(), dto.getLimitConversations()),
                        userId
                )
                .stream()
                .map(conversation ->
                        conversationToConversationDTO(
                                conversation,
                                conversation.getAnotherUserFromConversation(userId),
                                getListMessagesForConversation(
                                        conversation.getId(),
                                        PageRequest.of(0, dto.getLimitMessages())
                                )
                        )
                )
                .collect(Collectors.toList());
    }

    /**
     * Возвращает постранично сообщения с конца в хронологическом порядке.
     */
    private List<MessageDTO> getListMessagesForConversation(Long conversationId, Pageable pageable) {
        return messageToMessageDTOs(conversationRepository.getMessagesForConversation(
                pageable,
                conversationId
        ))
                .stream()
                .sorted(Comparator.comparing(MessageDTO::getId))
                .collect(Collectors.toList());
    }

    @Override
    public ConversationDTO getUserInfoForConversation(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        return ConversationDTO.builder()
                .userId(userFromDB.getId())
                .firstName(userFromDB.getFirstName())
                .lastName(userFromDB.getLastName())
                .imageUserResource(userFromDB.getImageUserResource())
                .mentorSpecializations(userFromDB.getInlineMentorSpecializations())
                .build();
    }
}
