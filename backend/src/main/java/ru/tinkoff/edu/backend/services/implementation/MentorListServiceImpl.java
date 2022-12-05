package ru.tinkoff.edu.backend.services.implementation;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.MentorListService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MentorListServiceImpl implements MentorListService {
    private final UserRepository userRepository;

    public MentorListServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<MentorListItemDTO> getMentorList() {
        return userRepository.findAll()
                .stream()
                .filter(User::getIsEnabledMentorStatus)
                .map(user -> MentorListItemDTO.builder()
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .mentorSpecializations(user.getMentorSpecializations())
                        .aboutMeAsMentor(user.getAboutAsMentor())
                        .build()).collect(Collectors.toList());
    }
}
