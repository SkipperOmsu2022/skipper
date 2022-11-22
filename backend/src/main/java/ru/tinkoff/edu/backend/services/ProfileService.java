package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.UserContactsDTO;
import ru.tinkoff.edu.backend.dto.UserEditDTO;
import ru.tinkoff.edu.backend.dto.UserMainInfoDTO;

@Service
public interface ProfileService {
    void copyInUserFrom(Long id, UserMainInfoDTO user);
    void copyInUserFrom(Long id, UserEditDTO user);
    void copyInUserFrom(Long id, UserContactsDTO user);
    UserMainInfoDTO getMainInfo(Long id);
    UserEditDTO getAccountDetails(Long id);
    UserContactsDTO getUserContacts(Long id);
}
