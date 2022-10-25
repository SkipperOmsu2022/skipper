package ru.tinkoff.edu.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import ru.tinkoff.edu.backend.enums.UserRole;

/**
 * Java-конфигурации IoC контейнера, отвечающая за безопасность.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers(HttpMethod.GET, "/api-ui").permitAll()
                    .antMatchers(HttpMethod.POST, "/api/user/login", "/api/user/registration").permitAll()
                    .anyRequest().authenticated()
                .and()
                    .httpBasic();
        http.csrf().disable();
        http.cors();
    }

    @Bean
    @Override
    protected UserDetailsService userDetailsService() {
        return new InMemoryUserDetailsManager(
                User.builder()
                        .username("admin")
                        .password(passwordEncoder().encode("admin"))
                        .roles(UserRole.ADMIN.name())
                        .build(),
                User.builder()
                        .username("mentee")
                        .password(passwordEncoder().encode("mentee"))
                        .roles(UserRole.MENTEE.name())
                        .build()
        );
    }

    /**
     * Метод создаёт, настраивает и инициализирует объект BCryptPasswordEncoder.
     * Хэш функция "bcrypt" формирования ключа, используемая для защищённого хранения паролей.
     * Функция основана на шифре Blowfish. Пароль перед хэшированием "подсаливается".
     * Плюсом этой хэш-функции является то, что количество итераций можно увеличить, что делает функцию
     * более медленной для атак грубой силой.
     * По умолчанию 10 проходов.
     * @return бин BCryptPasswordEncoder.
     */
    @Bean
    protected PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
