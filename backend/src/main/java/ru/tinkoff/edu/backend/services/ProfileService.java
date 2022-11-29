package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.*;

@Service
public interface ProfileService {
    UserProfileDTO getUserProfile(Long id);
    void copyInUserFrom(Long id, UserMainInfoDTO user);
    void copyInUserFrom(Long id, UserEditDTO user);
    void copyInUserFrom(Long id, UserContactsDTO user);
    void copyInUserFrom(Long id, UserEditMentorDTO user);
    UserMainInfoDTO getMainInfo(Long id);
    UserEditDTO getAccountDetails(Long id);
    UserContactsDTO getUserContacts(Long id);
    UserEditMentorDTO getMentorInfo(Long id);
}
