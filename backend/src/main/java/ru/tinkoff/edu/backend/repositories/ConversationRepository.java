package ru.tinkoff.edu.backend.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.tinkoff.edu.backend.entities.Conversation;
import ru.tinkoff.edu.backend.entities.Message;
import ru.tinkoff.edu.backend.entities.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    @Query("SELECT c FROM Conversation c JOIN c.users cu " +
            "WHERE cu IN :users " +
            "GROUP BY c HAVING COUNT(DISTINCT cu) = :userCount")
    Optional<Conversation> getConversationByUsersIn(Long userCount, User... users);

    @Query("select c from Conversation c JOIN c.users cu " +
            "where cu.id = :userId")
    List<Conversation> getConversationsByUserId(Pageable pageable, Long userId);

    @Query("SELECT cm FROM Conversation c JOIN c.messages cm " +
            "WHERE c.id = :conversationId " +
            "ORDER BY cm.id DESC")
    List<Message> getMessagesForConversation(Pageable pageable, Long conversationId);
}
