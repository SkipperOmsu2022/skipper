package ru.tinkoff.edu.backend.controllers.profile.settings;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMentorDTO;
import ru.tinkoff.edu.backend.services.MentorProfileService;

import javax.validation.Valid;

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
    private final MentorProfileService mentorProfileService;

    @Operation(summary = "Получение информации о менторских настройках пользователя.")
    @GetMapping("/{id}")
    public ResponseEntity<UserEditMentorDTO> getMentorSettings(@PathVariable Long id) {
        UserEditMentorDTO user = mentorProfileService.getMentorInfo(id);
        return ResponseEntity
                .ok(user);
    }

    @Operation(summary = "Изменение информации о менторских настройках пользователя.", description = "Менторские " +
            "специальности и менторское образование перезаписывается! В каждом запросе нужно отправлять всё что" +
            "нужно сохранить!")
    @PutMapping("/{id}")
    public ResponseEntity<Void> editMentorSettings(@PathVariable Long id,
                                                   @Valid @RequestBody UserEditMentorDTO user) {
        mentorProfileService.updateUser(id, user);
        return ResponseEntity.ok().build();
    }
}
