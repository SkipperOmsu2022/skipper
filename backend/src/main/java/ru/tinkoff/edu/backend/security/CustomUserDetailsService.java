package ru.tinkoff.edu.backend.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ru.tinkoff.edu.backend.entities.User;
import ru.tinkoff.edu.backend.repositories.UserRepository;

import java.util.ArrayList;
import java.util.Collection;

@Component
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userFromDB = userRepository.findByEmail(email);
        if(userFromDB == null ) {
            throw new UsernameNotFoundException("User email = " + email + " not found.");
        }

        Collection<? extends GrantedAuthority> authorities = new ArrayList<>();
        return new org.springframework.security.core.userdetails
                .User(userFromDB.getEmail(), userFromDB.getPassword(), authorities);
    }
}
