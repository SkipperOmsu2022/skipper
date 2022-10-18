package ru.tinkoff.edu.backend.config;

/*import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;*/

/**
 * Java-конфигурации IoC контейнера, отвечающая за безопасность.
 */
//@Configuration
public class SecurityConfiguration {

    /**
     * Метод создаёт, настраивает и инициализирует объект BCryptPasswordEncoder.
     * Хэш функция "bcrypt" формирования ключа, используемая для защищённого хранения паролей.
     * Функция основана на шифре Blowfish. Пароль перед хэшированием "подсаливается".
     * Плюсом этой хэш-функции является то, что количество итераций можно увеличить, что делает функцию
     * более медленной для атак грубой силой.
     * @return бин BCryptPasswordEncoder.
     */
    /*
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    */
}
