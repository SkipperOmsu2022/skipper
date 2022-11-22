package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import ru.tinkoff.edu.backend.dto.UserContactsDTO;
import ru.tinkoff.edu.backend.dto.UserEditDTO;
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
@Tag(name="Profile Controller", description="Контроллер отвечает за изменение данных в профиле пользователя.")
@RequestMapping(value = "/api/user")
@CrossOrigin
public class ProfileController {
    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<UserMainInfoDTO> getMainInfo(@PathVariable Long id) {
        UserMainInfoDTO userFromDB = profileService.getMainInfo(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .contentType(MediaType.APPLICATION_JSON)
                .body(userFromDB);
    }

    @PutMapping("/{id}")
    @ResponseBody
    public ResponseEntity<String> editMainInfo(@PathVariable Long id, @Valid @RequestBody UserMainInfoDTO user) {
        profileService.copyInUserFrom(id, user);

        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Location", "/api/user/" + id)
                .build();
    }

    @GetMapping("/account/{id}")
    @ResponseBody
    public ResponseEntity<UserEditDTO> getAccountDetails(@PathVariable Long id) {
        UserEditDTO user = profileService.getAccountDetails(id);

        return ResponseEntity
                .ok()
                .header("Location", "/api/user/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .body(user);
    }

    @PutMapping("/account/{id}")
    @ResponseBody
    public ResponseEntity<String> editAccountDetails(@PathVariable Long id, @Valid @RequestBody UserEditDTO user) {
        profileService.copyInUserFrom(id, user);


        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Location", "/api/user/" + id)
                .build();
    }

    @GetMapping("/contacts/{id}")
    @ResponseBody
    public ResponseEntity<UserContactsDTO> getUserContacts(@PathVariable Long id) {
        UserContactsDTO user = profileService.getUserContacts(id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Location", "/api/user/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .body(user);
    }

    @PutMapping("/contacts/{id}")
    @ResponseBody
    public ResponseEntity<String> editUserContacts(@PathVariable Long id, @Valid @RequestBody UserContactsDTO user) {
        profileService.copyInUserFrom(id, user);

        return ResponseEntity
                .status(HttpStatus.OK)
                .header("Location", "/api/user/" + id)
                .build();
    }
}
