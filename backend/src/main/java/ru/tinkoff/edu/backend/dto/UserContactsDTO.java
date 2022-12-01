package ru.tinkoff.edu.backend.dto;

import lombok.Data;

@Data
public class UserContactsDTO {
    private String linkVk;
    private String linkSkype;
    private String linkDiscord;
    private String linkTelegram;
}
