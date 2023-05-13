package ru.tinkoff.edu.backend.entities;

import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Table(name = "conversations")
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Conversation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    private Set<User> users;

    @OneToMany(mappedBy = "conversation", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<Message> messages = new ArrayList<>();

    public Conversation addMessage(Message message) {
        message.setConversation(this);
        messages.add(message);
        return this;
    }

    public Message getLastMessage() {
        return messages.get(messages.size() - 1);
    }

    public User getAnotherUserFromConversation(Long userId) {
        return users.stream()
                .filter(u -> !u.getId().equals(userId))
                .findFirst()
                .orElseThrow(() -> new EntityNotFoundException("User not found!"));
    }
}
