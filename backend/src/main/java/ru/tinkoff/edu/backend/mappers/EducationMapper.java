package ru.tinkoff.edu.backend.mappers;

import ru.tinkoff.edu.backend.dto.profile.settings.EducationDTO;
import ru.tinkoff.edu.backend.entities.Education;
import ru.tinkoff.edu.backend.entities.EducationPK;
import ru.tinkoff.edu.backend.entities.Qualification;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.exception.IncorrectDateTimeException;

import java.time.Year;
import java.util.Collections;
import java.util.Objects;
import java.util.Set;
import java.util.function.LongFunction;
import java.util.stream.Collectors;

public class EducationMapper {
    private EducationMapper() {
    }

    public static EducationDTO educationToEducationDTO(Education education) {
        if (education == null) {
            return null;
        }

        return EducationDTO.builder()
                .yearStart(education.getYearStart())
                .yearEnd(education.getYearEnd())
                .qualificationId(education.getQualification().getId())
                .educationalInstitution(education.getEducationalInstitution())
                .qualificationNameWithCode(education.getQualification().getNameWithCode())
                .build();
    }

    public static Set<EducationDTO> educationToEducationDTOs(Set<Education> educations) {
        if (educations == null) {
            return Collections.emptySet();
        }

        return educations
                .stream()
                .map(EducationMapper::educationToEducationDTO)
                .collect(Collectors.toSet());
    }

    public static Education educationDTOToEducation(EducationDTO education, User user, Qualification qualification) {
        if (education == null) {
            return null;
        }

        return Education.builder()
                .yearStart(education.getYearStart())
                .yearEnd(education.getYearEnd())
                .educationalInstitution(education.getEducationalInstitution())
                .id(new EducationPK(user.getId(), qualification.getId()))
                .qualification(qualification)
                .user(user)
                .build();
    }

    public static Set<Education> educationDTOToEducations(Set<EducationDTO> educations, User user,
                                                          LongFunction<Qualification> qualificationFunction) {
        if (educations == null) {
            return Collections.emptySet();
        }

        return educations
                .stream()
                .map(education -> {
                    validateYearRange(education.getYearStart(), education.getYearEnd());
                    validateYearStart(education.getYearStart());
                    return educationDTOToEducation(
                            education,
                            user,
                            qualificationFunction
                                    .apply(education.getQualificationId()));
                })
                .collect(Collectors.toSet());
    }

    /**
     * Проверяет правильность диапазона лет и генерирует исключение, если год начала меньше года окончания.
     *
     * @param yearStart дата начала.
     * @param yearEnd   дата конца.
     */
    protected static void validateYearRange(Integer yearStart, Integer yearEnd) {
        if (!Objects.isNull(yearEnd) && yearStart > yearEnd) {
            throw new IncorrectDateTimeException("The start year cannot be less");
        }
    }

    /**
     * Проверяет правильность начального года и генерирует исключение, если он находится в будущем времени.
     *
     * @param yearStart год начала.
     */
    protected static void validateYearStart(Integer yearStart) {
        if (yearStart > Year.now().getValue()) {
            throw new IncorrectDateTimeException("The beginning cannot be in the future time");
        }
    }
}
