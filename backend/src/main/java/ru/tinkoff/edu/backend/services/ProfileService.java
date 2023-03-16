package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.profile.UserProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditAccountDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditContactsDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMainInfoDTO;

@Service
public interface ProfileService {
    UserProfileDTO getUserProfile(Long id);
    void updateUser(Long id, UserEditMainInfoDTO user);
    void updateUser(Long id, UserEditAccountDTO user);
    void updateUser(Long id, UserEditContactsDTO user);
    UserEditMainInfoDTO getMainInfo(Long id);
    UserEditAccountDTO getAccountDetails(Long id);
    UserEditContactsDTO getUserContacts(Long id);
}
