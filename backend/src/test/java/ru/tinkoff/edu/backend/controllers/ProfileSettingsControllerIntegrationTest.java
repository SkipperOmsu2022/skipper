package ru.tinkoff.edu.backend.controllers;

import static org.mockito.Mockito.when;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import ru.tinkoff.edu.backend.dto.profile.settings.UserEditAccountDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditContactsDTO;
import ru.tinkoff.edu.backend.dto.profile.settings.UserEditMainInfoDTO;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.enums.UserGender;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.ProfileService;

@AutoConfigureMockMvc
@SpringBootTest
public class ProfileSettingsControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProfileService profileService;

    @MockBean
    private UserRepository userRepository;

    ObjectMapper objectMapper = new ObjectMapper();

    UserEditMainInfoDTO userEditMainInfoDTO = UserEditMainInfoDTO.builder()
            .firstName("Ivan")
            .lastName("Babyskin")
            .build();

    User user_3 = User.builder()
            .id(3l)
            .firstName("Ivan")
            .lastName("Babyshkin")
            .email("1234@example")
            .userGender(UserGender.MALE)
            .build();

//    String jsonUser_2 = objectMapper.writeValueAsString(userEditMainInfoDTO);

    UserEditAccountDTO userEditAccountDTO = UserEditAccountDTO.builder()
            .email("123@example")
            .oldPassword("123")
            .newPassword("124")
            .repeatNewPassword("124")
            .build();

    User user_4 = User.builder()
            .id(4L)
            .build();

    UserEditContactsDTO userEditContactsDTO = UserEditContactsDTO.builder()
            .linkVk("vk//")
            .linkTelegram("@tel")
            .linkDiscord("#dis")
            .linkSkype("sky")
            .build();
    User user_5 = User.builder()
            .id(5L)
            .build();

    /*    UserEditMentorDTO userEditMentorDTO = UserEditMentorDTO.builder()
            .build();
    User user_6 = User.builder()
            .id(6L)
            .build();*/

    public ProfileSettingsControllerIntegrationTest() throws JsonProcessingException {
    }

    @Test
    public void getMainInfoSuccess() throws  Exception {

        when(profileService.getMainInfo(user_3.getId())).thenReturn(userEditMainInfoDTO);

        mockMvc.perform(get("/api/user/profile/settings/3")
                .content("3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("firstName").value("Ivan"))
                .andExpect(jsonPath("lastName").value("Babyskin"));
    }

    @Test
    public void editMainInfoSuccess() throws  Exception{

 //       when(profileService.updateUser(user_3.getId(),userEditMainInfoDTO)).thenReturn();

/*        mockMvc.perform(post("/api/user/profile/settings/3")
                .content("3")
                .content(jsonUser_2)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());

*/
    }

    @Test
    public void getAccountDetalisSuccess() throws Exception{

        when(profileService.getAccountDetails(user_4.getId())).thenReturn(userEditAccountDTO);

        mockMvc.perform(get("/api/user/profile/settings/account/4")
                .content("4"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("email").value("123@example"));
    }

    @Test
    public  void editAccountDetailsSuccess() throws Exception{

//        when(profileService.updateUser(user_4.getId(),userEditAccountDTO)).thenReturn();


    }

    @Test
    public  void getUserContactssSuccess() throws Exception{

        when(profileService.getUserContacts(user_5.getId())).thenReturn(userEditContactsDTO);

        mockMvc.perform(get("/api/user/profile/settings/contacts/5")
                        .content("5"))
                .andExpect(status().isOk())
        ;
    }

    @Test
    public  void editUserContactsSuccess() throws Exception{

    }

    @Test
    public  void getMentorSettingsSuccess() throws Exception{

        when(profileService.getUserContacts(user_5.getId())).thenReturn(userEditContactsDTO);

        mockMvc.perform(get("/api/user/profile/settings//mentor/6")
                        .content("6"))
                .andExpect(status().isOk());
    }

    @Test
    public  void editMentorSettingsSuccess() throws Exception{

    }
}
