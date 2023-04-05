package ru.tinkoff.edu.backend.controllers.profile;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.profile.UserMentorProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.UserProfileDTO;
import ru.tinkoff.edu.backend.services.MentorProfileService;
import ru.tinkoff.edu.backend.services.ProfileService;

/**
 * Данный контроллер отвечает за:
 * <ul>
 *     <li>Получения данных для страницы профиля пользователя</li>
 * </ul>
 */
@RestController
@Validated
@Tag(name="Profile Controller",
        description="Получение данных для страницы профиля пользователя.")
@RequestMapping(value = "/api/user/profile")
@CrossOrigin
public class ProfileController {
    private final ProfileService profileService;
    private final MentorProfileService mentorProfileService;

    public ProfileController(ProfileService profileService, MentorProfileService mentorProfileService) {
        this.profileService = profileService;
        this.mentorProfileService = mentorProfileService;
    }

    @Operation(summary = "Получение информации для страницы обычного пользователя.")
    @GetMapping("/{id}")
    public ResponseEntity<UserProfileDTO> getMainInfo(@PathVariable Long id) {
        UserProfileDTO user = profileService.getUserProfile(id);
        return ResponseEntity.ok(user);
    }

    @Operation(summary = "Получение информации для страницы ментора.")
    @GetMapping("/mentor/{id}")
    public ResponseEntity<UserMentorProfileDTO> getMainMentorInfo(@PathVariable Long id) {
        UserMentorProfileDTO user = mentorProfileService.getUserMentorProfile(id);
        return ResponseEntity.ok(user);
    }
}
