package ru.tinkoff.edu.backend.services.implementation;

import org.apache.commons.lang3.BooleanUtils;
import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;
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
                .filter(user -> BooleanUtils.isTrue(user.getIsEnabledMentorStatus()))
                .map(user -> MentorListItemDTO.builder()
                        .id(user.getId())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .mentorSpecializations(user.getInlineMentorSpecializations())
                        .aboutMeAsMentor(user.getAboutAsMentor())
                        .build()).collect(Collectors.toList());
    }
}
