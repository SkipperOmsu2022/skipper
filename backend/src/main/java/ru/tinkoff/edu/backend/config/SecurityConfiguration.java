package ru.tinkoff.edu.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;


/**
 * Java-конфигурации IoC контейнера, отвечающая за безопасность.
 */
@Configuration
@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {
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

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                    .antMatchers(AUTH_WHITELIST).permitAll()
                    .antMatchers("/","/api/auth/login", "/api/auth/registration",
                            "/authorization/signin", "/authorization/signup", "/static/**").permitAll()
                    .anyRequest().authenticated()
                .and()
                    .httpBasic();
        http.csrf().disable();

        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        corsConfiguration.setExposedHeaders(Arrays
                .asList("Authorization", "Location", "Cache-Control", "Content-Type"));
        corsConfiguration.addAllowedOriginPattern("*");
        corsConfiguration.setAllowedMethods(Arrays
                .asList("GET", "POST", "PUT", "DELETE", "PUT","OPTIONS","PATCH", "DELETE"));

        http.cors().configurationSource(request -> corsConfiguration);
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
