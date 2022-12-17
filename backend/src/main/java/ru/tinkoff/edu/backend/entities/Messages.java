package ru.tinkoff.edu.backend.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Table(name = "messages")
@Entity
@Data
@EntityListeners(AuditingEntityListener.class)
public class Messages {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull
    private User userFrom;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToOne(fetch = FetchType.EAGER)
    @NotNull
    private User userTo;
    @Column(name = "text_content")
    @NotNull
    private String messageContent;
    // чтобы time zone с часовым поясом
    @CreatedDate
    @NotNull
    @Column(name = "datetime_send")
    private LocalDateTime dateTimeSend;

    public Long getUserFrom() {
        return userFrom.getId();
    }

    public Long getUserTo() {
        return userTo.getId();
    }
}
