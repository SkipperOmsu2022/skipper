package ru.tinkoff.edu.backend.mappers;

import ru.tinkoff.edu.backend.dto.profile.settings.WorkExperienceDTO;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.entities.WorkExperience;
import ru.tinkoff.edu.backend.entities.WorkExperiencePK;

import java.util.Collections;
import java.util.Set;
import java.util.stream.Collectors;

public class WorkExperienceMapper {
  private WorkExperienceMapper() {}

  public static WorkExperienceDTO workExperienceToWorkExperienceDTO(WorkExperience workExperience) {
    if (workExperience == null) {
      return null;
    }

    return WorkExperienceDTO.builder()
        .yearStart(workExperience.getId().getYearStart())
        .yearEnd(workExperience.getYearEnd())
        .placeOfWork(workExperience.getId().getPlaceOfWork())
        .build();
  }

  public static Set<WorkExperienceDTO> workExperienceToWorkExperienceDTOs(
      Set<WorkExperience> workExperiences) {
    if (workExperiences == null) {
      return Collections.emptySet();
    }

    return workExperiences.stream()
        .map(WorkExperienceMapper::workExperienceToWorkExperienceDTO)
        .collect(Collectors.toSet());
  }

  public static WorkExperience workExperienceDTOToWorkExperience(
      WorkExperienceDTO workExperience, User user) {
    if (workExperience == null) {
      return null;
    }

    return WorkExperience.builder()
        .id(
            new WorkExperiencePK(
                user.getId(), workExperience.getPlaceOfWork(), workExperience.getYearStart()))
        .user(user)
        .yearEnd(workExperience.getYearEnd())
        .build();
  }

  public static Set<WorkExperience> workExperienceDTOToWorkExperiences(
      Set<WorkExperienceDTO> workExperiences, User user) {
    if (workExperiences == null) {
      return Collections.emptySet();
    }

    return workExperiences.stream()
        .map(workExperience -> workExperienceDTOToWorkExperience(workExperience, user))
        .collect(Collectors.toSet());
  }
}
