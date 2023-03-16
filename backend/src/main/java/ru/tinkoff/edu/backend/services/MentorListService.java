package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.entities.Qualification;

import java.util.List;

@Service
public interface MentorListService {
    List<MentorListItemDTO> getMentorList();
    List<Qualification> getSpecializationMentorList(String query);
}
