package ru.tinkoff.edu.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


/**
 * Java-конфигурации IoC контейнера, отвечающая за безопасность.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    private static final String[] AUTH_WHITELIST = {
            "/api-ui",
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**",
            "/v3/api-docs/**",
            "/swagger-ui/**"
    };

    @Bean
    protected SecurityFilterChain filterChain (HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers(AUTH_WHITELIST).permitAll()
                    .antMatchers("/api/auth/registration").permitAll()
                .antMatchers("/api/**").permitAll()
                .and()
                    .formLogin()
                // временно разрешаю всё
                    .loginPage("/02943857098/475607y48f65h0h0/09827h4cy5").permitAll()
                    .loginProcessingUrl("/api/au098уцгнп98th/834whg50987/924h5g90")
                    .defaultSuccessUrl("/ap982407н5еппi/u4ц985рпser", true)
                    .usernameParameter("email")
                    .passwordParameter("password")
                    .failureUrl("/api/auth/login/fail");


        http.csrf().disable();
        http.cors();

        return http.build();
    }

    @Bean
    protected CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
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
