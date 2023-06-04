package ru.tinkoff.edu.backend.services.implementation;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.dto.UserLoginDTO;
import ru.tinkoff.edu.backend.dto.UserRegDTO;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.UserService;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityNotFoundException;

@Service
public class UserServiceImpl implements UserService {
  private final PasswordEncoder passwordEncoder;
  private final UserRepository userRepository;

  public UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository) {
    this.passwordEncoder = passwordEncoder;
    this.userRepository = userRepository;
  }

  @Override
  public User create(UserRegDTO user) {
    user.setEmail(user.getEmail().toLowerCase());
    if (readByEmail(user.getEmail()) != null) {
      throw new EntityExistsException("User already exist!");
    }

    User userFromDB =
        User.builder()
            .firstName(user.getFirstName())
            .lastName(user.getLastName())
            .email(user.getEmail())
            .password(passwordEncoder.encode(user.getPassword()))
            .build();
    return userRepository.save(userFromDB);
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
  public User readByUserLoginDTO(UserLoginDTO user) {
    user.setEmail(user.getEmail().toLowerCase());
    User userFromDB = readByEmail(user.getEmail());
    if (userFromDB == null
        || !passwordEncoder.matches(user.getPassword(), userFromDB.getPassword())) {
      throw new EntityNotFoundException("User not exist!");
    }
    return userFromDB;
  }

  @Override
  public boolean isExistById(Long id) {
    return userRepository.existsById(id);
  }
}
