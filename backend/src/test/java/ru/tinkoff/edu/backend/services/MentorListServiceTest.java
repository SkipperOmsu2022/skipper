package ru.tinkoff.edu.backend.services;

import org.assertj.core.util.Lists;
import org.assertj.core.util.Sets;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import ru.tinkoff.edu.backend.dto.MentorListItemDTO;
import ru.tinkoff.edu.backend.entities.Qualification;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.enums.MentorSpecialization;
import ru.tinkoff.edu.backend.repositories.QualificationRepository;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.implementation.MentorListServiceImpl;

import java.util.List;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class MentorListServiceTest {
  @Mock private UserRepository userRepository;
  @Mock private QualificationRepository qualificationRepository;
  @InjectMocks private MentorListServiceImpl mentorListService;

  List<MentorListItemDTO> expectedListMentorListItemDTO =
      Lists.list(
          MentorListItemDTO.builder()
              .id(1L)
              .firstName("Ivan")
              .lastName("Ivanov")
              .aboutMeAsMentor("I am a mentor!")
              .mentorSpecializations(
                  MentorSpecialization.ACCOUNTING.getStringMentorSpecialization())
              .build(),
          MentorListItemDTO.builder()
              .id(2L)
              .firstName("Petr")
              .lastName("Petrov")
              .aboutMeAsMentor("I am a mentor2!")
              .mentorSpecializations(MentorSpecialization.DEV_OPS.getStringMentorSpecialization())
              .build());

  List<User> listUser =
      Lists.list(
          User.builder()
              .id(1L)
              .firstName("Ivan")
              .lastName("Ivanov")
              .isEnabledMentorStatus(true)
              .mentorSpecializations(Sets.set(MentorSpecialization.ACCOUNTING))
              .aboutAsMentor("I am a mentor!")
              .build(),
          User.builder()
              .id(2L)
              .firstName("Petr")
              .lastName("Petrov")
              .isEnabledMentorStatus(true)
              .mentorSpecializations(Sets.set(MentorSpecialization.DEV_OPS))
              .aboutAsMentor("I am a mentor2!")
              .build());

  @Test
  void getSpecializationMentorList_thenReturnMentorList() {
    String nameSpecializationMentor = "Комп";
    List<Qualification> qualificationsListExpected =
        Lists.list(
            new Qualification(1L, "10.05.01", "Компьютерная безопасность"),
            new Qualification(2L, "09.01.02", "Наладчик компьютерных сетей"));

    when(qualificationRepository.getSpecializationMentorByNameContainsIgnoreCase(
            nameSpecializationMentor))
        .thenReturn(qualificationsListExpected);

    List<Qualification> qualificationListActual =
        mentorListService.getSpecializationMentorList(nameSpecializationMentor);

    Assertions.assertEquals(qualificationsListExpected, qualificationListActual);
  }

  @Test
  void getMapMentorSpecialization_thenReturnMapMentorSpecialization() {
    Assertions.assertEquals(
        MentorSpecialization.getMapMentorSpecialization(),
        mentorListService.getMapMentorSpecialization());
  }
}
