package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.profile.UserMentorProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMentorDTO;

@Service
public interface MentorProfileService {
    UserMentorProfileDTO getUserMentorProfile(Long id);
    void updateUser(Long id, UserEditMentorDTO user);
    UserEditMentorDTO getMentorInfo(Long id);
}
