package ru.tinkoff.edu.backend.dto;

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
public class UserRegDTO {
  @NotBlank @Email private String email;
  @NotBlank private String password;
  @NotBlank private String firstName;
  @NotBlank private String lastName;
}
