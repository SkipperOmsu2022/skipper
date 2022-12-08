package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.*;

@Service
public interface ProfileService {
    UserProfileDTO getUserProfile(Long id);
    void updateUser(Long id, UserMainInfoDTO user);
    void updateUser(Long id, UserEditDTO user);
    void updateUser(Long id, UserContactsDTO user);
    void updateUser(Long id, UserEditMentorDTO user);
    UserMainInfoDTO getMainInfo(Long id);
    UserEditDTO getAccountDetails(Long id);
    UserContactsDTO getUserContacts(Long id);
    UserEditMentorDTO getMentorInfo(Long id);
}
