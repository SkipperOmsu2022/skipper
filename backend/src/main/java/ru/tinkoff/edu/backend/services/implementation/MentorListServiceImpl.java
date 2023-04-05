package ru.tinkoff.edu.backend.services.implementation;

import org.apache.commons.lang3.BooleanUtils;
import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.entities.Qualification;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;
import ru.tinkoff.edu.backend.repositories.QualificationRepository;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.MentorListService;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MentorListServiceImpl implements MentorListService {
    private final UserRepository userRepository;
    private final QualificationRepository qualificationRepository;

    public MentorListServiceImpl(UserRepository userRepository, QualificationRepository qualificationRepository) {
        this.userRepository = userRepository;
        this.qualificationRepository = qualificationRepository;
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
                        .imageUserResource(user.getImageUserResource())
                        .rating(user.getRating())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public List<Qualification> getSpecializationMentorList(String query) {
        return qualificationRepository.getSpecializationMentorByNameContainsIgnoreCase(query);
    }

    @Override
    public Map<MentorSpecialization, String> getMapMentorSpecialization() {
        return MentorSpecialization.getMapMentorSpecialization();
    }
}
