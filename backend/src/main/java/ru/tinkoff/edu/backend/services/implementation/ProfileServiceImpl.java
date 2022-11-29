package ru.tinkoff.edu.backend.services.implementation;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.*;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.exception.DifferentPasswordException;
import ru.tinkoff.edu.backend.exception.IncorrectCurrentPasswordException;
import ru.tinkoff.edu.backend.exception.OldPasswordRepeatNewPasswordException;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.ProfileService;

@Service
public class ProfileServiceImpl implements ProfileService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public ProfileServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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
    public UserEditDTO getAccountDetails(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        UserEditDTO user = new UserEditDTO();
        user.setEmail(userFromDB.getEmail());
        return user;
    }

    @Override
    public void copyInUserFrom(Long id, UserEditDTO user) {
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
    public UserContactsDTO getUserContacts(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        UserContactsDTO user = new UserContactsDTO();
        user.setLinkVk(userFromDB.getLinkVk());
        user.setLinkSkype(userFromDB.getLinkSkype());
        user.setLinkDiscord(userFromDB.getLinkDiscord());
        user.setLinkTelegram(userFromDB.getLinkTelegram());

        return user;
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
    public UserEditMentorDTO getMentorInfo(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        UserEditMentorDTO user = new UserEditMentorDTO();
        user.setAboutMeAsMentor(userFromDB.getAboutAsMentor());
        user.setIsEnabledMentorStatus(userFromDB.getIsEnabledMentorStatus());
        user.setSpecialization(userFromDB.getSpecialization());
        return user;
    }

    @Override
    public void copyInUserFrom(Long id, UserEditMentorDTO user) {
        User userFromDB = userRepository.getReferenceById(id);
        userFromDB.setAboutAsMentor(user.getAboutMeAsMentor());
        userFromDB.setIsEnabledMentorStatus(user.getIsEnabledMentorStatus());
        userFromDB.setSpecialization(user.getSpecialization());

        userRepository.save(userFromDB);
    }

    @Override
    public UserProfileDTO getUserProfile(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        UserProfileDTO user = new UserProfileDTO();
        user.setFirstName(userFromDB.getFirstName());
        user.setLastName(userFromDB.getLastName());
        user.setPatronymic(userFromDB.getPatronymic());
        user.setAboutMe(userFromDB.getAbout());
        user.setLinkVk(userFromDB.getLinkVk());
        user.setLinkSkype(userFromDB.getLinkSkype());
        user.setLinkDiscord(userFromDB.getLinkDiscord());
        user.setLinkTelegram(userFromDB.getLinkTelegram());
        return user;
    }
}
