package ru.tinkoff.edu.backend.services.implementation;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ru.tinkoff.edu.backend.dto.profile.UserMentorProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.EducationDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMentorDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.WorkExperienceDTO;
import ru.tinkoff.edu.backend.entities.*;
import ru.tinkoff.edu.backend.enums.FileStorageLocation;
import ru.tinkoff.edu.backend.exception.IncorrectDateTimeException;
import ru.tinkoff.edu.backend.repositories.EducationRepository;
import ru.tinkoff.edu.backend.repositories.QualificationRepository;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.repositories.WorkExperienceRepository;
import ru.tinkoff.edu.backend.services.FileStorageService;
import ru.tinkoff.edu.backend.services.MentorProfileService;

import javax.persistence.EntityNotFoundException;
import java.time.Year;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MentorProfileServiceImpl implements MentorProfileService {
    private final UserRepository userRepository;
    private final QualificationRepository qualificationRepository;
    private final EducationRepository educationRepository;
    private final WorkExperienceRepository workExperienceRepository;
    private final FileStorageService fileStorageService;

    public MentorProfileServiceImpl(UserRepository userRepository, QualificationRepository qualificationRepository,
                                    EducationRepository educationRepository,
                                    WorkExperienceRepository workExperienceRepository,
                                    FileStorageService fileStorageService) {
        this.userRepository = userRepository;
        this.qualificationRepository = qualificationRepository;
        this.educationRepository = educationRepository;
        this.workExperienceRepository = workExperienceRepository;
        this.fileStorageService = fileStorageService;
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
                        .yearStart(e.getYearStart())
                        .yearEnd(e.getYearEnd())
                        .qualificationId(e.getQualification().getId())
                        .educationalInstitution(e.getEducationalInstitution())
                        .qualificationNameWithCode(e.getQualification().getNameWithCode())
                        .build())
                .collect(Collectors.toSet());

        Set<WorkExperienceDTO> workExperiences = userFromDB
                .getWorkExperiences()
                .stream()
                .map(e -> WorkExperienceDTO.builder()
                        .yearStart(e.getId().getYearStart())
                        .yearEnd(e.getYearEnd())
                        .placeOfWork(e.getId().getPlaceOfWork())
                        .build())
                .collect(Collectors.toSet());

        user.setCertificatesResource(userFromDB.getCertificateResources());
        user.setEducations(educations);
        user.setWorkExperiences(workExperiences);
        return user;
    }

    @Transactional
    @Override
    public void updateMentorInfo(Long id, UserEditMentorDTO user, MultipartFile[] certificates) {
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
                            validateYearRange(e.getYearStart(), e.getYearEnd());
                            validateYearStart(e.getYearStart());
                            return Education.builder()
                                    .yearStart(e.getYearStart())
                                    .yearEnd(e.getYearEnd())
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
                .map(e -> {
                            validateYearRange(e.getYearStart(), e.getYearEnd());
                            validateYearStart(e.getYearStart());
                            return WorkExperience.builder()
                                    .id(new WorkExperiencePK(userFromDB.getId(), e.getPlaceOfWork(), e.getYearStart()))
                                    .user(userFromDB)
                                    .yearEnd(e.getYearEnd())
                                    .build();
                        }
                )
                .collect(Collectors.toSet());

        userFromDB.getCertificateResources().forEach(
                e -> fileStorageService
                        .deleteFromFileStorageLocation(FileStorageLocation.USER_CERTIFICATES, e)
        );

        if (certificates != null) {
            Set<String> certificateResourcesSet = new HashSet<>(certificates.length * 2);

            for (int i = 0; i < certificates.length; ++i) {
                String certificateResource = fileStorageService
                        .save(FileStorageLocation.USER_CERTIFICATES, certificates[i], id + "_" + i);
                if (!certificateResource.isEmpty()) {
                    certificateResourcesSet.add(certificateResource);
                }
            }

            userFromDB.setCertificateResources(certificateResourcesSet);
        }

        educationRepository.deleteEducationsByUser(userFromDB);
        educationRepository.saveAll(educations);

        workExperienceRepository.deleteWorkExperiencesByUser(userFromDB);
        workExperienceRepository.saveAll(workExperiences);

        userRepository.save(userFromDB);
    }

    /**
     * Проверяет правильность диапазона лет и генерирует исключение, если год начала меньше года окончания.
     *
     * @param yearStart дата начала.
     * @param yearEnd   дата конца.
     */
    protected void validateYearRange(Integer yearStart, Integer yearEnd) {
        if (!Objects.isNull(yearEnd) && yearStart > yearEnd) {
            throw new IncorrectDateTimeException("The start year cannot be less");
        }
    }

    /**
     * Проверяет правильность начального года и генерирует исключение, если он находится в будущем времени.
     *
     * @param yearStart год начала.
     */
    protected void validateYearStart(Integer yearStart) {
        if (yearStart > Year.now().getValue()) {
            throw new IncorrectDateTimeException("The beginning cannot be in the future time");
        }
    }

    @Override
    public UserMentorProfileDTO getUserMentorProfile(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        UserMentorProfileDTO user = new UserMentorProfileDTO();
        user.setFirstName(userFromDB.getFirstName());
        user.setLastName(userFromDB.getLastName());
        user.setPatronymic(userFromDB.getPatronymic());
        user.setAboutAsMentor(userFromDB.getAboutAsMentor());

        Set<EducationDTO> educations = userFromDB
                .getEducation()
                .stream()
                .map(e -> EducationDTO.builder()
                        .yearStart(e.getYearStart())
                        .yearEnd(e.getYearEnd())
                        .educationalInstitution(e.getEducationalInstitution())
                        .qualificationNameWithCode(e.getQualification().getNameWithCode())
                        .build())
                .collect(Collectors.toSet());

        Set<WorkExperienceDTO> workExperiences = userFromDB
                .getWorkExperiences()
                .stream()
                .map(e -> WorkExperienceDTO.builder()
                        .yearStart(e.getId().getYearStart())
                        .yearEnd(e.getYearEnd())
                        .placeOfWork(e.getId().getPlaceOfWork())
                        .build())
                .collect(Collectors.toSet());

        user.setEducations(educations);
        user.setWorkExperiences(workExperiences);
        user.setCertificatesResource(userFromDB.getCertificateResources());
        user.setImageUserResource(userFromDB.getImageUserResource());
        user.setDateOfRegistration(userFromDB.getDateOfRegistration());
        user.setIsEnabledMentorStatus(userFromDB.getIsEnabledMentorStatus());
        user.setMentorSpecializations(userFromDB.getInlineMentorSpecializations());
        user.setLinkVk(userFromDB.getLinkVk());
        user.setLinkSkype(userFromDB.getLinkSkype());
        user.setLinkDiscord(userFromDB.getLinkDiscord());
        user.setLinkTelegram(userFromDB.getLinkTelegram());
        return user;
    }
}
