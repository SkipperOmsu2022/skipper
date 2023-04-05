package ru.tinkoff.edu.backend.dto.profile.settings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
import ru.tinkoff.edu.backend.enums.UserGender;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserEditMainInfoDTO {
    @NotBlank
    private String firstName;
    @NotBlank
    private String lastName;
    @NotNull
    private String patronymic;
    @Past
    private LocalDate dateOfBirth;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private MultipartFile file;
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private String imageUserResource;
    private UserGender gender;
    @Size(max = 400)
    private String aboutMe;
}
