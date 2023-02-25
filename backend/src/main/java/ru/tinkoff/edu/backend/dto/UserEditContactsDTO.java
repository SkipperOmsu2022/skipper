package ru.tinkoff.edu.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserEditContactsDTO {
    private String linkVk;
    private String linkSkype;
    private String linkDiscord;
    private String linkTelegram;
}
