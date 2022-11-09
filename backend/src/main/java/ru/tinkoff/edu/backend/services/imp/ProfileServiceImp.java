package ru.tinkoff.edu.backend.services.imp;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.DTO.UserContactsDTO;
import ru.tinkoff.edu.backend.DTO.UserEditDTO;
import ru.tinkoff.edu.backend.DTO.UserMainInfoDTO;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.exception.DifferentPasswordException;
import ru.tinkoff.edu.backend.exception.IncorrectCurrentPasswordException;
import ru.tinkoff.edu.backend.exception.OldPasswordRepeatNewPasswordException;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.ProfileService;

@Service
public class ProfileServiceImp implements ProfileService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public ProfileServiceImp(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void copyInUserFrom(Long id, UserMainInfoDTO user) {
        User userFromDB = userRepository.getReferenceById(id);
        userFromDB.setFirstName(user.getFirstName());
        userFromDB.setLastName(user.getLastName());
        userFromDB.setPatronymic(user.getPatronymic());
        userFromDB.setUserGender(user.getGender());
        userFromDB.setDateBirth(user.getDateOfBirth());
        userFromDB.setAbout(user.getAboutMe());

        userRepository.save(userFromDB);
    }

    @Override
    public void copyInUserFrom(Long id, UserEditDTO user) throws DifferentPasswordException,
            OldPasswordRepeatNewPasswordException, IncorrectCurrentPasswordException {
        User userFromDB = userRepository.getReferenceById(id);
        if(!passwordEncoder.matches(user.getOldPassword(), userFromDB.getPassword())) {
            throw new IncorrectCurrentPasswordException("Incorrect current password!!");
        }

        if(!user.getNewPassword().equals(user.getRepeatNewPassword())) {
            throw new DifferentPasswordException("The new and the confirming password must match!");
        }

        if(passwordEncoder.matches(user.getNewPassword(), userFromDB.getPassword())) {
            throw new OldPasswordRepeatNewPasswordException("The new password matches the old password!");
        }

        userFromDB.setEmail(user.getEmail());
        userFromDB.setPassword(passwordEncoder.encode(user.getNewPassword()));

        userRepository.save(userFromDB);
    }

    @Override
    public void copyInUserFrom(Long id, UserContactsDTO user) {
        User userFromDB = userRepository.getReferenceById(id);
        userFromDB.setLinkVk(user.getLinkVk());
        userFromDB.setLinkSkype(user.getLinkSkype());
        userFromDB.setLinkDiscord(user.getLinkDiscord());
        userFromDB.setLinkTelegram(user.getLinkTelegram());

        userRepository.save(userFromDB);
    }

    @Override
    public UserMainInfoDTO getMainInfo(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        UserMainInfoDTO user = new UserMainInfoDTO();

        user.setFirstName(userFromDB.getFirstName());
        user.setLastName(userFromDB.getLastName());
        user.setPatronymic(userFromDB.getPatronymic());
        user.setGender(userFromDB.getUserGender());
        user.setDateOfBirth(userFromDB.getDateBirth());
        user.setAboutMe(userFromDB.getAbout());

        return user;
    }

    @Override
    public UserEditDTO getAccountDetails(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        UserEditDTO user = new UserEditDTO();

        user.setEmail(userFromDB.getEmail());

        return user;
    }

    @Override
    public UserContactsDTO getUserContacts(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        UserContactsDTO user = new UserContactsDTO();
        user.setLinkVk(userFromDB.getLinkVk());
        user.setLinkSkype(userFromDB.getLinkSkype());
        user.setLinkDiscord(userFromDB.getLinkDiscord());
        user.setLinkTelegram(userFromDB.getLinkTelegram());

        return user;
    }
}
