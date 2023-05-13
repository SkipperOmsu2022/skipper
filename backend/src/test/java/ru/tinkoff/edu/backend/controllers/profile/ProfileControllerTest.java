package ru.tinkoff.edu.backend.controllers.profile;

import static org.mockito.Mockito.when;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;


import ru.tinkoff.edu.backend.controllers.ControllerTestConfiguration;
import ru.tinkoff.edu.backend.dto.profile.UserMentorProfileDTO;
import ru.tinkoff.edu.backend.dto.profile.UserProfileDTO;
import ru.tinkoff.edu.backend.services.MentorProfileService;
import ru.tinkoff.edu.backend.services.ProfileService;

@WebMvcTest(value = ProfileController.class, excludeAutoConfiguration = SecurityAutoConfiguration.class)
@Import(ControllerTestConfiguration.class)
class ProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProfileService profileService;

    @MockBean
    private MentorProfileService mentorProfileService;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void get_mainInfo_thenReturnObjectWithStatus200() throws Exception {
        Long id = 1L;
        UserProfileDTO userProfileDTO = UserProfileDTO.builder()
                .firstName("Ivan")
                .lastName("Ivanov")
                .linkVk("vk.com/ivan")
                .linkTelegram("@teg")
                .linkSkype("sky")
                .linkDiscord("#dis")
                .aboutMe("QA")
                .build();

        when(profileService.getUserProfile(id)).thenReturn(userProfileDTO);

        mockMvc.perform(get("/api/user/profile/" + id))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(userProfileDTO)));
    }

    @Test
    void get_mainMentorInfo_thenReturnObjectWithStatus200() throws Exception{
        Long id = 2L;
        UserMentorProfileDTO userMentorProfileDTO = UserMentorProfileDTO.builder()
                .firstName("Sidr")
                .lastName("Sidorov")
                .linkVk("vk//")
                .linkTelegram("@teg")
                .linkSkype("sky")
                .linkDiscord("#dis")
                .build();

        when(mentorProfileService.getUserMentorProfile(id, null)).thenReturn(userMentorProfileDTO);

        mockMvc.perform(get("/api/user/profile/mentor/" + id))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().json(objectMapper.writeValueAsString(userMentorProfileDTO)));
    }
}
