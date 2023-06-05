package ru.tinkoff.edu.backend.dto.profile.settings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserEditAccountDTO {
  @NotBlank @Email private String email;

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
