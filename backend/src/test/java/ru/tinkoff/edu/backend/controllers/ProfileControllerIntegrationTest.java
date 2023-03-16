package ru.tinkoff.edu.backend.controllers;

import static org.mockito.Mockito.when;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;


import ru.tinkoff.edu.backend.dto.profile.UserMentorProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.UserProfileDTO;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.services.MentorProfileService;
import ru.tinkoff.edu.backend.services.ProfileService;

@AutoConfigureMockMvc
@SpringBootTest
public class ProfileControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProfileService profileService;

    @MockBean
    private MentorProfileService mentorProfileService;

    UserProfileDTO userProfileDTO = UserProfileDTO.builder()
            .firstName("Daniil")
            .lastName("Kromov")
            .linkVk("vk//")
            .linkTelegram("@teg")
            .linkSkype("sky")
            .linkDiscord("#dis")
            .aboutMe("QA")
            .build();

    User user_7 = User.builder()
            .id(7L)
            .email("KromovDan@mail.ru")
            .firstName("Daniil")
            .lastName("Kromov")
            .build();

    UserMentorProfileDTO userMentorProfileDTO = UserMentorProfileDTO.builder()
            .firstName("Ivan")
            .lastName("Lyam")
            .linkVk("vk//")
            .linkTelegram("@teg")
            .linkSkype("sky")
            .linkDiscord("#dis")
            .build();

    User user_8 = User.builder()
            .id(8L)
            .firstName("Ivan")
            .lastName("Lyam")
            .linkVk("vk//")
            .linkTelegram("@teg")
            .linkSkype("sky")
            .linkDiscord("#dis")
            .build();
    @Test
    public void getMainInfo() throws Exception{

        when(profileService.getUserProfile(user_7.getId())).thenReturn(userProfileDTO);

        mockMvc.perform(get("/api/user/profile/7").content("7"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("firstName").value("Daniil"))
                .andExpect(jsonPath("lastName").value("Kromov"))
                .andExpect(jsonPath("aboutMe").value("QA"))
                .andExpect(jsonPath("linkVk").value("vk//"))
                .andExpect(jsonPath("linkSkype").value("sky"))
                .andExpect(jsonPath("linkDiscord").value("#dis"))
                .andExpect(jsonPath("linkTelegram").value("@teg"));

    }

    @Test
    public void getMainMentorInfo() throws Exception{

        when(mentorProfileService.getUserMentorProfile(user_8.getId())).thenReturn(userMentorProfileDTO);

        mockMvc.perform(get("/api/user/profile/mentor/8")
                .content("8"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("firstName").value("Ivan"))
                .andExpect(jsonPath("lastName").value("Lyam"))
                .andExpect(jsonPath("linkVk").value("vk//"))
                .andExpect(jsonPath("linkSkype").value("sky"))
                .andExpect(jsonPath("linkDiscord").value("#dis"))
                .andExpect(jsonPath("linkTelegram").value("@teg"));
    }
}
