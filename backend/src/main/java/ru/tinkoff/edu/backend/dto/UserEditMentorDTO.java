package ru.tinkoff.edu.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEditMentorDTO {
    @NotNull
    private Boolean isEnabledMentorStatus;
    @NotBlank
    @Size(max = 400)
    private String aboutMeAsMentor;
    @NotNull
    @Size(min = 1, message
            = "Mentor specialization must have at least one element!")
    private Set<MentorSpecialization> mentorSpecializations;
}
