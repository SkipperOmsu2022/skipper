package ru.tinkoff.edu.backend.entities;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import ru.tinkoff.edu.backend.entities.feedback.Feedback;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;
import ru.tinkoff.edu.backend.enums.UserGender;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Entity
@Table(name = "USERS")
@SecondaryTable(name = "USERS_MAIN_INFO",
        pkJoinColumns = @PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "id"))
@SecondaryTable(name = "USERS_CONTACTS",
        pkJoinColumns = @PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "id"))
@SecondaryTable(name = "MENTORS",
        pkJoinColumns = @PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "id"))
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;
    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "first_name", nullable = false)
    private String firstName;
    @Column(name = "last_name", nullable = false)
    private String lastName;
    @Column(name = "patronymic")
    private String patronymic;
    @CreatedDate
    @Column(name = "date_registration")
    private LocalDate dateOfRegistration;

    @Column(name = "date_birth", table = "USERS_MAIN_INFO")
    private LocalDate dateBirth;
    @Column(name = "gender", table = "USERS_MAIN_INFO")
    @Enumerated(EnumType.STRING)
    private UserGender userGender;
    @Column(name = "about", table = "USERS_MAIN_INFO", length = 400)
    private String about;
    @Column(name = "image_user_resource", table = "USERS_MAIN_INFO")
    private String imageUserResource;

    @Column(name = "link_vk", table = "USERS_CONTACTS")
    private String linkVk;
    @Column(name = "link_skype", table = "USERS_CONTACTS")
    private String linkSkype;
    @Column(name = "link_discord", table = "USERS_CONTACTS")
    private String linkDiscord;
    @Column(name = "link_telegram", table = "USERS_CONTACTS")
    private String linkTelegram;

    @Column(name = "is_enabled_mentor_status", table = "MENTORS")
    private Boolean isEnabledMentorStatus;
    @Column(name = "about_as_mentor", table = "MENTORS", length = 400)
    private String aboutAsMentor;
    @ElementCollection(targetClass = MentorSpecialization.class)
    @CollectionTable(name = "MENTOR_SPECIALIZATIONS", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    @Column(name = "mentor_specialization")
    private Set<MentorSpecialization> mentorSpecializations;
    @Column(name = "rating", table = "MENTORS")
    private Double rating;

    @OneToMany(mappedBy = "user")
    private Set<Education> education;

    @OneToMany(mappedBy = "user")
    private Set<WorkExperience> workExperiences;

    @ElementCollection
    @CollectionTable(name = "certificate_resources", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "certificate_resource")
    private Set<String> certificateResources;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "favorite_users",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "favorite_user_id"),
            uniqueConstraints = @UniqueConstraint(
                    name = "unique_favorites", columnNames = {"user_id", "favorite_user_id"}
            )
    )
    @OrderColumn(name = "favorite_user_order")
    private List<User> favoriteUsers;

    @OneToMany(mappedBy = "mentor", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderColumn(name = "feedback_order")
    private List<Feedback> feedbacks;

    public void addFavoriteUser(User favoriteUser) {
        favoriteUsers.add(favoriteUser);
    }

    public void deleteFavoriteUser(User favoriteUser) {
        favoriteUsers.remove(favoriteUser);
    }

    public User addFeedback(Feedback feedback) {
        feedbacks.add(feedback);
        return this;
    }

    public void deleteFeedback(Feedback feedback) {
        feedbacks.remove(feedback);
    }

    public String getInlineMentorSpecializations() {
        return mentorSpecializations.stream()
                .map(MentorSpecialization::getStringMentorSpecialization)
                .collect(Collectors.joining(", "));
    }
}
