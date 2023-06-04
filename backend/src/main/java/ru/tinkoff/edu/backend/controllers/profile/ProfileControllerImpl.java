package ru.tinkoff.edu.backend.controllers.profile;

import org.springframework.http.ResponseEntity;
import ru.tinkoff.edu.backend.dto.profile.UserMentorProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.UserProfileDTO;
import ru.tinkoff.edu.backend.services.MentorProfileService;
import ru.tinkoff.edu.backend.services.ProfileService;

public class ProfileControllerImpl implements ProfileController {
  private final ProfileService profileService;
  private final MentorProfileService mentorProfileService;

  public ProfileControllerImpl(
      ProfileService profileService, MentorProfileService mentorProfileService) {
    this.profileService = profileService;
    this.mentorProfileService = mentorProfileService;
  }

  @Override
  public ResponseEntity<UserProfileDTO> getUserProfile(Long id) {
    UserProfileDTO user = profileService.getUserProfile(id);
    return ResponseEntity.ok(user);
  }

  @Override
  public ResponseEntity<UserMentorProfileDTO> getMentorProfile(Long mentorId, Long userId) {
    UserMentorProfileDTO user = mentorProfileService.getUserMentorProfile(mentorId, userId);
    return ResponseEntity.ok(user);
  }
}
