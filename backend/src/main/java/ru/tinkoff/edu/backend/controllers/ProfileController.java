package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.UserMentorProfileDTO;
import ru.tinkoff.edu.backend.dto.UserProfileDTO;
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

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserProfileDTO> getMainInfo(@PathVariable Long id) {
        UserProfileDTO user = profileService.getUserProfile(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/mentor/{id}")
    public ResponseEntity<UserMentorProfileDTO> getMainMentorInfo(@PathVariable Long id) {
        UserMentorProfileDTO user = profileService.getUserMentorProfile(id);
        return ResponseEntity.ok(user);
    }
}
