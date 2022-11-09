package ru.tinkoff.edu.backend.entities;

import lombok.*;
import ru.tinkoff.edu.backend.enums.UserGender;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "USERS")
@SecondaryTable(name = "USERS_MAIN_INFO",
        pkJoinColumns = @PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "id"))
@SecondaryTable(name = "USERS_CONTACTS",
        pkJoinColumns = @PrimaryKeyJoinColumn(name = "user_id", referencedColumnName = "id"))
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
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

    @Column(name="date_birth", table = "USERS_MAIN_INFO")
    private LocalDate dateBirth;
    @Column(name="gender", table = "USERS_MAIN_INFO")
    @Enumerated(EnumType.ORDINAL)
    private UserGender userGender;
    @Column(name="about", table = "USERS_MAIN_INFO", length = 400)
    private String about;

    @Column(name="link_vk", table = "USERS_CONTACTS")
    private String linkVk;
    @Column(name="link_skype", table = "USERS_CONTACTS")
    private String linkSkype;
    @Column(name="link_discord", table = "USERS_CONTACTS")
    private String linkDiscord;
    @Column(name="link_telegram", table = "USERS_CONTACTS")
    private String linkTelegram;
}
