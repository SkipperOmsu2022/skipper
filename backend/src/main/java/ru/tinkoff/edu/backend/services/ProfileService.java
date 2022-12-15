package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.*;

@Service
public interface ProfileService {
    UserProfileDTO getUserProfile(Long id);
    UserMentorProfileDTO getUserMentorProfile(Long id);
    void updateUser(Long id, UserEditMainInfoDTO user);
    void updateUser(Long id, UserEditAccountDTO user);
    void updateUser(Long id, UserEditContactsDTO user);
    void updateUser(Long id, UserEditMentorDTO user);
    UserEditMainInfoDTO getMainInfo(Long id);
    UserEditAccountDTO getAccountDetails(Long id);
    UserEditContactsDTO getUserContacts(Long id);
    UserEditMentorDTO getMentorInfo(Long id);
}
