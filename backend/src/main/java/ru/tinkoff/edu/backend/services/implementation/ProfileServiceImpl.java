package ru.tinkoff.edu.backend.services.implementation;

import lombok.extern.log4j.Log4j2;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.*;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.exception.DifferentPasswordException;
import ru.tinkoff.edu.backend.exception.IncorrectCurrentPasswordException;
import ru.tinkoff.edu.backend.exception.OldPasswordRepeatNewPasswordException;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.FileStorageService;
import ru.tinkoff.edu.backend.services.ProfileService;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

@Service
@Log4j2
public class ProfileServiceImpl implements ProfileService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final FileStorageService fileStorageService;
    private final Random rand;

    public ProfileServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder,
                              FileStorageService fileStorageService) throws NoSuchAlgorithmException {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.fileStorageService = fileStorageService;
        this.rand = SecureRandom.getInstanceStrong();
    }

    @Override
    public UserEditMainInfoDTO getMainInfo(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        UserEditMainInfoDTO user = new UserEditMainInfoDTO();

        user.setFirstName(userFromDB.getFirstName());
        user.setLastName(userFromDB.getLastName());
        user.setPatronymic(userFromDB.getPatronymic());
        user.setGender(userFromDB.getUserGender());
        user.setDateOfBirth(userFromDB.getDateBirth());
        user.setAboutMe(userFromDB.getAbout());
        user.setImageUserResource(userFromDB.getImageUserResource());

        return user;
    }

    @Override
    public void updateUser(Long id, UserEditMainInfoDTO user) {
        User userFromDB = userRepository.getReferenceById(id);
        userFromDB.setFirstName(user.getFirstName());
        userFromDB.setLastName(user.getLastName());
        userFromDB.setPatronymic(user.getPatronymic());
        userFromDB.setUserGender(user.getGender());
        userFromDB.setDateBirth(user.getDateOfBirth());
        userFromDB.setAbout(user.getAboutMe());

        String imageUserResource = fileStorageService.save(user.getFile(), String.valueOf(id));
        userFromDB.setImageUserResource(imageUserResource.isEmpty()
                ? null
                : imageUserResource);

        userRepository.save(userFromDB);
    }

    @Override
    public UserEditAccountDTO getAccountDetails(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        UserEditAccountDTO user = new UserEditAccountDTO();
        user.setEmail(userFromDB.getEmail());
        return user;
    }

    @Override
    public void updateUser(Long id, UserEditAccountDTO user) {
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
    public UserEditContactsDTO getUserContacts(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        UserEditContactsDTO user = new UserEditContactsDTO();
        user.setLinkVk(userFromDB.getLinkVk());
        user.setLinkSkype(userFromDB.getLinkSkype());
        user.setLinkDiscord(userFromDB.getLinkDiscord());
        user.setLinkTelegram(userFromDB.getLinkTelegram());

        return user;
    }

    @Override
    public void updateUser(Long id, UserEditContactsDTO user) {
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
        user.setMentorSpecializations(userFromDB.getMentorSpecializations());
        return user;
    }

    @Override
    public void updateUser(Long id, UserEditMentorDTO user) {
        User userFromDB = userRepository.getReferenceById(id);
        userFromDB.setAboutAsMentor(user.getAboutMeAsMentor());
        userFromDB.setIsEnabledMentorStatus(user.getIsEnabledMentorStatus());
        userFromDB.setMentorSpecializations(user.getMentorSpecializations());

        double randomRating = BigDecimal.valueOf(3.5 + (5 - 3.5) * rand
                .nextDouble())
                .setScale(2, RoundingMode.HALF_UP).doubleValue();
        userFromDB.setRating(randomRating);

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
        user.setImageUserResource(userFromDB.getImageUserResource());
        user.setDateOfRegistration(userFromDB.getDateOfRegistration());
        user.setIsEnabledMentorStatus(userFromDB.getIsEnabledMentorStatus());
        user.setMentorSpecializations(userFromDB.getInlineMentorSpecializations());
        user.setLinkVk(userFromDB.getLinkVk());
        user.setLinkSkype(userFromDB.getLinkSkype());
        user.setLinkDiscord(userFromDB.getLinkDiscord());
        user.setLinkTelegram(userFromDB.getLinkTelegram());
        return user;
    }

    @Override
    public UserMentorProfileDTO getUserMentorProfile(Long id) {
        User userFromDB = userRepository.getReferenceById(id);
        UserMentorProfileDTO user = new UserMentorProfileDTO();
        user.setFirstName(userFromDB.getFirstName());
        user.setLastName(userFromDB.getLastName());
        user.setPatronymic(userFromDB.getPatronymic());
        user.setAboutAsMentor(userFromDB.getAboutAsMentor());
        user.setImageUserResource(userFromDB.getImageUserResource());
        user.setDateOfRegistration(userFromDB.getDateOfRegistration());
        user.setIsEnabledMentorStatus(userFromDB.getIsEnabledMentorStatus());
        user.setMentorSpecializations(userFromDB.getInlineMentorSpecializations());
        user.setLinkVk(userFromDB.getLinkVk());
        user.setLinkSkype(userFromDB.getLinkSkype());
        user.setLinkDiscord(userFromDB.getLinkDiscord());
        user.setLinkTelegram(userFromDB.getLinkTelegram());
        user.setRating(user.getRating());
        return user;
    }
}
