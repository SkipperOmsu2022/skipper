package ru.tinkoff.edu.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@Builder
public class UserEditAccountDTO {
    @NotBlank
    @Email
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank
    private String oldPassword;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank
    private String newPassword;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank
    private String repeatNewPassword;
}
