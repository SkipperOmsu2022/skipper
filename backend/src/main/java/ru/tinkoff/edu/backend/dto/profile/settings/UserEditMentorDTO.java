package ru.tinkoff.edu.backend.dto.profile.settings;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserEditMentorDTO {
  @NotNull private Boolean isEnabledMentorStatus;

  @NotBlank
  @Size(max = 400)
  private String aboutMeAsMentor;

  @NotNull
  @Size(min = 1, message = "Mentor specialization must have at least one element!")
  private Set<MentorSpecialization> mentorSpecializations;

  @Valid @NotNull private Set<EducationDTO> educations;
  @Valid @NotNull private Set<WorkExperienceDTO> workExperiences;

  @JsonProperty(access = JsonProperty.Access.READ_ONLY)
  private Set<String> certificatesResource;
}
