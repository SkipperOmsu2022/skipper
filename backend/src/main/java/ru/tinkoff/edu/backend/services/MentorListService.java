package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;

import java.util.List;

@Service
public interface MentorListService {
    List<MentorListItemDTO> getMentorList();
}
