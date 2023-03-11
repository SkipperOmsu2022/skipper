package ru.tinkoff.edu.backend.controllers.profile.settings;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.entities.Qualification;
import ru.tinkoff.edu.backend.dto.UserEditMentorDTO;
import ru.tinkoff.edu.backend.services.ProfileService;

import javax.validation.Valid;
import java.util.List;

/**
 * Данный контроллер отвечает за:
 *  <ul>
 *       <li> Изменения менторских данных пользователя.</li>
 *  </ul>
 * */
@RestController
@Validated
@Tag(name="Mentor Profile Settings Controller", description="Изменение менторских данных в профиле пользователя.")
@RequestMapping(value = "/api/user/profile/settings/mentor")
@CrossOrigin
@RequiredArgsConstructor
@Log4j2
public class MentorProfileSettingsController {
    private final ProfileService profileService;

    @Operation(summary = "Получение информации о менторских настройках пользователя.")
    @GetMapping("/{id}")
    public ResponseEntity<UserEditMentorDTO> getMentorSettings(@PathVariable Long id) {
        UserEditMentorDTO user = profileService.getMentorInfo(id);
        return ResponseEntity
                .ok(user);
    }

    @Operation(summary = "Изменение информации о менторских настройках пользователя.")
    @ApiResponse(content = @Content(schema = @Schema(hidden = true)))
    @PutMapping("/{id}")
    public ResponseEntity<Void> editMentorSettings(@PathVariable Long id,
                                                   @Valid @RequestBody UserEditMentorDTO user) {
        profileService.updateUser(id, user);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "Список всех специальностей Российской Федерации.")
    @GetMapping("/edu")
    public ResponseEntity<List<Qualification>> getEducationRU(@RequestParam String query) {
        return ResponseEntity.ok(profileService.getSpecializationMentorList(query));
    }
}
