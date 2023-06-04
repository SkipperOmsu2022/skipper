package ru.tinkoff.edu.backend.controllers.profile.settings;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditAccountDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditContactsDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMainInfoDTO;
import ru.tinkoff.edu.backend.services.ProfileService;

@RestController
public class ProfileSettingsControllerImpl implements ProfileSettingsController {

  private final ProfileService profileService;

  public ProfileSettingsControllerImpl(ProfileService profileService) {
    this.profileService = profileService;
  }

  @Override
  public ResponseEntity<UserEditMainInfoDTO> getMainInfo(Long id) {
    UserEditMainInfoDTO userFromDB = profileService.getMainInfoUser(id);

    return ResponseEntity.ok(userFromDB);
  }

  @Override
  public ResponseEntity<Void> editMainInfo(Long id, UserEditMainInfoDTO user) {
    profileService.updateMainInfoUser(id, user);

    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<UserEditAccountDTO> getAccountDetails(Long id) {
    UserEditAccountDTO user = profileService.getAccountDetailsUser(id);

    return ResponseEntity.ok(user);
  }

  @Override
  public ResponseEntity<Void> editAccountDetails(Long id, UserEditAccountDTO user) {
    profileService.updateAccountDetailsUser(id, user);

    return ResponseEntity.ok().build();
  }

  @Override
  public ResponseEntity<UserEditContactsDTO> getUserContacts(Long id) {
    UserEditContactsDTO user = profileService.getContactsUser(id);

    return ResponseEntity.ok(user);
  }

  @Override
  public ResponseEntity<Void> editUserContacts(Long id, UserEditContactsDTO user) {
    profileService.updateContactsUser(id, user);

    return ResponseEntity.ok().build();
  }
}
