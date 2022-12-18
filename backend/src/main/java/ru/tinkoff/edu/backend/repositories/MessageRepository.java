package ru.tinkoff.edu.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.tinkoff.edu.backend.entities.Messages;
import ru.tinkoff.edu.backend.entities.User;

import javax.validation.constraints.NotNull;
import java.util.List;

public interface MessageRepository extends JpaRepository<Messages, Long> {
    List<Messages> findAllByUserFromOrUserTo(@NotNull User userFrom, @NotNull User userTo);
}
