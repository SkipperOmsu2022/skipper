package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.DTO.UserContactsDTO;
import ru.tinkoff.edu.backend.DTO.UserEditDTO;
import ru.tinkoff.edu.backend.DTO.UserMainInfoDTO;
import ru.tinkoff.edu.backend.exception.DifferentPasswordException;
import ru.tinkoff.edu.backend.exception.IncorrectCurrentPasswordException;
import ru.tinkoff.edu.backend.exception.OldPasswordRepeatNewPasswordException;

@Service
public interface ProfileService {
    void copyInUserFrom(Long id, UserMainInfoDTO user);
    void copyInUserFrom(Long id, UserEditDTO user) throws DifferentPasswordException,
            OldPasswordRepeatNewPasswordException, IncorrectCurrentPasswordException;
    void copyInUserFrom(Long id, UserContactsDTO user);
    UserMainInfoDTO getMainInfo(Long id);
    UserEditDTO getAccountDetails(Long id);
    UserContactsDTO getUserContacts(Long id);
}
