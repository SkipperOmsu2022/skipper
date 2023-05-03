package ru.tinkoff.edu.backend.services.implementation;

import org.springframework.stereotype.Service;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.exception.AddingToFavoriteException;
import ru.tinkoff.edu.backend.repositories.UserRepository;
import ru.tinkoff.edu.backend.services.FavoriteUserService;

@Service
public class FavoriteUserServiceImpl implements FavoriteUserService {
    private final UserRepository userRepository;

    public FavoriteUserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void addFavoriteMentor(Long userId, Long favoriteUserId) {
        if(userId.equals(favoriteUserId)) {
            throw new AddingToFavoriteException("You can't add yourself to favorites");
        }
        User user = userRepository.getReferenceById(userId);
        user.addFavoriteUser(userRepository.getReferenceById(favoriteUserId));
        userRepository.save(user);
    }

    @Override
    public void deleteFavoriteMentor(Long userId, Long favoriteUserId) {
        User user = userRepository.getReferenceById(userId);
        user.deleteFavoriteUser(userRepository.getReferenceById(favoriteUserId));
        userRepository.save(user);
    }
}
