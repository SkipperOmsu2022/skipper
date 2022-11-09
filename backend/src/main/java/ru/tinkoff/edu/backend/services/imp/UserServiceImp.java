package ru.tinkoff.edu.backend.services.imp;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.DTO.UserRegDTO;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.UserService;


@Service
public class UserServiceImp implements UserService {
    private final UserRepository userRepository;

    public UserServiceImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User create(UserRegDTO user) {
        User userInDB = User.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
        return userRepository.save(userInDB);
    }

    @Override
    public User readById(Long id) {
        return userRepository.getReferenceById(id);
    }

    @Override
    public User readByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public boolean isExistById(Long id) {
        return userRepository.existsById(id);
    }
}
