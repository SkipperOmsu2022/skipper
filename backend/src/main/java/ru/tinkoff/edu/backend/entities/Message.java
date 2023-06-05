package ru.tinkoff.edu.backend.entities;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Table(name = "messages")
@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Message {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @OneToOne(fetch = FetchType.EAGER)
  @NotNull
  private User userSender;

  @Column(name = "text_content", nullable = false)
  private String messageTextContent;

  @CreatedDate
  @Column(name = "datetime_send", nullable = false)
  private LocalDateTime dateTimeSend;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "conversation_id")
  private Conversation conversation;
}
