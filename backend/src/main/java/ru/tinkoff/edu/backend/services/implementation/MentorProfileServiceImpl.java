package ru.tinkoff.edu.backend.services.implementation;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ru.tinkoff.edu.backend.dto.profile.UserMentorProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMentorDTO;
import ru.tinkoff.edu.backend.entities.*;
import ru.tinkoff.edu.backend.enums.FileStorageLocation;
import ru.tinkoff.edu.backend.repositories.*;
import ru.tinkoff.edu.backend.services.FeedbackService;
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
  private final FeedbackService feedbackService;

  public MentorProfileServiceImpl(
      UserRepository userRepository,
      QualificationRepository qualificationRepository,
      EducationRepository educationRepository,
      WorkExperienceRepository workExperienceRepository,
      FileStorageService fileStorageService,
      FeedbackService feedbackService) {
    this.userRepository = userRepository;
    this.qualificationRepository = qualificationRepository;
    this.educationRepository = educationRepository;
    this.workExperienceRepository = workExperienceRepository;
    this.fileStorageService = fileStorageService;
    this.feedbackService = feedbackService;
  }

  @Override
  public UserEditMentorDTO getMentorInfo(Long id) {
    return userToUserEditMentorDTO(userRepository.getReferenceById(id));
  }

  @Transactional
  @Override
  public void updateMentorInfo(Long id, UserEditMentorDTO user, MultipartFile[] certificates) {
    User userFromDB = userRepository.getReferenceById(id);
    userFromDB.setAboutAsMentor(user.getAboutMeAsMentor());
    userFromDB.setIsEnabledMentorStatus(user.getIsEnabledMentorStatus());
    userFromDB.setMentorSpecializations(user.getMentorSpecializations());

    educationRepository.deleteEducationsByUser(userFromDB);
    educationRepository.saveAll(
        educationDTOToEducations(user.getEducations(), userFromDB, this::getQualificationById));

    workExperienceRepository.deleteWorkExperiencesByUser(userFromDB);
    workExperienceRepository.saveAll(
        workExperienceDTOToWorkExperiences(user.getWorkExperiences(), userFromDB));

    deleteCertificateResources(userFromDB.getCertificateResources());
    userFromDB.setCertificateResources(getCertificateResourcesSet(certificates, id));

    userRepository.save(userFromDB);
  }

  protected Qualification getQualificationById(Long id) {
    return qualificationRepository
        .findById(id)
        .orElseThrow(() -> new EntityNotFoundException("Qualification not found"));
  }

  protected void deleteCertificateResources(Set<String> certificateResources) {
    certificateResources.forEach(
        e ->
            fileStorageService.deleteFromFileStorageLocation(
                FileStorageLocation.USER_CERTIFICATES, e));
  }

  protected Set<String> getCertificateResourcesSet(MultipartFile[] certificates, Long id) {
    if (certificates == null) {
      return Collections.emptySet();
    }

    Set<String> certificateResourcesSet = new HashSet<>(certificates.length * 2);
    IntStream.range(0, certificates.length)
        .forEach(
            i -> {
              String certificateResource =
                  fileStorageService.save(
                      FileStorageLocation.USER_CERTIFICATES, certificates[i], id + "_" + i);
              if (!certificateResource.isEmpty()) {
                certificateResourcesSet.add(certificateResource);
              }
            });
    return certificateResourcesSet;
  }

  @Override
  public UserMentorProfileDTO getUserMentorProfile(Long mentorId, Long userId) {
    User mentor = userRepository.getMentorById(mentorId);
    return userToUserMentorProfileDTO(
        mentor,
        userRepository.hasUserInListOfFavoritesById(userId, mentorId),
        feedbackService.getLastFeedbacks(mentor, 4));
  }
}
