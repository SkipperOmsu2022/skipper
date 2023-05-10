package ru.tinkoff.edu.backend.services.implementation;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ru.tinkoff.edu.backend.dto.profile.UserMentorProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMentorDTO;
import ru.tinkoff.edu.backend.entities.*;
import ru.tinkoff.edu.backend.enums.FileStorageLocation;
import ru.tinkoff.edu.backend.repositories.*;
import ru.tinkoff.edu.backend.services.FileStorageService;
import ru.tinkoff.edu.backend.services.MentorProfileService;

import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.stream.IntStream;

import static ru.tinkoff.edu.backend.mappers.EducationMapper.educationDTOToEducations;
import static ru.tinkoff.edu.backend.mappers.UserMapper.userToUserEditMentorDTO;
import static ru.tinkoff.edu.backend.mappers.UserMapper.userToUserMentorProfileDTO;
import static ru.tinkoff.edu.backend.mappers.WorkExperienceMapper.workExperienceDTOToWorkExperiences;

@Service
public class MentorProfileServiceImpl implements MentorProfileService {
    private final UserRepository userRepository;
    private final QualificationRepository qualificationRepository;
    private final EducationRepository educationRepository;
    private final WorkExperienceRepository workExperienceRepository;
    private final FileStorageService fileStorageService;
    private final FeedbackRepository feedbackRepository;

    public MentorProfileServiceImpl(UserRepository userRepository, QualificationRepository qualificationRepository,
                                    EducationRepository educationRepository,
                                    WorkExperienceRepository workExperienceRepository,
                                    FileStorageService fileStorageService, FeedbackRepository feedbackRepository) {
        this.userRepository = userRepository;
        this.qualificationRepository = qualificationRepository;
        this.educationRepository = educationRepository;
        this.workExperienceRepository = workExperienceRepository;
        this.fileStorageService = fileStorageService;
        this.feedbackRepository = feedbackRepository;
    }

    @Override
    public UserEditMentorDTO getMentorInfo(Long id) {
        return userToUserEditMentorDTO(userRepository.getReferenceById(id));
    }

    private Qualification getQualificationById(Long id) {
        return qualificationRepository
                .findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Qualification not found"));
    }

    private void deleteCertificateResources(Set<String> certificateResources) {
        certificateResources.forEach(
                e -> fileStorageService
                        .deleteFromFileStorageLocation(FileStorageLocation.USER_CERTIFICATES, e)
        );
    }

    private Set<String> getCertificateResourcesSet(MultipartFile[] certificates, Long id) {
        if (certificates == null) {
            return Collections.emptySet();
        }

        Set<String> certificateResourcesSet = new HashSet<>(certificates.length * 2);
        IntStream.range(0, certificates.length)
                .forEach(i -> {
                    String certificateResource = fileStorageService
                            .save(FileStorageLocation.USER_CERTIFICATES, certificates[i], id + "_" + i);
                    if (!certificateResource.isEmpty()) {
                        certificateResourcesSet.add(certificateResource);
                    }
                });
        return certificateResourcesSet;
    }

    @Transactional
    @Override
    public void updateMentorInfo(Long id, UserEditMentorDTO user, MultipartFile[] certificates) {
        User userFromDB = userRepository.getReferenceById(id);
        userFromDB.setAboutAsMentor(user.getAboutMeAsMentor());
        userFromDB.setIsEnabledMentorStatus(user.getIsEnabledMentorStatus());
        userFromDB.setMentorSpecializations(user.getMentorSpecializations());

        Set<Education> educations =
                educationDTOToEducations(user.getEducations(), userFromDB, this::getQualificationById);

        Set<WorkExperience> workExperiences =
                workExperienceDTOToWorkExperiences(user.getWorkExperiences(), userFromDB);

        deleteCertificateResources(userFromDB.getCertificateResources());
        userFromDB.setCertificateResources(getCertificateResourcesSet(certificates, id));

        educationRepository.deleteEducationsByUser(userFromDB);
        educationRepository.saveAll(educations);

        workExperienceRepository.deleteWorkExperiencesByUser(userFromDB);
        workExperienceRepository.saveAll(workExperiences);

        userRepository.save(userFromDB);
    }

    @Override
    public UserMentorProfileDTO getUserMentorProfile(Long mentorId, Long userId) {
        User mentor = userRepository.getReferenceById(mentorId);
        return userToUserMentorProfileDTO(
                mentor,
                userRepository.hasUserInListOfFavoritesById(userId, mentorId),
                feedbackRepository.getFeedbacksByMentor(mentor, PageRequest
                        .of(0, 4, Sort.by(Sort.Direction.DESC, "dateTime"))
                ).getContent()
        );
    }
}
