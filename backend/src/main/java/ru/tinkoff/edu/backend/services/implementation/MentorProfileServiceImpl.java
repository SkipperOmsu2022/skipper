package ru.tinkoff.edu.backend.services.implementation;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.tinkoff.edu.backend.dto.profile.UserMentorProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.EducationDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMentorDTO;
import ru.tinkoff.edu.backend.entities.*;
import ru.tinkoff.edu.backend.repositories.EducationRepository;
import ru.tinkoff.edu.backend.repositories.QualificationRepository;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.repositories.WorkExperienceRepository;
import ru.tinkoff.edu.backend.services.MentorProfileService;

import javax.persistence.EntityNotFoundException;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MentorProfileServiceImpl implements MentorProfileService {
    private final UserRepository userRepository;
    private final QualificationRepository qualificationRepository;
    private final EducationRepository educationRepository;
    private final WorkExperienceRepository workExperienceRepository;
    private final Random rand;

    public MentorProfileServiceImpl(UserRepository userRepository, QualificationRepository qualificationRepository,
                                    EducationRepository educationRepository,
                                    WorkExperienceRepository workExperienceRepository) throws NoSuchAlgorithmException {
        this.userRepository = userRepository;
        this.qualificationRepository = qualificationRepository;
        this.educationRepository = educationRepository;
        this.workExperienceRepository = workExperienceRepository;
        this.rand = SecureRandom.getInstanceStrong();
    }

    @Override
    public UserEditMentorDTO getMentorInfo(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        UserEditMentorDTO user = new UserEditMentorDTO();
        user.setAboutMeAsMentor(userFromDB.getAboutAsMentor());
        user.setIsEnabledMentorStatus(userFromDB.getIsEnabledMentorStatus());
        user.setMentorSpecializations(userFromDB.getMentorSpecializations());

        Set<EducationDTO> educations = userFromDB
                .getEducation()
                .stream()
                .map(e -> EducationDTO.builder()
                        .dateStart(e.getDateStart())
                        .dateEnd(e.getDateEnd())
                        .educationalInstitution(e.getEducationalInstitution())
                        .qualificationNameWithCode(e.getQualification().getNameWithCode())
                        .build())
                .collect(Collectors.toSet());
        user.setEducations(educations);
        return user;
    }

    @Transactional
    @Override
    public void updateUser(Long id, UserEditMentorDTO user) {
        User userFromDB = userRepository.getReferenceById(id);
        userFromDB.setAboutAsMentor(user.getAboutMeAsMentor());
        userFromDB.setIsEnabledMentorStatus(user.getIsEnabledMentorStatus());
        userFromDB.setMentorSpecializations(user.getMentorSpecializations());

        Set<Education> educations = Optional.ofNullable(user.getEducations())
                .orElse(Collections.emptySet())
                .stream()
                .map(e -> {
                            Qualification qualification = qualificationRepository
                                    .findById(e.getQualificationId())
                                    .orElseThrow(() -> new EntityNotFoundException("Qualification not found"));
                            return Education.builder()
                                    .dateStart(e.getDateStart())
                                    .dateEnd(e.getDateEnd())
                                    .educationalInstitution(e.getEducationalInstitution())
                                    .id(new EducationPK(userFromDB.getId(), qualification.getId()))
                                    .qualification(qualification)
                                    .user(userFromDB)
                                    .build();
                        }
                )
                .collect(Collectors.toSet());

        Set<WorkExperience> workExperiences = Optional.ofNullable(user.getWorkExperiences())
                .orElse(Collections.emptySet())
                .stream()
                .map(e -> WorkExperience.builder()
                        .id(new WorkExperiencePK(userFromDB.getId(), e.getPlaceOfWork(), e.getDateStart()))
                        .user(userFromDB)
                        .dateEnd(e.getDateEnd())
                        .build()
                )
                .collect(Collectors.toSet());

        double randomRating = BigDecimal.valueOf(3.5 + (5 - 3.5) * rand
                        .nextDouble())
                .setScale(2, RoundingMode.HALF_UP).doubleValue();
        userFromDB.setRating(randomRating);

        educationRepository.deleteEducationsByUser(userFromDB);
        educationRepository.saveAll(educations);

        workExperienceRepository.deleteWorkExperiencesByUser(userFromDB);
        workExperienceRepository.saveAll(workExperiences);

        userRepository.save(userFromDB);
    }
    @Override
    public UserMentorProfileDTO getUserMentorProfile(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        UserMentorProfileDTO user = new UserMentorProfileDTO();
        user.setFirstName(userFromDB.getFirstName());
        user.setLastName(userFromDB.getLastName());
        user.setPatronymic(userFromDB.getPatronymic());
        user.setAboutAsMentor(userFromDB.getAboutAsMentor());
        user.setImageUserResource(userFromDB.getImageUserResource());
        user.setDateOfRegistration(userFromDB.getDateOfRegistration());
        user.setIsEnabledMentorStatus(userFromDB.getIsEnabledMentorStatus());
        user.setMentorSpecializations(userFromDB.getInlineMentorSpecializations());
        user.setLinkVk(userFromDB.getLinkVk());
        user.setLinkSkype(userFromDB.getLinkSkype());
        user.setLinkDiscord(userFromDB.getLinkDiscord());
        user.setLinkTelegram(userFromDB.getLinkTelegram());
        user.setRating(userFromDB.getRating());
        return user;
    }
}
