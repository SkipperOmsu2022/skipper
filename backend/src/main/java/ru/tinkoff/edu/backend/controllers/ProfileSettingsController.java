package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.UserContactsDTO;
import ru.tinkoff.edu.backend.dto.UserEditDTO;
import ru.tinkoff.edu.backend.dto.UserEditMentorDTO;
import ru.tinkoff.edu.backend.dto.UserMainInfoDTO;
import ru.tinkoff.edu.backend.services.ProfileService;

import javax.validation.Valid;

/**
 * Данный контроллер отвечает за:
 * <ul>
 *      <li> Изменения данных пользователя</li>
 * </ul>
 */
@RestController
@Validated
@Tag(name="Profile Settings Controller", description="Изменение данных в профиле пользователя.")
@RequestMapping(value = "/api/user/profile/settings")
@CrossOrigin
public class ProfileSettingsController {
    private final ProfileService profileService;

    public ProfileSettingsController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserMainInfoDTO> getMainInfo(@PathVariable Long id) {
        UserMainInfoDTO userFromDB = profileService.getMainInfo(id);

        return ResponseEntity
                .ok(userFromDB);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> editMainInfo(@PathVariable Long id, @Valid @RequestBody UserMainInfoDTO user) {
        profileService.updateUser(id, user);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/account/{id}")
    public ResponseEntity<UserEditDTO> getAccountDetails(@PathVariable Long id) {
        UserEditDTO user = profileService.getAccountDetails(id);

        return ResponseEntity
                .ok(user);
    }

    @PutMapping("/account/{id}")
    public ResponseEntity<String> editAccountDetails(@PathVariable Long id, @Valid @RequestBody UserEditDTO user) {
        profileService.updateUser(id, user);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/contacts/{id}")
    public ResponseEntity<UserContactsDTO> getUserContacts(@PathVariable Long id) {
        UserContactsDTO user = profileService.getUserContacts(id);

        return ResponseEntity
                .ok(user);
    }

    @PutMapping("/contacts/{id}")
    public ResponseEntity<String> editUserContacts(@PathVariable Long id, @Valid @RequestBody UserContactsDTO user) {
        profileService.updateUser(id, user);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/mentor/{id}")
    public ResponseEntity<UserEditMentorDTO> getMentorSettings(@PathVariable Long id) {
        UserEditMentorDTO user = profileService.getMentorInfo(id);
        return ResponseEntity
                .ok(user);
    }

    @PutMapping("/mentor/{id}")
    public ResponseEntity<String> editMentorSettings(@PathVariable Long id,
                                                     @Valid @RequestBody UserEditMentorDTO user) {
        profileService.updateUser(id, user);
        return ResponseEntity.ok().build();
    }
}
