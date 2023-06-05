package ru.tinkoff.edu.backend.controllers.profile.settings.mentor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMentorDTO;
import ru.tinkoff.edu.backend.services.MentorProfileService;

@RestController
public class MentorProfileSettingsControllerImpl implements MentorProfileSettingsController {
  private final MentorProfileService mentorProfileService;

  public MentorProfileSettingsControllerImpl(MentorProfileService mentorProfileService) {
    this.mentorProfileService = mentorProfileService;
  }

  @Override
  public ResponseEntity<UserEditMentorDTO> getMentorSettings(Long id) {
    UserEditMentorDTO user = mentorProfileService.getMentorInfo(id);
    return ResponseEntity.ok(user);
  }

  @Override
  public ResponseEntity<Void> editMentorSettings(
      Long id, UserEditMentorDTO user, MultipartFile[] certificates) {
    mentorProfileService.updateMentorInfo(id, user, certificates);
    return ResponseEntity.ok().build();
  }
}
